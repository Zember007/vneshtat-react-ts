import {useDispatch, useSelector} from "react-redux";
import TrashImg from "@/assets/icons/trash.svg?react";
import StarImg from "@/assets/icons/star.svg?react";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import {AppDispatch, RootState} from "@/app/config/store";
import {useState} from "react";
import {Range} from "@/shared/types";
import {Checkbox, Dropdown, Input, InputRange} from "@/shared/UI";
import {priceRanges, radiusRange, ratings} from "../utils";
import {
    setBed,
    setFacilities, setForTrips, setIsFreeCancelFilter,
    setLocationFrom,
    setLocationRadius, setNutrition, setPaymentCondition, setPlacingType,
    setPriceRange, setRating, setStars, setTravelPolitic
} from "@/widgets/hotel/hotel-operations/model/hotel.store";

const HotelFilter = () => {
    const location = useSelector((state: RootState) => state.hotel.location);
    const priceRange = useSelector((state: RootState) => state.hotel.priceRange);
    const ratingRange = useSelector((state: RootState) => state.hotel.rating);
    const stars = useSelector((state: RootState) => state.hotel.stars);
    const placingType = useSelector((state: RootState) => state.hotel.placingType);
    const nutrition = useSelector((state: RootState) => state.hotel.nutrition);
    const facilities = useSelector((state: RootState) => state.hotel.facilities);
    const bed = useSelector((state: RootState) => state.hotel.bed);
    const paymentCondition = useSelector((state: RootState) => state.hotel.paymentCondition);
    const travelPolitic = useSelector((state: RootState) => state.hotel.travelPolitic);
    const isFreeCancel = useSelector((state: RootState) => state.hotel.isFreeCancel);
    const forTrips = useSelector((state: RootState) => state.hotel.forTrips);
    const [customPriceRange, setCustomPriceRange] = useState<Range>(priceRanges);
    const dispatch: AppDispatch = useDispatch();

    const handleClearFilter = () => {
        dispatch(setPriceRange(priceRanges))
        setCustomPriceRange(priceRanges)
        dispatch(setLocationRadius("default"))
        dispatch(setLocationFrom("default"))
        dispatch(setPlacingType("default"))
        dispatch(setRating("default"))
        dispatch(setStars("default"))
        dispatch(setNutrition("default"))
        dispatch(setFacilities("default"))
        dispatch(setBed("default"))
        dispatch(setPaymentCondition("default"))
        dispatch(setTravelPolitic("default"))
        dispatch(setIsFreeCancelFilter(false))
        dispatch(setForTrips(false))
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h3>Фильтры</h3>
                <button onClick={handleClearFilter}>
                    <TrashImg className={"transition black-stroke-hover black-fill-hover"}/>
                </button>
            </div>
            <hr className="h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"/>
            <div className="max-h-[calc(100vh-330px)] overflow-y-auto scroll flex flex-col py-2.5 gap-2.5">
                <Dropdown
                    isChanged={location.isChanged}
                    title="Расположение"
                    onErase={() => {
                        dispatch(setLocationFrom("default"))
                        dispatch(setLocationRadius("default"))
                    }}>
                    <input
                        type="text"
                        className={"rounded-primary w-full px-2.5 py-1 text-[11px] font-medium"}
                        value={location.data.from}
                        onChange={(e) => dispatch(setLocationFrom(e.target.value))}
                        placeholder={"Улица, дом, объект"}
                    />
                    <InputRange
                        isLeftFixed
                        min={radiusRange.min}
                        max={radiusRange.max}
                        minVal={location.data.radius.min}
                        maxVal={location.data.radius.max}
                        leftElem={<p className={"text-[10px] font-medium text-[#9B9FAD]"}>Искать отели в радиусе</p>}
                        rightElem={<p
                            className={"text-[10px] font-medium text-[#9B9FAD]"}>{(location.data.radius.max / 1000).toFixed(1)} км</p>}
                        onChangeValue={(values: Range) => dispatch(setLocationRadius(values))}
                    />
                </Dropdown>
                <Dropdown
                    isChanged={priceRange.isChanged}
                    title="Стоимость"
                    onErase={() => {
                        setCustomPriceRange(priceRanges)
                        dispatch(setPriceRange(priceRanges))
                    }}>
                    <div className="flex flex-row gap-2.5">
                        <div className={"relative flex items-center"}>
                            <p className="text-sm text-[#9b9fad] absolute ml-2.5 z-10">от</p>
                            <div className={"flex items-center flex-row-reverse justify-center w-full"}>
                                <Input
                                    className={"text-sm font-medium whitespace-nowrap pl-8 pr-6 py-1.5 w-full rounded-[23px] bg-primary flex items-center gap-1 relative"}
                                    value={customPriceRange.min ? customPriceRange.min : ""}
                                    disabled
                                />
                                <p className={"text-sm font-medium absolute right-2.5"}>₽</p>
                            </div>
                        </div>
                        <div className={"relative flex items-center"}>
                            <p className="text-sm text-[#9b9fad] absolute ml-2.5 z-10">до</p>
                            <div className={"flex items-center flex-row-reverse justify-center w-full"}>
                                <Input
                                    className={"text-sm font-medium whitespace-nowrap pl-8 pr-6 py-1.5 w-full rounded-[23px] bg-primary flex items-center gap-1 relative"}
                                    value={customPriceRange.max ? customPriceRange.max : ""}
                                    onChange={e => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setCustomPriceRange(prev => ({
                                            ...prev,
                                            max: Number(value) > prev.min ? Number(value) : prev.max
                                        }));
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
                    isChanged={stars.isChanged}
                    title="Звёзды"
                    onErase={() => dispatch(setStars("default"))}>
                    <Checkbox
                        items={stars.data}
                        onChange={(id: number) => dispatch(setStars({id, oneChoise: false}))}
                    />
                </Dropdown>
                <Dropdown
                    isChanged={ratingRange.isChanged}
                    title="Рейтинг"
                    onErase={() => dispatch(setRating("default"))}>
                    <InputRange
                        min={ratings.min}
                        max={ratings.max}
                        minVal={ratingRange.data.min}
                        maxVal={ratingRange.data.max}
                        leftElem={
                            <div
                                className={"flex items-center min-w-9 py-[1.5px] px-1 gap-1 bg-[#C0C7D1] rounded-[10px]"}>
                                <StarImg/>
                                <p className={"text-[10px] font-medium text-primary"}>{ratingRange.data.min / 10}</p>
                            </div>
                        }
                        rightElem={
                            <div
                                className={"flex items-center min-w-9 py-[1.5px] px-1 gap-1 bg-[#C0C7D1] rounded-[10px]"}>
                                <StarImg/>
                                <p className={"text-[10px] font-medium text-primary"}>{ratingRange.data.max / 10}</p>
                            </div>
                        }
                        onChangeValue={(values: Range) => dispatch(setRating(values))}
                    />
                </Dropdown>
                <Dropdown
                    isChanged={placingType.isChanged}
                    title="Тип размещения"
                    onErase={() => dispatch(setPlacingType("default"))}>
                    <Checkbox
                        items={placingType.data}
                        onChange={(id: number) => dispatch(setPlacingType({id, oneChoise: false}))}
                    />
                </Dropdown>
                <Dropdown
                    isChanged={nutrition.isChanged}
                    title="Завтрак и питание"
                    onErase={() => dispatch(setNutrition("default"))}>
                    <Checkbox
                        items={nutrition.data}
                        onChange={(id: number) => dispatch(setNutrition({id, oneChoise: false}))}
                    />
                </Dropdown>
                <Dropdown
                    isChanged={facilities.isChanged}
                    title="Услуги и удобства"
                    onErase={() => dispatch(setFacilities("default"))}>
                    <Checkbox
                        items={facilities.data}
                        onChange={(id: number) => dispatch(setFacilities({id, oneChoise: false}))}
                    />
                </Dropdown>
                <Dropdown
                    isChanged={bed.isChanged}
                    title="Тип кровати"
                    onErase={() => dispatch(setBed("default"))}>
                    <Checkbox
                        items={bed.data}
                        onChange={(id: number) => dispatch(setBed({id, oneChoise: false}))}
                    />
                </Dropdown>
                <Dropdown
                    isChanged={paymentCondition.isChanged}
                    title="Условия оплаты"
                    onErase={() => dispatch(setPaymentCondition("default"))}>
                    <Checkbox
                        items={paymentCondition.data}
                        onChange={(id: number) => dispatch(setPaymentCondition({id, oneChoise: false}))}
                    />
                </Dropdown>
                <div
                    className={"pl-5 py-4 pr-4 rounded-[15px] h-10 bg-secondary flex items-center justify-between cursor-pointer"}
                    onClick={() => dispatch(setIsFreeCancelFilter(!isFreeCancel))}>
                    <div className={"flex items-center gap-1"}>
                        {isFreeCancel && <span className={"h-[5px] w-[5px] rounded-[100%] bg-red mb-3"}/>}
                        <h6 className={"text-base font-medium"}>Бесплатная отмена</h6>
                    </div>
                    <SuccessImg className={`${isFreeCancel ? "black-fill" : "grey-fill"} min-w-7 min-h-7`}/>
                </div>
                <Dropdown
                    isChanged={travelPolitic.isChanged}
                    title="Тревел-политика"
                    onErase={() => dispatch(setTravelPolitic("default"))}>
                    <Checkbox
                        items={travelPolitic.data}
                        onChange={(id: number) => dispatch(setTravelPolitic({id, oneChoise: false}))}
                    />
                </Dropdown>
                <div
                    className={"pl-5 py-4 pr-4 rounded-[15px] h-10 bg-secondary flex items-center justify-between cursor-pointer"}
                    onClick={() => dispatch(setForTrips(!forTrips))}>
                    <div className={"flex items-center gap-1"}>
                        {forTrips && <span className={"h-[5px] w-[5px] rounded-[100%] bg-red mb-4"}/>}
                        <h6 className={"text-base font-medium leading-none"}>Рекомендовано для командировок</h6>
                    </div>
                    <SuccessImg className={`${forTrips ? "black-fill" : "grey-fill"} min-w-7 min-h-7`}/>
                </div>
            </div>
        </div>
    );
};

export {HotelFilter};