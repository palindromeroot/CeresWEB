import Image from 'next/image';

import Logo from '@/assets/logo.svg';
import Robot2D from '@/assets/robot-2d.svg';

import styles from './ContactBlock.module.scss';

/**
 * Компонент блока "Контакты".
 */
export const ContactBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <h2 id="contacts" className={styles.title}>
                Контакты
            </h2>

            <div className={styles.card}>
                <div className={styles.text}>
                    <Image src={Logo} alt="Логотип" width={176} height={66} className={styles.logo} />
                    <br />
                    ООО «ЦЕРЕРА»
                    <br />
                    +7 (918) 543 19 02
                    <br />
                    ceres.info@gmail.com
                </div>

                <Image src={Robot2D} alt="Робот" width={362.73} height={192} className={styles.image} />
            </div>
        </div>
    );
};
