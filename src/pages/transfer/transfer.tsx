import {TransferContent} from "@/widgets/transfer/transfer-content";
import {TransferOperations} from "@/widgets/transfer/transfer-operations";

const Transfer = () => {
    return (
        <div className={"flex flex-row gap-4"}>
            <TransferContent/>
            <TransferOperations/>
        </div>
    )
};

export default Transfer;