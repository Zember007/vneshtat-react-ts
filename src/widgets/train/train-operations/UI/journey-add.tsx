
import { TiketDropdown } from "@/shared/UI";
import TiketOptions from "./tiket-options";


const JourneyAdd = () => {
    return (
        <>
            <TiketDropdown MoreDetailsJorney={false} title="Билет туда" >
                <TiketOptions />
            </TiketDropdown>

            <TiketDropdown MoreDetailsJorney={false} title="Билет обратно" >
                <TiketOptions />
            </TiketDropdown>
        </>
    )
};

export { JourneyAdd };