import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import TrashImg from "@/assets/icons/trash.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";
import {Checkbox, CountdownCircle, Dropdown, InputCity, InputDate} from "@/shared/UI";
import {addFlight, removeFlight, setCityFrom, setCityTo, setClass, updateFlight} from "../model/flight.store";
import {useState, useEffect} from "react";
import {City} from "@/shared/types";

interface FlightRouteItemProps {
    flight: any;
    index: number;
    onRemove: (id: number) => void;
}

const FlightRouteItem = ({ flight, index, onRemove }: FlightRouteItemProps) => {
    const dispatch = useDispatch();
    const flights = useSelector((state: RootState) => state.flight.flights);
    const [departureCity, setDepartureCity] = useState(flight.departureCity?.nameRu! || "");
    const [arrivalCity, setArrivalCity] = useState(flight.arrivalCity?.nameRu! || "");
    const { cityFrom, cityTo } = useSelector((state: RootState) => state.flight);
    const isFirstFlight = flight.id === 1;
    const [flightDate, setFlightDate] = useState(flight.flightDate || null);
    const [countdown, setCountdown] = useState<number | null>(flight.deleteCountdown || null);

    useEffect(() => {
        setDepartureCity(flight.departureCity?.nameRu || "");
        setArrivalCity(flight.arrivalCity?.nameRu || "");
        setFlightDate(flight.flightDate || null);
        setCountdown(flight.deleteCountdown || null);
    }, [flight]);

    useEffect(() => {
        let countdownInterval: any;

        if (countdown !== null && countdown > 0) {
            countdownInterval = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown && prevCountdown > 1) {
                        dispatch(updateFlight({ id: flight.id, field: 'deleteCountdown', value: prevCountdown - 1 }));
                        return prevCountdown - 1;
                    } else {
                        dispatch(updateFlight({ id: flight.id, field: 'deleteCountdown', value: null }));
                        onRemove(flight.id);
                        clearInterval(countdownInterval);
                        return null;
                    }
                });
            }, 1000);
        } else {
            clearInterval(countdownInterval);
        }

        return () => clearInterval(countdownInterval);
    }, [countdown, dispatch, flight.id, onRemove]);

    const handleInputChange = (field: string, value: string | Date | null | City) => {
        dispatch(updateFlight({ id: flight.id, field, value }));
    };

    const handleRemoveClick = () => {
        if (countdown === null) {
            setCountdown(5);
        }
    };

    const handleCancelClick = () => {
        dispatch(updateFlight({ id: flight.id, field: 'deleteCountdown', value: null }));
        setCountdown(null);
    };

    const previousFlightDate = index > 0 ? flights[index - 1].flightDate : null;
    const nextFlightDate = index < flights.length - 1 ? flights[index + 1].flightDate : null;

    const calendarOptions = {
        minDate: previousFlightDate ? new Date(previousFlightDate) : null,
        maxDate: nextFlightDate ? new Date(nextFlightDate) : null,
    };

    return (
        <div className={"flex flex-col gap-2.5 mt-2.5"}>
            {flight.id !== 1 && <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-[15px]"} />}
            <div className={"flex items-center justify-between"}>
                <h4 className={"text-base font-medium"}>Перелет #{index + 1}</h4>
                {flight.id !== 1 && (
                    <button onClick={() => countdown !== null ? handleCancelClick() : handleRemoveClick()} className={"h-5"}>
                        {countdown !== null ? (
                            <div className={"bg-secondary rounded-primary flex items-center gap-[6px] p-[2px] pr-[6px]"}>
                                <CountdownCircle countdown={countdown} onCancel={handleCancelClick} extraClass={"bg-primary rounded-full"} />
                                <p className={"text-[#FF64A3] text-[10px] font-medium"}>Отмена</p>
                            </div>
                        ) : (
                            <TrashImg className={"grey-fill min-w-5 min-h-5"} />
                        )}
                    </button>
                )}
            </div>
            <div className={"flex flex-col gap-2.5 mt-[5px]"}>
                <InputCity
                    placeholder={"Город вылета"}
                    extraClass={"min-w-full"}
                    inputClass={"rounded-primary max-h-9"}
                    value={isFirstFlight ? cityFrom : departureCity}
                    setValue={(value) => {
                        if (isFirstFlight) dispatch(setCityFrom(value))
                        else setDepartureCity(value)
                    }}
                    callback={(city: City) => handleInputChange("departureCity", city)}
                />
                <InputCity
                    placeholder={"Город прилета"}
                    extraClass={"min-w-full"}
                    inputClass={"rounded-primary max-h-9"}
                    value={isFirstFlight ? cityTo : arrivalCity}
                    setValue={(value) => {
                        if (isFirstFlight) dispatch(setCityTo(value))
                        else setArrivalCity(value)
                    }}
                    callback={(city: City) => handleInputChange("arrivalCity", city)}
                />
                <InputDate
                    setter={(value: Date) => handleInputChange('flightDate', value)}
                    inputValue={flightDate}
                    viewValue={flightDate}
                    calendarOpt={calendarOptions}
                    extraCalendarClass={"right-[180px] -translate-y-[200px]"}
                    placeholder={"Дата"}
                    noNeedButton={true}
                />
            </div>
        </div>
    );
};

const FlightRoute = () => {
    const flights = useSelector((state: RootState) => state.flight.flights);
    const classes = useSelector((state: RootState) => state.flight.class);
    const activeClass = classes.find(item => item.isSelected);
    const dispatch = useDispatch();

    const handleAddFlight = () => {
        dispatch(addFlight());
    };

    const handleRemoveFlight = (id: number) => {
        dispatch(removeFlight(id));
    };

    return (
        <div className={"w-full flex flex-col"}>
            <div className={"flex justify-between items-center"}>
                <h3>Маршрут</h3>
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"}/>
            <div className={"h-[calc(100vh-418px)] overflow-y-auto scroll py-2.5"}>
                <Dropdown title={"Класс"} selectedText={activeClass && activeClass.content} extraClass={"py-2 rounded-primary"}>
                    <Checkbox items={classes} onChange={(id: number) => dispatch(setClass({id, oneChoise: true}))}/>
                </Dropdown>
                {flights.map((flight, i) => (
                    <FlightRouteItem
                        key={flight.id}
                        flight={flight}
                        index={i}
                        onRemove={handleRemoveFlight}
                    />
                ))}
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mb-[15px]"}/>
            <button
                className={"w-full border border-solid border-[#e5e7ea] rounded-[23px] flex justify-between items-center py-4 px-4"}
                onClick={handleAddFlight}
            >
                <p className={"text-base text-[#787b86]"}>Добавить перелёт</p>
                <PlusImg className={"min-h-5 min-w-5"}/>
            </button>
        </div>
    );
};

export {FlightRoute};
