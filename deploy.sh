#!/bin/bash

echo "=== Пошаговое развертывание CeresWEB ==="

# Проверяем наличие .env.local
if [ ! -f ".env.local" ]; then
    echo "❌ Создайте файл .env.local с переменными:"
    echo "TELEGRAM_BOT_TOKEN=your_bot_token"
    echo "TELEGRAM_CHAT_ID=your_chat_id"
    exit 1
fi

echo "📋 Шаг 1: Подготовка к получению SSL сертификатов"

# Временно используем HTTP-only конфигурацию
echo "🔄 Переключаемся на HTTP-only конфигурацию nginx..."
mv ./nginx/conf.d/app.conf ./nginx/conf.d/app-https.conf.bak
mv ./nginx/conf.d/app-http-only.conf ./nginx/conf.d/app.conf

echo "🏗️  Шаг 2: Сборка и запуск приложения"
docker compose build --no-cache
docker compose up -d

echo "⏳ Ожидание запуска сервисов..."
sleep 10

echo "🔍 Проверка статуса сервисов:"
docker compose ps

# Проверяем доступность
echo "🌐 Проверка доступности сайта..."
if curl -f -s "http://ceres-tech.ru" > /dev/null; then
    echo "✅ Сайт доступен по HTTP"
else
    echo "⚠️  Сайт пока недоступен, но продолжаем..."
fi

echo "🏆 Шаг 3: Получение SSL сертификатов"
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
    
    echo "🔄 Шаг 4: Переключение на HTTPS конфигурацию"
    mv ./nginx/conf.d/app.conf ./nginx/conf.d/app-http-only.conf
    mv ./nginx/conf.d/app-https.conf.bak ./nginx/conf.d/app.conf
    
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
