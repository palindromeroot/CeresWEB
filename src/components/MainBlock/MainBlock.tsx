import Image from 'next/image';

import Robot from '@/assets/robot.webp';

import styles from './MainBlock.module.scss';

/**
 * Компонент главного блока.
 */
export const MainBlock: React.FC = () => {
    return (
        <div id="main" className={styles.main}>
            <div className={styles.infoBlock}>
                <h1 className={styles.header}>CERES</h1>
                <p className={styles.description}>автономный робот для защиты сельхозугодий от вредителей</p>
            </div>

            <Image src={Robot} alt="Robot" width={720} height={464} className={styles.image} />
        </div>
    );
};
