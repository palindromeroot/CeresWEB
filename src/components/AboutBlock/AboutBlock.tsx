import Image from 'next/image';

import Team from '@/assets/team.webp';

import styles from './AboutBlock.module.scss';

export const AboutBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <h2 id="about" className={styles.title}>
                О Нас и о проекте
            </h2>
            <div className={styles.section}>
                <div className={styles.textWrapper}>
                    <span className={styles.text}>
                        Наша история началась с амбициозного студенческого проекта, который быстро вышел за рамки
                        простой дипломной работы. Мы сразу поставили перед собой цель — создать реальный инженерный
                        продукт, способный решать актуальные задачи сельского хозяйства.
                    </span>

                    <span className={styles.text}>
                        Так появился CERES — результат упорной работы команды инженеров, исследователей и практиков. Мы
                        объединили научный подход, современные технологии и глубокое понимание агросферы, чтобы
                        предложить рынку эффективное, автономное решение.
                    </span>
                </div>

                <Image src={Team} alt="Команда CERES" className={styles.image} width={661} height={491} />
            </div>
            <span className={styles.text}>
                Сегодня мы развиваем собственные НИОКР, сотрудничаем с вузами и опытными хозяйствами, и открыты к новым
                партнёрствам. Мы уверены: роботизация агросектора — это не будущее, а уже реальность, которую мы создаём
                вместе.
            </span>
        </div>
    );
};
