
import RouteImg from "@/assets/icons/route.svg?react";
import PassengersImg from "@/assets/icons/users.svg?react";
import FilterImg from "@/assets/icons/filter.svg?react";
import TicketImg from "@/assets/icons/ticket.svg?react";
import AddImg from "@/assets/icons/add.svg?react";

import { JourneyRoute } from "./journey-route";
import { JourneyDecor } from "./journey-decor";
import { JourneyAdd } from "./journey-add";
import { JourneyFilter } from "./journey-filter";
import { JourneyPassenger } from "./journey-passenger";

const TrainOperations = ({ activeOperation, setActiveOperation }: { activeOperation: string, setActiveOperation: Function }) => {


    return (

        <div className={" p-5 flex flex-col gap-5"}>
            <div className={"flex gap-[10px]"}>
                <button
                    onClick={() => setActiveOperation("route")}
                    className={`${activeOperation === "route" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                    <RouteImg className={`${activeOperation === "route" ? "white-fill" : undefined} min-h-5 min-w-5`} />
                </button>
                <button
                    onClick={() => setActiveOperation("passengers")}
                    className={`${activeOperation === "passengers" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                    <PassengersImg className={`${activeOperation === "passengers" ? "white-fill" : undefined} min-h-5 min-w-5`} />
                </button>
                <button
                    onClick={() => setActiveOperation("filter")}
                    className={`${activeOperation === "filter" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                    <FilterImg className={`${activeOperation === "filter" ? "white-fill" : undefined} min-h-5 min-w-5`} />
                </button>
                <button
                    onClick={() => setActiveOperation("decor")}
                    className={`${activeOperation === "decor" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                    <TicketImg className={`${activeOperation === "decor" ? "white-fill" : undefined} min-h-5 min-w-5`} />
                </button>
                <button
                    onClick={() => setActiveOperation("add")}
                    className={`${activeOperation === "add" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                    <AddImg className={`${activeOperation === "add" ? "white-fill" : undefined} min-h-5 min-w-5`} />
                </button>
            </div>
            {activeOperation === "route" && <JourneyRoute />}
            {activeOperation === "passengers" && <JourneyPassenger />}
            {activeOperation === "filter" && <JourneyFilter />}
            {activeOperation === "decor" && <JourneyDecor />}
            {activeOperation === "add" && <JourneyAdd />}
        </div>

    )
};

export { TrainOperations };