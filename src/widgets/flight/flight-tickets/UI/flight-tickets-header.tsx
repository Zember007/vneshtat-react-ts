import {InputCity, InputDate, Switch, TagFilter} from "@/shared/UI";
import {addFlight, setCityFrom, setCityTo, updateFlight} from "@/widgets/flight/flight-operations/model/flight.store";
import {Dispatch, SetStateAction, useState} from "react";
import {Tag} from "@/shared/UI/tag-filter/tag-filter.props";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import BurgerImg from "@/assets/icons/burger.svg?react";
import HeartImg from "@/assets/icons/heart.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import ChairExistsImg from "@/assets/icons/chair-exists.svg?react";
import ChairAwayImg from "@/assets/icons/chair-away.svg?react";
import PassengerImg from "@/assets/icons/users.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import ArrowTopImg from "@/assets/icons/arrow-top.svg?react";
import ArrowLeftImg from "@/assets/icons/arrow-left.svg?react";
import GraphImg from "@/assets/icons/graph.svg?react";
import {ShowedGraph} from "./flight-tickets";
import {usePagination} from "@/shared/hooks/use-pagination";
import {PriceData, priceData} from "../utils";

const FlightTicketsHeader = ({showedGraph, setShowedGraph, activeRate, setActiveRate}: {
    showedGraph: ShowedGraph | null,
    setShowedGraph: Dispatch<SetStateAction<ShowedGraph | null>>,
    activeRate: PriceData | null,
    setActiveRate: Dispatch<SetStateAction<PriceData | null>>
}) => {
    const {flights, cityFrom, cityTo} = useSelector((state: RootState) => state.flight);
    const [byQueue, setByQueue] = useState(true);
    const [isChair, setIsChair] = useState(true);
    const [tags, setTags] = useState<Tag>({tags: ["Только прямые", "Дешевле", "Быстрее"], selectedTags: []});
    const dispatch = useDispatch();
    const firstFlight = flights[0];
    const secondFlight = flights[1];

    const {currentItems, nextPage, prevPage} = usePagination(priceData, 6, 1);

    const swapFlightCities = () => {
        const temp = cityFrom;
        dispatch(setCityFrom(cityTo));
        dispatch(setCityTo(temp));

        dispatch(updateFlight({
            id: firstFlight.id,
            field: "departureCity",
            value: cityTo
        }));
        dispatch(updateFlight({
            id: firstFlight.id,
            field: "arrivalCity",
            value: temp
        }));
    };

    return (
        <div className={"bg-primary px-5 pt-5 rounded-t-[26px]"}>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex flex-row items-center gap-2.5"}>
                    <div
                        className={"flex flex-row items-center py-3 px-2.5 gap-2 max-h-9 rounded-primary bg-secondary"}>
                        <PassengerImg/>
                        <p className={"text-xs"}>+0</p>
                    </div>
                    <InputCity
                        placeholder={"Вылет"}
                        value={cityFrom}
                        setValue={(str) => dispatch(setCityFrom(str))}
                        callback={(city) => dispatch(updateFlight({
                            id: firstFlight.id,
                            field: "departureCity",
                            value: city
                        }))}
                    />
                    <button onClick={swapFlightCities}>
                        <RouteImg className={"grey-fill black-fill-hover transition min-w-5 min-h-5"}/>
                    </button>
                    <InputCity
                        placeholder={"Прилет"}
                        value={cityTo}
                        setValue={(str) => dispatch(setCityTo(str))}
                        callback={(city) => dispatch(updateFlight({
                            id: firstFlight.id,
                            field: "arrivalCity",
                            value: city
                        }))}
                    />
                    <InputDate
                        placeholder={"Туда"}
                        extraClass={"py-3 px-2.5 h-9 min-w-[100px] max-w-[100px] rounded-primary"}
                        inputValue={firstFlight.flightDate}
                        isShortDate={true}
                        withIcon={false}
                        calendarOpt={{maxDate: secondFlight && secondFlight.flightDate}}
                        setter={(date: Date) => {
                            dispatch(updateFlight({id: firstFlight.id, field: "flightDate", value: date}));
                        }}
                    />
                    <div onClick={() => {
                        if (!secondFlight) {
                            dispatch(addFlight());
                        }
                    }}>
                        <InputDate
                            placeholder={"Обратно"}
                            extraClass={"py-3 px-2.5 h-9 min-w-[100px] max-w-[100px] rounded-primary"}
                            isShortDate={true}
                            withIcon={false}
                            inputValue={secondFlight ? secondFlight.flightDate : null}
                            calendarOpt={{minDate: firstFlight.flightDate}}
                            setter={(date: Date) => {
                                dispatch(updateFlight({id: secondFlight.id, field: "flightDate", value: date}));
                            }}
                        />
                    </div>
                </div>
                <div className={"flex flex-row items-center gap-2.5"}>
                    <Switch
                        firstChild={<BurgerImg className={"h-5 w-5"}/>}
                        secondChild={<HeartImg className={"h-5 w-5"}/>}
                        isSelected={byQueue}
                        setter={setByQueue}
                        extraClass={"max-h-9"}
                    />
                    <div className={"flex bg-[#F5F5F5] rounded-primary"}>
                        <Switch
                            firstChild={<ChairExistsImg className={`${!isChair && "grey-fill"}`}/>}
                            secondChild={<ChairAwayImg className={`${isChair ? "grey-fill" : "black-fill"}`}/>}
                            isSelected={isChair}
                            setter={setIsChair}
                            extraClass={"max-h-9"}
                        />
                        <div className={"px-2.5 flex justify-center items-center"}>
                            <p className={"text-xs font-medium text-[#9B9FAD]"}>Найдено: 215</p>
                        </div>
                    </div>
                    <TagFilter tags={tags} setter={setTags} extraClass={"max-h-9"}/>
                    <div
                        className={"px-2.5 py-2 max-h-9 flex items-center justify-between gap-4 bg-secondary rounded-primary cursor-pointer ml-auto"}
                        onClick={() => setShowedGraph(prev => prev ? null : "graph")}>
                        <span className={"flex items-center gap-1"}>
                            <GraphImg className={"min-w-5 min-h-5"}/>
                            <p className={"text-xs"}>График цен</p>
                        </span>
                        <ArrowTopImg className={`min-w-5 min-h-5 ${!showedGraph && "rotate-180"}`}/>
                    </div>
                </div>
                {showedGraph ? (
                    <div className={"flex gap-2.5"}>
                        <button
                            onClick={() => setShowedGraph("graph")}
                            className={`transition p-3 rounded-[18px] ${showedGraph === "graph" ? "bg-black" : "bg-secondary"} cursor-pointer`}>
                            <GraphImg
                                className={`min-h-[26px] min-w-[26px] ${showedGraph === "graph" ? "white-fill" : "black-fill"}`}/>
                        </button>
                        {currentItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveRate(prev => prev?.id === item.id ? null : item)}
                                className={`transition min-w-28 rounded-[18px] ${activeRate?.id === item.id ? "bg-black" : "bg-secondary"} cursor-pointer flex flex-col justify-center items-center gap-1 min-h-[50px]`}>
                                <h6 className={`text-sm font-medium leading-none ${activeRate?.id === item.id ? "text-primary" : "text-black"}`}>{item.value} ₽</h6>
                                <p className={`text-[10px] leading-none ${activeRate?.id === item.id ? "text-primary" : "text-[#787B86]"}`}>{item.startDay}-{item.finishDay} {item.month.slice(0, 3).toLowerCase()}</p>
                            </button>
                        ))}
                        <div className={"flex items-center justify-center gap-2 px-1 ml-auto"}>
                            <button onClick={prevPage}>
                                <ArrowLeftImg className={"min-h-4 min-w-4 black-stroke"}/>
                            </button>
                            <button onClick={nextPage}>
                                <ArrowLeftImg className={"min-h-4 min-w-4 black-stroke rotate-180"}/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={"flex gap-2.5"}>
                        <div
                            className={"flex flex-col h-[50px] gap-1 px-4 py-2 rounded-primary bg-secondary cursor-pointer"}>
                            <h6 className={"text-xs font-medium"}>Москва — Санкт-Петербург</h6>
                            <p className={"text-[10px] text-[#9B9FAD]"}>17.01.2023 - 20.01.2023</p>
                        </div>
                        <div
                            className={"flex flex-col h-[50px] gap-1 px-4 py-2.5 rounded-primary bg-secondary cursor-pointer"}>
                            <h6 className={"text-xs font-medium"}>Москва — Самара</h6>
                            <p className={"text-[10px] text-[#9B9FAD]"}>18.02.2023 - 21.02.2023</p>
                        </div>
                        <div
                            className={"flex items-center h-[50px] gap-2.5 px-4 py-2.5 rounded-primary bg-secondary cursor-pointer"}>
                            <CopyImg/>
                            <h6 className={"text-xs font-medium"}>Выбрать из шаблонов</h6>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export {FlightTicketsHeader};
