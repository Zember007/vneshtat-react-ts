import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {changeSelectedTaxi, selectVoyager} from "@/widgets/taxi/taxi-operations/model/taxi.store";

const TaxiContent = () => {
    const {taxis} = useSelector((state: RootState) => state.taxi);
    const dispatch = useDispatch();

    return (
        <div>
            <div className={"flex flex-row justify-between items-center p-5 bg-primary rounded-[23px]"}>
                <p className={"text-base text-[#787B86] leading-none"}>Вы можете оформить ваучер и воспользоваться им
                    при оплате поездки в приложении Яндекс GO, выбрав способ оплаты “Внештат Сервис”. В рамках одного
                    ваучера и в пределах установленного периода можно совершить несколько поездок. Сам ваучер не несет
                    за собой никаких финансовых обязательств, а лишь дает возможность оформить услугу такси через
                    приложение Яндекс GO и оплатить ее в рамках договора с Внештат.</p>
            </div>
            <div className={"flex flex-col gap-2.5 bg-primary p-5 mt-5 rounded-[26px]"}>
                {taxis.map(taxi => (
                    <div
                        key={taxi.id}
                        className={`p-4 transition ${taxi.isSelected ? "bg-black" : "bg-secondary"} rounded-[26px] flex items-start justify-between`}
                    >
                        <div className={"flex items-center gap-4"}>
                            <div
                                className={"h-[35px] w-[35px] flex items-center justify-center rounded-full bg-primary"}>
                                <h3 className={"text-base spacing-1 tracking-[-1.6px]"}>{taxi.surname[0].toUpperCase()}{taxi.name[0].toUpperCase()}</h3>
                            </div>
                            <p className={`text-base font-medium leading-none ${taxi.isSelected ? "text-primary" : "text-black"}`}>{taxi.surname} {taxi.name}</p>
                        </div>
                        <div className={"flex gap-2.5"}>
                            <button
                                className={"h-9 py-2 w-[160px] rounded-primary bg-primary"}
                                onClick={() => dispatch(changeSelectedTaxi(taxi.id))}
                            >
                                <p className={"text-md font-medium leading-none"}>Добавить ваучер</p>
                            </button>
                            {taxi.voyagers.length ? (
                                <div className={"flex flex-wrap gap-2.5 max-w-[400px]"}>
                                    {taxi.voyagers.map((item, i) => (
                                        <button
                                            key={i}
                                            className={`transition h-9 pl-4 pr-1 py-1 rounded-primary ${item.isSelected ? "bg-black" : "bg-primary"} flex items-center gap-2.5`}
                                            onClick={() => dispatch(selectVoyager({voyagerId: item.id}))}
                                        >
                                            <p className={`text-md font-medium leading-none ${item.isSelected ? "text-primary" : "text-black"}`}>{item.price.toFixed(2)} ₽</p>
                                            <div
                                                className={"py-1 px-2.5 rounded-secondary bg-secondary h-7 flex items-center justify-center"}>
                                                <p className={"text-sm font-medium leading-none"}>{item.count}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export {TaxiContent};