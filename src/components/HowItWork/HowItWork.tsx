import Image from 'next/image';

import Poster from '@/assets/poster.png';

import styles from './HowItWork.module.scss';

/**
 * Компонент блока "Как работает CERES".
 */
export const HowItWork: React.FC = () => {
    return (
        <div className={styles.block}>
            <h2 id="technology" className={styles.title}>
                Как работает CERES
            </h2>
            <Image src={Poster} alt="Poster" className={styles.image} width={1254} height={706} />
        </div>
    );
};
