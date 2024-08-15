import {useState} from "react";
import {ActiveOperation} from "@/shared/types";
import RouteImg from "@/assets/icons/route.svg?react";
import PassengersImg from "@/assets/icons/users.svg?react";
import FilterImg from "@/assets/icons/filter.svg?react";
import TicketImg from "@/assets/icons/ticket.svg?react";
import AddImg from "@/assets/icons/add.svg?react";
import RadarImg from "@/assets/icons/radar.svg?react";
import ReloadImg from "@/assets/icons/reload.svg?react";
import {JourneyRoute} from "./journey-route";
import {JourneyDecor} from "./journey-decor";
import {JourneyAdd} from "./journey-add";
import {JourneyFilter} from "./journey-filter";
import {JourneyPassenger} from "./journey-passenger";

const JourneyOperations = () => {
    const [activeOperation, setActiveOperation] = useState<ActiveOperation>("route");

    return (
        <aside className={"flex-col"}>
            <div className={"w-[300px] rounded-[26px] p-5 bg-primary flex flex-col gap-5"}>
                <div className={"flex gap-[10px]"}>
                    <button
                        onClick={() => setActiveOperation("route")}
                        className={`${activeOperation === "route" ? "bg-black" : "bg-section"} transition p-2 rounded-secondary w-9 h-9 flex justify-center items-center`}>
                        <RouteImg className={activeOperation === "route" ? "white-fill" : undefined}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("passengers")}
                        className={`${activeOperation === "passengers" ? "bg-black" : "bg-section"} transition p-2 rounded-secondary w-9 h-9 flex justify-center items-center`}>
                        <PassengersImg className={activeOperation === "passengers" ? "white-fill" : undefined}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("filter")}
                        className={`${activeOperation === "filter" ? "bg-black" : "bg-section"} transition p-2 rounded-secondary w-9 h-9 flex justify-center items-center`}>
                        <FilterImg className={activeOperation === "filter" ? "white-fill" : undefined}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("decor")}
                        className={`${activeOperation === "decor" ? "bg-black" : "bg-section"} transition p-2 rounded-secondary w-9 h-9 flex justify-center items-center`}>
                        <TicketImg className={activeOperation === "decor" ? "white-fill" : undefined}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("add")}
                        className={`${activeOperation === "add" ? "bg-black" : "bg-section"} transition p-2 rounded-secondary w-9 h-9 flex justify-center items-center`}>
                        <AddImg className={activeOperation === "add" ? "white-fill" : undefined}/>
                    </button>
                </div>
                {activeOperation === "route" && <JourneyRoute/>}
                {activeOperation === "passengers" && <JourneyPassenger/>}
                {activeOperation === "filter" && <JourneyFilter/>}
                {activeOperation === "decor" && <JourneyDecor/>}
                {activeOperation === "add" && <JourneyAdd/>}
            </div>
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

export {JourneyOperations};