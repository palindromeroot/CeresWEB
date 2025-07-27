import styles from './PartnerBlock.module.scss';

/**
 * Компонент блока "НИОКР и партнерства".
 */
export const PartnerBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <h2 id="research" className={styles.title}>
                НИОКР и партнерства
            </h2>
            <p className={styles.text}>
                CERES — это не только готовый продукт, но и исследовательская платформа.
                <br />
                Наша команда активно развивает проект и открыта к сотрудничеству с НИИ, университетами, технологическими
                партнёрами и сельхозпредприятиями.
            </p>

            <div className={styles.listContainer}>
                <h3 className={styles.subtitle}>[Что мы уже сделали]</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        Проведены тестовые обработки на 20 гектарах в Ростовской области
                    </li>
                    <li className={styles.listItem}>Разработано два опытных образца</li>
                    <li className={styles.listItem}>Протестированы алгоритмы точечного внесения</li>
                    <li className={styles.listItem}>Получено софинансирование в рамках грантовой поддержки</li>
                </ul>
            </div>

            <div className={styles.listContainer}>
                <h3 className={styles.subtitle}>[Что предлагаем партнёрам]</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Совместные НИР по новым видам обработки</li>
                    <li className={styles.listItem}>Подключение ИИ-аналитики для распознавания вредителей</li>
                    <li className={styles.listItem}>Проведение пилотов на ваших хозяйствах</li>
                    <li className={styles.listItem}>Интеграции с БПЛА, дронами, сенсорными системами</li>
                    <li className={styles.listItem}>Проведение НИОКР и разработка решений под ключ</li>
                </ul>
            </div>
        </div>
    );
};
