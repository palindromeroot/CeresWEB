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
# docker compose down

echo "🔄 Шаг 2: Подготовка к получению SSL сертификатов"

# Убедимся, что используем HTTP-only конфигурацию
echo "🔄 Переключаемся на HTTP-only конфигурацию nginx..."

# Активируем HTTP-only конфигурацию для получения SSL
cp ./nginx/conf.d/app-http-only.conf.backup ./nginx/conf.d/app.conf

echo "🏗️  Шаг 3: Сборка и запуск приложения"
docker compose build
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
    
    echo "🔄 Шаг 5: Переключение на HTTPS с переадресацией"
    # Восстанавливаем основную конфигурацию с HTTPS
    cp ./nginx/conf.d/app-https-redirect.conf.backup ./nginx/conf.d/app.conf
    
    echo "🔄 Перезапуск nginx..."
    docker compose restart nginx
    
    echo "⏳ Ожидание перезапуска..."
    sleep 5
    
    echo "🌐 Тестирование переадресации..."
    if curl -I -m 10 "http://ceres-tech.ru" 2>/dev/null | grep -q "301\|302"; then
        echo "✅ HTTP переадресация на HTTPS работает!"
    else
        echo "⚠️  Переадресация может не работать, проверьте вручную"
    fi
    
    echo "🎉 Развертывание завершено!"
    echo "🌐 Ваш сайт:"
    echo "   HTTP:  http://ceres-tech.ru  (переадресует на HTTPS)"
    echo "   HTTPS: https://ceres-tech.ru"
    
else
    echo "❌ Ошибка получения SSL сертификата!"
    echo "💡 Проверьте:"
    echo "1. DNS записи домена"
    echo "2. Открыты ли порты 80/443"
    echo "3. Логи: docker compose logs nginx"
    
    echo "🌐 Пока сайт работает по HTTP: http://ceres-tech.ru"
    echo "💡 После исправления проблем запустите: ./enable-https.sh"
fi
