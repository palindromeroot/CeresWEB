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
                width="1254"
                height="706"
                src="https://www.youtube.com/embed/jwE6tMZTEDY?si=mQrzfmGkB-nDhcoy"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};
