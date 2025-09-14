import Image from 'next/image';

import Logo from '@/assets/fond-logo.svg';
import ProjectLogo from '@/assets/main_project-logo.svg';

import styles from './SupportBlock.module.scss';

/**
 * Компонент блока "Поддержка".
 */
export const SupportBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <div className={styles.logos}>
                <Image src={Logo} alt="Логотип фонда" width={247} height={128} className={styles.logo} />
                <Image
                    src={ProjectLogo}
                    alt="Логотип проекта"
                    width={165}
                    height={128}
                    className={styles.projectLogo}
                />
            </div>

            <div className={styles.text}>
                Работа выполнена при поддержке гранта Фонда содействия инновациям, предоставленного в рамках программы
                «Студенческий стартап» федерального проекта «Платформа университетского технологического
                предпринимательства»
            </div>
        </div>
    );
};
