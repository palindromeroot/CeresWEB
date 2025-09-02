# Инструкция по развертыванию приложения CeresWEB с Docker

## Подготовка к развертыванию

### 1. Настройка переменных окружения

Создайте файл `.env.local` и заполните:
```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 2. Настройка домена

В файле `nginx/conf.d/app.conf` замените:
- `your-domain.com` на ваш реальный домен
- `www.your-domain.com` на www версию вашего домена

В файле `init-ssl.sh` замените:
- `DOMAIN="your-domain.com"` на ваш домен  
- `EMAIL="your-email@example.com"` на вашу почту

## Развертывание

### Первый запуск (с настройкой SSL)

1. **Убедитесь, что ваш домен указывает на сервер:**
   ```bash
   dig your-domain.com
   ```

2. **Запустите скрипт инициализации SSL:**
   ```bash
   ./init-ssl.sh
   ```

3. **Запустите все сервисы:**
   ```bash
   docker-compose up -d
   ```

### Последующие запуски

```bash
docker-compose up -d
```

## Полезные команды

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f nextjs
docker-compose logs -f nginx
docker-compose logs -f certbot
```

### Перезапуск сервисов
```bash
# Перезапуск всех сервисов
docker-compose restart

# Перезапуск конкретного сервиса
docker-compose restart nextjs
docker-compose restart nginx
```

### Обновление приложения
```bash
# Пересборка и перезапуск приложения
docker-compose build nextjs
docker-compose up -d nextjs

# Или полная пересборка
docker-compose down
docker-compose up -d --build
```

### Обновление SSL сертификатов (вручную)
```bash
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot --email your-email@example.com --agree-tos --no-eff-email --force-renewal -d your-domain.com -d www.your-domain.com
docker-compose restart nginx
```

## Мониторинг

### Проверка статуса контейнеров
```bash
docker-compose ps
```

### Проверка использования ресурсов
```bash
docker stats
```

### Проверка SSL сертификата
```bash
openssl s_client -connect your-domain.com:443 -servername your-domain.com
```

## Архитектура

- **Next.js приложение** - запускается в контейнере на порту 3000
- **Nginx** - выступает как reverse proxy на портах 80/443
- **Certbot** - автоматически обновляет SSL сертификаты каждые 12 часов
- **Docker Network** - изолированная сеть для контейнеров

## Безопасность

- ✅ Автоматический редирект HTTP → HTTPS  
- ✅ Настройки SSL согласно современным стандартам
- ✅ HSTS заголовки
- ✅ CSP заголовки
- ✅ Запуск приложения от non-root пользователя
- ✅ Автоматическое обновление SSL сертификатов

## Производительность

- ✅ Gzip сжатие статических файлов
- ✅ Кэширование статических ресурсов
- ✅ Многостадийная сборка Docker образа
- ✅ Оптимизированная конфигурация Nginx
