import RouteImg from "@/assets/icons/route.svg?react";
import TrainImg from "@/assets/icons/train.svg?react";
import ArrowImg from "@/assets/icons/arrow-right.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { useEffect, useRef, useState } from "react";
import { handleScrollToTop } from "@/shared/utils";
import { FlightTicket } from "@/entities/flight-ticket";
import { setCityFrom, setCityTo } from "@/widgets/flight/flight-operations/model/flight.store";
import { FlightTicketsHeader } from "@/widgets/flight/flight-tickets/UI/flight-tickets-header";
import { FlightChart } from "@/widgets/flight/flight-tickets/UI/flight-chart";
import { PriceData } from "../utils";
import SimpleBar from "simplebar-react";
import { jorneys } from "../../flight-operations/utils";

export type ShowedGraph = "graph" | "dashboard" | null;

const FlightTickets = ({ template }: { template?: boolean }) => {
    const { flights, tikets, filters } = useSelector((state: RootState) => state.flight);
    const firstFlight = flights[0];
    const tickets = 1;
    const dispatch = useDispatch();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const ticketContainerRef = useRef<HTMLDivElement | null>(null);
    const [activeRate, setActiveRate] = useState<PriceData | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [showedGraph, setShowedGraph] = useState<ShowedGraph>(null);
    const [tiketsView, setTiketsView] = useState<jorneys[]>([])

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (scrollRef.current && ticketContainerRef.current && !ticketContainerRef.current.contains(event.target as Node)) {
                ticketContainerRef.current.scrollTop += event.deltaY;
            }
        };

        const currentScrollRef = scrollRef.current;
        if (currentScrollRef) {
            currentScrollRef.addEventListener("wheel", handleScroll as EventListener);
        }

        return () => {
            if (currentScrollRef) {
                currentScrollRef.removeEventListener("wheel", handleScroll as EventListener);
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

    useEffect(() => {
        if (firstFlight?.departureCity?.nameRu) {
            dispatch(setCityFrom(firstFlight.departureCity.nameRu));
        }
    }, [firstFlight?.departureCity]);

    useEffect(() => {
        if (firstFlight?.arrivalCity?.nameRu) {
            dispatch(setCityTo(firstFlight.arrivalCity.nameRu));
        }
    }, [firstFlight?.arrivalCity]);

    useEffect(() => {

        let result = tikets.filter(item => (item.like === filters.byQueue || !filters.byQueue)).sort((a, b) => ((a === b) ? 0 : a.pin? -1 : 1))

        if(filters.Cheaper) {
            result = result.sort((a,b) => (a.price >= b.price ? 1 : -1))
        }

        if(filters.NoTransfer) {
            result = result.filter(item => {
                const search = item.items.filter(item => !item.transfer)
                if(search.length < item.items.length) {
                    return false
                } else {
                    return true
                }
            })
        }

        setTiketsView(result)

    }, [filters, tikets])

    return (
        <div ref={scrollRef} className={"w-full flex flex-col bg-primary rounded-[26px]"}>
            <FlightTicketsHeader template={template} setShowedGraph={setShowedGraph} showedGraph={showedGraph} activeRate={activeRate} setActiveRate={setActiveRate} />
            <hr className={"h-[1px] bg-[#e5e7ea] rounded-[1px] mt-4 mx-5"} />
            <div className={"bg-primary overflow-hidden rounded-b-[26px]"}>
                {showedGraph ? (
                    <FlightChart showedGraph={showedGraph} setShowedGraph={setShowedGraph} activeRate={activeRate} />
                ) : (
                    <>
                        {tickets ? (
                            <SimpleBar scrollableNodeProps={{ ref: ticketContainerRef }} className="h-[calc(100vh-320px)]">
                                <div
                                    className="flex flex-col gap-4 p-5   relative">
                                    {showScrollButton && (
                                        <button
                                            className="rounded-secondary w-9 min-h-9 bg-black flex justify-center items-center fixed bottom-10"
                                            onClick={() => {
                                                handleScrollToTop(ticketContainerRef);
                                                setShowScrollButton(false);
                                            }}
                                        >
                                            <ArrowImg className="-rotate-90" />
                                        </button>
                                    )}
                                   {/*  <FlightTicketPreload /> */}
                                    {tiketsView.map(item => (
                                        <FlightTicket jorneys={item} key={item.id} />
                                    ))}
                                </div>
                            </SimpleBar>
                        ) : (
                            <div className="flex flex-col px-5 py-5 h-[calc(100vh-400px)]">
                                <div className="flex flex-col p-7 h-full rounded-[23px] bg-secondary">
                                    <h1 className={"text-2xl"}>Билетов по этому направлению не найдено</h1>
                                    <h3 className={"text-lg mt-4 font-normal"}>Что можно сделать?</h3>
                                    <div className={"flex flex-col gap-1 mt-2.5"}>
                                        <p className={"text-base"}>В этот аэропорт не летают самолёты. Слишком поздние даты.</p>
                                        <p className={"text-base"}>Проверьте год вылета или прилёта.</p>
                                    </div>
                                    <div className={"flex flex-col gap-2.5 mt-6"}>
                                        <div className={"flex items-center gap-2.5"}>
                                            <div className={"p-2 bg-primary rounded-secondary h-9"}>
                                                <RouteImg />
                                            </div>
                                            <p className={"text-base max-w-[280px]"}>Изменить даты</p>
                                        </div>
                                        <div className={"flex items-center gap-2.5"}>
                                            <div
                                                className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                                <TrainImg />
                                            </div>
                                            <p className={"text-base max-w-[280px]"}>Попробовать другой вид транспорта</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export { FlightTickets };