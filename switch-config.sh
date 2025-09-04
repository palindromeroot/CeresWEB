#!/bin/bash

echo "=== Переключение конфигурации nginx ==="

case "$1" in
    "http")
        echo "🔄 Переключение на HTTP-only конфигурацию..."
        cp ./nginx/conf.d/app-http-only.conf.backup ./nginx/conf.d/app.conf
        echo "✅ HTTP-only конфигурация активна"
        ;;
    "https")
        echo "🔄 Переключение на HTTPS с редиректом..."
        cp ./nginx/conf.d/app-https-redirect.conf.backup ./nginx/conf.d/app.conf
        echo "✅ HTTPS конфигурация с редиректом активна"
        ;;
    *)
        echo "❌ Использование: $0 [http|https]"
        echo ""
        echo "Опции:"
        echo "  http   - HTTP-only (для получения SSL сертификатов)"
        echo "  https  - HTTPS с редиректом с HTTP (для продакшена)"
        echo ""
        echo "Текущая конфигурация:"
        if grep -q "listen 443" ./nginx/conf.d/app.conf 2>/dev/null; then
            echo "  🔒 HTTPS активен"
        else
            echo "  🌐 HTTP-only активен"
        fi
        exit 1
        ;;
esac

echo "🔄 Перезапуск nginx..."
docker compose restart nginx

echo "⏳ Ожидание перезапуска..."
sleep 5

echo "🔍 Проверка статуса nginx..."
if docker compose ps nginx | grep -q "Up"; then
    echo "✅ Nginx запущен успешно"
else
    echo "❌ Ошибка запуска nginx!"
    echo "📝 Проверьте логи:"
    docker compose logs nginx
fi
