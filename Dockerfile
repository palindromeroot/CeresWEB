# Dockerfile для Next.js приложения

# Базовый образ для сборки
FROM node:24-alpine AS base

# Сборка приложения
FROM base AS builder
WORKDIR /app

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копируем исходный код приложения
COPY . .

# Сборка приложения
RUN npm run build

# Финальный образ для запуска
FROM base AS runner
WORKDIR /app

# Отключаем телеметрию Next.js
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Установка зависимостей
COPY package*.json ./
RUN npm install --omit=dev

# Копируем статические файлы с правильными разрешениями
COPY --from=builder /app/.next ./.next

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Запуск приложения
CMD ["npm", "run", "start"]
