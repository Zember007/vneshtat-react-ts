


import ArrowImg from "@/assets/icons/arrow-top.svg?react"
import SpeedImg from "@/assets/icons/speed.svg?react"
import SeatImg from "@/assets/icons/seat.svg?react"
import { ReactNode, useEffect, useState } from "react"

interface props {
    title: string
    Delete?: Function
    MoreDetailsJorney: boolean
    children: ReactNode
}

const TiketDropdown = ({ Delete, title, MoreDetailsJorney, children }: props) => {

    const [active, setActive] = useState(false)

    useEffect(() => {
        console.log(Delete);
        
    },[])
    return (
        <div className={` rounded-[23px] bg-[#ECEEF1] py-[13px] px-[20px]  flex flex-col `}>
            <div className="flex justify-between items-center cursor-pointer"
                onClick={() => { setActive(!active) }}
            >
                <span className="text-[12px] font-medium">{title}</span>
                <button

                    className={`${!active && 'duration-300 transition-all rotate-[180deg]'}`}><ArrowImg className="w-[14px] h-[14px]" /></button>
            </div>
            <div className={`flex flex-col mt-[10px]  rounded-[13px] transition-all duration-300 ${(active && MoreDetailsJorney) && 'bg-primary p-[10px] gap-[10px]'}`}>
                <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[5px]">
                            <SpeedImg />
                            <span className="text-[12px] font-medium">016А</span>
                            <span className="text-[#9B9FAD] text-[12px] font-medium">Сапсан</span>
                        </div>
                        <div className="flex items-center gap-[3px]">
                            <SeatImg />
                            <span className="text-[#9B9FAD] text-[10px] font-medium">2</span>
                        </div>
                    </div>
                    {(active && MoreDetailsJorney) && <span className="text-[#9B9FAD] text-[11px] font-medium pl-[20px]">4ч 35м</span>}
                    {(!active || !MoreDetailsJorney) && <div className="flex items-center gap-[5px] pl-[20px]">
                        <span className="text-[#9B9FAD] text-[11px] font-medium">28.12.2023</span>
                        <span className="text-[#9B9FAD] text-[11px] font-medium uppercase">мск - спб</span>
                    </div>}
                </div>

                <div className={`flex flex-col gap-[10px] overflow-hidden transition-all duration-300 ${(!active || !MoreDetailsJorney) && 'h-0'}`}>
                    <div className="flex gap-[7px] before:w-[5px] before:bg-[#E5E7EA] before:content-[''] before:block">
                        <div className="flex flex-col gap-[10px]">
                            <div className="flex gap-[15px]">
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-medium">08:55</span>
                                    <span className="text-[10px] text-[#9B9FAD] ">28 дек, чт</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-medium">Санкт-
                                        Петербург</span>
                                    <span className="text-[10px] text-[#9B9FAD] ">Московский вкз.</span>
                                </div>
                            </div>

                            <div className="flex gap-[15px]">
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-medium">08:55</span>
                                    <span className="text-[10px] text-[#9B9FAD] ">28 дек, чт</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-medium">Санкт-
                                        Петербург</span>
                                    <span className="text-[10px] text-[#9B9FAD] ">Московский вкз.</span>
                                </div>
                            </div>


                        </div>
                    </div>

                    <hr className="h-[1px] bg-[#E5E7EA]" />

                    <p className="text-[#787B86] text-[10px] text-center">Доступно мест: 36</p>
                </div>
            </div>

            <div className={`flex flex-col gap-[10px] overflow-hidden transition-all duration-300 mt-[10px] ${!active && 'h-0 !mt-[0]'}`}>                
                {children}
            </div>
        </div>
    );
};

export {TiketDropdown} ;