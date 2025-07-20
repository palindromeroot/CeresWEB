import { FormButton } from '../FormButton';
import styles from './TryItBlock.module.scss';

/**
 * Компонент блока "Попробуйте на своём поле".
 */
export const TryItBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <h2 className={styles.title}>Попробуйте на своём поле</h2>
            <p className={styles.description}>
                Мы готовы провести тестовую обработку на ваших угодьях и продемонстрировать работу CERES в реальных
                условиях
            </p>
            <FormButton />
        </div>
    );
};
