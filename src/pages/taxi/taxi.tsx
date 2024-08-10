import {TaxiContent} from "@/widgets/taxi/taxi-content";
import {TaxiOperations} from "@/widgets/taxi/taxi-operations";

const Taxi = () => {
    return (
        <div className={"flex flex-col gap-4"}>
            <div className={"flex flex-row justify-between items-center p-5 bg-primary rounded-[23px]"}>
                <h3 className={"text-base"}>Новая поездка</h3>
                <h3 className={"text-base"}>0000,00 ₽</h3>
            </div>
            <div className={"flex flex-row gap-4"}>
                <TaxiContent/>
                <TaxiOperations/>
            </div>
        </div>
    )
};

export default Taxi;