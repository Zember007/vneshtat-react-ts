import {FlightTickets} from "@/widgets/flight/flight-tickets";
import {FlightOperations} from "@/widgets/flight/flight-operations";

const Flight = () => {
    return (
        <div className={"flex flex-row gap-4"}>
            <FlightTickets />
            <FlightOperations/>
        </div>
    )
};

export default Flight;