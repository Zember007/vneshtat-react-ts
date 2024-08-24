import {useState} from "react";
import {ActiveOperation} from "@/shared/types";
import RouteImg from "@/assets/icons/route.svg?react";
import PassengersImg from "@/assets/icons/users.svg?react";
import TicketImg from "@/assets/icons/ticket.svg?react";
import {BusRoute} from "@/widgets/bus/bus-operations/UI/bus-route";
import {BusPassenger} from "@/widgets/bus/bus-operations/UI/bus-passenger";
import {BusDecor} from "@/widgets/bus/bus-operations/UI/bus-decor";

const BusOperations = () => {
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
                        onClick={() => setActiveOperation("decor")}
                        className={`${activeOperation === "decor" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <TicketImg className={`${activeOperation === "decor" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                </div>
                {activeOperation === "route" && <BusRoute/>}
                {activeOperation === "passengers" && <BusPassenger/>}
                {activeOperation === "decor" && <BusDecor/>}
            </div>
            {activeOperation === "passengers" && (
                <button className={"w-full flex justify-center items-center py-4 rounded-[18px] bg-black mt-4"}>
                    <h1 className={"text-lg text-[#fff]"}>Поиск!</h1>
                </button>
            )}
            {activeOperation === "route" && (
                <button className={"w-full flex justify-center items-center py-4 rounded-[18px] bg-black mt-4"}>
                    <h1 className={"text-lg text-[#fff]"}>Выбрать пассажиров</h1>
                </button>
            )}
        </aside>
    )
};

export {BusOperations};