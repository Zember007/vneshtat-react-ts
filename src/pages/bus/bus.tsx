import {BusOperations} from "@/widgets/bus/bus-operations";
import {BusTickets} from "@/widgets/bus/bus-tickets";

const Bus = () => {
    return (
        <div className={"flex flex-row gap-4"}>
            <BusTickets/>
            <BusOperations/>
        </div>
    )
};

export default Bus;