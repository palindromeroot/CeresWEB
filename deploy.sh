#!/bin/bash

echo "=== Пошаговое развертывание CeresWEB ==="

# Проверяем наличие .env.local
if [ ! -f ".env.local" ]; then
    echo "❌ Создайте файл .env.local с переменными:"
    echo "TELEGRAM_BOT_TOKEN=your_bot_token"
    echo "TELEGRAM_CHAT_ID=your_chat_id"
    exit 1
fi

echo "📋 Шаг 1: Остановка существующих контейнеров"
docker compose down

echo "🔄 Шаг 2: Подготовка к получению SSL сертификатов"

# Убедимся, что используем HTTP-only конфигурацию
if [ -f "./nginx/conf.d/app-https.conf.bak" ]; then
    mv ./nginx/conf.d/app-https.conf.bak ./nginx/conf.d/app.conf
fi

if [ -f "./nginx/conf.d/app.conf" ] && grep -q "listen 443" ./nginx/conf.d/app.conf; then
    echo "🔄 Переключаемся на HTTP-only конфигурацию nginx..."
    mv ./nginx/conf.d/app.conf ./nginx/conf.d/app-https.conf.bak
    cp ./nginx/conf.d/app-http-only.conf ./nginx/conf.d/app.conf
fi

echo "🏗️  Шаг 3: Сборка и запуск приложения"
docker compose build --no-cache
docker compose up -d

echo "⏳ Ожидание запуска сервисов..."
sleep 15

echo "🔍 Проверка статуса сервисов:"
docker compose ps

# Проверяем доступность
echo "🌐 Проверка доступности сайта..."
for i in {1..5}; do
    if curl -f -s "http://ceres-tech.ru" > /dev/null; then
        echo "✅ Сайт доступен по HTTP"
        break
    else
        echo "⏳ Попытка $i/5: ожидание доступности сайта..."
        sleep 5
    fi
done

echo "🏆 Шаг 4: Получение SSL сертификатов"
docker compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
        --email your-email@example.com \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        -d ceres-tech.ru \
        -d www.ceres-tech.ru" certbot

if [ $? -eq 0 ]; then
    echo "✅ SSL сертификат получен!"
    
    echo "🔄 Шаг 5: Переключение на HTTPS конфигурацию"
    if [ -f "./nginx/conf.d/app-https.conf.bak" ]; then
        cp ./nginx/conf.d/app-https.conf.bak ./nginx/conf.d/app.conf
    fi
    
    echo "🔄 Перезапуск nginx..."
    docker compose restart nginx
    
    echo "🎉 Развертывание завершено!"
    echo "🌐 Ваш сайт: https://ceres-tech.ru"
    
else
    echo "❌ Ошибка получения SSL сертификата!"
    echo "💡 Проверьте:"
    echo "1. DNS записи домена"
    echo "2. Открыты ли порты 80/443"
    echo "3. Логи: docker compose logs nginx"
    
    # Возвращаем HTTP конфигурацию
    mv ./nginx/conf.d/app.conf ./nginx/conf.d/app-http-only.conf
    mv ./nginx/conf.d/app-https.conf.bak ./nginx/conf.d/app.conf
    
    echo "🌐 Пока сайт работает по HTTP: http://ceres-tech.ru"
fi
