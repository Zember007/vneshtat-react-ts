import SectionsImg from "@/assets/icons/sections.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import TeamImg from "@/assets/icons/team.svg?react";
import CloseImg from '@/assets/icons/cross.svg?react'

import { Staffers } from '../../utils';
import { FilterUsers } from '../../UI';



const IndexInfornation = ({ selectedStafferId, close }: { selectedStafferId: number | null, close:Function }) => {
    const selectedStaffer = Staffers.find(item => item.id === selectedStafferId);





    return (
        <div className="p-[20px] flex flex-col gap-[10px] ">
            {
                !selectedStaffer ? (
                    <>
                        <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                            <span className="font-medium ">Информация</span>
                            <button onClick={() => {close()}}>
                                <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                            </button>
                        </div>
                        <div className="rounded-[23px] p-[13px] flex flex-col gap-[10px] bg-[#ECEEF1]">
                            <span className="text-[12px] font-medium">Сводка</span>
                            <div className="flex flex-col gap-[10px] p-[13px] rounded-[15px] bg-[#FAFAFA]">
                                <div className="flex items-center gap-[5px]">
                                    <TeamImg />
                                    <span className="text-[11px] font-normal">145 сотрудников</span>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <TeamImg className="*:fill-[#007BFB]" />
                                    <span className="text-[11px] font-normal">20 сотрудников онлайн</span>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <RouteImg />
                                    <span className="text-[11px] font-normal">5 сотрудников в поездках</span>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <SectionsImg />
                                    <span className="text-[11px] font-normal">4 отдела</span>
                                </div>
                            </div>
                        </div>
                    </>
                )
                    :
                    (
                        <FilterUsers close={close}/>
                    )
            }
        </div>
    );
};

export { IndexInfornation };