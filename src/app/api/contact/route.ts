import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
    organization: string;
    name: string;
    emailOrPhone: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const data: ContactFormData = await request.json();
        const { organization, name, emailOrPhone, message } = data;

        // Проверяем наличие необходимых переменных окружения
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error('Missing Telegram configuration');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Формируем сообщение
        const telegramMessage = `
🔔 *Новая заявка с сайта*

👤 *Контактное лицо:* ${name}
🏢 *Организация:* ${organization}
📱 *Контакты:* ${emailOrPhone}
💬 *Комментарий:* ${message}

📅 *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
        `.trim();

        // Отправляем сообщение в Telegram
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMessage,
                parse_mode: 'Markdown',
            }),
        });

        if (!telegramResponse.ok) {
            const error = await telegramResponse.text();

            console.error('Telegram API error:', error);
            return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
