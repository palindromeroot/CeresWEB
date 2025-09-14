import Image from 'next/image';

import Features from '@/assets/features.svg';

import styles from './FeaturesBlock.module.scss';

/**
 * Компонент блока с техническими особенностями.
 */
export const FeaturesBlock: React.FC = () => {
    const features = [
        {
            name: '1.5 га/ч',
            description: 'производительность обработки',
        },
        {
            name: '8 часов',
            description: 'время автономной работы',
        },
        {
            name: 'от 80%',
            description: 'точность распознания целевых объектов',
        },
        {
            name: 'до 3 м/с',
            description: 'скорость перемещения',
        },
        {
            name: 'IP55',
            description: 'защита от пыли и влаги',
        },
    ];

    return (
        <div className={styles.block}>
            <h2 className={styles.title}>Технические особенности</h2>
            <div className={styles.content}>
                <div className={styles.featureList}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureItem}>
                            <span className={styles.featureName}>{feature.name}</span>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>

                <Image className={styles.image} src={Features} alt="Features" width={700} height={864} />
            </div>
        </div>
    );
};
