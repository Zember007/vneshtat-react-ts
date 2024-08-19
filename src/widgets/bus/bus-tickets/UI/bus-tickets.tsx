import PassengerImg from "@/assets/icons/users.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import ArrowImg from "@/assets/icons/arrow-right.svg?react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {InputCity, InputDate} from "@/shared/UI";
import {handleScrollToTop} from "@/shared/utils";
import {BusTicket, BusTicketPreload} from "@/entities/bus-ticket";
import {useEffect, useRef, useState, WheelEvent} from "react";
import {
    setCityTo,
    setCityFrom,
    setCityFromName,
    setCityToName,
    setJourneyDate
} from "../../bus-operations/model/bus.store";

const BusTickets = () => {
    const {journeyDate, cityFromName, cityToName, cityFrom, cityTo } = useSelector((state: RootState) => state.bus);
    const tickets = 1;
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const ticketContainerRef = useRef<HTMLDivElement | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (
                scrollRef.current &&
                ticketContainerRef.current &&
                !ticketContainerRef.current?.contains(event.target as Node)
            ) {
                ticketContainerRef.current.scrollTop += event.deltaY
            }
        };

        const currentScrollRef = scrollRef.current;
        if (currentScrollRef) {
            currentScrollRef.addEventListener("wheel", handleScroll as unknown as EventListener);
        }

        return () => {
            if (currentScrollRef) {
                currentScrollRef.removeEventListener("wheel", handleScroll as unknown as EventListener);
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (ticketContainerRef.current) {
                setShowScrollButton(ticketContainerRef.current.scrollTop > 0);
            }
        };

        const currentTicketContainerRef = ticketContainerRef.current;
        if (currentTicketContainerRef) {
            currentTicketContainerRef.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (currentTicketContainerRef) {
                currentTicketContainerRef.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const swapCities = () => {
        const temp = cityFromName;

        dispatch(setCityFromName(cityToName));
        dispatch(setCityToName(temp));

        dispatch(setCityFrom(cityTo));
        dispatch(setCityTo(cityFrom));
    };

    return (
        <div ref={scrollRef} className={"w-full flex flex-col"}>
            <div className={"bg-primary px-5 pt-5 rounded-t-[26px]"}>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-row items-center gap-2.5"}>
                        <div
                            className={"flex flex-row items-center py-3 px-2.5 gap-2 max-h-9 rounded-primary bg-secondary"}>
                            <PassengerImg/>
                            <p className={"text-xs"}>+0</p>
                        </div>
                        <InputCity
                            placeholder={"Выезд"}
                            value={cityFromName}
                            setValue={(str) => dispatch(setCityFromName(str))}
                            callback={(city) => dispatch(setCityFrom(city))}
                        />
                        <button onClick={swapCities}>
                            <RouteImg className={"grey-fill black-fill-hover transition min-w-5 min-h-5"}/>
                        </button>
                        <InputCity
                            placeholder={"Прибытие"}
                            value={cityToName}
                            setValue={(str) => dispatch(setCityToName(str))}
                            callback={(city) => dispatch(setCityTo(city))}
                        />
                        <InputDate
                            placeholder={"Дата"}
                            extraClass={"py-3 px-2.5 h-9 min-w-[100px] max-w-[100px] rounded-primary"}
                            extraCalendarClass={"-translate-y-20"}
                            inputValue={journeyDate}
                            viewValue={journeyDate}
                            isShortDate={true}
                            withIcon={false}
                            setter={(date: Date) => {
                                dispatch(setJourneyDate(date))
                            }}
                        />
                    </div>
                    <div className={"flex gap-2.5"}>
                        <div
                            className={"flex flex-col gap-1 px-4 py-2 rounded-primary bg-secondary cursor-pointer"}>
                            <h6 className={"text-xs font-medium"}>Москва — Санкт-Петербург</h6>
                            <p className={"text-[10px] text-[#9B9FAD]"}>17.01.2023 - 20.01.2023</p>
                        </div>
                        <div
                            className={"flex flex-col gap-1 px-4 py-2 rounded-primary bg-secondary cursor-pointer"}>
                            <h6 className={"text-xs font-medium"}>Москва — Самара</h6>
                            <p className={"text-[10px] text-[#9B9FAD]"}>18.02.2023 - 21.02.2023</p>
                        </div>
                        <div
                            className={"flex items-center gap-2.5 px-4 py-2 rounded-primary bg-secondary cursor-pointer"}>
                            <CopyImg/>
                            <h6 className={"text-xs font-medium"}>Выбрать из шаблонов</h6>
                        </div>
                    </div>
                </div>
                <hr className={"h-[1px] bg-[#e5e7ea] rounded-[1px] mt-4"}/>
            </div>
            <div className={"bg-primary overflow-hidden rounded-b-[26px]"}>
                {tickets ? (
                    <div
                        ref={ticketContainerRef}
                        className="flex flex-col gap-4 px-5 py-5 overflow-y-auto scroll max-h-[calc(100vh-270px)] relative h-full">
                        {showScrollButton && (
                            <button
                                className="rounded-secondary w-9 min-h-9 bg-black flex justify-center items-center fixed bottom-10 translate-x-4"
                                onClick={() => {
                                    handleScrollToTop(ticketContainerRef);
                                    setShowScrollButton(false)
                                }}
                            >
                                <ArrowImg className="-rotate-90" />
                            </button>
                        )}
                        <BusTicketPreload />
                        <BusTicket/>
                        <BusTicket/>
                        <BusTicket/>
                        <BusTicket/>
                        <BusTicket/>
                    </div>
                ) : (
                    <div>

                    </div>
                )}
            </div>
        </div>
    )
};

export {BusTickets};