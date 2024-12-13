import CrossImg from "@/assets/icons/cross.svg?react";
import {Dropdown} from "@/shared/UI";
import SuccessImg from "@/assets/icons/success-violet.svg?react";
import TrashImg from "@/assets/icons/trash.svg?react";
import TimeImg from "@/assets/icons/time-grey.svg?react";
import {useState} from "react";
import {Passenger} from "@/shared/types";
import SimpleBar from "simplebar-react";

const BusDecor = () => {
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
        <div className={"w-full h-full"}>
            <div className={"flex justify-between items-center"}>
                <h3>Маршрут</h3>
                <button>
                    <CrossImg className={"grey-fill min-w-7 min-h-7"}/>
                </button>
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"}/>
            <SimpleBar className="h-[calc(100vh-278px)]">
            <div className={"flex flex-col gap-2.5  py-2.5"}>
                <Dropdown title={"Тариф"}>
                    <div className={"flex flex-col gap-2.5"}>
                        <div className={"rounded-primary bg-primary p-2.5"}>
                            <div className={"flex flex-col gap-1"}>
                                <span className={"flex items-center gap-1"}>
                                    <SuccessImg/>
                                    <p className={"text-xs font-medium"}>Автобус</p>
                                    <p className={"text-xs text-[#9B9FAD]"}>22.02.2024</p>
                                </span>
                                <p className={"text-xs text-[#9B9FAD] ml-5"}>ООО “Беркут”</p>
                            </div>
                            <div
                                className={"flex flex-col gap-2.5 pl-2 border-l-[5px] border-r-0 border-[#E5E7EA] border-y-0 border-solid"}>
                                <span className={"flex flex-col gap-0.5"}>
                                    <h6 className={"text-xs font-medium"}>Санкт-Петербург</h6>
                                    <p className={"text-xs text-[#9B9FAD] whitespace-wrap"}>Автовокзал "Обводный"; метро Обводный канал; набережная Обводного канала, дом 36</p>
                                </span>
                                <span className={"flex flex-col gap-0.5"}>
                                    <h6 className={"text-xs font-medium"}>Москва</h6>
                                    <p className={"text-xs text-[#9B9FAD] whitespace-wrap"}>Международный автовокзал "Северные Ворота"; улица Дыбенко, дом 7, строение 1</p>
                                </span>
                            </div>
                        </div>
                        <div className={"rounded-primary bg-primary p-2.5"}>
                            <span className={"flex items-center gap-1"}>
                                <TimeImg/>
                                <p className={"text-xs font-medium"}>Отправление</p>
                            </span>
                            <span className={"flex gap-1 ml-5"}>
                                <p className={"text-xs text-[#9B9FAD]"}>12:00</p>
                                <p className={"text-xs text-[#9B9FAD]"}>22 февраля, пт</p>
                            </span>
                        </div>
                        <div className={"rounded-primary bg-primary p-2.5"}>
                            <span className={"flex items-center gap-1"}>
                                <TimeImg/>
                                <p className={"text-xs font-medium"}>Прибытие</p>
                            </span>
                            <span className={"flex gap-1 ml-5"}>
                                <p className={"text-xs text-[#9B9FAD]"}>22:00</p>
                                <p className={"text-xs text-[#9B9FAD]"}>22 февраля, пт</p>
                            </span>
                        </div>
                    </div>
                </Dropdown>
                <Dropdown title={"Пассажиры"}>
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
            </SimpleBar>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px]"}/>
        </div>
    )
};

export {BusDecor};