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
import CenterCostImg from "@/assets/icons/center-cost.svg?react";
import TeamImg from "@/assets/icons/team.svg?react";
import TravelPolicyImg from "@/assets/icons/travel-policy.svg?react";
import ReportsImg from "@/assets/icons/reports.svg?react";
import CompanyImg from "@/assets/icons/job.svg?react";
import FinanceImg from "@/assets/icons/finance.svg?react";
import AgreementImg from "@/assets/icons/agreement.svg?react";
import C1Img from "@/assets/icons/1c.svg?react";


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
        {to: "/jobs/company", img: CompanyImg, label: "Компания", type: 'jobs'},
        {to: "/jobs/employees", img: TeamImg, label: "Сотрудники", type: 'jobs'},
        {to: "#", img: CenterCostImg, label: "Центры затрат", type: 'jobs'},
        {to: "#", img: TravelPolicyImg, label: "Тревел-политика", type: 'jobs'},
        {to: "#", img: AgreementImg, label: "Согласование", type: 'jobs'},
        {to: "/jobs/finance", img: FinanceImg, label: "Финансы", type: 'jobs'},
        {to: "/jobs/reports", img: ReportsImg, label: "Отчеты", type: 'jobs'},
        {to: "#", img: C1Img, label: "Интеграция 1С", type: 'jobs'},
    ];

    const isLinkSelected = links.some(item => item.to === location)
    const links_view = links.filter(item => {
        if(location.split('/')[1] === 'jobs') {
            return item.type === 'jobs'
        } else {
            return item.type !== 'jobs'
        }
    })

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
                    {links_view.map(({to, img: Icon, label}) => (
                        <Link to={to} className="flex items-center" key={to}>
                            <div className="bg-primary relative z-10">
                                <Icon className={clsx("blue-fill-hover transition", location.includes(to) && "blue-fill")}/>
                            </div>
                            <p className={clsx("transition-all duration-500 whitespace-nowrap text-base text-blue max-w-[0px] overflow-hidden ml-0", location.includes(to) && "max-w-[150px] ml-1")}>{label}</p>
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
