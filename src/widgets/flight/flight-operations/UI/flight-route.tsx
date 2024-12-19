import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import TrashImg from "@/assets/icons/trash.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";
import { Checkbox, CountdownCircle, Dropdown, InputCity, InputDate } from "@/shared/UI";
import { addFlight, removeFlight, setCityFrom, setCityTo, setClass, updateFlight } from "../model/flight.store";
import { useState, useEffect } from "react";
import { City } from "@/shared/types";
import { addRoute, changeCity, removeRoute, setClassRoutes } from "@/widgets/templates/model/template.store";
import SimpleBar from "simplebar-react";

interface FlightRouteItemProps {
    flight: any;
    index: number;
    onRemove: (id: number) => void;
    template?: template;
}

interface template {
    id: number | undefined;
    status: boolean;
}

const FlightRouteItem = ({ flight, index, onRemove, template }: FlightRouteItemProps) => {
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

                        if(template?.status) dispatch(changeCity({city:'from', id:template.id ,id_route:flight.id, value: value}))
                            
                          
                            
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

                        if(template?.status) dispatch(changeCity({city:'before', id:template.id ,id_route:flight.id, value: value}))
                    }}
                    callback={(city: City) => handleInputChange("arrivalCity", city)}
                />

                {!template?.status && <InputDate
                    setter={(value: Date) => handleInputChange('flightDate', value)}
                    extraCalendarClass="translate-x-[-300px] translate-y-[-50%]"
                    inputValue={flightDate}
                    viewValue={flightDate}
                    calendarOpt={calendarOptions}
                    placeholder={"Дата"}
                />}
            </div>
        </div>
    );
};

const FlightRoute = ({ template }: { template?: template }) => {
    const flights = useSelector((state: RootState) => state.flight.flights);
    const classes = useSelector((state: RootState) => state.flight.class);
    const activeClass = classes.find(item => item.isSelected);
    const dispatch = useDispatch();

    const handleAddFlight = () => {
        dispatch(addFlight());

        if(template?.status) {
            dispatch(addRoute(template.id));
        }
    };

    const handleRemoveFlight = (id: number) => {
        dispatch(removeFlight(id));
        if(template?.status) {
            dispatch(removeRoute({id:template.id, id_route: id}));
        }
    };
    

    useEffect(() => {

        if(template?.status) {
            dispatch(setClassRoutes({id:template.id, value: activeClass?.content}));
        }
        
    },[activeClass])

    return (
        <div className={"flex flex-col justify-between h-full"}>
            <SimpleBar className={"max-h-[calc(100vh-418px)]"}>
                <Dropdown title={"Класс"} selectedText={activeClass && activeClass.content} extraClass={'!p-2'} extraClassBox={" !rounded-primary"}>
                    <Checkbox items={classes} onChange={(id: number) => dispatch(setClass({ id, oneChoise: true }))} />
                </Dropdown>
                {flights.map((flight, i) => ( 
                    <FlightRouteItem
                        template={template}
                        key={flight.id}
                        flight={flight}
                        index={i}
                        onRemove={handleRemoveFlight}
                    />
                ))}
            </SimpleBar>
            <div>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mb-[15px]"} />
                <button
                    className={"w-full border border-solid border-[#e5e7ea] rounded-[23px] flex justify-between items-center py-4 px-4"}
                    onClick={handleAddFlight}
                >
                    <p className={"text-base text-[#787b86]"}>Добавить перелёт</p>
                    <PlusImg className={"min-h-5 min-w-5"} />
                </button>
            </div>
        </div>
    );
};

export { FlightRoute };
