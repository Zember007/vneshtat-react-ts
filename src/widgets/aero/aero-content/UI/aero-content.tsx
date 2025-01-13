/* import { Dispatch, SetStateAction } from "react"; */
/* import { mockTariff } from "../utils"; */
import WarnImg from "@/assets/icons/warn.svg?react";
import YandexImg from "@/assets/icons/yandex.svg?react";
import TrafficLigthImg from "@/assets/icons/traffic_light-color.svg?react";
import AeroMap from '@/assets/icons/aero_map.svg?react'
import RouteImg from '@/assets/icons/route.svg?react'
import AeroImg from "@/assets/img/aero_img.webp";
import { InputCity, Dropdown } from "@/shared/UI";
import PassengerImg from "@/assets/icons/team.svg?react";
import { City } from "@/shared/types";
import { Link } from "react-router-dom";

const AeroContent = () => {
   

    return (
        <div className={"grow flex flex-col gap-[15px]"}>
            <div className="rounded-[26px] bg-primary p-[20px] flex gap-[10px]">
                <div
                    className={"flex flex-row items-center py-[10px] px-[8px] gap-[7px] h-[35px] rounded-[13px] bg-secondary"}>
                    <PassengerImg className="h-[18px] w-[18px]" />
                    <p className={"text-xs"}>+0</p>
                </div>

                <div className="relative w-full">
                    <Dropdown
                        isAbsoluteDrop={true}
                        title="Тип"
                        extraClassBox="!rounded-[13px] h-[35px] w-full"
                        extraClass=" !py-[9px] !px-[15px] "
                        extraClassTitle="!text-[#787B86]"
                    >
                        <></>
                    </Dropdown>
                </div>

                <div className="relative w-full">
                    <Dropdown
                        isAbsoluteDrop={true}
                        title="Билет"
                        extraClassBox="!rounded-[13px] h-[35px] w-full"
                        extraClass=" !py-[9px] !px-[15px] "
                        extraClassTitle="!text-[#787B86]"
                    >
                        <></>
                    </Dropdown>
                </div>

                <div className="relative w-full">
                    <Dropdown
                        isAbsoluteDrop={true}
                        title="Тариф"
                        extraClassBox="!rounded-[13px] h-[35px] w-full"
                        extraClass=" !py-[9px] !px-[15px] "
                        extraClassTitle="!text-[#787B86]"
                    >
                        <></>
                    </Dropdown>
                </div>

                <div className="relative group">
                    <div className={"cursor-pointer  flex items-center p-[10px] gap-[6px] w-[160px] h-[35px] rounded-[16px] bg-secondary"}>
                        <TrafficLigthImg className="[&>path:first-child]:fill-[#FF3333]" />
                        <span className="text-[12px] truncate grow">54 минут в пути</span>
                        <WarnImg className="*:fill-[#787B86]" />
                    </div>
                    <div className="group-hover:opacity-100 group-hover:visible invisible opacity-0 absolute w-[280px] z-[100] pt-[10px] transition-all duration-300 bottom-0 right-0 translate-y-[100%] flex flex-col gap-[5px]">
                        <div className="rounded-[26px] bg-[#ECEEF1BA] py-[15px] px-[20px] flex flex-col gap-[5px]"
                            style={{
                                boxShadow: '0px 4px 6.5px 0px rgba(0, 0, 0, 0.04)',
                                backdropFilter: 'blur(4.849999904632568px)'
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-[12px] font-medium text-[#787B86]"
                                >По прогнозу Яндекс Карт</p>
                                <YandexImg />
                            </div>
                            <div className="flex flex-col gap-[10px] ">
                                <div className="flex gap-[15px] whitespace-nowrap items-center">
                                    <span className="text-[35px] font-medium">54 мин</span>
                                    <div className="*:text-[#787B86] *:text-[12px] *:font-medium  flex flex-col">
                                        <span>15,8 км</span>
                                        <span>Прибытие в 18:44</span>
                                    </div>
                                </div>
                                <div className="flex gap-[15px]">
                                    <div className="flex gap-[7px]">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center justify-center h-[23px] w-[23px] border-[2px] border-solid border-[#FF3333] rounded-[50%]">
                                                <span className="text-[10px] font-medium">7</span>
                                            </div>
                                            <span className="text-[12px] font-medium text-[#787B86]">17</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center justify-center h-[23px] w-[23px] border-[2px] border-solid border-[#FF3333] rounded-[50%]">
                                                <span className="text-[10px] font-medium">7</span>
                                            </div>
                                            <span className="text-[12px] font-medium text-[#787B86]">18</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center justify-center h-[23px] w-[23px] border-[2px] border-solid border-[#FFCA27] rounded-[50%]">
                                                <span className="text-[10px] font-medium">5</span>
                                            </div>
                                            <span className="text-[12px] font-medium text-[#787B86]">19</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center justify-center h-[23px] w-[23px] border-[2px] border-solid border-[#71B732] rounded-[50%]">
                                                <span className="text-[10px] font-medium">4</span>
                                            </div>
                                            <span className="text-[12px] font-medium text-[#787B86]">20</span>
                                        </div>
                                    </div>
                                    <p className="text-[12px] font-medium">
                                        В это время будут сильные пробки
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[26px] bg-[#ECEEF1BA] py-[15px] px-[20px] flex flex-col gap-[8px]"
                            style={{
                                boxShadow: '0px 4px 6.5px 0px rgba(0, 0, 0, 0.04)',
                                backdropFilter: 'blur(4.849999904632568px)'
                            }}
                        >
                            <span className="text-[#787B86] font-medium">Внимание</span>
                            <p className="text-[12px]">
                                Ваш рейс <Link to={'/'} className="text-[#007BFB]">S7 5505</Link> вылетает в 18:44.  Если вы выедете в аэропорт в 17:50, то скорее всего опоздаете.
                            </p>
                            <p className="text-[#787B86] text-[12px] font-medium">
                                Рекомендуем приехать как минимум за 2 часа до вылета.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-[15px] h-full grow">
                <div className="rounded-[26px] bg-primary p-[20px] w-1/2 flex flex-col gap-[40px] justify-between items-center">
                    <div className="flex items-center gap-[10px]">
                        <InputCity
                            inputClass="!h-[35px] !text-[14px] !rounded-[13px]"
                            extraClass="min-w-0"
                            placeholder={"Точка отправления"}
                            value={''}
                            setValue={(str) => { console.log(str); }}
                            callback={(city: City) => {console.log(city);
                            }}
                        />
                        <RouteImg className="w-[18px] h-[18px] *:fill-[#BDBFC7]" />
                        <InputCity
                            inputClass="!h-[35px] !text-[14px] !rounded-[13px]"
                            extraClass="min-w-0"
                            placeholder={"Точка прибытия"}
                            value={''}
                            setValue={(str) => { console.log(str); }}
                            callback={(city: City) => {console.log(city);
                            }}
                        />
                    </div>
                    <div className="grow my-auto">
                        <img src={AeroImg} alt="img" className="w-full " />
                    </div>
                </div>
                <div className="rounded-[26px] bg-primary p-[20px] w-1/2">
                    <AeroMap className="w-full select-aeroMap-bottom-line select-aeroMap-top-line select-aeroMap-route-bottom select-aeroMap-route-top" />
                </div>
            </div>
        </div>
    )
};

export { AeroContent };
