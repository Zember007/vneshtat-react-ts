import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {Input, InputDate, InputTime} from "@/shared/UI";
import PlusImg from "@/assets/icons/plus.svg?react";
import {setAddressFrom, setAddressTo, setDate} from "@/widgets/transfer/transfer-content/model/transfer.store";

const TransferRoute = () => {
    const {addressFrom, addressTo, date, time} = useSelector((state: RootState) => state.transfer);
    const dispatch = useDispatch();

    return (
        <div className={"w-full"}>
            <div className={"flex justify-between items-center"}>
                <h3>Маршрут</h3>
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"}/>
            <div className={"h-[calc(100vh-409px)] overflow-y-auto scroll pb-2.5"}>
                <div className={"flex flex-col py-2.5 gap-4"}>
                    <h4 className={"text-base font-medium"}>Адрес отправления</h4>
                    <Input
                        value={addressFrom}
                        onChange={(e) => dispatch(setAddressFrom(e.target.value))}
                        placeholder={"Город, улица, дом, объект"}/>
                </div>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] my-2.5"}/>
                <div className={"flex flex-col gap-4"}>
                    <h4 className={"text-base font-medium"}>Адрес прибытия</h4>
                    <Input
                        value={addressTo}
                        onChange={(e) => dispatch(setAddressTo(e.target.value))}
                        placeholder={"Город, улица, дом, объект"}/>
                </div>
                <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] my-2.5"}/>
                <div className={"flex flex-col gap-4"}>
                    <h4 className={"text-base font-medium"}>Дата и время</h4>
                    <div className={"flex items-center gap-2.5"}>
                        <InputDate inputValue={date} setter={(date: Date) => dispatch(setDate(date))} extraClass={"min-w-[170px]"} placeholder={"Дата"} extraCalendarClass={"right-[210px]"}/>
                        <InputTime time={time} extraClass={"max-h-7"}/>
                    </div>
                </div>
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px]"}/>
            <button
                className={"w-full border border-solid border-[#e5e7ea] rounded-[23px] flex justify-between items-center py-4 px-4 mt-4"}
            >
                <p className={"text-base text-[#787b86]"}>Промежуточная точка</p>
                <PlusImg className={"min-h-5 min-w-5"}/>
            </button>
        </div>
    )
};

export {TransferRoute};