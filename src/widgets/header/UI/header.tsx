import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";
import PlaneImg from "@/assets/icons/plane.svg?react";
import TrainImg from "@/assets/icons/train.svg?react";
import BusImg from "@/assets/icons/bus.svg?react";
import BedImg from "@/assets/icons/bed.svg?react";
import WebImg from "@/assets/icons/web.svg?react";
import CarImg from "@/assets/icons/car.svg?react";
import YandexTaxiImg from "@/assets/icons/yandex-taxi.svg?react";
import RestaurantImg from "@/assets/icons/restaurant.svg?react";
import BurgerImg from "@/assets/icons/burger.svg?react";
import LockImg from "@/assets/icons/lock.svg?react";

const Header = () => {
    const location = useLocation().pathname;
    const links = [
        {to: "/flight", img: PlaneImg, label: "Самолёт"},
        {to: "/journey", img: TrainImg, label: "Поезд"},
        {to: "/bus", img: BusImg, label: "Автобусы"},
        {to: "/hotel", img: BedImg, label: "Отели"},
        {to: "/aero", img: WebImg, label: "Аэроэкспресс"},
        {to: "/transfer", img: CarImg, label: "Трансфер"},
        {to: "/taxi", img: YandexTaxiImg, label: "Такси"},
        {to: "/restaurant", img: RestaurantImg, label: "Места"},
    ];
    const isLinkSelected = links.some(item => item.to === location)

    return (
        <div className="flex flex-row justify-between items-center py-2.5">
            <div className={"flex items-center gap-2.5"}>
                <button className="flex items-center bg-primary py-2.5 px-4 rounded-primary gap-1 h-[45px]">
                    <p className={"text-base leading-none font-medium"}>{localStorage.getItem("CompanyName")}</p>
                    <LockImg className={"min-h-[18px] min-w-[18px]"}/>
                </button>
                <button className="flex items-center bg-primary p-2.5 rounded-primary h-[45px]">
                    <BurgerImg className={`transition w-6 h-6 blue-fill-hover`}/>
                </button>
                {isLinkSelected ? (
                    <button className="flex items-center gap-3 bg-primary px-5 py-3 rounded-primary h-[45px]">
                        <p className={"text-base leading-none text-blue"}>Инспекция в Самару</p>
                        <span className={"w-0.5 h-4 rounded-[3px] bg-secondary"}/>
                        <p className={"text-base leading-none font-medium"}>18 924,40 ₽</p>
                    </button>
                ) : null}
            </div>
            <div className={"flex items-center gap-2.5"}>
                <div className="flex flex-row items-center bg-primary py-2.5 px-4 rounded-primary gap-6">
                    {links.map(({to, img: Icon, label}) => (
                        <Link to={to} className="flex items-center" key={to}>
                            <div className="bg-primary relative z-10">
                                <Icon className={clsx("blue-fill-hover transition", location === to && "blue-fill")}/>
                            </div>
                            {location === to && (
                                <p className="animate-fadeIn ml-1 text-base text-blue max-w-full">{label}</p>
                            )}
                        </Link>
                    ))}
                </div>
                {location === "/" || location === "/all-journeys" ? (
                    <button
                        className="bg-primary border rounded-primary px-9 h-[45px] flex justify-center items-center transition text-base hover:text-blue">
                        Создать поездку
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export {Header};
