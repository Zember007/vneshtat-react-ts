import {TaxiContent} from "@/widgets/taxi/taxi-content";
import {TaxiOperations} from "@/widgets/taxi/taxi-operations";

const Taxi = () => {
    return (
        <div className={"flex flex-row gap-4"}>
            <TaxiContent/>
            <TaxiOperations/>
        </div>
    )
};

export default Taxi;