import {InputCity, InputDate, Switch, TagFilter} from "@/shared/UI";
import BurgerImg from "@/assets/icons/burger.svg?react";
import HeartImg from "@/assets/icons/heart.svg?react";
import ChairExistsImg from "@/assets/icons/chair-exists.svg?react";
import PassengerImg from "@/assets/icons/users.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import ChairAwayImg from "@/assets/icons/chair-away.svg?react";
import {
    setCityFrom,
    setCityFromName,
    setCityTo,
    setCityToName, setDateBack, setDateTo
} from "../../journey-operations/model/journey.store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {useEffect, useState} from "react";
import {Tag} from "@/shared/UI/tag-filter/tag-filter.props";

const JourneyTicketsHeader = () => {
    const {
        dateTo,
        dateBack,
        cityFromName,
        cityToName,
        cityTo,
        cityFrom
    } = useSelector((state: RootState) => state.journey);
    const [go, setGo] = useState(true);
    const [byQueue, setByQueue] = useState(true);
    const [isChair, setIsChair] = useState(true);
    const [dates, setDates] = useState<Date[]>([]);
    const [tags, setTags] = useState<Tag>({
        tags: ["Дешевле", "Быстрее"],
        selectedTags: []
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (dateTo) setDates(prev => [dateTo, prev[1] && prev[1]]);
        if (dateBack) setDates(prev => [prev[0] && prev[0], dateBack]);
    }, [dateTo, dateBack]);

    const swapCities = () => {
        const temp = cityFromName;

        dispatch(setCityFromName(cityToName));
        dispatch(setCityToName(temp));

        dispatch(setCityFrom(cityTo));
        dispatch(setCityTo(cityFrom));
    };

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
        <div className={"flex flex-col gap-4"}>
            <div className={"flex flex-row items-center gap-2.5"}>
                <div className={"flex flex-row items-center py-3 px-2.5 gap-2 h-11 rounded-[16px] bg-secondary"}>
                    <PassengerImg/>
                    <p className={"text-xs"}>+2</p>
                </div>
                <InputCity
                    placeholder={"Город отправления"}
                    value={cityFromName}
                    setValue={(str) => dispatch(setCityFromName(str))}
                    callback={(city) => dispatch(setCityFrom(city))}
                />
                <button onClick={swapCities}>
                    <RouteImg className={"grey-fill black-fill-hover transition min-w-5 min-h-5"}/>
                </button>
                <InputCity
                    placeholder={"Город прибытия"}
                    value={cityToName}
                    setValue={(str) => dispatch(setCityToName(str))}
                    callback={(city) => dispatch(setCityTo(city))}
                />
                <InputDate
                    placeholder={"Туда"}
                    extraClass={"py-3 px-2.5 h-11 min-w-[100px] max-w-[100px] !rounded-[16px]"}
                    extraCalendarClass={"-translate-y-[72px]"}
                    inputValue={dates}
                    viewValue={dateTo}
                    noNeedButton={dates.length !== 2}
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
                    placeholder={"Обратно"}
                    extraClass={"py-3 px-2.5 h-11 min-w-[100px] max-w-[100px] !rounded-[16px]"}
                    extraCalendarClass={"-translate-y-[72px]"}
                    inputValue={dates}
                    viewValue={dateBack}
                    noNeedButton={dates.length !== 2}
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
                <Switch
                    firstChild={<p className={`text-sm font-medium ${go && "text-primary"}`}>Туда</p>}
                    secondChild={<p className={`text-sm font-medium ${!go && "text-primary"}`}>Обратно</p>}
                    isSelected={go}
                    setter={setGo}
                    selectedBg={"#121212"}
                    extraClass={"max-h-9"}
                />
                <Switch
                    firstChild={<BurgerImg className={"h-5 w-5"}/>}
                    secondChild={<HeartImg className={"h-5 w-5"}/>}
                    isSelected={byQueue}
                    setter={setByQueue}
                    extraChildClass={"px-1 py-1"}
                    extraClass={"max-h-9 w-26"}
                />
                <div className={"flex bg-[#F5F5F5] rounded-primary"}>
                    <Switch
                        firstChild={<ChairExistsImg className={`${!isChair && "grey-fill"}`}/>}
                        secondChild={<ChairAwayImg className={`${isChair ? "grey-fill" : "black-fill"}`}/>}
                        isSelected={isChair}
                        setter={setIsChair}
                        extraChildClass={"py-1 px-1.5"}
                        extraClass={"max-h-9"}
                    />
                    <div className={"px-2.5 flex justify-center items-center"}>
                        <p className={"text-xs font-medium text-[#9B9FAD]"}>Найдено: 215</p>
                    </div>
                </div>
                <TagFilter tags={tags} setter={setTags} extraClass={"max-h-9"}/>
            </div>
        </div>
    )
};

export {JourneyTicketsHeader};