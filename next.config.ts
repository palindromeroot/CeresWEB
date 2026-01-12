import type { NextConfig } from 'next';

const isStatic = process.env.BUILD_TARGET === 'static';

const nextConfig: NextConfig = {
    // Прокидываем глобальные переменные в sass
    sassOptions: {
        additionalData: `@use "src/styles/_vars" as *;`,
        includePaths: ['src'],
    },

    output: isStatic ? 'export' : undefined,

    images: isStatic
        ? { unoptimized: true }
        : undefined,

    env: {
        NEXT_PUBLIC_BUILD_TARGET: process.env.BUILD_TARGET,
    },
};

export default nextConfig;
