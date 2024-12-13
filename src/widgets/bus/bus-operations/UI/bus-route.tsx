import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {InputCity, InputDate} from "@/shared/UI";
import {setCityFrom, setJourneyDate, setCityFromName, setCityTo, setCityToName} from "../model/bus.store";
import SimpleBar from "simplebar-react";

const BusRoute = () => {
    const {journeyDate, cityToName, cityFromName} = useSelector((state: RootState) => state.bus);
    const dispatch = useDispatch();

    return (
        <div className={"w-full"}>
            <div className={"flex justify-between items-center"}>
                <h3>Маршрут</h3>
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"}/>
            <SimpleBar className={"h-[calc(100vh-348px)]"}>
                <div className={"flex flex-col py-2.5 gap-4"}>
                    <h4 className={"text-base font-medium"}>Направления</h4>
                    <div className={"flex flex-col gap-2.5"}>
                        <InputCity
                            placeholder={"Город отправления"}
                            extraClass={"min-w-full"}
                            inputClass={"rounded-[13px] max-h-8"}
                            value={cityFromName}
                            setValue={(str) => dispatch(setCityFromName(str))}
                            callback={(city) => dispatch(setCityFrom(city))}
                        />
                        <InputCity
                            placeholder={"Город прибытия"}
                            extraClass={"min-w-full"}
                            inputClass={"rounded-[13px] max-h-8"}
                            value={cityToName}
                            setValue={(str) => dispatch(setCityToName(str))}
                            callback={(city) => dispatch(setCityTo(city))}
                        />
                    </div>
                </div>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] my-2.5"}/>
                <div className={"flex flex-col gap-4"}>
                    <h4 className={"text-base font-medium"}>Дата</h4>
                    <div className={"flex flex-col gap-2.5"}>
                        <InputDate
                            extraCalendarClass={"right-[210px]"}
                            setter={(value: Date) => dispatch(setJourneyDate(value))}
                            inputValue={journeyDate}
                            viewValue={journeyDate}
                            placeholder={"Туда"}
                        />
                    </div>
                </div>
            </SimpleBar>
        </div>
    )
};

export {BusRoute};