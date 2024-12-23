import { InputCity, InputDate } from "@/shared/UI";
import { useDispatch, useSelector } from "react-redux";
import { setCityFrom, setCityFromName, setCityTo, setCityToName, setDateBack, setDateTo } from "../model/journey.store";
import { RootState } from "@/app/config/store";
import SimpleBar from "simplebar-react";
import { useEffect, useState } from "react";

const JourneyRoute = ({ template }: { template?: boolean }) => {
    const { dateTo, dateBack, cityFromName, cityToName } = useSelector((state: RootState) => state.journey);
    const dispatch = useDispatch();

      const [dates, setDates] = useState<Date[]>([])
    
        useEffect(() => {
            const updatedDates = [];
            if (dateTo) {
                updatedDates.push(dateTo);
                setDates(updatedDates);
            }
            if (dateBack) {
                updatedDates.push(dateBack)
            }
            setDates(updatedDates);
        }, [dateTo, dateBack]);
    
        useEffect(() => {
            dispatch(setDateTo(dates[0]));
            dispatch(setDateBack(dates[1]));
        }, [dates])
    
        const handleDateClick = (date: Date) => {
            let updatedDates = dates.filter(d => d !== undefined);
    
    
            if (updatedDates.length === 2) {
                updatedDates = [];
                setDates([]);
                dispatch(setDateTo(null));
                dispatch(setDateBack(null));
            }
            if (!dateTo || updatedDates.length === 0) {
    
                dispatch(setDateTo(date));
                updatedDates = [date];
            } else {
    
                updatedDates = [...updatedDates, date].sort((a, b) => a.getTime() - b.getTime());
    
                dispatch(setDateTo(updatedDates[0]));
                dispatch(setDateBack(updatedDates[1]));
            }
    
            setDates(updatedDates);
        }

    return (
        <div className={"w-full h-[calc(100vh-228px)]"}>
            <div className={"flex justify-between items-center"}>
                <h3>Маршрут</h3>
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"} />
            <SimpleBar className={"h-[calc(100vh-270px)] py-2.5"}>
                <div className={"flex flex-col gap-4"}>
                    <h4 className={"text-base font-medium"}>Направления</h4>
                    <div className={"flex flex-col gap-2.5"}>
                        <InputCity
                            withEraser={false}
                            placeholder={"Откуда"}
                            extraClass={"min-w-full"}
                            inputClass={"rounded-[13px] max-h-8"}
                            value={cityFromName}
                            setValue={(str) => dispatch(setCityFromName(str))}
                            callback={(city) => dispatch(setCityFrom(city))}
                        />
                        <InputCity
                            withEraser={false}
                            placeholder={"Куда"}
                            extraClass={"min-w-full"}
                            inputClass={"rounded-[13px] max-h-8"}
                            value={cityToName}
                            setValue={(str) => dispatch(setCityToName(str))}
                            callback={(city) => dispatch(setCityTo(city))}
                        />
                    </div>
                </div>
                {!template && <>
                    <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] my-2.5"} />
                    <div className={"flex flex-col gap-4"}>
                        <h4 className={"text-base font-medium"}>Даты</h4>
                        <div className={"flex flex-col gap-2.5"}>
                        <InputDate
                                setter={(value: Date[]) => setDates(value)}
                                inputValue={dates}
                                viewValue={dateTo}
                                placeholder={"Туда"}
                                extraCalendarClass="translate-x-[-300px] translate-y-[-40px]"
                                calendarOpt={{
                                    onClickDay: handleDateClick,
                                    allowPartialOptions: true,
                                    selectRange: true
                                }}
                            />
                             <InputDate
                                setter={(value: Date[]) => setDates(value)}
                                inputValue={dates}
                                viewValue={dateBack}
                                placeholder={"Обратно"}
                                extraCalendarClass="translate-x-[-300px] translate-y-[-40px]"
                                calendarOpt={{
                                    onClickDay: handleDateClick,
                                    allowPartialOptions: true,
                                    selectRange: true
                                }}
                            />
                        </div>
                    </div>
                </>}
            </SimpleBar>
        </div>
    )
};

export { JourneyRoute };