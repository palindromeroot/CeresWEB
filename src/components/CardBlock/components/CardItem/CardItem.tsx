import Image from 'next/image';

import styles from './CardItem.module.scss';
import { ICardItemProps } from './types';

/**
 * Компонент карточки с иконкой, основным текстом и дополнительным текстом.
 * При наведении карточка переворачивается, показывая дополнительный текст.
 */
export const CardItem: React.FC<ICardItemProps> = ({ icon, mainText, moreText }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                <div className={`${styles.cardFace} ${styles.iconText}`}>
                    <Image src={icon} alt={mainText} />
                    <span>{mainText}</span>
                </div>
                <div className={`${styles.cardFace} ${styles.moreText}`}>{moreText}</div>
            </div>
        </div>
    );
};
