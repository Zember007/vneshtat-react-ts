import {TrainTickets} from "@/widgets/train/train-tickets";
import {TrainOperations} from "@/widgets/train/train-operations";

const Train = () => {
    return (
        <div className={"flex flex-row gap-4"}>
            <TrainTickets/>
            <TrainOperations/>
        </div>
    )
};

export default Train;