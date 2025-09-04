import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
    organization: string;
    name: string;
    emailOrPhone: string;
    message: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const data: ContactFormData = await request.json();
        const { organization, name, emailOrPhone, message } = data;

        // Проверяем наличие необходимых переменных окружения
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT;
        const smtpUser = process.env.SMTP_USER;
        const smtpPassword = process.env.SMTP_PASSWORD;
        const emailTo = process.env.EMAIL_TO;

        if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !emailTo) {
            console.error('Missing email configuration');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Настраиваем транспорт для отправки почты
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort, 10),
            secure: parseInt(smtpPort, 10) === 465, // true для 465, false для других портов
            auth: {
                user: smtpUser,
                pass: smtpPassword,
            },
        });

        // Формируем HTML сообщение
        const emailHtml = `
            <h2>🔔 Новая заявка с сайта</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">👤 Контактное лицо:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">🏢 Организация:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${organization}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">📱 Контакты:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${emailOrPhone}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">💬 Комментарий:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">📅 Время:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</td>
                </tr>
            </table>
        `;

        // Отправляем email
        const mailOptions = {
            from: `"Заявки с сайта" <${smtpUser}>`,
            to: emailTo,
            subject: `Новая заявка от ${name} (${organization})`,
            html: emailHtml,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
