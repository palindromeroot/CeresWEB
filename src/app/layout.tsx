import '@/styles/globals.scss';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { HeaderFeature } from '@/features/HeaderFeature';
import { getClassList } from '@/utils/getClassList';

const golosText = localFont({
    src: '../fonts/GolosText.woff2',
    variable: '--font-golos-test',
});

/**
 * Метаданные для корневого макета
 */
export const metadata: Metadata = {
    title: 'CERES - Главная страница',
    description: 'Добро пожаловать в CERES - инновационное решение для вашего бизнеса.',
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        other: [
            { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
    },
    manifest: '/site.webmanifest',
};

/**
 * Корневой макет приложения
 */
const RootLayout: React.FC<React.PropsWithChildren> = (props) => {
    const { children } = props;
    const classList = getClassList(golosText.variable);

    return (
        <html lang="ru">
            <body className={classList}>
                <HeaderFeature />
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
