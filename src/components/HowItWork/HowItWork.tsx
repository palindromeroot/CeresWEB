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
            <iframe
                className={styles.image}
                src="https://kinescope.io/embed/dLDiFsmGJ33RUTXrknMXX8"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                frameBorder="0"
                allowFullScreen
                width="1254"
                height="706"
            ></iframe>
        </div>
    );
};
