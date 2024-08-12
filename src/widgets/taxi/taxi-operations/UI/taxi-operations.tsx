import PassengerImg from "@/assets/icons/users.svg?react";
import {Checkbox, Dropdown, Input, InputDate} from "@/shared/UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {addVoyager, changeTaxiClass, setDateFrom, setDateTo} from "../model/taxi.store";
import {ChangeEvent, useState} from "react";
import {VAT_RATE} from "@/shared/utils";

const TaxiOperations = () => {
    const {taxiClass, taxis} = useSelector((state: RootState) => state.taxi);
    const [price, setPrice] = useState<number>();
    const activeTaxi = taxis.find((taxi) => taxi.isSelected);
    const vatAmount = price ? price * VAT_RATE : 0;
    const totalPrice = price ? price - vatAmount : 0;
    const dispatch = useDispatch();

    return (
        <aside>
            <div className={"w-[300px] rounded-[26px] p-5 bg-primary flex flex-col"}>
                <h1 className={"text-base font-medium leading-none"}>{activeTaxi ? "Новый ваучер Яндекс Go" : "Выберите такси"}</h1>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"}/>
                <div className={"h-[calc(100vh-335px)] overflow-y-auto scroll flex flex-col gap-2.5 py-2.5"}>
                    {activeTaxi ? (
                        <>
                            <div className={"flex items-center gap-2.5"}>
                                <div
                                    className={"h-10 w-10 flex items-center justify-center bg-secondary rounded-primary"}>
                                    <PassengerImg className={"min-h-5 min-w-5"}/>
                                </div>
                                <p className={"text-md font-medium leading-none"}>{activeTaxi.surname} {activeTaxi.name}</p>
                            </div>
                            <Dropdown
                                title={"Классы автомобилей"}
                                isChanged={taxiClass.isChanged}
                                onErase={() => dispatch(changeTaxiClass("default"))}
                            >
                                <Checkbox items={taxiClass.data}
                                          onChange={(id: number) => dispatch(changeTaxiClass({id, oneChoise: true}))}/>
                            </Dropdown>
                            <Dropdown title={"Расходы в поездке"}>
                                <div className={"flex flex-col gap-2.5"}>
                                    <Input
                                        extraClass={"bg-[#FAFAFA] h-[26px] font-medium text-xs"}
                                        withEraser={false}
                                        type={"number"}
                                        placeholder={"Сумма с НДС"}
                                        value={price}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                                    />
                                    <div className={"flex flex-col gap-2"}>
                                           <span className={"flex items-center justify-between"}>
                                                <p className={"text-xs leading-none text-[#787B86]"}>Стоимость по тарифу </p>
                                               <p className={"text-xs leading-none font-medium text-[#787B86]"}>{totalPrice.toFixed(2)} ₽</p>
                                            </span>
                                        <span className={"flex items-center justify-between"}>
                                                 <p className={"text-xs leading-none text-[#787B86]"}>НДС</p>
                                                <p className={"text-xs leading-none font-medium text-[#787B86]"}>{vatAmount.toFixed(2)} ₽</p>
                                        </span>
                                    </div>
                                </div>
                            </Dropdown>
                            <Dropdown title={"Даты"}>
                                <div className={"flex items-center gap-2"}>
                                    <InputDate
                                        inputValue={activeTaxi.dateFrom}
                                        setter={(date: Date) => dispatch(setDateFrom({id: activeTaxi.id, date}))}
                                        placeholder={"От"}
                                        extraClass={"w-full bg-[#FAFAFA] min-w-[110px] h-[26px]"}
                                        isShortDate
                                        extraCalendarClass={"right-[210px]"}
                                    />
                                    <InputDate
                                        inputValue={activeTaxi.dateTo}
                                        setter={(date: Date) => dispatch(setDateTo({id: activeTaxi.id, date}))}
                                        placeholder={"До"}
                                        extraClass={"w-full bg-[#FAFAFA] min-w-[110px] h-[26px]"}
                                        isShortDate
                                        extraCalendarClass={"right-[210px]"}
                                    />
                                </div>
                            </Dropdown>
                        </>
                    ) : (
                        <div className={"flex items-center justify-center h-full"}>
                            <p className={"text-[#9B9FAD] text-md font-medium leading-none text-center mx-5"}>
                                Выберите такси, чтобы добавить ваучер
                            </p>
                        </div>
                    )}
                </div>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px]"}/>
            </div>
            <button
                className={`py-4 transition h-[50px] bg-black rounded-[18px] w-full flex items-center justify-center mt-4 disabled:bg-[#DCE0E5]`}
                onClick={() => dispatch(addVoyager({id: activeTaxi?.id, price}))}
                disabled={!activeTaxi}>
                <p className={`transition text-base leading-none ${activeTaxi ? "text-primary" : "text-black"}`}>Оформить</p>
            </button>
        </aside>
    )
};

export {TaxiOperations};