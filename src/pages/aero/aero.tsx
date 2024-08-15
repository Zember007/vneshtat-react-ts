import {AeroContent} from "@/widgets/aero/aero-content";
import {AeroOperations} from "@/widgets/aero/aero-operations";
import {useState} from "react";

const Aero = () => {
    const [selectedTariffId, setSelectedTariffId] = useState<number | null>(null);

    return (
        <div className={"flex flex-row gap-4"}>
            <AeroContent selectedTariffId={selectedTariffId} setSelectedTariffId={setSelectedTariffId}/>
            <AeroOperations selectedTariffId={selectedTariffId}/>
        </div>
    )
};

export default Aero;