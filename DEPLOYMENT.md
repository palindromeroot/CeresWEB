# Инструкция по развертыванию приложения CeresWEB с Docker

## Управление конфигурацией nginx

Для управления конфигурациями nginx используйте скрипт `switch-config.sh`:

```bash
# Переключение на HTTP-only (для получения SSL)
./switch-config.sh http

# Переключение на HTTPS с редиректом (для продакшена)
./switch-config.sh https
```

**Важно:** Теперь в директории `nginx/conf.d/` активен только один файл `app.conf`. Другие конфигурации переименованы в `.backup` чтобы избежать конфликтов.

## Подготовка к развертыванию

### 1. Настройка переменных окружения

Создайте файл `.env.local` и заполните:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 2. Проверка DNS записей

Убедитесь, что ваш домен указывает на сервер:

```bash
dig ceres-tech.ru
dig www.ceres-tech.ru
```

### 3. Открытие портов

Убедитесь, что порты 80 и 443 открыты:

```bash
# Для Ubuntu/Debian
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Для CentOS/RHEL
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

## Развертывание

### Простое развертывание (рекомендуется)

```bash
# Запустите пошаговый скрипт развертывания
./deploy.sh
```

### Альтернативный способ

1. **Сначала запустите приложение без SSL:**

```bash
# Переименуйте конфигурацию nginx
mv ./nginx/conf.d/app.conf ./nginx/conf.d/app-https.conf.disabled
mv ./nginx/conf.d/app-http-only.conf ./nginx/conf.d/app.conf

# Запустите приложение
docker compose up -d

# Проверьте доступность
curl -I http://ceres-tech.ru
```

2. **Затем получите SSL сертификат:**

```bash
# Получение SSL сертификата
docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot --email your-email@example.com --agree-tos --no-eff-email --non-interactive -d ceres-tech.ru -d www.ceres-tech.ru" certbot
```

3. **Включите HTTPS конфигурацию:**

```bash
# Верните HTTPS конфигурацию
mv ./nginx/conf.d/app.conf ./nginx/conf.d/app-http-only.conf
mv ./nginx/conf.d/app-https.conf.disabled ./nginx/conf.d/app.conf

# Перезапустите nginx
docker compose restart nginx
```

## Полезные команды

### Просмотр логов

```bash
# Все сервисы
docker compose logs -f

# Конкретный сервис
docker compose logs -f nextjs
docker compose logs -f nginx
docker compose logs -f certbot
```

### Перезапуск сервисов

```bash
# Перезапуск всех сервисов
docker compose restart

# Перезапуск конкретного сервиса
docker compose restart nextjs
docker compose restart nginx
```

### Обновление приложения

```bash
# Пересборка и перезапуск приложения
docker compose build nextjs
docker compose up -d nextjs

# Или полная пересборка
docker compose down
docker compose up -d --build
```

### Обновление SSL сертификатов (вручную)

```bash
docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot --email your-email@example.com --agree-tos --no-eff-email --force-renewal -d ceres-tech.ru -d www.ceres-tech.ru" certbot
docker compose restart nginx
```

## Диагностика проблем

### SSL сертификат не получается

1. **Проверьте DNS:**

```bash
dig ceres-tech.ru
dig www.ceres-tech.ru
```

2. **Проверьте доступность по HTTP:**

```bash
curl -I http://ceres-tech.ru
curl -I http://ceres-tech.ru/.well-known/acme-challenge/test
```

3. **Проверьте логи nginx:**

```bash
docker compose logs nginx
```

### Docker rate limit

Если возникает ошибка rate limit, войдите в Docker Hub:

```bash
docker login
```

### Проблемы с портами

Проверьте, что порты свободны:

```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

## Мониторинг

### Проверка статуса контейнеров

```bash
docker compose ps
```

### Проверка использования ресурсов

```bash
docker stats
```

### Проверка SSL сертификата

```bash
openssl s_client -connect ceres-tech.ru:443 -servername ceres-tech.ru
```

### Автоматическая проверка SSL

```bash
curl -I https://ceres-tech.ru
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
