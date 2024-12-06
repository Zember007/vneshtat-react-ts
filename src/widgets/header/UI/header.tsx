import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import RouteImg from "@/assets/icons/route.svg?react";
import NotifyImg from "@/assets/icons/notify.svg?react";
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

    const links_journeys = [
        { disabled: false, to: "/journeys/flight", img: PlaneImg, label: "Самолёт" },
        { disabled: false, to: "/journeys/train", img: TrainImg, label: "Поезд" },
        { disabled: false, to: "/journeys/bus", img: BusImg, label: "Автобусы" },
        { disabled: false, to: "/journeys/hotel", img: BedImg, label: "Отели" },
        { disabled: false, to: "/journeys/aero", img: WebImg, label: "Аэроэкспресс" },
        { disabled: false, to: "/journeys/transfer", img: CarImg, label: "Трансфер" },
        { disabled: false, to: "/journeys/taxi", img: YandexTaxiImg, label: "Такси" },
        { disabled: false, to: "/journeys/restaurant", img: RestaurantImg, label: "Места" },
    ];

    const links_templates = [
        { disabled: false, to: "/templates/flight", img: PlaneImg, label: "Самолёт" },
        { disabled: false, to: "/templates/train", img: TrainImg, label: "Поезд" },
        { disabled: false, to: "/templates/bus", img: BusImg, label: "Автобусы" },
        { disabled: false, to: "/templates/hotel", img: BedImg, label: "Отели" },
        { disabled: false, to: "/templates/aero", img: WebImg, label: "Аэроэкспресс" },
        { disabled: false, to: "/templates/transfer", img: CarImg, label: "Трансфер" },
        { disabled: false, to: "/templates/taxi", img: YandexTaxiImg, label: "Такси" },
        { disabled: false, to: "/templates/restaurant", img: RestaurantImg, label: "Места" },
    ];

    const links_company = [
        { to: "/jobs/company", img: CompanyImg, label: "Компания" },
        { to: "/jobs/employees", img: TeamImg, label: "Сотрудники" },
        { to: "/jobs/finance", img: FinanceImg, label: "Финансы" },
        { to: "/jobs/reports", img: ReportsImg, label: "Отчеты" },
        { to: "/jobs/center", disabled: true, img: CenterCostImg, label: "Центры затрат" },
        { to: "/jobs/travel", disabled: true, img: TravelPolicyImg, label: "Тревел-политика" },
        { to: "/jobs/agree", disabled: true, img: AgreementImg, label: "Согласование" },
        { to: "/jobs/1c", disabled: true, img: C1Img, label: "Интеграция 1С" },
    ];

    const links_messanges = [
        { to: "/messages/jorneys",disabled: false, img: RouteImg, label: "Сообщения в поездках" },
        { to: "/messages/notifications",disabled: false, img: NotifyImg, label: "Уведомления" },
        { to: "/messages/chats",disabled: false, img: TeamImg, label: "Переписки" },
    ];


    return (
        <div className="flex flex-row justify-between items-center py-2.5 min-h-[65px]">
            <div className={"flex items-center gap-2.5"}>
                {location !== '/' && <button className="flex items-center bg-primary py-2.5 px-4 rounded-primary gap-1 h-[45px]">
                    <p className={"text-base leading-none font-medium"}>{localStorage.getItem("CompanyName")}</p>
                    <LockImg className={"min-h-[18px] min-w-[18px]"} />                    
                </button>}

                {location.includes('/journeys') ? (
                    <>
                        <Link to={'/journeys/all'} className="flex items-center bg-primary p-2.5 rounded-primary h-[45px] flex items-center">
                            <BurgerImg className={`transition w-6 h-6 blue-fill-hover ${location.includes('/journeys/all') && "blue-fill"}`} />
                            <p className={clsx("transition-all duration-500 whitespace-nowrap text-base text-blue max-w-[0px] overflow-hidden ml-0", location.includes('/journeys/all') && "max-w-[200px] ml-1")}>Все поездки</p>
                        </Link>
                        {/* <button className="flex items-center gap-3 bg-primary px-5 py-3 rounded-primary h-[45px]">
                            <p className={"text-base leading-none text-blue"}>Инспекция в Самару</p>
                            <span className={"w-0.5 h-4 rounded-[3px] bg-secondary"} />
                            <p className={"text-base leading-none font-medium"}>18 924,40 ₽</p>
                        </button> */}
                    </>
                ) : null}

                {location.includes('/templates') ? (
                    <>

                        <Link to={'/templates/all'} className="flex items-center bg-primary p-2.5 rounded-primary h-[45px] flex items-center">
                            <BurgerImg className={`transition w-6 h-6 blue-fill-hover ${location.includes('/templates/all') && "blue-fill"}`} />
                            <p className={clsx("transition-all duration-500 whitespace-nowrap text-base text-blue max-w-[0px] overflow-hidden ml-0", location.includes('/templates/all') && "max-w-[200px] ml-1")}>Все шаблоны</p>
                        </Link>
                    </>
                ) : null}

                {location.includes('/messages') ? (
                    <>

                        <Link to={'/messages/all'} className="flex items-center bg-primary p-2.5 rounded-primary h-[45px] flex items-center">
                            <BurgerImg className={`transition w-6 h-6 blue-fill-hover ${location.includes('/messages/all') && "blue-fill"}`} />
                            <p className={clsx("transition-all duration-500 whitespace-nowrap text-base text-blue max-w-[0px] overflow-hidden ml-0", location.includes('/messages/all') && "max-w-[200px] ml-1")}>Все сообщения</p>
                        </Link>
                    </>
                ) : null}


            </div>
            <div className={"flex items-center gap-2.5"}>

                {location.includes('/journeys') ? (
                    <>
                        <div className="flex flex-row items-center bg-primary py-2.5 px-4 rounded-primary gap-6">
                            {links_journeys.map(({ to, img: Icon, label, disabled }) => (
                                <Link to={to} className={clsx("flex items-center", disabled && 'pointer-events-none')} key={to}>
                                    <div className="bg-primary relative z-10">
                                        <Icon className={clsx("blue-fill-hover transition", location.includes(to) && "blue-fill", disabled && '*:fill-[#8C909C]')} />
                                    </div>
                                    <p className={clsx("transition-all duration-500 whitespace-nowrap text-base text-blue max-w-[0px] overflow-hidden ml-0", location.includes(to) && "max-w-[200px] ml-1")}>{label}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : null}

                {location.includes('/templates') ? (
                    <>
                        <div className="flex flex-row items-center bg-primary py-2.5 px-4 rounded-primary gap-6">
                            {links_templates.map(({ to, img: Icon, label, disabled }) => (
                                <Link to={to} className={clsx("flex items-center", disabled && 'pointer-events-none')} key={to}>
                                    <div className="bg-primary relative z-10">
                                        <Icon className={clsx("blue-fill-hover transition", location.includes(to) && "blue-fill", disabled && '*:fill-[#8C909C]')} />
                                    </div>
                                    <p className={clsx("transition-all duration-500 whitespace-nowrap text-base text-blue max-w-[0px] overflow-hidden ml-0", location.includes(to) && "max-w-[200px] ml-1")}>{label}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : null}

                {location.includes('/messages') ? (
                    <>
                        <div className="flex flex-row items-center bg-primary py-2.5 px-4 rounded-primary gap-6">
                            {links_messanges.map(({ to, img: Icon, label, disabled }) => (
                                <Link to={to} className={clsx("flex items-center", disabled && 'pointer-events-none')} key={to}>
                                    <div className="bg-primary relative z-10">
                                        <Icon className={clsx("h-[25px] w-[25px] blue-fill-hover transition ", location.includes(to) && "blue-fill", disabled && '*:fill-[#8C909C]')} />
                                    </div>
                                    <p className={clsx("transition-all duration-500 whitespace-nowrap text-base text-blue max-w-[0px] overflow-hidden ml-0", location.includes(to) && "max-w-[200px] ml-1")}>{label}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : null}

                {location.includes('/jobs') ? (
                    <>
                        <div className="flex flex-row items-center bg-primary py-2.5 px-4 rounded-primary gap-6">
                            {links_company.map(({ to, img: Icon, label, disabled }) => (
                                <Link to={to} className={clsx("flex items-center", disabled && 'pointer-events-none')} key={to}>
                                    <div className="bg-primary relative z-10">
                                        <Icon className={clsx("blue-fill-hover transition", location.includes(to) && "blue-fill", disabled && '*:fill-[#8C909C]')} />
                                    </div>
                                    <p className={clsx("transition-all duration-500 whitespace-nowrap text-base text-blue max-w-[0px] overflow-hidden ml-0", location.includes(to) && "max-w-[200px] ml-1")}>{label}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : null}

                {location.includes('/journeys') ? (
                    <>
                        <Link to={'/journeys/create'}
                            className={`bg-primary border rounded-primary px-9 h-[45px] flex justify-center items-center transition text-base hover:text-blue ${location.includes('/journeys/create') && 'text-blue'}`}>
                            Создать поездку
                        </Link>
                    </>
                ) : null}

                {location.includes('/templates') ? (
                    <>

                        <Link to={'/templates/create'}
                            className={`bg-primary border rounded-primary px-9 h-[45px] flex justify-center items-center transition text-base hover:text-blue ${location.includes('/templates/create') && 'text-blue'}`}>
                            Создать шаблон
                        </Link>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export { Header };
