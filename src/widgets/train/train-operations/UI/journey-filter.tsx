import TrashImg from "@/assets/icons/trash.svg?react";
import { Checkbox, Dropdown, Input, InputRange } from "@/shared/UI";
import { useDispatch, useSelector } from "react-redux";
import {
    setCarriers, setPriceRange,
    setPrices,
    setRailwaysFrom, setRailwaysTo,
    setServices, setTimeFrom, setTimeOnWay, setTimeTo,
    setWeignTypes
} from "../model/journey.store";
import { AppDispatch, RootState } from "@/app/config/store";
import { priceRanges, timeOnWayRanges } from "../utils";
import { Range } from "@/shared/types";
import { useState } from "react";
import SimpleBar from "simplebar-react";

const JourneyFilter = () => {
    const prices = useSelector((state: RootState) => state.journey.prices);
    const weignTypes = useSelector((state: RootState) => state.journey.weignTypes);
    const carriers = useSelector((state: RootState) => state.journey.carriers);
    const railwaysFrom = useSelector((state: RootState) => state.journey.railwaysFrom);
    const railwaysTo = useSelector((state: RootState) => state.journey.railwaysTo);
    const services = useSelector((state: RootState) => state.journey.services);
    const priceRange = useSelector((state: RootState) => state.journey.priceRange);
    const timeOnWay = useSelector((state: RootState) => state.journey.timeOnWay);
    const timeFrom = useSelector((state: RootState) => state.journey.timeFrom);
    const timeTo = useSelector((state: RootState) => state.journey.timeTo);
    const [customPriceRange, setCustomPriceRange] = useState<Range>(priceRanges);
    const dispatch: AppDispatch = useDispatch();

    const handleClearFilter = () => {
        dispatch(setPriceRange(priceRanges))
        dispatch(setTimeOnWay(timeOnWayRanges))
        dispatch(setTimeFrom(timeOnWayRanges))
        dispatch(setTimeTo(timeOnWayRanges))
        setCustomPriceRange(priceRanges)
        dispatch(setRailwaysFrom("default"))
        dispatch(setRailwaysTo("default"))
        dispatch(setPrices("default"))
        dispatch(setWeignTypes("default"))
        dispatch(setServices("default"))
        dispatch(setCarriers("default"))
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h3>Фильтры</h3>
                <button onClick={handleClearFilter}>
                    <TrashImg className={"transition black-stroke-hover black-fill-hover"} />
                </button>
            </div>
            <hr className="h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5" />
            <SimpleBar className="max-h-[calc(100vh-343px)]">
                <div className=" flex flex-col py-2.5 gap-2.5">
                    <Dropdown
                        isChanged={priceRange.isChanged}
                        title="Стоимость"
                        onErase={() => {
                            dispatch(setPriceRange(priceRanges))
                            setCustomPriceRange(priceRanges)
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
                            onChangeValue={(values: Range) => {
                                dispatch(setPriceRange(values))
                            }}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={timeOnWay.isChanged}
                        title="Время в пути"
                        onErase={() => dispatch(setTimeOnWay(timeOnWayRanges))}>
                        <InputRange
                            min={timeOnWayRanges.min}
                            max={timeOnWayRanges.max}
                            minVal={timeOnWay.data.min}
                            maxVal={timeOnWay.data.max}
                            isTime={true}
                            onChangeValue={(values: Range) => dispatch(setTimeOnWay(values))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={timeFrom.isChanged}
                        title="Время отправления"
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
                        title="Время прибытия"
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
                        isChanged={railwaysFrom.isChanged}
                        title="Вокзал отправления"
                        onErase={() => dispatch(setRailwaysFrom("default"))}>
                        <Checkbox
                            items={railwaysFrom.data}
                            onChange={(id: number) => dispatch(setRailwaysFrom({ id, oneChoise: false }))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={railwaysTo.isChanged}
                        title="Вокзал прибытия"
                        onErase={() => dispatch(setRailwaysFrom("default"))}>
                        <Checkbox
                            items={railwaysTo.data}
                            onChange={(id: number) => dispatch(setRailwaysTo({ id, oneChoise: false }))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={prices.isChanged}
                        title="Тип поезда"
                        onErase={() => dispatch(setPrices("default"))}>
                        <Checkbox
                            items={prices.data}
                            onChange={(id: number) => dispatch(setPrices({ id, oneChoise: false }))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={weignTypes.isChanged}
                        title="Поезд"
                        onErase={() => dispatch(setWeignTypes("default"))}>
                        <Checkbox
                            items={weignTypes.data}
                            onChange={(id: number) => dispatch(setWeignTypes({ id, oneChoise: false }))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={services.isChanged}
                        title="Услуги"
                        onErase={() => dispatch(setServices("default"))}>
                        <Checkbox
                            items={services.data}
                            onChange={(id: number) => dispatch(setServices({ id, oneChoise: false }))}
                        />
                    </Dropdown>
                    <Dropdown
                        isChanged={carriers.isChanged}
                        title="Перевозчик"
                        onErase={() => dispatch(setCarriers("default"))}>
                        <Checkbox
                            items={carriers.data}
                            onChange={(id: number) => dispatch(setCarriers({ id, oneChoise: false }))}
                        />
                    </Dropdown>
                </div>
            </SimpleBar>
        </div>
    );
};

export { JourneyFilter };