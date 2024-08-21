import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import PassengerImg from "@/assets/icons/users.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import ChairAwayImg from "@/assets/icons/chair-away.svg?react";
import PlaneImg from "@/assets/icons/plane.svg?react";
import ArrowImg from "@/assets/icons/arrow-right.svg?react";
import BusImg from "@/assets/icons/bus.svg?react";
import KeyImg from "@/assets/icons/key.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import {useEffect, useRef, useState} from "react";
import {Tag} from "@/shared/UI/tag-filter/tag-filter.props";
import {Checkbox, InputCity, InputDate, TagFilter} from "@/shared/UI";
import { handleScrollToTop} from "@/shared/utils";
import {
    setCity,
    setCityName, setDateBack,
    setDateTo,
    setIsFreeCancelFilter
} from "../../hotel-operations/model/hotel.store";

const HotelMap = () => {
    const { dateTo, dateBack, cityName } = useSelector((state: RootState) => state.hotel);
    const [tags, setTags] = useState<Tag>({
        tags: ["RO", "BB", "HB", "FB", "AI"],
        selectedTags: []
    });
    const [stars, setStars] = useState<Tag>({
        tags: ["Без звёзд", "2 звезды", "3 звезды", "4 звезды", "5 звёзд"],
        selectedTags: []
    })
    const isFreeCancel = useSelector((state: RootState) => state.hotel.isFreeCancel);
    const isFreeCancelOption = [{
        id: 1,
        content: "Бесплатная отмена",
        isSelected: isFreeCancel
    }]
    const [dates, setDates] = useState<Date[]>([]);
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
        if (dateTo) setDates(prev => [dateTo, prev[1] && prev[1]]);
        if (dateBack) setDates(prev => [prev[0] && prev[0], dateBack]);
    }, [dateTo, dateBack]);

    const handleDateClick = (date: Date) => {
        let updatedDates = dates.filter(d => d !== undefined);

        if (updatedDates.length === 2) {
            updatedDates = [];
            setDates([]);
            dispatch(setDateTo(null))
            dispatch(setDateBack(null))
        }
        if (!dateTo || updatedDates.length === 0) {
            dispatch(setDateTo(date));
            updatedDates = [date];
        } else {
            updatedDates = [...updatedDates, date].sort((a, b) => a.getTime() - b.getTime());
            dispatch(setDateTo(updatedDates[0]))
            dispatch(setDateBack(updatedDates[1]))
        }

        setDates(updatedDates);
    };

    return (
        <div className={"w-full flex flex-col"} ref={scrollRef}>
            <div className={"bg-primary px-5 pt-5 rounded-t-[26px]"}>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-row items-center gap-2.5"}>
                        <div className={"flex flex-row items-center py-3 px-2.5 gap-2 max-h-9 rounded-primary bg-secondary"}>
                            <PassengerImg />
                            <p className={"text-xs"}>+2</p>
                        </div>
                        <div className={"flex flex-row items-center py-3 px-2.5 gap-2 max-h-9 rounded-primary bg-secondary"}>
                            <KeyImg />
                            <p className={"text-xs"}>+0</p>
                        </div>
                        <InputCity
                            placeholder={"Город"}
                            value={cityName}
                            setValue={(str) => dispatch(setCityName(str))}
                            callback={(city) => dispatch(setCity(city))}
                        />
                        <span className={"h-7 bg-[#E5E7EA] w-[1px] rounded-[1px]"}/>
                        <InputDate
                            placeholder={"Заезд"}
                            extraClass={"py-3 px-2.5 h-9 min-w-[100px] max-w-[100px] rounded-primary"}
                            extraCalendarClass={"-translate-y-20"}
                            noNeedButton={dates.length !== 2}
                            inputValue={dates}
                            viewValue={dateTo}
                            isShortDate={true}
                            withIcon={false}
                            calendarOpt={{
                                onClickDay: handleDateClick,
                                allowPartialOptions: true,
                                selectRange: true
                            }}
                            setter={(dates: Date[]) => {
                                setDates(dates);
                            }}
                        />
                        <InputDate
                            placeholder={"Выезд"}
                            extraClass={"py-3 px-2.5 h-9 min-w-[100px] max-w-[100px] rounded-primary"}
                            extraCalendarClass={"-translate-y-20"}
                            noNeedButton={dates.length !== 2}
                            inputValue={dates}
                            viewValue={dateBack}
                            isShortDate={true}
                            withIcon={false}
                            calendarOpt={{
                                onClickDay: handleDateClick,
                                allowPartialOptions: true,
                                selectRange: true
                            }}
                            setter={(dates: Date[]) => {
                                setDates(dates);
                            }}
                        />
                    </div>
                    <div className={"flex flex-row items-center gap-2.5"}>
                        <TagFilter tags={tags} setter={setTags} extraClass={"max-h-8"}/>
                        <span className={"h-7 bg-[#E5E7EA] w-[1px] rounded-[1px]"}/>
                        <TagFilter tags={stars} setter={setStars} extraClass={"max-h-8"}/>
                        <span className={"h-7 bg-[#E5E7EA] w-[1px] rounded-[1px]"}/>
                        <Checkbox
                            items={isFreeCancelOption}
                            onChange={() => dispatch(setIsFreeCancelFilter(!isFreeCancel))}
                            childClass={"bg-secondary py-[6px] px-3 max-h-8"}
                        />
                    </div>
                    <div className={"flex gap-2.5"}>
                        <div
                            className={"flex flex-col gap-1 px-4 py-2 rounded-primary bg-secondary cursor-pointer"}>
                            <h6 className={"text-xs font-medium"}>Москва</h6>
                            <p className={"text-[10px] text-[#9B9FAD]"}>17.01.2023 - 20.01.2023</p>
                        </div>
                        <div
                            className={"flex flex-col gap-1 px-4 py-2.5 rounded-primary bg-secondary cursor-pointer"}>
                            <h6 className={"text-xs font-medium"}>Norke Prime Зарядье</h6>
                            <p className={"text-[10px] text-[#9B9FAD]"}>18.02.2023 - 21.02.2023</p>
                        </div>
                        <div
                            className={"flex items-center gap-2.5 px-4 py-2.5 rounded-primary bg-secondary cursor-pointer"}>
                            <CopyImg/>
                            <h6 className={"text-xs font-medium"}>Выбрать из шаблонов</h6>
                        </div>
                    </div>
                </div>
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
                    <div ref={ticketContainerRef} className="flex flex-col gap-4 px-5 py-5 overflow-y-auto scroll max-h-[calc(100vh-330px)] relative h-full">
                        {showScrollButton && (
                            <button
                                className="rounded-secondary w-9 min-h-9 bg-black flex justify-center items-center fixed bottom-6"
                                onClick={() => {
                                    handleScrollToTop(ticketContainerRef);
                                    setShowScrollButton(false)
                                }}
                            >
                                <ArrowImg className="-rotate-90" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export {HotelMap};