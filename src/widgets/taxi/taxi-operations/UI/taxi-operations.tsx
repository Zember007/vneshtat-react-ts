import PassengerImg from "@/assets/icons/users.svg?react";
import {Checkbox, Dropdown, Input, InputDate} from "@/shared/UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {changeTaxiClass, setDateFrom, setDateTo} from "../model/taxi.store";

const TaxiOperations = () => {
    const {dateFrom, dateTo, taxiClass} = useSelector((state: RootState) => state.taxi);
    const dispatch = useDispatch();

    return (
        <aside>
            <div className={"w-[300px] rounded-[26px] p-5 bg-primary flex flex-col"}>
                <h1 className={"text-base font-medium leading-none"}>Новый ваучер Яндекс Go</h1>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"}/>
                <div className={"h-[calc(100vh-335px)] overflow-y-auto scroll flex flex-col gap-2.5 py-2.5"}>
                    <div className={"flex items-center gap-2.5"}>
                        <div className={"h-10 w-10 flex items-center justify-center bg-secondary rounded-primary"}>
                            <PassengerImg className={"min-h-5 min-w-5"}/>
                        </div>
                        <p className={"text-md font-medium leading-none"}>Вознесенский Иван</p>
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
                            <Input extraClass={"bg-[#FAFAFA] h-[26px] font-medium text-xs"} withEraser={false} placeholder={"Сумма с НДС"}/>
                            <div className={"flex flex-col gap-2"}>
                        <span className={"flex items-center justify-between"}>
                            <p className={"text-xs leading-none text-[#787B86]"}>Стоимость по тарифу </p>
                            <p className={"text-xs leading-none font-medium text-[#787B86]"}>853,00 ₽</p>
                        </span>
                                <span className={"flex items-center justify-between"}>
                            <p className={"text-xs leading-none text-[#787B86]"}>НДС</p>
                            <p className={"text-xs leading-none font-medium text-[#787B86]"}>147,00 ₽</p>
                        </span>
                            </div>
                        </div>
                    </Dropdown>
                    <Dropdown title={"Даты"}>
                        <div className={"flex items-center gap-2"}>
                            <InputDate
                                inputValue={dateFrom}
                                setter={(date: Date) => dispatch(setDateFrom(date))}
                                extraClass={"w-full bg-[#FAFAFA] min-w-[110px] h-[26px]"}
                                isShortDate
                                extraCalendarClass={"right-[210px]"}
                            />
                            <InputDate
                                inputValue={dateTo}
                                setter={(date: Date) => dispatch(setDateTo(date))}
                                extraClass={"w-full bg-[#FAFAFA] min-w-[110px] h-[26px]"}
                                isShortDate
                                extraCalendarClass={"right-[210px]"}
                            />
                        </div>
                    </Dropdown>
                </div>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px]"}/>
            </div>
            <button className={"py-4 bg-black rounded-[18px] w-full flex items-center justify-center mt-4"}>
                <p className={"text-base text-primary leading-none"}>Оформить</p>
            </button>
        </aside>
    )
};

export {TaxiOperations};