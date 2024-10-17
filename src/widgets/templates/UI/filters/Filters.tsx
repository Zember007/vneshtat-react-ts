
import TeamImg from '@/assets/icons/team.svg?react'
import SelectImg from '@/assets/icons/select.svg?react'
import FilterImg from '@/assets/icons/filter.svg?react'
import RouteImg from '@/assets/icons/route.svg?react'
import TicketImg from '@/assets/icons/ticket.svg?react'

import CloseImg from '@/assets/icons/cross.svg?react'

import clsx from "clsx";
import { useState } from "react";
import { Services } from '../../utils'
import ServiceType from './ServiceType'
import { FlightRoute } from "@/widgets/flight/flight-operations/UI/flight-route";
import { JourneyRoute } from "@/widgets/journey/journey-operations/UI/journey-route";
import { FlightFilter } from '@/widgets/flight/flight-operations/UI/flight-filter'
import ServiceTeam from './ServiceTeam'

const index = ({ activeFilter, setActiveFilter, close, data }: { activeFilter: string | null; setActiveFilter: Function; close: Function; data: Services | undefined; }) => {

    const filterNav = [
        {
            Img: SelectImg,
            code: 'type'
        },
        {
            Img: RouteImg,
            code: 'route'
        },
        {
            Img: TeamImg,
            code: 'team'
        },
        {
            Img: FilterImg,
            code: 'filters'
        },
        {
            Img: TicketImg,
            code: 'option'
        },
    ]



    return (
        <>
            <div className="flex gap-[10px]">
                {
                    filterNav.map(item => (
                        <button onClick={() => { setActiveFilter(item.code) }} className={clsx('w-[35px] h-[35px] transition-all duration-300 flex items-center justify-center rounded-[11px] bg-[#ECEEF1]', activeFilter == item.code && '!bg-[#121212]')}>
                            <item.Img className={clsx('w-[19px] h-[19px] *:duration-300 *:transition-all *:fill-[#121212]', activeFilter === item.code && '*:fill-[#FAFAFA]')} />
                        </button>
                    ))
                }
            </div>
            <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                <span className="font-medium ">
                    {activeFilter === 'type' && 'Тип услуги'}
                    {activeFilter === 'route' && (<>{data?.type === 'hotels' ? 'Город' :'Маршрут'}</>)}
                    {activeFilter === 'team' && (<>{data?.type === 'hotels' ? 'Гости' :'Пассажиры'}</>)}
                    {activeFilter === 'filters' && 'Фильтры'}
                    {activeFilter === 'option' && 'Вариант'}
                </span>
                <button onClick={() => { close() }}>
                    <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                </button>
            </div>
            <div className={clsx("flex flex-col gap-[10px] grow h-full scroll overflow-y-auto")} >

                {activeFilter === 'type' && <ServiceType id={data?.id} />}
                {activeFilter === 'route' &&
                    <>
                        <FlightRoute template={{id: data?.id, status: true}} />
                        {/* <JourneyRoute template={true}/> */}
                    </>
                }
                {activeFilter === 'team' && <ServiceTeam />}
                {activeFilter === 'filters' &&
                    <>
                        <FlightFilter />
                    </>
                }
                {activeFilter === 'option' && 'Вариант'}

            </div>
        </>
    );
};

export default index;