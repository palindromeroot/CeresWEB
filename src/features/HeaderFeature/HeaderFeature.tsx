import Image from 'next/image';
import Link from 'next/link';
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
                <Link href="/" className={styles.logo}>
                    <Image src={Logo} alt="Ceres Logo" width={176} height={66} className={styles.logo} />
                </Link>

                <nav className={styles.navigationWrapper}>
                    <ul className={styles.navigation}>
                        <li>
                            <Link href="/#main" className={styles.navigationItem}>
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link href="/#technology" className={styles.navigationItem}>
                                Технология
                            </Link>
                        </li>
                        <li>
                            <Link href="/#about" className={styles.navigationItem}>
                                О Нас
                            </Link>
                        </li>
                        <li>
                            <Link href="/#research" className={styles.navigationItem}>
                                НИОКР
                            </Link>
                        </li>
                        <li>
                            <Link href="/#contacts" className={styles.navigationItem}>
                                Контакты
                            </Link>
                        </li>
                    </ul>
                </nav>

                <FormButton />
            </div>
        </header>
    );
};
