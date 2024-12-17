import HeartImg from "@/assets/icons/heart.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import MessageImg from "@/assets/icons/message.svg?react";
import ReloadImg from "@/assets/icons/reload.svg?react";
import VariationImg from "@/assets/icons/fligt/flight-variation.svg?react";
import AvialogoImg from "@/assets/icons/fligt/flight-avialogo.svg?react";
import LuggageImg from "@/assets/icons/luggage.svg?react";
import PinImg from "@/assets/icons/pin.svg?react";
import HandLuggageImg from "@/assets/icons/hand-luggage.svg?react";
import PoliticSvg from "@/assets/icons/fligt/flight-politic.svg?react";

const FlightTicket = () => {
    return (
        <div className={`flex flex-row items-center gap-5`}>
            <div className={"flex flex-col gap-2.5"}>
                <button className={"rounded-secondary p-2 flex justify-center bg-secondary"}>
                    <PinImg className={"max-h-5 max-w-5"}/>
                </button>
                <button className={"rounded-secondary p-2 flex justify-center bg-secondary"}>
                    <CopyImg className={"max-h-5 max-w-5"}/>
                </button>
                <button className={"rounded-secondary p-2 flex justify-center bg-secondary"}>
                    <HeartImg className={"max-h-5 max-w-5"}/>
                </button>
                <button className={"rounded-secondary p-2 flex justify-center bg-secondary"}>
                    <MessageImg className={"max-h-5 max-w-5"}/>
                </button>
            </div>
            <div
                className={`w-full flex flex-col bg-secondary rounded-[38px] p-5`}>
                <div className={"w-full flex gap-2.5"}>
                    <div className={"flex items-center gap-2.5 mb-5"}>
                        <button className="group">
                            <VariationImg className={"group-hover:*:fill-[#000] *:transition-all"}/>
                        </button>
                        <button>
                            <AvialogoImg/>
                        </button>
                    </div>
                    <div className={"w-full flex gap-6"}>
                        <div className={"flex flex-col"}>
                            <h1 className={"text-2xl"}>18:55</h1>
                            <h4 className={"text-sm"}>21.09 пн</h4>
                        </div>
                        <div className={"w-full flex flex-col gap-1"}>
                            <div className={"flex justify-center items-center gap-1"}>
                                <p className={"text-xs font-medium text-center"}>в пути 2 ч 50 мин</p>
                                <p className={"text-xs text-[#787B86]"}>S7 2550</p>
                            </div>
                            <hr className={"w-full rounded-[5px] h-1.5 bg-[#c0c7d1]"}/>
                            <div className={"flex items-center justify-between"}>
                                <p className={"text-xs text-[#787b86] text-center"}>LED</p>
                                <p className={"text-xs text-[#787b86] text-center"}>без пересадок</p>
                                <p className={"text-xs text-[#787b86] text-center"}>DME</p>
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <h1 className={"text-2xl text-end"}>20:35</h1>
                            <h4 className={"text-sm text-end"}>21.09 пн</h4>
                        </div>
                    </div>
                    <div className={"flex items-start gap-2.5 ml-4"}>
                        <button>
                            <HandLuggageImg className={"transition grey-fill blue-fill-hover"}/>
                        </button>
                        <button>
                            <LuggageImg className={"transition grey-fill blue-fill-hover"}/>
                        </button>
                    </div>
                </div>
                <div className={"w-full flex gap-2.5 mt-7"}>
                    <div className={"flex items-center gap-2.5 mb-5"}>
                        <button className="group">
                            <VariationImg className={"group-hover:*:fill-[#000] *:transition-all"}/>
                        </button>
                        <button>
                            <AvialogoImg/>
                        </button>
                    </div>
                    <div className={"w-full flex gap-6"}>
                        <div className={"flex flex-col"}>
                            <h1 className={"text-2xl"}>18:55</h1>
                            <h4 className={"text-sm"}>22.09 пн</h4>
                        </div>
                        <div className={"w-full flex flex-col gap-1"}>
                            <div className={"flex justify-center items-center gap-1"}>
                                <p className={"text-xs font-medium text-center"}>в пути 2 ч 50 мин</p>
                                <p className={"text-xs text-[#787B86]"}>S7 2550</p>
                            </div>
                            <hr className={"w-full rounded-[5px] h-1.5 bg-[#c0c7d1]"}/>
                            <div className={"flex items-center justify-between"}>
                                <p className={"text-xs text-[#787b86] text-center"}>DME</p>
                                <p className={"text-xs text-[#787b86] text-center"}>без пересадок</p>
                                <p className={"text-xs text-[#787b86] text-center"}>LED</p>
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <h1 className={"text-2xl text-end"}>20:35</h1>
                            <h4 className={"text-sm text-end"}>22.09 пн</h4>
                        </div>
                    </div>
                    <div className={"flex items-start gap-2.5 ml-4"}>
                        <button>
                            <HandLuggageImg className={"transition grey-fill blue-fill-hover"}/>
                        </button>
                        <button>
                            <LuggageImg className={"transition grey-fill blue-fill-hover"}/>
                        </button>
                    </div>
                </div>
                <div className={"flex items-center justify-end gap-2.5 mt-7"}>
                    <button
                        className={"p-2 w-9 h-9 flex justify-center items-center bg-[#FCBEDB] rounded-secondary"}>
                        <PoliticSvg/>
                    </button>
                    <button
                        className={"w-9 h-9 flex justify-center items-center"}>
                        <ReloadImg className={"w-5 h-5"}/>
                    </button>
                    <button
                        className={"w-52 h-9 py-4 px-9 flex justify-center items-center bg-black rounded-primary"}>
                        <p className={"text-base text-primary"}>от 8 570 ₽</p>
                    </button>
                </div>
            </div>
        </div>
    )
};

export {FlightTicket};