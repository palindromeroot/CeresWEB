import Image from 'next/image';

import Logo from '@/assets/fond-logo.png';

import styles from './SupportBlock.module.scss';

/**
 * Компонент блока "Поддержка".
 */
export const SupportBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <Image src={Logo} alt="Логотип фонда" width={247} height={128} className={styles.logo} />

            <div className={styles.text}>
                Работа выполнена при поддержке гранта Фонда содействия инновациям, предоставленного в рамках программы
                «Студенческий стартап» федерального проекта «Платформа университетского технологического
                предпринимательства»
            </div>
        </div>
    );
};
