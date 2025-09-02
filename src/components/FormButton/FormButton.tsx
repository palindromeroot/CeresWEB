'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './FormButton.module.scss';

/**
 * Компонент кнопки открытия формы.
 */
export const FormButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [organization, setOrganization] = useState('');
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = (): void => {
        setIsOpen(true);
        setName('');
        setMessage('');
        setOrganization('');
        setEmailOrPhone('');
        setIsSubmitted(false);
    };

    // Функция для закрытия формы
    const handleClose = (): void => {
        setIsOpen(false);
        setIsSubmitted(false);
    };

    // Убираем скролл у body при открытии формы
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organization,
                    name,
                    emailOrPhone,
                    message,
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                console.error('Failed to submit form');
                // Здесь можно добавить обработку ошибок, например, показать уведомление
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Здесь можно добавить обработку ошибок
        } finally {
            setIsSubmitting(false);
        }
    };

    const formComponent = (
        <div className={styles.formContainer}>
            {!isSubmitted ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.formTitle}>Оставить заявку</h2>
                        <button type="button" className={styles.closeButton} onClick={handleClose}>
                            <svg
                                width="49"
                                height="49"
                                viewBox="0 0 49 49"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M38.3815 10.6185C38.2334 10.4691 38.0571 10.3505 37.8629 10.2696C37.6687 10.1887 37.4604 10.147 37.25 10.147C37.0396 10.147 36.8313 10.1887 36.637 10.2696C36.4428 10.3505 36.2666 10.4691 36.1184 10.6185L24.5 22.2528L12.8815 10.6185C12.7329 10.4699 12.5565 10.352 12.3624 10.2716C12.1682 10.1911 11.9601 10.1498 11.75 10.1498C11.5398 10.1498 11.3317 10.1911 11.1376 10.2716C10.9434 10.352 10.767 10.4699 10.6184 10.6185C10.4698 10.7671 10.3519 10.9435 10.2715 11.1376C10.1911 11.3318 10.1497 11.5399 10.1497 11.75C10.1497 11.9602 10.1911 12.1683 10.2715 12.3624C10.3519 12.5566 10.4698 12.733 10.6184 12.8816L22.2528 24.5L10.6184 36.1185C10.469 36.2666 10.3505 36.4429 10.2695 36.6371C10.1886 36.8313 10.147 37.0396 10.147 37.25C10.147 37.4604 10.1886 37.6687 10.2695 37.8629C10.3505 38.0572 10.469 38.2334 10.6184 38.3816C10.7666 38.531 10.9428 38.6495 11.137 38.7304C11.3313 38.8114 11.5396 38.853 11.75 38.853C11.9604 38.853 12.1687 38.8114 12.3629 38.7304C12.5571 38.6495 12.7334 38.531 12.8815 38.3816L24.5 26.7472L36.1184 38.3816C36.2666 38.531 36.4428 38.6495 36.637 38.7304C36.8313 38.8114 37.0396 38.853 37.25 38.853C37.4604 38.853 37.6687 38.8114 37.8629 38.7304C38.0571 38.6495 38.2334 38.531 38.3815 38.3816C38.5309 38.2334 38.6495 38.0572 38.7304 37.8629C38.8113 37.6687 38.853 37.4604 38.853 37.25C38.853 37.0396 38.8113 36.8313 38.7304 36.6371C38.6495 36.4429 38.5309 36.2666 38.3815 36.1185L26.7472 24.5L38.3815 12.8816C38.5309 12.7334 38.6495 12.5572 38.7304 12.3629C38.8113 12.1687 38.853 11.9604 38.853 11.75C38.853 11.5396 38.8113 11.3313 38.7304 11.1371C38.6495 10.9429 38.5309 10.7666 38.3815 10.6185Z"
                                    fill="#757575"
                                />
                            </svg>
                        </button>
                    </div>

                    <label className={styles.formLabel}>
                        <span>Наименование организации</span>
                        <input
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            className={styles.formInput}
                        />
                    </label>
                    <label className={styles.formLabel}>
                        <span>Контактное лицо</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.formInput}
                        />
                    </label>
                    <label className={styles.formLabel}>
                        <span>Телефон или email</span>
                        <input
                            type="text"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            className={styles.formInput}
                        />
                    </label>
                    <label className={styles.formLabel}>
                        <span>Комментарий</span>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={`${styles.formInput} ${styles.textarea}`}
                        />
                    </label>

                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" required className={styles.checkbox} />
                        <span className={styles.checkboxText}>
                            Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                            <Link href="/policy" onClick={handleClose}>
                                Политикой конфиденциальности
                            </Link>
                            .
                        </span>
                    </label>

                    <div>
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.formButton}`}
                            style={{ margin: '0 auto' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.successContainer}>
                    <h2 className={styles.successTitle}>Спасибо!</h2>
                    <p className={styles.successText}>
                        Ваша заявка успешно отправлена.
                        <br />
                        Мы свяжемся с вами в ближайшее время.
                    </p>
                    <button className={`${styles.btn} ${styles.successButton}`} onClick={handleClose}>
                        Вернуться на сайт
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <>
            <button className={styles.btn} onClick={handleOpen}>
                Оставить заявку
            </button>
            {isOpen && typeof window !== 'undefined' ? createPortal(formComponent, document.body) : null}
        </>
    );
};
