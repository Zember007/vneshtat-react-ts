import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import PassengerImg from "@/assets/icons/users.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import ChairAwayImg from "@/assets/icons/chair-away.svg?react";
import PlaneImg from "@/assets/icons/plane.svg?react";
import BusImg from "@/assets/icons/bus.svg?react";
import KeyImg from "@/assets/icons/key.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import { useEffect, useRef, useState } from "react";
import { Tag } from "@/shared/UI/tag-filter/tag-filter.props";
import { Checkbox, InputCity, InputDate, TagFilter } from "@/shared/UI";
import {
    setCity,
    setCityName, setDateBack,
    setDateTo,
    setIsFreeCancelFilter
} from "../../hotel-operations/model/hotel.store";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const HotelMap = ({ isSearched }: {
    isSearched: boolean,
}) => {
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
    const dispatch = useDispatch();

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current as HTMLElement,
                center: [37.6206, 55.7578],
                zoom: 12,
            });
        }
    }, [mapContainerRef.current, mapRef.current, isSearched]);

    useEffect(() => {
        dispatch(setDateTo(dates[0]))
        dispatch(setDateBack(dates[1]))
    }, [dates]);

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
            <div className={`bg-primary px-5 ${!isSearched && dateBack && dateTo ? "pt-5 rounded-t-[26px]" : "py-5 rounded-[26px]"}`}>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-row items-center gap-2.5"}>
                        <div
                            className={"flex flex-row items-center py-3 px-2.5 gap-2 h-11 rounded-[16px] bg-secondary"}>
                            <PassengerImg />
                            <p className={"text-xs"}>+2</p>
                        </div>
                        <div
                            className={"flex flex-row items-center py-3 px-2.5 gap-2 h-11 rounded-[16px] bg-secondary"}>
                            <KeyImg />
                            <p className={"text-xs"}>+0</p>
                        </div>
                        <InputCity
                            placeholder={"Город"}
                            value={cityName}
                            setValue={(str) => dispatch(setCityName(str))}
                            callback={(city) => dispatch(setCity(city))}
                        />
                        <span className={"h-8 bg-[#E5E7EA] w-[1px] rounded-[1px]"} />
                        <InputDate
                            placeholder={"Заезд"}
                            extraClass={"py-3 px-2.5 h-11 min-w-[100px] max-w-[100px] !rounded-[16px]"}
                            extraCalendarClass="translate-x-[110px]"
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
                            extraClass={"py-3 px-2.5 h-11 min-w-[100px] max-w-[100px] !rounded-[16px]"}

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
                    {isSearched ? (
                        <div className="h-[calc(100vh-230px)]">
                            <div
                                style={{ height: '100%' }}
                                ref={mapContainerRef}
                                className={`map-container`}
                            />
                        </div>
                    ) : (
                        <>
                            <div className={"flex flex-row items-center gap-2.5"}>
                                <TagFilter tags={tags} setter={setTags} extraClass={"max-h-8"} />
                                <span className={"h-7 bg-[#E5E7EA] w-[1px] rounded-[1px]"} />
                                <TagFilter tags={stars} setter={setStars} extraClass={"max-h-8"} />
                                <span className={"h-7 bg-[#E5E7EA] w-[1px] rounded-[1px]"} />
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
                                    <CopyImg />
                                    <h6 className={"text-xs font-medium"}>Выбрать из шаблонов</h6>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={"bg-primary overflow-hidden rounded-b-[26px]"}>
                {!isSearched && dateBack && dateTo ? (
                    <div className="flex flex-col px-5 py-5 h-[calc(100vh-310px)]">
                        <div className="flex flex-col p-7 h-full rounded-[23px] bg-secondary">
                            <h1 className={"text-2xl"}>Билетов на эти даты уже нет в продаже</h1>
                            <h3 className={"text-lg mt-4 font-normal"}>Что можно сделать?</h3>
                            <div className={"flex flex-col gap-2.5 mt-6"}>
                                <div className={"flex items-center gap-2.5"}>
                                    <div className={"p-2 bg-primary rounded-secondary h-9"}>
                                        <ChairAwayImg className={"black-fill"} />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Посмотреть распроданные билеты и создать
                                        Автобронирование</p>
                                </div>
                                <div className={"flex items-center gap-2.5"}>
                                    <div
                                        className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <RouteImg />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Изменить даты</p>
                                </div>
                                <div className={"flex items-center gap-2.5"}>
                                    <div
                                        className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <PlaneImg />
                                    </div>
                                    <div
                                        className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <BusImg />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Попробовать другой вид транспорта</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export { HotelMap };