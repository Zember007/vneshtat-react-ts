

import SeatImg from "@/assets/icons/seat.svg?react"
import { TiketDropdown } from "@/shared/UI";

const JourneyDecor = () => {
    return (
        <>
            <TiketDropdown title="Билет туда" MoreDetailsJorney={true} >
                <div className="flex  items-center justify-between p-[10px] rounded-[13px] bg-primary">
                    <div className="flex flex-col gap-[5px]">
                        <div className="flex items-center gap-[5px]">
                            <SeatImg />
                            <span className="text-[12px] font-medium">40 место</span>
                            <span className="text-[#9B9FAD] text-[12px] font-medium">5 вагон</span>
                        </div>

                        <span className="text-[#9B9FAD] text-[11px] font-medium">28.12.2023</span>
                    </div>
                    <div className="bg-[#ECEEF1] rounded-[50%] w-[30px] h-[30px] flex items-center justify-center">
                        <p className="text-[12px] font-medium leading-[1]">ВИ</p>
                    </div>
                </div>
            </TiketDropdown>
            <TiketDropdown title="Билет обратно" MoreDetailsJorney={true} >
                <div className="flex  items-center justify-between p-[10px] rounded-[13px] bg-primary">
                    <div className="flex flex-col gap-[5px]">
                        <div className="flex items-center gap-[5px]">
                            <SeatImg />
                            <span className="text-[12px] font-medium">40 место</span>
                            <span className="text-[#9B9FAD] text-[12px] font-medium">5 вагон</span>
                        </div>

                        <span className="text-[#9B9FAD] text-[11px] font-medium">28.12.2023</span>
                    </div>
                    <div className="bg-[#ECEEF1] rounded-[50%] w-[30px] h-[30px] flex items-center justify-center">
                        <p className="text-[12px] font-medium leading-[1]">ВИ</p>
                    </div>
                </div>
            </TiketDropdown>

        </>
    )
};

export { JourneyDecor };