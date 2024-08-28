import PassengerImg from "@/assets/icons/users.svg?react";
import TrashImg from "@/assets/icons/trash.svg?react";
import {Checkbox, Dropdown, Input, InputDate} from "@/shared/UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {addVoyager, changeTaxiClass, deleteVoyager, setDateBack, setDateTo, updateVoyager} from "../model/taxi.store";
import {ChangeEvent, useState} from "react";
import {VAT_RATE} from "@/shared/utils";

const TaxiOperations = () => {
    const {taxiClass, taxis} = useSelector((state: RootState) => state.taxi);
    const [price, setPrice] = useState<number>();
    const activeTaxi = taxis.find((taxi) => taxi.isSelected);
    const activeVoyagerTaxi = taxis.find(taxi => taxi.voyagers.find(item => item.isSelected));
    const activeVoyager = activeVoyagerTaxi?.voyagers?.find(item => item.isSelected);
    const dispatch = useDispatch();

    const getVatAmount = (price: number) => {
        return price ? price * VAT_RATE : 0;
    }

    const getTotalPrice = (price: number) => {
        return price ? price - getVatAmount(price) : 0;
    }

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrice = Number(e.target.value);
        setPrice(newPrice);
        if (activeVoyager) {
            dispatch(updateVoyager({voyagerId: activeVoyager.id, data: {price: newPrice}}));
        }
    };

    const handleDateBackChange = (date: Date) => {
        if (activeVoyager) {
            dispatch(updateVoyager({voyagerId: activeVoyager.id, data: {dateBack: date}}));
        }
    };

    const handleDateToChange = (date: Date) => {
        if (activeVoyager) {
            dispatch(updateVoyager({voyagerId: activeVoyager.id, data: {dateTo: date}}));
        }
    };

    return (
        <aside>
            <div className={"w-[300px] rounded-[26px] p-5 bg-primary flex flex-col"}>
                <h1 className={"text-base font-medium leading-none"}>{activeTaxi ? "Новый ваучер Яндекс Go" : "Выберите такси"}</h1>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"}/>
                <div className={"h-[calc(100vh-260px)] overflow-y-auto scroll flex flex-col gap-2.5 py-2.5"}>
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
                                          onChange={(id: number) => dispatch(changeTaxiClass({id, oneChoise: false}))}/>
                            </Dropdown>
                            <Dropdown title={"Расходы в поездке"}>
                                <div className={"flex flex-col gap-2.5"}>
                                    <Input
                                        extraClass={"!bg-primary h-[26px] font-medium text-xs"}
                                        withEraser={false}
                                        type={"number"}
                                        placeholder={"Сумма с НДС"}
                                        value={price}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                                    />
                                    <div className={"flex flex-col gap-2"}>
                                           <span className={"flex items-center justify-between"}>
                                                <p className={"text-xs leading-none text-[#787B86]"}>Стоимость по тарифу </p>
                                               <p className={"text-xs leading-none font-medium text-[#787B86]"}>{getTotalPrice(price || 0).toFixed(2)} ₽</p>
                                            </span>
                                        <span className={"flex items-center justify-between"}>
                                                <p className={"text-xs leading-none text-[#787B86]"}>НДС</p>
                                                <p className={"text-xs leading-none font-medium text-[#787B86]"}>{getVatAmount(price || 0).toFixed(2)} ₽</p>
                                        </span>
                                    </div>
                                </div>
                            </Dropdown>
                            <Dropdown title={"Даты"}>
                                <div className={"flex items-center gap-2"}>
                                    <InputDate
                                        inputValue={activeTaxi?.dateBack}
                                        viewValue={activeTaxi?.dateBack}
                                        calendarOpt={{maxDate: activeTaxi?.dateTo}}
                                        setter={(date: Date) => dispatch(setDateBack({id: activeTaxi?.id, date}))}
                                        placeholder={"От"}
                                        extraClass={"w-full !bg-primary min-w-[110px] h-[26px]"}
                                        isShortDate
                                        extraCalendarClass={"right-[210px]"}
                                    />
                                    <InputDate
                                        inputValue={activeTaxi?.dateTo}
                                        viewValue={activeTaxi?.dateTo}
                                        calendarOpt={{minDate: activeTaxi?.dateBack}}
                                        setter={(date: Date) => dispatch(setDateTo({id: activeTaxi?.id, date}))}
                                        placeholder={"До"}
                                        extraClass={"w-full !bg-primary min-w-[110px] h-[26px]"}
                                        isShortDate
                                        extraCalendarClass={"right-[210px]"}
                                    />
                                </div>
                            </Dropdown>
                        </>
                    ) : activeVoyagerTaxi ? (
                        <>
                            <div className={"flex items-center gap-2.5"}>
                                <div
                                    className={"h-10 w-10 flex items-center justify-center bg-secondary rounded-primary"}>
                                    <PassengerImg className={"min-h-5 min-w-5"}/>
                                </div>
                                <p className={"text-md font-medium leading-none"}>{activeVoyagerTaxi.surname} {activeVoyagerTaxi.name}</p>
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
                                        extraClass={"!bg-primary h-[26px] font-medium text-xs"}
                                        withEraser={false}
                                        type={"number"}
                                        placeholder={"Сумма с НДС"}
                                        value={activeVoyager?.price}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(e)}
                                    />
                                    <div className={"flex flex-col gap-2"}>
                                           <span className={"flex items-center justify-between"}>
                                                <p className={"text-xs leading-none text-[#787B86]"}>Стоимость по тарифу </p>
                                               <p className={"text-xs leading-none font-medium text-[#787B86]"}>{getTotalPrice(activeVoyager?.price || 0).toFixed(2)} ₽</p>
                                            </span>
                                        <span className={"flex items-center justify-between"}>
                                                 <p className={"text-xs leading-none text-[#787B86]"}>НДС</p>
                                                <p className={"text-xs leading-none font-medium text-[#787B86]"}>{getVatAmount(activeVoyager?.price || 0).toFixed(2)} ₽</p>
                                        </span>
                                    </div>
                                </div>
                            </Dropdown>
                            <Dropdown title={"Даты"}>
                                <div className={"flex items-center gap-2"}>
                                    <InputDate
                                        inputValue={activeVoyager?.dateBack ?? null}
                                        viewValue={activeVoyager?.dateBack ?? null}
                                        calendarOpt={{ maxDate: activeVoyager?.dateTo ?? undefined }}
                                        setter={(date: Date) => handleDateBackChange(date)}
                                        placeholder={"От"}
                                        extraClass={"w-full !bg-primary min-w-[110px] h-[26px]"}
                                        isShortDate
                                        extraCalendarClass={"right-[210px]"}
                                    />
                                    <InputDate
                                        inputValue={activeVoyager?.dateTo ?? null}
                                        viewValue={activeVoyager?.dateTo ?? null}
                                        calendarOpt={{ minDate: activeVoyager?.dateBack ?? undefined }}
                                        setter={(date: Date) => handleDateToChange(date)}
                                        placeholder={"До"}
                                        extraClass={"w-full !bg-primary min-w-[110px] h-[26px]"}
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
            {activeVoyager ? (
                <div className={"flex items-center gap-4"}>
                    <button
                        onClick={() => dispatch(deleteVoyager({voyagerId: activeVoyager.id}))}
                        className={`py-3 h-[50px] min-w-[50px] rounded-[21px] flex items-center justify-center mt-4 bg-[#DCE0E5]`}>
                        <TrashImg className={"transition min-h-6 min-w-6 black-fill-hover black-stroke-hover"}/>
                    </button>
                    <button
                        className={`py-4 transition h-[50px] rounded-[21px] w-full flex items-center justify-center mt-4 bg-[#DCE0E5]`}>
                        <p className={`transition text-base leading-none text-black`}>Оформлено</p>
                    </button>
                </div>
            ) : (
                <button
                    className={`py-4 transition h-[50px] bg-black rounded-[21px] w-full flex items-center justify-center mt-4 disabled:bg-[#DCE0E5]`}
                    onClick={() => {
                        dispatch(addVoyager({id: activeTaxi?.id, price}));
                        setPrice(0);
                    }}
                    disabled={!activeTaxi || !price || !activeTaxi.dateBack}>
                    <p className={`transition text-base leading-none ${activeTaxi && price && activeTaxi.dateBack ? "text-primary" : "text-black"}`}>Оформить</p>
                </button>
            )}
        </aside>
    )
};

export {TaxiOperations};