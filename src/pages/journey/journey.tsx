import {JourneyTickets} from "@/widgets/journey/journey-tickets";
import {JourneyOperations} from "@/widgets/journey/journey-operations";

const Journey = () => {
    return (
        <div className={"flex flex-row gap-4"}>
            <JourneyTickets/>
            <JourneyOperations/>
        </div>
    )
};

export default Journey;