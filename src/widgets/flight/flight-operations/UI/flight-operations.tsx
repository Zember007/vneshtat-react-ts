
import {ActiveOperation} from "@/shared/types";
import RouteImg from "@/assets/icons/route.svg?react";
import PassengersImg from "@/assets/icons/team.svg?react";
import FilterImg from "@/assets/icons/filter.svg?react";
import TicketImg from "@/assets/icons/ticket.svg?react";
import AddImg from "@/assets/icons/add.svg?react";

import {FlightRoute} from "./flight-route";
import {FlightPassenger} from "./flight-passenger";
import {FlightFilter} from "./flight-filter";
import {FlightDecor} from "./flight-decor";
import {FlightAdd} from "./flight-add";

const FlightOperations = ({activeOperation, setActiveOperation}:{activeOperation: ActiveOperation, setActiveOperation: Function}) => {


    return (
        
            <div className={"flex flex-col gap-5 z-0 p-[20px] h-full"}>
                <div className={"flex flex-row gap-2.5"}>
                    <button
                        onClick={() => setActiveOperation("route")}
                        className={`${activeOperation === "route" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <RouteImg className={`${activeOperation === "route" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("passengers")}
                        className={`${activeOperation === "passengers" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <PassengersImg className={`${activeOperation === "passengers" ? "white-fill" : undefined} w-5 h-5`}/>
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
                    <button
                        onClick={() => setActiveOperation("add")}
                        className={`${activeOperation === "add" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <AddImg className={`${activeOperation === "add" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                </div>
                {activeOperation === "route" && <FlightRoute/>}
                {activeOperation === "passengers" && <FlightPassenger/>}
                {activeOperation === "filter" && <FlightFilter/>}
                {activeOperation === "decor" && <FlightDecor/>}
                {activeOperation === "add" && <FlightAdd/>}
            </div>
            

    )
};

export {FlightOperations};