import {useState} from "react";
import {ActiveOperation} from "@/shared/types";
import RouteImg from "@/assets/icons/route.svg?react";
import PassengersImg from "@/assets/icons/users.svg?react";
import TicketImg from "@/assets/icons/ticket.svg?react";
import {TransferRoute} from "@/widgets/transfer/transfer-operations/UI/transfer-route";
import {TransferPassenger} from "@/widgets/transfer/transfer-operations/UI/transfer-passenger";
import {TransferDecor} from "@/widgets/transfer/transfer-operations/UI/transfer-decor";

const TransferOperations = () => {
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
                {activeOperation === "route" && <TransferRoute/>}
                {activeOperation === "passengers" && <TransferPassenger/>}
                {activeOperation === "decor" && <TransferDecor/>}
            </div>
            {activeOperation === "passengers" && (
                <button className={"w-full flex justify-center items-center py-4 rounded-[21px] bg-black mt-4 h-[50px]"}>
                    <p className={"text-lg text-[#fff] leading-none"}>Поиск!</p>
                </button>
            )}
            {activeOperation === "route" && (
                <button className={"w-full flex justify-center items-center py-4 rounded-[21px] bg-black mt-4 h-[50px]"}>
                    <p className={"text-base text-[#fff] leading-none"}>Выбрать пассажиров</p>
                </button>
            )}
            {activeOperation === "decor" && (
                <div>
                    <button className={"w-full flex justify-center items-center py-2 rounded-primary bg-[#DCE0E5] mt-4 h-[35px]"}>
                        <p className={"text-base font-medium"}>1100,00 ₽</p>
                    </button>
                    <div className={"flex items-center justify-center"}>
                        <hr className={"bg-[#C0C7D1] rounded-[1px] h-[1px] w-[50px] my-2.5"}/>
                    </div>
                    <button className={"w-full flex justify-center items-center py-4 rounded-[21px] bg-black h-[50px]"}>
                        <h1 className={"text-base text-[#fff]"}>Забронировать</h1>
                    </button>
                </div>
            )}
        </aside>
    )
};

export {TransferOperations};