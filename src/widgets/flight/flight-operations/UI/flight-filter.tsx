import { useDispatch, useSelector } from "react-redux";
// import TrashImg from "@/assets/icons/trash.svg?react";
import { AppDispatch, RootState } from "@/app/config/store";
import { Checkbox, Dropdown, Input, InputRange } from "@/shared/UI";
import { priceRanges, timeOnWayRanges } from "../utils";
import { Range } from "@/shared/types";
import { setAirportFrom, setAirportTo, setPriceRange, setTimeFrom, setTimeTo } from "../model/flight.store";
import { useState } from "react";
import SimpleBar from "simplebar-react";

const FlightFilter = () => {
    const priceRange = useSelector((state: RootState) => state.flight.priceRange);
    const timeFrom = useSelector((state: RootState) => state.flight.timeFrom);
    const timeTo = useSelector((state: RootState) => state.flight.timeTo);
    const airportFrom = useSelector((state: RootState) => state.flight.airportFrom);
    const airportTo = useSelector((state: RootState) => state.flight.airportTo);
    const [customPriceRange, setCustomPriceRange] = useState<Range>(priceRanges);
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className="w-full">
            <SimpleBar className="h-[calc(100vh-343px)]">
                <div className=" flex flex-col gap-2.5 ">
                    <Dropdown
                        isChanged={priceRange.isChanged}
                        title="Стоимость"
                        onErase={() => {
                            setCustomPriceRange(priceRanges)
                            dispatch(setPriceRange(priceRanges));
                        }}>
                        <div className="flex flex-row gap-2.5">
                            <div className={"relative flex items-center"}>
                                <p className="text-sm text-[#9b9fad] absolute ml-2.5 z-10">от</p>
                                <div className={"flex items-center flex-row-reverse justify-center w-full"}>
                                    <Input
                                        className={"text-sm font-medium whitespace-nowrap pl-8 pr-6 py-1.5 w-full rounded-[23px] bg-primary flex items-center gap-1 relative"}
                                        value={priceRange.data.min ? priceRange.data.min : ""}
                                        type={"number"}
                                        onChange={e => {
                                            const value = Number(e.target.value)                                           
                                            if (value < priceRange.data.max && value >= customPriceRange.min) {
                                                dispatch(setPriceRange({
                                                    min: value,
                                                    max: priceRange.data.max
                                                }))
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const value = Number(e.target.value)
                                            const data = value > priceRange.data.max ? priceRange.data.max - 1 : value < customPriceRange.min ? customPriceRange.min : value
                                            dispatch(setPriceRange({
                                                min: data,
                                                max: priceRange.data.max
                                            }))
                                        }}
                                    />
                                    <p className={"text-sm font-medium absolute right-2.5"}>₽</p>
                                </div>
                            </div>
                            <div className={"relative flex items-center"}>
                                <p className="text-sm text-[#9b9fad] absolute ml-2.5 z-10">до</p>
                                <div className={"flex items-center flex-row-reverse justify-center w-full"}>
                                    <Input
                                        className={"text-sm font-medium whitespace-nowrap pl-8 pr-6 py-1.5 w-full rounded-[23px] bg-primary flex items-center gap-1 relative"}
                                        value={priceRange.data.max ? priceRange.data.max : ""}
                                        type={"number"}
                                        onChange={e => {
                                            const value = Number(e.target.value)

                                            if (value > priceRange.data.min && value <= customPriceRange.max) {
                                                dispatch(setPriceRange({
                                                    min: priceRange.data.min,
                                                    max: value
                                                }))
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const value = Number(e.target.value)
                                            const data = value < priceRange.data.min ? priceRange.data.min + 1 : value > customPriceRange.max ? customPriceRange.max : value
                                            dispatch(setPriceRange({
                                                min: priceRange.data.min,
                                                max: data
                                            }))
                                        }}
                                    />
                                    <p className={"text-sm font-medium absolute right-2.5"}>₽</p>
                                </div>
                            </div>
                        </div>
                        <InputRange
                            min={customPriceRange.min}
                            max={customPriceRange.max}
                            minVal={priceRange.data.min}
                            maxVal={priceRange.data.max}
                            onChangeValue={(values: Range) => dispatch(setPriceRange(values))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={timeFrom.isChanged}
                        title="Время вылета"
                        onErase={() => dispatch(setTimeFrom(timeOnWayRanges))}>
                        <InputRange
                            min={timeOnWayRanges.min}
                            max={timeOnWayRanges.max}
                            minVal={timeFrom.data.min}
                            maxVal={timeFrom.data.max}
                            isTime={true}
                            onChangeValue={(values: Range) => dispatch(setTimeFrom(values))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={timeTo.isChanged}
                        title="Время прилета"
                        onErase={() => dispatch(setTimeTo(timeOnWayRanges))}>
                        <InputRange
                            min={timeOnWayRanges.min}
                            max={timeOnWayRanges.max}
                            minVal={timeTo.data.min}
                            maxVal={timeTo.data.max}
                            isTime={true}
                            onChangeValue={(values: Range) => dispatch(setTimeTo(values))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={airportFrom.isChanged}
                        title="Аэропорт вылета"
                        onErase={() => dispatch(setAirportFrom("default"))}>
                        <Checkbox
                            items={airportFrom.data}
                            onChange={(id: number) => dispatch(setAirportFrom({ id, oneChoise: false }))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={airportTo.isChanged}
                        title="Аэропорт прилета"
                        onErase={() => dispatch(setAirportTo("default"))}>
                        <Checkbox
                            items={airportTo.data}
                            onChange={(id: number) => dispatch(setAirportTo({ id, oneChoise: false }))}
                        />
                    </Dropdown>
                </div>
            </SimpleBar>
        </div>
    );
};

export { FlightFilter };