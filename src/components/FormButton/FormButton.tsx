import styles from './FormButton.module.scss';

/**
 * Компонент кнопки открытия формы.
 */
export const FormButton: React.FC = () => {
    return <button className={styles.btn}>Оставить заявку</button>;
};
