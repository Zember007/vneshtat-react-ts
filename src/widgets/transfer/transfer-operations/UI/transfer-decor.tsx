import {Dropdown} from "@/shared/UI";
import SuccessImg from "@/assets/icons/success-violet.svg?react";
import TrashImg from "@/assets/icons/trash.svg?react";
import TimeImg from "@/assets/icons/time-grey.svg?react";
import ArrowImg from "@/assets/icons/arrow-top.svg?react"
import {useState} from "react";
import {Passenger} from "@/shared/types";

const TransferDecor = () => {
    const [passengers, setPassengers] = useState<Passenger[]>([
        {
            id: 1,
            name: "Иван",
            surname: "Вознесенский",
            password: "3333333 333333",
            internationalPw: "77 7777 777777777",
            deleteCountdown: null,
        },
        {
            id: 2,
            name: "Татьяна",
            surname: "Соколова",
            password: "3333333 22233242",
            internationalPw: "77 34343 7777",
            deleteCountdown: null,
        },
        {
            id: 3,
            name: "Анастасия",
            surname: "Грибоедова",
            password: "3333333 444444",
            internationalPw: "77 7777 3435353",
            deleteCountdown: null,
        },
    ]);

    return (
        <div>
            <div className={"flex flex-col gap-2.5"}>
                <Dropdown title={"Тариф"}>
                    <div className={"flex flex-col gap-2.5"}>
                        <div className={"rounded-primary bg-primary p-2.5"}>
                            <div className={"flex flex-col gap-1"}>
                                <span className={"flex items-center gap-1"}>
                                    <SuccessImg/>
                                    <p className={"text-xs font-medium"}>Комфорт</p>
                                </span>
                                <span className={"flex items-center gap-1 ml-5"}>
                                    <p className={"text-xs font-medium"}>1 100 ₽</p>
                                    <p className={"text-xs text-[#9B9FAD]"}>до 3 пассажиров</p>
                                </span>
                            </div>
                            <div
                                className={"flex flex-col gap-2.5 mt-2.5 pl-2 border-l-[5px] border-r-0 border-[#E5E7EA] border-y-0 border-solid"}>
                                <span className={"flex flex-col gap-0.5"}>
                                    <h6 className={"text-xs font-medium"}>Большая Полянка, 44</h6>
                                    <p className={"text-xs text-[#9B9FAD] whitespace-wrap"}>Москва, Россия</p>
                                </span>
                                <span className={"flex flex-col gap-0.5"}>
                                    <h6 className={"text-xs font-medium"}>Тверская, 141/2</h6>
                                    <p className={"text-xs text-[#9B9FAD] whitespace-wrap"}>Москва, Россия</p>
                                </span>
                            </div>
                        </div>
                        <div className={"rounded-primary bg-primary p-2.5 flex items-center gap-1"}>
                            <TimeImg/>
                            <p className={"text-xs font-medium leading-none"}>12:00</p>
                            <p className={"text-[11px] font-medium text-[#9B9FAD] leading-none"}>22 февраля, пт</p>
                        </div>
                        <div className={"rounded-primary bg-primary p-2.5"}>
                            <p className={"text-xs text-[#9B9FAD]"}>Можно отменить без штрафа за 6 часов до поездки</p>
                        </div>
                    </div>
                </Dropdown>
                <Dropdown title={"Ответственный пассажир"}>
                    <div className={"flex flex-col gap-2.5"}>
                        <div className={"flex items-center gap-1"}>
                            <span className={"w-full rounded-primary bg-primary px-2.5 py-2"}>
                                <p className={"text-xs font-medium"}>{passengers[0].surname} {passengers[0].name}</p>
                            </span>
                            <button onClick={() => {
                                setPassengers(prev => prev.filter(user => user.id !== passengers[0].id))
                            }}>
                                <TrashImg/>
                            </button>
                        </div>
                        <div className={"flex items-center gap-2.5"}>
                            <div className={"py-2 px-2.5 flex items-center gap-2.5 rounded-secondary bg-primary"}>
                                <p className={"font-medium leading-none text-xs"}>+7</p>
                                <button>
                                    <ArrowImg className={"rotate-180"}/>
                                </button>
                            </div>
                            <div className={"py-2 w-full px-2.5 rounded-secondary bg-primary mr-6"}>
                                <p className={"font-medium leading-none text-xs"}>999 983-12-45</p>
                            </div>
                        </div>
                    </div>
                </Dropdown>
                <Dropdown title={"Остальные пассажиры"}>
                    <div className={"flex flex-col gap-2.5"}>
                        {passengers.map(passenger => (
                            <div className={"flex items-center gap-1"}>
                                <span className={"w-full rounded-primary bg-primary px-2.5 py-2"}>
                                    <p className={"text-xs font-medium"}>{passenger.surname} {passenger.name}</p>
                                </span>
                                <button onClick={() => {
                                    setPassengers(prev => prev.filter(user => user.id !== passenger.id))
                                }}>
                                    <TrashImg/>
                                </button>
                            </div>
                        ))}
                    </div>
                </Dropdown>
            </div>
        </div>
    )
};

export {TransferDecor};