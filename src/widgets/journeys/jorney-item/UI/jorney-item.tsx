import Layout from "@/app/layouts/layout";
import ArrowImg from '@/assets/icons/bonus-arrow.svg?react'
import MessageImg from '@/assets/icons/message.svg?react'
import CopyImg from '@/assets/icons/copy.svg?react'
import DownloadImg from '@/assets/icons/download.svg?react'
import MapPinImg from '@/assets/icons/map-pin.svg?react'
import CalendarImg from '@/assets/icons/calendar.svg?react'
import TeamImg from '@/assets/icons/team.svg?react'
import { Switch } from "@/shared/UI";
import { useState } from "react";
import ServiceCart from "./ServiceCart";
import LinesImg from "@/assets/icons/lines-vertical.svg?react";
import BurgerImg from "@/assets/icons/burger.svg?react";
import { ModalRight } from "@/shared/UI";
import JorneyInformation from "./JorneyInformation";
import WebImg from "@/assets/icons/web.svg?react";
import CarImg from "@/assets/icons/car.svg?react";
import YandexTaxiImg from "@/assets/icons/yandex-taxi.svg?react";
import { Link, useLocation } from "react-router-dom";


const JorneyItem = () => {

    const location = useLocation().pathname

    const [switchInformation, setSwitchInformation] = useState(true);
    const [switchChronology, setSwitchChronology] = useState(true);
    const [agreementModal, setAgreementModal] = useState(false);

    return (
        <>

            {!location.includes('/journeys/item/information') ?
                <Layout
                    component={
                        <>
                            {
                                <div className="rounded-[26px] bg-primary p-[20px] grow flex flex-col gap-[20px]">
                                    <div className="flex justify-between items-start pl-[50px]">
                                        <div className="flex flex-col gap-[15px]">
                                            <span className="text-[#787B86] font-medium">Как будете добираться до аэропорта?</span>
                                            <div className="flex gap-[10px]">
                                                <button className="p-[15px] bg-[#ECEEF1] rounded-[18px] flex items-center gap-[10px]">
                                                    <WebImg className="*:fill-[#8C909C] w-[18px] h-[18px]" />
                                                    <span className="text-[#787B86]">Аэроэкспресс</span>
                                                </button>

                                                <button className="p-[15px] bg-[#ECEEF1] rounded-[18px] flex items-center gap-[10px]">
                                                    <CarImg className="*:fill-[#8C909C] w-[18px] h-[18px]" />
                                                    <span className="text-[#787B86]">Трансфер</span>
                                                </button>

                                                <button className="p-[15px] bg-[#ECEEF1] rounded-[18px] flex items-center gap-[10px]">
                                                    <YandexTaxiImg className="*:fill-[#8C909C] w-[18px] h-[18px]" />
                                                    <span className="text-[#787B86]">Яндекс GO</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px] items-center">
                                            <span>Хронология</span>
                                            <Switch
                                                firstChild={<BurgerImg />}
                                                secondChild={<LinesImg />}
                                                isSelected={switchChronology}
                                                setter={setSwitchChronology}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[15px]">
                                        <ServiceCart />
                                    </div>
                                    <div className="flex flex-col items-center gap-[12px] my-[100px]">
                                        <button className="w-[255px] py-[15px] rounded-[18px] bg-[#ECEEF1]">Добавить услугу</button>
                                        <button className="w-[255px] py-[15px] rounded-[18px] bg-[#ECEEF1]">Выбрать из шаблонов</button>
                                    </div>
                                </div>
                            }
                        </>
                    }

                    information={
                        <div className="p-[20px] h-full">
                            <div className="flex flex-col gap-[10px] border-0 border-b border-solid border-[#E5E7EA] h-full">
                                <Switch
                                    firstChild={<span className="text-[12px] font-medium text-[#787B86]">Данные</span>}
                                    secondChild={<span className="text-[12px] font-medium text-[#787B86]">Рекомендации</span>}
                                    isSelected={switchInformation}
                                    setter={setSwitchInformation}
                                    extraClass={"w-full !p-[6px]"}
                                    extraChildClass={"w-full !p-[8px]"}
                                    extraActiveChildClass={"*:text-[#121212]"}
                                />

                                {
                                    switchInformation && <div className="p-[13px] flex flex-col gap-[10px] bg-[#ECEEF1] rounded-[23px]">
                                        <span className="text-[12px] font-medium px-[7px]">Маршрутные данные</span>
                                        <div className="p-[13px] rounded-[15px] bg-primary flex flex-col gap-[5px]">
                                            <div className="flex gap-[5px] items-center">
                                                <CalendarImg className="w-[18px] h-[18px] *:fill-[#121212]" />
                                                <p className="text-[11px]">02.02.2024 - 04.02.2024</p>
                                            </div>
                                            <div className="flex gap-[5px] items-center">
                                                <MapPinImg />
                                                <p className="text-[11px]">Москва - Санкт-Петербург</p>
                                            </div>
                                            <div className="flex gap-[5px] items-center">
                                                <TeamImg className="w-[18px] h-[18px] *:fill-[#121212]" />
                                                <p className="text-[11px]">3 чел.</p>
                                            </div>
                                        </div>
                                    </div>
                                }



                            </div>
                        </div>
                    }

                    navigation={
                        <div className="flex flex-col gap-[10px]">
                            <div className="flex gap-[10px]">
                                <button className="w-[35px] h-[35px] flex items-center justify-center rounded-[11px] bg-[#ECEEF1]">
                                    <DownloadImg />
                                </button>
                                <Link to={'/journeys/item/information'} className="grow rounded-[13px] bg-[#ECEEF1] py-[8px]">
                                    <p className="text-[#007BFB] text-[16px] text-center">Подробнее</p>
                                </Link>
                            </div>
                            <div className="flex gap-[10px]">
                                <button className="w-[35px] h-[35px] flex items-center justify-center rounded-[11px] bg-[#ECEEF1]">
                                    <MessageImg className="w-[18px] h-[18px] *:fill-[#8C909C]" />
                                </button>
                                <button className="w-[35px] h-[35px] flex items-center justify-center rounded-[11px] bg-[#ECEEF1]">
                                    <ArrowImg />
                                </button>
                                <button className="w-[35px] h-[35px] flex items-center justify-center rounded-[11px] bg-[#ECEEF1]">
                                    <CopyImg className="w-[18px] h-[18px] *:fill-[#8C909C]" />
                                </button>
                                <div className="text-center grow rounded-[13px] bg-[#ECEEF1] py-[8px]">
                                    <p>28 475 ₽</p>
                                </div>
                            </div>
                            <hr className="w-[50px] h-[1px] bg-[#C0C7D1] rounded-[1px] mx-auto" />
                            <button onClick={() => { setAgreementModal(true) }} className="bg-[#121212] rounded-[18px] py-[15px] ">
                                <p className="text-[16px] text-primary">Согласовать</p>
                            </button>
                        </div>
                    }

                    extraClassBar="!w-[255px]"
                />
                :
                <JorneyInformation />
            }


            <ModalRight
                action={() => { }}
                active={agreementModal}
                button="Отправить"
                close={() => { setAgreementModal(false) }}
                description="В поездке есть нарушение тревел-политики. Перед оформлением необходимо согласовать нарушения с начальством."
                title="Отправить поездку на согласование?">
                <div className="bg-[#ECEEF1] rounded-[23px] p-[20px] flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[5px]">
                        <span className='text-[12px] font-medium'>Список согласующих:</span>
                        <div className="flex items-center gap-[5px] text-[14px] uppercase">
                            <div className="w-[35px] h-[35px] rounded-[50%] flex items-center justify-center bg-primary">
                                <span>Ви</span>
                            </div>
                            <div className="w-[35px] h-[35px] rounded-[50%] flex items-center justify-center bg-primary">
                                <span>Ст</span>
                            </div>
                            <div className="w-[35px] h-[35px] rounded-[50%] flex items-center justify-center bg-primary">
                                <span className='text-[#787B86]'>+2</span>
                            </div>
                        </div>
                    </div>
                    <textarea className='resize-none h-[80px] rounded-[13px] py-[13px] px-[15px] text-[12px]' placeholder='Опишите, чем вызваны нарушения, чтобы согласующему было проще принять решение.'></textarea>
                </div>
            </ModalRight>

        </>
    );
};

export { JorneyItem };