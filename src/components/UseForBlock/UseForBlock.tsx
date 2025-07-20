import Image from 'next/image';

import useFor1 from '@/assets/useFor1.svg';
import useFor2 from '@/assets/useFor2.svg';
import useFor3 from '@/assets/useFor3.svg';

import styles from './UseForBlock.module.scss';

/**
 * Компонент блока "Для кого подойдёт данное решение".
 */
export const UseForBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <h2 className={styles.title}>Для кого подойдёт данное решение</h2>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Image src={useFor1} alt="Агрокомпании" width={58.24} height={127.7} />
                    <span>Агрофирмы с зерновыми и овощными культурами</span>
                </li>
                <li className={styles.item}>
                    <Image src={useFor2} alt="КФХ и хозяйства с площадью обработки от 50 га" width={128} height={128} />
                    <span>КФХ и хозяйства с площадью обработки от 50 га</span>
                </li>
                <li className={styles.item}>
                    <Image src={useFor3} alt="Интеграторы технологий точного земледелия" width={128} height={128} />
                    <span>Интеграторы технологий точного земледелия</span>
                </li>
            </ul>
        </div>
    );
};
