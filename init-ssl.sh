#!/bin/bash

# Скрипт для первоначальной настройки SSL сертификатов
DOMAIN="ceres-tech.ru"
EMAIL="your-email@example.com"

echo "=== Инициализация SSL сертификатов для $DOMAIN ==="

# Проверяем наличие .env.local
if [ ! -f ".env.local" ]; then
    echo "❌ Ошибка: файл .env.local не найден!"
    echo "Создайте файл .env.local с переменными TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID"
    exit 1
fi

# Создаем необходимые директории
echo "📁 Создание директорий..."
mkdir -p "./certbot/conf/live/$DOMAIN"
mkdir -p "./certbot/www"

# Проверяем, существуют ли уже сертификаты
if [ ! -f "./certbot/conf/live/$DOMAIN/fullchain.pem" ]; then
    echo "🔐 Создание временного SSL сертификата для $DOMAIN..."
    
    # Генерируем временный самоподписанный сертификат
    openssl req -x509 -nodes -newkey rsa:4096 -days 1 \
        -keyout "./certbot/conf/live/$DOMAIN/privkey.pem" \
        -out "./certbot/conf/live/$DOMAIN/fullchain.pem" \
        -subj "/CN=$DOMAIN"
fi

echo "🚀 Запуск nginx..."
docker-compose up -d nginx

# Ждем, пока nginx запустится
echo "⏳ Ожидание запуска nginx..."
sleep 5

# Проверяем, что nginx работает
if ! docker-compose ps nginx | grep -q "Up"; then
    echo "❌ Ошибка: nginx не запустился!"
    docker-compose logs nginx
    exit 1
fi

# Проверяем доступность по HTTP
echo "🔍 Проверка доступности домена..."
if ! curl -f -s "http://$DOMAIN/.well-known/acme-challenge/" > /dev/null 2>&1; then
    echo "⚠️  Предупреждение: домен $DOMAIN может быть недоступен"
    echo "Убедитесь, что:"
    echo "1. Домен указывает на этот сервер"
    echo "2. Порты 80 и 443 открыты"
    echo "3. Firewall настроен правильно"
fi

echo "🗑️  Удаление временного сертификата..."
docker-compose run --rm --entrypoint "\
    rm -rf /etc/letsencrypt/live/$DOMAIN && \
    rm -rf /etc/letsencrypt/archive/$DOMAIN && \
    rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

echo "🏆 Получение SSL сертификата для $DOMAIN..."
if docker-compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        --non-interactive \
        -d $DOMAIN \
        -d www.$DOMAIN" certbot; then
    
    echo "✅ SSL сертификат успешно получен!"
    
    echo "🔄 Перезапуск nginx..."
    docker-compose restart nginx
    
    echo "🎉 Готово! Ваш сайт доступен по HTTPS!"
    echo "🌐 Проверьте: https://$DOMAIN"
else
    echo "❌ Ошибка получения SSL сертификата!"
    echo "Проверьте логи certbot:"
    docker-compose logs certbot
    
    echo "💡 Возможные решения:"
    echo "1. Убедитесь, что домен правильно настроен"
    echo "2. Проверьте DNS записи: dig $DOMAIN"
    echo "3. Убедитесь, что порты 80/443 открыты"
    echo "4. Проверьте логи nginx: docker-compose logs nginx"
    
    exit 1
fi
