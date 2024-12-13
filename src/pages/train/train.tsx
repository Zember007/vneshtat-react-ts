import { TrainTickets } from "@/widgets/train/train-tickets";
import { TrainOperations } from "@/widgets/train/train-operations";
import Layout from "@/app/layouts/layout";

const Train = () => {
    return (

        <Layout
            component={
                <TrainTickets />
            }
            information={
                <TrainOperations />
            }
            navigation={
                <></>
            }
        />
    )
};

export default Train;