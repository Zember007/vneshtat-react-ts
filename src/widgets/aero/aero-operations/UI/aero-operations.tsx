import React, {useEffect, useState} from "react";
import {mockTariff} from "@/widgets/aero/aero-content/utils";
import ArrowTop from "@/assets/icons/arrow-top.svg?react";
import TrashImg from "@/assets/icons/trash.svg?react";
import InfoImg from "@/assets/icons/info.svg?react";
import CrossImg from "@/assets/icons/cross.svg?react";
import {CountdownCircle, InputDate} from "@/shared/UI";
import {Passenger} from "@/shared/types";

const AeroOperations = ({selectedTariffId}: {
    selectedTariffId: null | number,
}) => {
    const selectedTariff = mockTariff.find(item => item.id === selectedTariffId);
    const [date, setDate] = useState<Date | null>(null);
    const [activePassenger, setActivePassenger] = useState<number | null>(null);
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

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const updatedPassengers = passengers.map((passenger) =>
                passenger.deleteCountdown !== null && passenger.deleteCountdown > 0
                    ? {...passenger, deleteCountdown: passenger.deleteCountdown - 1}
                    : passenger
            );

            const remainingPassengers = updatedPassengers.filter((passenger) => passenger.deleteCountdown !== 0);

            setPassengers(remainingPassengers);
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [passengers]);

    const handleDelete = (passengerId: number) => {
        const updatedPassengers = passengers.map((passenger) =>
            passenger.id === passengerId
                ? {...passenger, deleteCountdown: 5}
                : passenger
        );
        setPassengers(updatedPassengers);
    };

    const cancelDelete = (passengerId: number) => {
        const updatedPassengers = passengers.map((passenger) =>
            passenger.id === passengerId
                ? {...passenger, deleteCountdown: null}
                : passenger
        );
        setPassengers(updatedPassengers);
    };

    return (
        <div className={"min-w-[300px] flex flex-col gap-5"}>
            <div className={"bg-primary p-5 rounded-[26px] h-full"}>
                {selectedTariffId ? (
                    <div className={"h-full"}>
                        <div className={"flex flex-col gap-2.5"}>
                            <span className={"flex items-center gap-1"}>
                                <h2 className={"text-base font-medium leading-none"}>{selectedTariff?.class}</h2>
                                <p className={"text-[#9B9FAD] text-base font-medium leading-none"}>{selectedTariff?.direction === 1 ? "в одну сторону" : "Туда-обратно"}</p>
                            </span>
                            <hr className={"h-[1px] w-full rounded-[1px] bg-[#E5E7EA]"}/>
                        </div>
                        <div className={"flex flex-col gap-2.5 h-full pt-2.5"}>
                            <div className={"flex flex-col gap-4"}>
                                <h6 className={"text-md leading-none font-medium"}>Дата</h6>
                                <InputDate
                                    inputValue={date}
                                    viewValue={date}
                                    setter={(date: Date) => setDate(date)}
                                    placeholder={"Выберите дату"}
                                    extraCalendarClass={"right-[210px]"}
                                />
                            </div>
                            <hr className={"h-[1px] w-full rounded-[1px] bg-[#E5E7EA]"}/>
                            <div className={"flex flex-col gap-4"}>
                                <h6 className={"text-md leading-none font-medium"}>Пассажиры</h6>
                                <div
                                    className={"w-full h-[calc(100vh-500px)] overflow-y-auto scroll flex flex-col py-2.5 gap-2.5"}>
                                    {passengers.map((passenger) => (
                                        <React.Fragment key={passenger.id}>
                                            {passenger.id === activePassenger ? (
                                                <div>
                                                    <div
                                                        onClick={() =>
                                                            setActivePassenger(
                                                                passenger.id === activePassenger
                                                                    ? null
                                                                    : passenger.id
                                                            )
                                                        }
                                                        className={
                                                            "w-full bg-secondary rounded-primary flex items-center justify-between gap-1 py-2 px-2.5"
                                                        }
                                                    >
                                                        <h3 className={"text-xs font-medium whitespace-nowrap"}>
                                                            {passenger.surname} {passenger.name}
                                                        </h3>
                                                        <ArrowTop className={"min-w-5 min-h-5"}/>
                                                    </div>
                                                    <div
                                                        className={"w-full bg-secondary rounded-primary py-4 px-5 mt-2.5"}>
                                                        <div className={"flex justify-between items-center"}>
                                                            <h3 className={"text-base font-medium"}>Документы</h3>
                                                            <InfoImg className={"min-w-6 min-h-6 black-fill-hover"}/>
                                                        </div>
                                                        <div className={"flex flex-col gap-1.5 mt-2.5"}>
                                                            <div
                                                                className={"bg-primary py-2 px-2.5 gap-1 flex justify-between items-center rounded-primary"}
                                                            >
                                                                <h6 className={"text-xs font-medium whitespace-nowrap"}>
                                                                    {passenger.password}
                                                                </h6>
                                                                <p className={"text-xs text-[#9b9fad] whitespace-nowrap overflow-hidden text-ellipsis"}>
                                                                    Паспорт РФ
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={"bg-primary py-2 px-2.5 gap-1 flex justify-between items-center rounded-primary"}
                                                            >
                                                                <h6 className={"text-xs font-medium whitespace-nowrap"}>
                                                                    {passenger.internationalPw}
                                                                </h6>
                                                                <p className={"text-xs text-[#9b9fad] whitespace-nowrap overflow-hidden text-ellipsis"}>
                                                                    Загранпаспорт
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={"flex items-center gap-2.5"}>
                                                    <div
                                                        className={"w-9 h-9 py-2 px-2.5 flex justify-center items-center rounded-full bg-secondary"}
                                                    >
                                                        <h3 className={"text-xs font-medium uppercase"}>
                                                            {passenger.surname[0] + passenger.name[1]}
                                                        </h3>
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            passenger.deleteCountdown
                                                                ? cancelDelete(passenger.id)
                                                                : setActivePassenger(passenger.id)
                                                        }
                                                        className={
                                                            "w-full h-9 bg-secondary min-w-[150px] rounded-primary flex items-center justify-between gap-1 py-2 px-2.5 cursor-pointer"
                                                        }
                                                    >
                                                        {passenger.deleteCountdown ? (
                                                            <div className={"flex items-center gap-1"}>
                                                                <h3
                                                                    className={
                                                                        "text-xs font-medium whitespace-nowrap text-[#FF64A3] overflow-hidden text-ellipsis leading-none"
                                                                    }
                                                                >
                                                                    Отменить удаление
                                                                </h3>
                                                                <CrossImg className={"red-fill"}/>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <h3
                                                                    className={
                                                                        "text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                                                                    }
                                                                >
                                                                    {passenger.surname} {passenger.name}
                                                                </h3>
                                                                <ArrowTop className={"rotate-180"}/>
                                                            </>
                                                        )}
                                                    </div>
                                                    {passenger.deleteCountdown ? (
                                                        <CountdownCircle
                                                            countdown={passenger.deleteCountdown}
                                                            onCancel={() => cancelDelete(passenger.id)}
                                                        />
                                                    ) : (
                                                        <button onClick={() => handleDelete(passenger.id)}
                                                                className={"min-w-5 min-h-5"}>
                                                            <TrashImg
                                                                className={"black-fill-hover black-stroke-hover transition"}/>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={"h-full"}>
                        <div className={"flex flex-col gap-2.5"}>
                            <h2 className={"text-base font-medium leading-none"}>Тариф</h2>
                            <hr className={"h-[1px] w-full rounded-[1px] bg-[#E5E7EA]"}/>
                        </div>
                        <div className={"flex items-center justify-center h-full"}>
                            <p className={"text-[#9B9FAD] text-md font-medium leading-none text-center mx-5"}>
                                Выберите тариф, чтобы узнать стоимость
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <button
                className={"min-h-[50px] transition w-full flex justify-center items-center py-4 rounded-[18px] bg-black disabled:bg-[#DCE0E5]"}
                disabled={!selectedTariffId}>
                <p className={`text-base leading-none ${selectedTariffId ? "text-primary" : "text-black"}`}>Забронировать</p>
            </button>
        </div>
    )
};

export {AeroOperations};