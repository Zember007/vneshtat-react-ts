import PlaneImg from "@/assets/icons/plane.svg?react";
import TrainImg from "@/assets/icons/train.svg?react";
import BusImg from "@/assets/icons/bus.svg?react";
import BedImg from "@/assets/icons/bed.svg?react";
import WebImg from "@/assets/icons/web.svg?react";
import CarImg from "@/assets/icons/car.svg?react";
import YandexTaxiImg from "@/assets/icons/yandex-taxi.svg?react";
import RestaurantImg from "@/assets/icons/restaurant.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import MessageImg from "@/assets/icons/message.svg?react";

import PinImg from "@/assets/icons/pin_.svg?react";
import { Link } from "react-router-dom";

const TemplateCart = () => {
    return (
        <div className="flex gap-[15px] items-center ">
            <div className="flex gap-[10px] flex-col">
                <button
                    className="w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center pointer-events"
                >
                    <CopyImg className="w-[19px] h-[19px] *:fill-[#8C909C]" />
                </button>
                <button
                    className="w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center"
                >
                    <MessageImg className="w-[19px] h-[19px]" />
                </button>
            </div>
            <Link to={'/templates/create/add'} className=" bg-[#ECEEF1] rounded-[23px] p-[15px] grow flex flex-col gap-[15px] justify-between h-full">
                <div className="max-w-[calc(100vw-710px)] flex items-center gap-[32px] justify-between">
                    <p className="truncate text-[18px] font-medium ">Квартальная инспекция в Самару, шаблон для отдела продаж</p>
                    <PinImg />
                </div>

                <div className="gap-[5px] flex grow">
                    <div className="rounded-[10px] bg-primary p-[15px] grow flex flex-col justify-between">
                        <span className="text-[18px] font-medium">Маршрут</span>
                        <div className="flex flex-col">
                            <span className="text-[14px] font-medium text-[#787B86]">Сыктывкар</span>
                            <span className="text-[14px] font-medium text-[#787B86]">Самара</span>
                        </div>
                    </div>
                    <div className="rounded-[10px] bg-primary p-[15px] grid grid-cols-4 gap-[10px]">
                        <PlaneImg className="*:fill-[#8C909C] w-[25px] h-[25px]" />
                        <TrainImg className="*:fill-[#007BFB] w-[25px] h-[25px]" />
                        <BusImg className="*:fill-[#007BFB] w-[25px] h-[25px]" />
                        <BedImg className="*:fill-[#8C909C] w-[25px] h-[25px]" />
                        <WebImg className="*:fill-[#007BFB] w-[25px] h-[25px]" />
                        <CarImg className="*:fill-[#8C909C] w-[25px] h-[25px]" />
                        <YandexTaxiImg className="*:fill-[#8C909C] w-[25px] h-[25px]" />
                        <RestaurantImg className="*:fill-[#8C909C] w-[25px] h-[25px]" />
                    </div>
                    <div className="rounded-[10px] bg-primary p-[15px] flex flex-col justify-between ">
                        <span className="text-[18px] font-medium">Сотрудники</span>
                        <div className="text-[14px] font-medium *:text-[#787B86] flex gap-[5px]">
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-[#ECEEF1]">
                                Ви
                            </div>
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-[#ECEEF1]">
                                Ви
                            </div>
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-[#ECEEF1]">
                                Ви
                            </div>
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-[#ECEEF1]">
                                Ви
                            </div>
                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-[#ECEEF1]">
                                Ви
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="bg-[#ECEEF1] rounded-[23px] p-[15px] flex flex-col gap-[5px] h-full min-w-[215px]">
                <Link to={'/templates/create/add'} className="rounded-[13px] bg-primary py-[10.5px] text-center text-[#787B86]">28 570 ₽ </Link>
                <button className="rounded-[13px] bg-primary py-[10.5px] text-center text-[#787B86]">Архивировать</button>
                <button className="rounded-[13px] bg-[#121212] py-[10.5px] text-center text-primary">Создать поездку</button>
            </div>
        </div>
    );
};

export default TemplateCart;