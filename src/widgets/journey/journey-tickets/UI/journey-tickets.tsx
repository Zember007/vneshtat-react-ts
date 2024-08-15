import RouteImg from "@/assets/icons/route.svg?react";
import ChairAwayImg from "@/assets/icons/chair-away.svg?react";
import PlaneImg from "@/assets/icons/plane.svg?react";
import ArrowImg from "@/assets/icons/arrow-right.svg?react";
import BusImg from "@/assets/icons/bus.svg?react";
import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleScrollToTop} from "@/shared/utils";
import {AppDispatch, RootState} from "@/app/config/store";
import {JourneyTicket, JourneyTicketPreload} from "@/entities/journey-ticket";
import {JourneyTicketsHeader} from "@/widgets/journey/journey-tickets/UI/journey-tickets-header";
import {fetchJourneyTickets} from "@/widgets/journey/journey-operations/model/journey.store";

const JourneyTickets = () => {
    const {dateTo, dateBack} = useSelector((state: RootState) => state.journey);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const ticketContainerRef = useRef<HTMLDivElement | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (
                scrollRef.current &&
                ticketContainerRef.current &&
                !ticketContainerRef.current?.contains(event.target as Node)
            ) {
                ticketContainerRef.current.scrollTop += event.deltaY;
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
    }, [])

    useEffect(() => {
       dispatch(fetchJourneyTickets())
    }, []);

    return (
        <div className={"w-full flex flex-col h-full"} ref={scrollRef}>
            <div className={"bg-primary px-5 pt-5 rounded-t-[26px]"}>
                <JourneyTicketsHeader />
                <hr className={"h-[1px] bg-[#e5e7ea] rounded-[1px] mt-4"} />
            </div>
            <div className={"bg-primary overflow-hidden rounded-b-[26px]"}>
                {dateBack && dateTo ? (
                    <div className="flex flex-col px-5 py-5 h-[calc(100vh-330px)]">
                        <div className="flex flex-col p-7 h-full rounded-[23px] bg-secondary">
                            <h1 className={"text-2xl"}>Билетов на эти даты уже нет в продаже</h1>
                            <h3 className={"text-lg mt-4 font-normal"}>Что можно сделать?</h3>
                            <div className={"flex flex-col gap-2.5 mt-6"}>
                                <div className={"flex items-center gap-2.5"}>
                                    <div className={"p-2 bg-primary rounded-secondary h-9"}>
                                        <ChairAwayImg className={"black-fill"} />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Посмотреть распроданные билеты и создать Автобронирование</p>
                                </div>
                                <div className={"flex items-center gap-2.5"}>
                                    <div className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <RouteImg />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Изменить даты</p>
                                </div>
                                <div className={"flex items-center gap-2.5"}>
                                    <div className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <PlaneImg />
                                    </div>
                                    <div className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <BusImg />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Попробовать другой вид транспорта</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div ref={ticketContainerRef} className="flex flex-col gap-4 px-5 py-5 overflow-y-auto scroll max-h-[calc(100vh-250px)] relative h-full">
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
                        <JourneyTicketPreload />
                        <JourneyTicket />
                        <JourneyTicket />
                        <JourneyTicket />
                        <JourneyTicket />
                        <JourneyTicket />
                    </div>
                )}
            </div>
        </div>
    );
};

export { JourneyTickets };
