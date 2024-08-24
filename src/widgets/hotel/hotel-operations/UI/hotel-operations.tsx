import {useState} from "react";
import {ActiveOperation} from "@/shared/types";
import {HotelRoute} from "@/widgets/hotel/hotel-operations/UI/hotel-route";
import {HotelPassenger} from "@/widgets/hotel/hotel-operations/UI/hotel-passenger";
import {HotelFilter} from "@/widgets/hotel/hotel-operations/UI/hotel-filter";
import {HotelDecor} from "@/widgets/hotel/hotel-operations/UI/hotel-decor";
import RouteImg from "@/assets/icons/route.svg?react";
import PassengersImg from "@/assets/icons/users.svg?react";
import FilterImg from "@/assets/icons/filter.svg?react";
import TicketImg from "@/assets/icons/ticket.svg?react";
import RadarImg from "@/assets/icons/radar.svg?react";
import ReloadImg from "@/assets/icons/reload.svg?react";

const HotelOperations = () => {
    const [activeOperation, setActiveOperation] = useState<ActiveOperation>("route");

    return (
        <aside>
            <div className={"w-[300px] rounded-[26px] p-5 bg-primary flex flex-col gap-5"}>
                <div className={"flex flex-row gap-[10px]"}>
                    <button
                        onClick={() => setActiveOperation("route")}
                        className={`${activeOperation === "route" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <RouteImg className={`${activeOperation === "route" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("passengers")}
                        className={`${activeOperation === "passengers" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <PassengersImg className={`${activeOperation === "passengers" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("filter")}
                        className={`${activeOperation === "filter" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <FilterImg className={`${activeOperation === "filter" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("decor")}
                        className={`${activeOperation === "decor" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <TicketImg className={`${activeOperation === "decor" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                </div>
                {activeOperation === "route" && <HotelRoute/>}
                {activeOperation === "passengers" && <HotelPassenger/>}
                {activeOperation === "filter" && <HotelFilter/>}
                {activeOperation === "decor" && <HotelDecor/>}
            </div>
            {activeOperation === "route" && (
                <button className={"w-full flex justify-center items-center py-4 rounded-[18px] bg-black mt-4"}>
                    <h1 className={"text-lg text-[#fff]"}>Выбрать гостей</h1>
                </button>
            )}
            {activeOperation === "passengers" && (
                <button className={"w-full flex justify-center items-center py-4 rounded-[18px] bg-black mt-4"}>
                    <h1 className={"text-lg text-[#fff]"}>Поиск!</h1>
                </button>
            )}
            {activeOperation === "filter" && (
                <div className={"flex flex-row gap-4 mt-4"}>
                    <button className={"h-12 px-3 bg-[#dce0e5] rounded-[18px]"}>
                        <RadarImg/>
                    </button>
                    <button
                        className={"flex flex-row items-center justify-center bg-[#dce0e5] rounded-[18px] gap-1 w-full h-12"}>
                        <ReloadImg/>
                        <p className={"text-base"}>Обновить</p>
                    </button>
                </div>
            )}
        </aside>
    )
};

export {HotelOperations};