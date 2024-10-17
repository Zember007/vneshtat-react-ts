import HeartImg from "@/assets/icons/heart.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import TrainImg from "@/assets/icons/train.svg?react";
import MessageImg from "@/assets/icons/message.svg?react";
import StarImg from "@/assets/icons/stars.svg?react";
import PinImg from "@/assets/icons/pin.svg?react";
import PawImg from "@/assets/icons/paw.svg?react";
import BackCannotImg from "@/assets/icons/back-cannot.svg?react";
import InvalidImg from "@/assets/icons/invalid.svg?react";
import SuitcaseImg from "@/assets/icons/suitcase.svg?react";
import {useEffect, useState} from "react";
import {ticketOptionsMock} from "@/widgets/train/train-operations/utils";
import {JourneyTicketBody} from "@/entities/journey-ticket/UI/journey-ticket-body";
import {JourneyTicketTimetable} from "@/entities/journey-ticket/UI/journey-ticket-timetable";
import {TicketOptions} from "@/shared/UI";
import {TicketOption} from "@/shared/types";

const JourneyTicket = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [delayedText, setDelayedText] = useState("Показать маршрут");
    const [ticketOptions, setTicketOptions] = useState(ticketOptionsMock)
    const [activeTicketOption, setActiveTicketOption] = useState<TicketOption | undefined>(ticketOptions.find(item => item.isSelected))

    useEffect(() => {
        const option = ticketOptions.find(item => item.isSelected);
        setActiveTicketOption(option);
        if (option) {
            setIsOpen(false);
        }
    }, [ticketOptions]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDelayedText(isOpen ? "Скрыть маршрут" : "Показать маршрут");
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [isOpen]);

    return (
        <div className={`flex flex-row gap-5`}>
            <div className={"flex flex-col gap-2.5 mt-12"}>
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
                className={`w-full flex flex-col bg-secondary rounded-[38px] px-6 ${isOpen || activeTicketOption ? "py-6" : "pt-6"} pb-6`}>
                <div className={`flex gap-7`}>
                    <div className={"w-full flex flex-col gap-2.5"}>
                        <div className={"flex items-center gap-2.5"}>
                            <button className={"p-1 bg-[#bdbfc7] rounded-[100%]"}>
                                <TrainImg className={"white-fill h-3 w-3"}/>
                            </button>
                            <h1 className={"text-2xl"}>016А</h1>
                        </div>
                        <div className={"flex gap-6"}>
                            <div className={"flex flex-col"}>
                                <h1 className={"text-2xl"}>18:55</h1>
                                <h4 className={"text-sm"}>21.09 пн</h4>
                            </div>
                            <div className={"w-full flex flex-col gap-1"}>
                                <p className={"text-xs font-medium text-center"}>в пути 2 ч 50 мин </p>
                                <hr className={"w-full rounded-[5px] h-1.5 bg-[#c0c7d1]"}/>
                                <p className={"text-xs text-[#787b86] text-center"}>Стоянка: 20 мин</p>
                            </div>
                            <div className={"flex flex-col"}>
                                <h1 className={"text-2xl text-end"}>20:35</h1>
                                <h4 className={"text-sm text-end"}>21.09 пн</h4>
                            </div>
                        </div>
                        <div className={"flex justify-between items-center"}>
                        <span className={"flex flex-col gap-1.5"}>
                            <p className={"text-xs text-[#787b86]"}>Ленинградский вокзал</p>
                            <p className={"text-xs text-[#787b86]"}>Москва Октябрьская</p>
                        </span>
                            <span className={"flex flex-col gap-1.5"}>
                            <p className={"text-xs text-[#787b86] text-end"}>Санкт-Петербург Главный</p>
                            <p className={"text-xs text-[#787b86] text-end"}>Московский вокзал</p>
                        </span>
                        </div>
                        <div className={"flex items-center justify-between"}>
                            <button onClick={() => {
                                setTicketOptions(ticketOptionsMock);
                                setIsOpen(prev => !prev);
                            }} className="py-2.5 px-6 bg-[#dce0e5] rounded-primary">
                                <p className="text-base">{delayedText}</p>
                            </button>
                            <div className={"flex gap-2.5"}>
                                <button
                                    className={"p-2 w-9 h-9 flex justify-center items-center bg-primary rounded-secondary"}>
                                    <StarImg/>
                                </button>
                                <button
                                    className={"p-2 w-9 h-9 flex justify-center items-center bg-primary rounded-secondary"}>
                                    <PawImg/>
                                </button>
                                <button
                                    className={"p-2 w-9 h-9 flex justify-center items-center bg-primary rounded-secondary"}>
                                    <BackCannotImg/>
                                </button>
                                <button
                                    className={"p-2 w-9 h-9 flex justify-center items-center bg-primary rounded-secondary"}>
                                    <InvalidImg/>
                                </button>
                                <button
                                    className={"p-2 w-9 h-9 flex justify-center items-center bg-primary rounded-secondary"}>
                                    <SuitcaseImg/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <TicketOptions options={ticketOptions} setter={setTicketOptions}/>
                </div>
                <div
                    className={`transition-max-height flex flex-col gap-5 duration-300 ease-in-out overflow-hidden ${activeTicketOption ? "max-h-screen" : "max-h-0"}`}
                >
                    <JourneyTicketBody/>
                </div>
                <div
                    className={`transition-max-height flex flex-col gap-5 duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                    <JourneyTicketTimetable/>
                </div>
            </div>
        </div>
    )
};

export {JourneyTicket};