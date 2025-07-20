import { AboutBlock } from "@/components/AboutBlock";
import { CardBlock } from "@/components/CardBlock";
import { FeaturesBlock } from "@/components/FeaturesBlock";
import { HowItWork } from "@/components/HowItWork";
import { MainBlock } from "@/components/MainBlock";
import { TryItBlock } from "@/components/TryItBlock";
import { UseForBlock } from "@/components/UseForBlock";


/**
 * Домашняя страница приложения.
 */
export default function Home(): React.ReactNode {
    return (
        <>
            <MainBlock />
            <CardBlock />
            <UseForBlock />
            <TryItBlock />
            <HowItWork />
            <FeaturesBlock />
            <AboutBlock />
        </>
    );
}
