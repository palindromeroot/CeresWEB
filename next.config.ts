import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Прокидываем глобальные переменные в sass
    sassOptions: {
        additionalData: `@use "src/styles/_vars" as *;`,
        includePaths: ['src'],
    },
    // Настройка для Docker (standalone режим)
    output: 'standalone',
};

export default nextConfig;
