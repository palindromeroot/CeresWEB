import Card1 from '@/assets/card1.svg';
import Card2 from '@/assets/card2.svg';
import Card3 from '@/assets/card3.svg';
import Card4 from '@/assets/card4.svg';

import styles from './CardBlock.module.scss';
import { CardItem } from './components/CardItem';

/**
 * Компонент блока карточек.
 */
export const CardBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <h2 className={styles.title}>Что делает CERES особенным</h2>

            <div className={styles.cards}>
                <CardItem
                    icon={Card1}
                    mainText="Автоматизация процесса внесения химикатов"
                    moreText="Автоматизирует обработку за счёт роботизированной платформы, снижая трудозатраты и исключая человеческий фактор"
                />
                <CardItem
                    icon={Card2}
                    mainText="Детекция нор и точечное внесение химикатов"
                    moreText="Позволяет точно определять расположение нор вредителей и вносить препарат прямо в цель, без лишнего расхода"
                />
                <CardItem
                    icon={Card3}
                    mainText="Оцифровка результатов обработки"
                    moreText="Сохраняет координаты, объёмы и маршрут обработки, обеспечивая данные для анализа"
                />
                <CardItem
                    icon={Card4}
                    mainText="Контроль популяции и прогнозирование"
                    moreText="Отслеживает активность вредителей и помогает планировать дальнейшие обработки"
                />
            </div>
        </div>
    );
};
