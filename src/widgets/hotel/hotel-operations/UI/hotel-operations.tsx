import {ActiveOperation} from "@/shared/types";
import {HotelRoute} from "@/widgets/hotel/hotel-operations/UI/hotel-route";
import {HotelPassenger} from "@/widgets/hotel/hotel-operations/UI/hotel-passenger";
import {HotelFilter} from "@/widgets/hotel/hotel-operations/UI/hotel-filter";
import {HotelDecor} from "@/widgets/hotel/hotel-operations/UI/hotel-decor";
import RouteImg from "@/assets/icons/route.svg?react";
import PassengersImg from "@/assets/icons/users.svg?react";
import FilterImg from "@/assets/icons/filter.svg?react";
import TicketImg from "@/assets/icons/ticket.svg?react";


const HotelOperations = ({activeOperation, setActiveOperation}:{activeOperation:ActiveOperation, setActiveOperation:Function}) => {
    

    return (
        <aside>
            <div className={"w-[300px] rounded-[26px] p-5 bg-primary flex flex-col gap-5"}>
                <div className={"flex flex-row gap-[10px]"}>
                    <button
                        onClick={() => setActiveOperation("route")}
                        className={`${activeOperation === "route" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <RouteImg
                            className={`${activeOperation === "route" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("passengers")}
                        className={`${activeOperation === "passengers" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <PassengersImg
                            className={`${activeOperation === "passengers" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("filter")}
                        className={`${activeOperation === "filter" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <FilterImg
                            className={`${activeOperation === "filter" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                    <button
                        onClick={() => setActiveOperation("decor")}
                        className={`${activeOperation === "decor" ? "bg-black" : "bg-section"} transition p-2 rounded-primary w-11 h-11 flex justify-center items-center`}>
                        <TicketImg
                            className={`${activeOperation === "decor" ? "white-fill" : undefined} min-h-5 min-w-5`}/>
                    </button>
                </div>
                {activeOperation === "route" && <HotelRoute/>}
                {activeOperation === "passengers" && <HotelPassenger/>}
                {activeOperation === "filter" && <HotelFilter/>}
                {activeOperation === "decor" && <HotelDecor/>}
            </div>
           
        </aside>
    )
};

export {HotelOperations};