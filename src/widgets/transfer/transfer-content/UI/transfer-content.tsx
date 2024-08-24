import {InputCity, InputDate, InputTime} from "@/shared/UI";
import {setCityFrom, setCityTo} from "@/widgets/flight/flight-operations/model/flight.store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {setCityFromName, setCityToName, setDate} from "@/widgets/transfer/transfer-content/model/transfer.store";
import {City} from "@/shared/types";
import PassengerImg from "@/assets/icons/users.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";

const TransferContent = () => {
    const {date, time, cityFromName, cityToName, cityFrom, cityTo} = useSelector((state: RootState) => state.transfer);
    const dispatch = useDispatch();

    const swapCities = () => {
        const temp = cityFromName;

        dispatch(setCityFromName(cityToName));
        dispatch(setCityToName(temp));

        dispatch(setCityFrom(cityTo));
        dispatch(setCityTo(cityFrom));
    };

    return (
        <div className={"w-full"}>
            <div className={"bg-primary p-5 rounded-[26px]"}>
                <div className={"flex flex-row items-center gap-2.5"}>
                    <div
                        className={"flex flex-row items-center py-3 px-2.5 gap-2 h-11 rounded-[16px] bg-secondary"}>
                        <PassengerImg/>
                        <p className={"text-xs"}>+0</p>
                    </div>
                    <InputCity
                        placeholder={"Выезд"}
                        value={cityFromName}
                        setValue={(str) => dispatch(setCityFromName(str))}
                        callback={(city: City) => dispatch(setCityFrom(city))}
                    />
                    <button onClick={swapCities}>
                        <RouteImg className={"grey-fill black-fill-hover transition min-w-5 min-h-5"}/>
                    </button>
                    <InputCity
                        placeholder={"Прибытие"}
                        value={cityToName}
                        setValue={(str) => dispatch(setCityToName(str))}
                        callback={(city: City) => dispatch(setCityTo(city))}
                    />
                    <InputDate
                        placeholder={"Туда"}
                        extraClass={"py-3 px-2.5 h-11 min-w-[100px] max-w-[100px] !rounded-[16px]"}
                        extraCalendarClass={"-translate-y-[72px]"}
                        inputValue={date}
                        viewValue={date}
                        isShortDate={true}
                        withIcon={false}
                        setter={(date: Date) => {
                            dispatch(setDate(date));
                        }}
                    />
                    <InputTime time={time}/>
                </div>
            </div>
        </div>
    )
};

export {TransferContent};