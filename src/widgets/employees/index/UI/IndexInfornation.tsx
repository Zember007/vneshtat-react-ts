import SectionsImg from "@/assets/icons/sections.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import TeamImg from "@/assets/icons/team.svg?react";
import CloseImg from '@/assets/icons/cross.svg?react'
import AccessImg from '@/assets/icons/access.svg?react'
import PeriodImg from '@/assets/icons/period.svg?react'
import UserImg from '@/assets/icons/user.svg?react'
import TravelPolicyImg from '@/assets/icons/travel-policy.svg?react'
import DocumentImg from '@/assets/icons/document.svg?react'
import AddCartImg from '@/assets/icons/add_cart.svg?react'
import clsx from "clsx";

import { Staffers } from '../../utils';
import { useState } from "react";

import FilterAccess from "./FilterAccess";
import FilterCarts from "./FilterCarts";
import FilterDocument from "./FilterDocument";
import FilterPeriod from "./FilterPeriod";
import FilterTravel from "./FilterTravel";
import FilterUser from "./FilterUser";

const IndexInfornation = ({ selectedStafferId }: { selectedStafferId: number | null }) => {
    const selectedStaffer = Staffers.find(item => item.id === selectedStafferId);

    const filterNav = [
        {
            Img: UserImg,
            code: 'user'
        },
        {
            Img: DocumentImg,
            code: 'document'
        },
        {
            Img: AddCartImg,
            code: 'ad-cart'
        },

        {
            Img: AccessImg,
            code: 'access'
        },
        {
            Img: TravelPolicyImg,
            code: 'travel-policy'
        },
        {
            Img: PeriodImg,
            code: 'period'
        },
    ]

    const [activeFilter, setActiveFilter] = useState<string>('user')



    return (
        <div className="p-[20px] flex flex-col gap-[10px] ">
            {
                !selectedStaffer ? (
                    <>
                        <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                            <span className="font-medium ">Информация</span>
                            <button>
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
                        <>
                            <div className="flex gap-[10px]">
                                {
                                    filterNav.map(item => (
                                        <button onClick={() => { setActiveFilter(item.code) }} className={clsx('w-[35px] h-[35px] transition-all duration-300 flex items-center justify-center rounded-[11px] bg-[#ECEEF1]', activeFilter == item.code && '!bg-[#121212]')}>
                                            <item.Img className={clsx('w-[19px] h-[19px] *:duration-300 *:transition-all', activeFilter === item.code && '*:fill-[#FAFAFA]', activeFilter !== item.code && '*:fill-[#121212]')} />
                                        </button>
                                    ))
                                }
                            </div>
                            <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                                <span className="font-medium ">
                                    {activeFilter === 'user' ? 'Личные данные' :
                                        activeFilter === 'document' ? 'Документы' :
                                            activeFilter === 'ad-cart' ? 'Мильные карты' :
                                                activeFilter === 'period' ? 'Периоды отсутствия' :
                                                    activeFilter === 'access' ? 'Доступ' :
                                                        ''}
                                </span>
                                {activeFilter !== 'travel-policy' && <button>
                                    <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                                </button>}
                            </div>
                            <div className="flex flex-col gap-[10px] max-h-full scroll ">
                                {activeFilter === 'user' ?
                                    (
                                        <FilterUser />
                                    ) : activeFilter === 'document' ?
                                        (
                                            <FilterDocument />
                                        ) : activeFilter === 'ad-cart' ?
                                            (
                                                <FilterCarts />
                                            ) : activeFilter === 'access' ?
                                                (
                                                    <FilterAccess />
                                                ) : activeFilter === 'travel-policy' ?
                                                    (
                                                        <FilterTravel />
                                                    ) :
                                                    (
                                                        <FilterPeriod />
                                                    )
                                }

                            </div>
                        </>
                    )
            }
        </div>
    );
};

export { IndexInfornation };