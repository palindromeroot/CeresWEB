#!/bin/bash

# Скрипт для первоначальной настройки SSL сертификатов
# Замените your-domain.com на ваш реальный домен
DOMAIN="your-domain.com"
EMAIL="your-email@example.com"

# Проверяем, существуют ли уже сертификаты
if [ ! -d "./certbot/conf/live/$DOMAIN" ]; then
    echo "Создание временного SSL сертификата для $DOMAIN..."
    
    # Создаем временную папку для сертификатов
    mkdir -p "./certbot/conf/live/$DOMAIN"
    
    # Генерируем временный самоподписанный сертификат
    openssl req -x509 -nodes -newkey rsa:4096 -days 1 \
        -keyout "./certbot/conf/live/$DOMAIN/privkey.pem" \
        -out "./certbot/conf/live/$DOMAIN/fullchain.pem" \
        -subj "/CN=localhost"
fi

echo "Запуск nginx..."
docker-compose up -d nginx

echo "Удаление временного сертификата..."
docker-compose run --rm --entrypoint "\
    rm -rf /etc/letsencrypt/live/$DOMAIN && \
    rm -rf /etc/letsencrypt/archive/$DOMAIN && \
    rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

echo "Получение SSL сертификата для $DOMAIN..."
docker-compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        -d $DOMAIN \
        -d www.$DOMAIN" certbot

echo "Перезапуск nginx..."
docker-compose restart nginx

echo "Готово! SSL сертификат установлен."
