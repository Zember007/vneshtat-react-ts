import FlightImg from '@/assets/icons/fligt/flight-avialogo.svg?react'
import RouteImg from '@/assets/icons/route.svg?react'
import CloseImg from '@/assets/icons/close.svg?react'
import FilterImg from '@/assets/icons/filter.svg?react'
import { Services } from '../utils';
import RoutePlusImg from '@/assets/icons/route_plus.svg?react'



const TemplateCartService = ({ data, select, clear }: { data: Services, select?: Function; clear?: Function }) => {
    return (
        <div className="mb-[9px]  flex gap-[15px] items-center ">
            <div className="flex gap-[10px] flex-col">
                <button
                    className="w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center"
                ></button>
                <button
                    className="w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center"
                ></button>
                <button
                    className="w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center"
                >
                    <RoutePlusImg />
                </button>
            </div>
            <div className="grid grid-cols-[1fr_1fr_220px] gap-[10px] grow *:leading-[1.2]">
                <div className="rounded-[23px] bg-[#ECEEF1] p-[15px] flex items-center min-h-[97px] relative">
                    {data.type &&
                        <>
                            <span className="text-[#9B9FAD] text-[40px] font-medium ">
                                {data.type === 'flight' ? 'Самолёт' : data.type === 'bus' ? 'Автобус' : data.type === 'train' ? 'Поезд' : 'Отель'}
                            </span>
                            { !data.route.class && !data.city && clear &&
                                <button onClick={() => {clear('type')}}  className='absolute right-[15px] top-[15px]'>
                                    <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                                </button>
                            }
                        </>
                    }
                    {(!data.type && select) && <div className="flex flex-col gap-[5px] w-full">
                        <div className="flex justify-between">
                            <span className="text-[18px] font-medium text-[#787B86] ">Тип услуги</span>
                        </div>
                        <div className="flex gap-[10px] justify-between">
                            <p className='text-[#787B86] text-[14px]'>Самолёт, поезд, автобус или отель</p>

                            <button onClick={() => select('type')} className='py-[7.5px] px-[22px] rounded-[10px] bg-primary'>
                                <p className='text-[#007BFB] text-[14px]'>Выбрать</p>
                            </button>

                        </div>
                    </div>}
                </div>
                <div className="rounded-[23px] bg-[#ECEEF1] p-[15px] flex flex-col min-h-[97px]">
                    <div className="flex justify-between">
                        <span className="text-[18px] font-medium text-[#787B86] ">{data.type === 'hotels' ? 'Гости' : 'Пассажиры'}</span>
                        {(!data.filters && data.team) && clear && <button onClick={() => {clear('team')}} >
                            <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                        </button>}
                    </div>
                    {(!data.team && select) ? <div className="flex gap-[10px] justify-between mt-[5px]">
                        <p className='text-[#787B86] text-[14px]'>Если это шаблон для конкретных сотрудников</p>
                        {(data.route.class || data.city) &&
                            <button onClick={() => select('team')} className='py-[7.5px] px-[22px] rounded-[10px] bg-primary'>
                                <p className='text-[#007BFB] text-[14px]'>Выбрать</p>
                            </button>
                        }
                    </div> :
                        <div className="text-[14px] font-medium *:text-[#787B86] flex gap-[5px]  mt-[10px] uppercase">
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-primary">
                                Ви
                            </div>
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-primary">
                                Ви
                            </div>
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-primary">
                                Ви
                            </div>
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-primary">
                                Ви
                            </div>
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-primary">
                                Ви
                            </div>
                        </div>}
                </div>
                <div className="rounded-[23px] bg-[#ECEEF1] p-[15px] row-span-2 flex flex-col">
                    <div className="flex justify-between">
                        <span className="text-[18px] font-medium text-[#787B86] ">Вариант</span>
                        {data.option && clear && 
                            <button onClick={() => {clear('option')}} >
                                <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                            </button>
                        }
                    </div>

                    {!data.option && <p className='text-[#787B86] text-[14px] mt-[5px]'>Добавить в шаблон конкретный рейс или отель, чтобы не пришлось выбирать при создании поездки</p>}


                    {data.option && <div className="flex flex-col gap-[5px] grow mt-[10px]">
                        <div className="p-[10px] rounded-[13px] bg-primary grow flex flex-col gap-[5px]">
                            <div className="flex items-center gap-[5px]">
                                <FlightImg className='w-[13px]' />
                                <span className='text-[11px] font-medium '>S7</span>
                                <span className='text-[11px] font-medium text-[#9B9FAD]'>2550</span>
                                <span className='text-[11px] font-medium text-[#9B9FAD]'>4ч 35м</span>
                            </div>
                            <div className=" flex gap-[7px] before:content-[''] before:h-full before:w-[5px] before:rounded-[3px] before:bg-[#E5E7EA]">
                                <div className="flex flex-col gap-[5px] grow w-full">
                                    <div className="grid grid-cols-[20%_80%] gap-[15px]">
                                        <span className='text-[10px] font-medium'>08:55</span>
                                        <div className="flex flex-col">
                                            <span className='text-[10px] font-medium'>Санкт-Петербург</span>
                                            <span className='text-[10px] font-medium text-[#9B9FAD]'>LED</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-[20%_80%] gap-[15px]">
                                        <span className='text-[10px] font-medium'>12:15</span>
                                        <div className="flex flex-col">
                                            <span className='text-[10px] font-medium'>Москва</span>
                                            <span className='text-[10px] font-medium text-[#9B9FAD]'>DME</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="text-[#007BFB] text-[14px] rounded-[13px] bg-primary py-[9px]">Добавить вариант</button>
                    </div>}
                </div>
                <div className="rounded-[23px] bg-[#ECEEF1] p-[15px] flex flex-col min-h-[97px]">
                    <div className="flex justify-between">
                        <span className="text-[18px] font-medium text-[#787B86] ">{data.type === 'hotels' ? 'Город' : 'Маршрут'}</span>
                        {((data.route.class || data.city) && !data.team) && clear &&
                            <button onClick={() => {if(data.route.class) clear('route'); else clear('city');}} >
                                <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                            </button>
                        }
                    </div>
                    {(!data.route.class && !data.city && select) ? <div className="flex gap-[10px] justify-between mt-[5px]">

                        <p className='text-[#787B86] text-[14px]'>Населённые пункты</p>
                        {data.type &&
                            <button onClick={() => select('route')} className='py-[7.5px] px-[22px] rounded-[10px] bg-primary'>
                                <p className='text-[#007BFB] text-[14px]'>Выбрать</p>
                            </button>
                        }
                    </div>
                        : !data.city ?
                            data.route.items.map(item => (
                                <div className=" flex gap-[5px] mt-[15px]">
                                    <div className="w-[30px] h-[30px] rounded-[11px] bg-primary flex items-center justify-center"><RouteImg className='w-[16px] h-[16px] *:fill-[#8C909C]' /></div>
                                    {item.cityFrom && item.cityBefore && <div className="rounded-[11px] bg-primary  px-[13px] text-[12px] font-medium text-[#787B86] flex items-center">{item.cityFrom} — {item.cityBefore}</div>}
                                    <div className="rounded-[11px] bg-primary  px-[13px] text-[12px] font-medium text-[#787B86] flex items-center">{data.route.class}</div>
                                </div>
                            ))
                            :
                            <div className="flex gap-[5px] mt-[15px]">
                                <div className="w-[30px] h-[30px] rounded-[11px] bg-primary flex items-center justify-center"><RouteImg className='w-[16px] h-[16px] *:fill-[#8C909C]' /></div>
                                <div className="rounded-[11px] bg-primary  px-[13px] text-[12px] font-medium text-[#787B86] flex items-center">{data.city}</div>
                            </div>
                    }

                </div>
                <div className="rounded-[23px] bg-[#ECEEF1] p-[15px] flex flex-col min-h-[97px]">
                    <div className="flex justify-between">
                        <span className="text-[18px] font-medium text-[#787B86] ">Фильтры</span>
                        {(data.filters && !data.option) && clear && 
                            <button onClick={() => {clear('filters')}} >
                                <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                            </button>
                        }
                    </div>
                    {(!data.filters && select) ? <div className="flex gap-[10px] justify-between mt-[5px]">
                        <p className='text-[#787B86] text-[14px]'>Если это шаблон для конкретных сотрудников</p>
                        {data.team &&
                            <button onClick={() => select('filters')} className='py-[7.5px] px-[22px] rounded-[10px] bg-primary'>
                                <p className='text-[#007BFB] text-[14px]'>Выбрать</p>
                            </button>
                        }
                    </div> :
                        <div className=" flex gap-[5px] mt-[15px]">
                            <div className="w-[30px] h-[30px] rounded-[11px] bg-primary flex items-center justify-center">
                                <FilterImg className='*:fill-[#8C909C] w-[16px] h-[16px]' />
                            </div>
                            <div className="rounded-[11px] bg-primary  px-[13px] text-[12px] font-medium text-[#787B86] flex items-center">4 активных фильтра</div>
                        </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default TemplateCartService;