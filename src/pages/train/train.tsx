import { TrainTickets } from "@/widgets/train/train-tickets";
import { TrainOperations, TrainNavigations } from "@/widgets/train/train-operations";
import Layout from "@/app/layouts/layout";
import { useState } from "react";
import { ActiveOperation } from "@/shared/types";

const Train = () => {
    const [activeOperation, setActiveOperation] = useState<ActiveOperation>("route");
    return (

        <Layout
            component={
                <TrainTickets />
            }
            information={
                <TrainOperations activeOperation={activeOperation} setActiveOperation={setActiveOperation} />
            }
            navigation={
                <TrainNavigations activeOperation={activeOperation} />
            }
        />
    )
};

export default Train;