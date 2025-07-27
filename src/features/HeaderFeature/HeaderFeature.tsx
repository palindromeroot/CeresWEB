import Image from 'next/image';
import React from 'react';

import Logo from '@/assets/logo.svg';
import { FormButton } from '@/components/FormButton';

import styles from './HeaderFeature.module.scss';

/**
 * Компонент шапки приложения.
 */
export const HeaderFeature: React.FC = async () => {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <Image src={Logo} alt="Ceres Logo" width={176} height={66} className={styles.logo} />

                <nav className={styles.navigationWrapper}>
                    <ul className={styles.navigation}>
                        <li>
                            <a href="#" className={styles.navigationItem}>
                                Главная
                            </a>
                        </li>
                        <li>
                            <a href="#technology" className={styles.navigationItem}>
                                Технология
                            </a>
                        </li>
                        <li>
                            <a href="#about" className={styles.navigationItem}>
                                О Нас
                            </a>
                        </li>
                        <li>
                            <a href="#research" className={styles.navigationItem}>
                                НИОКР
                            </a>
                        </li>
                        <li>
                            <a href="#contacts" className={styles.navigationItem}>
                                Контакты
                            </a>
                        </li>
                    </ul>
                </nav>

                <FormButton />
            </div>
        </header>
    );
};
