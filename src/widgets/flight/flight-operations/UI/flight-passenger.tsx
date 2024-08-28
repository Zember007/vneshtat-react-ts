import React, {useEffect, useState} from "react";
import ArrowTop from "@/assets/icons/arrow-top.svg?react";
import TrashImg from "@/assets/icons/trash.svg?react";
import InfoImg from "@/assets/icons/info.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";
import CrossImg from "@/assets/icons/cross.svg?react";
import {Passenger} from "@/shared/types";
import {CountdownCircle} from "@/shared/UI";

const FlightPassenger = () => {
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

    const [isCountdownActive, setIsCountdownActive] = useState(false);

    useEffect(() => {
        if (!isCountdownActive) return;

        const countdownInterval = setInterval(() => {
            const updatedPassengers = passengers.map((passenger) =>
                passenger.deleteCountdown !== null && passenger.deleteCountdown > 0
                    ? { ...passenger, deleteCountdown: passenger.deleteCountdown - 1 }
                    : passenger
            );

            const remainingPassengers = updatedPassengers.filter(
                (passenger) => passenger.deleteCountdown !== 0
            );

            setPassengers(remainingPassengers);

            if (!remainingPassengers.some((p) => p.deleteCountdown !== null)) {
                setIsCountdownActive(false);
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [passengers, isCountdownActive]);

    const handleDelete = (passengerId: number) => {
        const updatedPassengers = passengers.map((passenger) =>
            passenger.id === passengerId
                ? { ...passenger, deleteCountdown: 5 }
                : passenger
        );
        setPassengers(updatedPassengers);
        setIsCountdownActive(true);
    };

    const cancelDelete = (passengerId: number) => {
        const updatedPassengers = passengers.map((passenger) =>
            passenger.id === passengerId
                ? { ...passenger, deleteCountdown: null }
                : passenger
        );
        setPassengers(updatedPassengers);
    };

    return (
        <div className={"w-full"}>
            <div className={"flex justify-between items-center"}>
                <h3>Пассажиры</h3>
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"}/>
            <div className="h-[calc(100vh-423px)] overflow-y-auto scroll w-full flex flex-col py-2.5">
                {passengers.map((passenger, i) => (
                    <React.Fragment key={passenger.id}>
                        <div className={`flex gap-2.5 ${i !== 0 && "mt-2.5"}`}>
                            <div className="w-9 h-9 py-2 px-2.5 flex justify-start rounded-full bg-secondary">
                                <h3 className="text-xs font-medium uppercase">
                                    {passenger.surname[0] + passenger.name[1]}
                                </h3>
                            </div>
                            <div
                                onClick={() =>
                                    setActivePassenger(
                                        passenger.id === activePassenger
                                            ? null
                                            : passenger.id
                                    )
                                }
                                className="w-full bg-secondary rounded-primary flex items-center justify-between gap-1 py-2 px-2.5 cursor-pointer"
                            >
                                {passenger.deleteCountdown ? (
                                    <div className="flex items-center justify-between w-full" onClick={(e) => {
                                        e.stopPropagation();
                                        cancelDelete(passenger.id)
                                    }}>
                                        <h3 className="text-xs font-medium text-[#FF64A3]">
                                            Отменить удаление
                                        </h3>
                                        <CrossImg className="red-fill min-w-4 min-h-4" />
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                            {passenger.surname} {passenger.name}
                                        </h3>
                                        <ArrowTop
                                            className={`min-w-4 min-h-4 transition-transform duration-300 ${
                                                passenger.id === activePassenger
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </>
                                )}
                            </div>
                            {passenger.deleteCountdown ? (
                                <CountdownCircle
                                    countdown={passenger.deleteCountdown}
                                    onCancel={() => cancelDelete(passenger.id)}
                                />
                            ) : (
                                <button
                                    onClick={() => handleDelete(passenger.id)}
                                    className="min-w-5 min-h-5"
                                >
                                    <TrashImg className="black-fill-hover black-stroke-hover transition" />
                                </button>
                            )}
                        </div>
                        <div
                            className={`w-full bg-secondary rounded-primary overflow-hidden transition-all duration-300 ease-in-out ${
                                passenger.id === activePassenger
                                    ? "max-h-[500px] py-4 px-5 mt-2.5"
                                    : "max-h-0"
                            }`}
                        >
                            {passenger.id === activePassenger && (
                                <>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-base font-medium">
                                            Документы
                                        </h3>
                                        <InfoImg className="transition min-w-6 min-h-6 black-fill-hover" />
                                    </div>
                                    <div className="flex flex-col gap-1.5 mt-2.5">
                                        <div className="bg-primary py-2 px-2.5 gap-1 flex justify-between items-center rounded-primary">
                                            <h6 className="text-xs font-medium whitespace-nowrap">
                                                {passenger.password}
                                            </h6>
                                            <p className="text-xs text-[#9b9fad] whitespace-nowrap overflow-hidden text-ellipsis">
                                                Паспорт РФ
                                            </p>
                                        </div>
                                        <div className="bg-primary py-2 px-2.5 gap-1 flex justify-between items-center rounded-primary">
                                            <h6 className="text-xs font-medium whitespace-nowrap">
                                                {passenger.internationalPw}
                                            </h6>
                                            <p className="text-xs text-[#9b9fad] whitespace-nowrap overflow-hidden text-ellipsis">
                                                Загранпаспорт
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] my-2.5"}/>
            <button
                className={"w-full border border-solid border-[#e5e7ea] rounded-[23px] flex justify-between items-center py-4 px-4"}
            >
                <p className={"text-base text-[#787b86]"}>Добавить пассажира</p>
                <PlusImg className={"min-h-5 min-w-5"}/>
            </button>
        </div>
    );
};

export {FlightPassenger};