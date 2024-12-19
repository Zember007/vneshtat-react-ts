import { useState, useEffect } from "react";
import TrashImg from "@/assets/icons/trash.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";
import CrossImg from "@/assets/icons/cross.svg?react";
import { Passenger } from "@/shared/types";
import { CountdownCircle } from "@/shared/UI";
import SimpleBar from "simplebar-react";
import { PassengerItem } from "@/shared/UI";

const JourneyPassenger = () => {

    const [employeeAdd, setEmployeeAdd] = useState<boolean>(false)

    const [passengers, setPassengers] = useState<Passenger[]>([
        {
            id: 1,
            name: "Иван",
            surname: "Вознесенский",
            password: "3333333 333333",
            internationalPw: "77 7777 777777777",
        },
        {
            id: 2,
            name: "Татьяна",
            surname: "Соколова",
            password: "3333333 22233242",
            internationalPw: "77 34343 7777",
        },
        {
            id: 3,
            name: "Анастасия",
            surname: "Грибоедова",
            password: "3333333 444444",
            internationalPw: "77 7777 3435353",
        },
    ]);


    return (
        <div className={"w-full"}>
            <div className={"flex justify-between items-center"}>
                <h3>Пассажиры</h3>
            </div>
            <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] mt-2.5"} />
            <div className="h-full  flex flex-col justify-between">
                <SimpleBar className="h-[calc(100vh-420px)]">
                    <div className=" w-full flex flex-col gap-[10px] py-2.5">
                        {passengers.map((passenger) => (
                            <PassengerItem delete={() => {
                                const remainingPassengers = passengers.filter(
                                    (item) => item.id !== passenger.id
                                );

                                setPassengers(remainingPassengers);
                            }} internationalPassport={passenger.internationalPw} id={passenger.id} name={passenger.name} passport={passenger.password} surname={passenger.surname} key={passenger.id} />
                        ))}

                        {employeeAdd &&
                            <CartEmployee add={() => { setEmployeeAdd(false) }} />
                        }
                    </div>
                </SimpleBar>
                <div>
                    <hr className={"h-[1px] bg-[#E5E7EA] rounded-[1px] my-2.5"} />
                    <button
                        onClick={() => { setEmployeeAdd(true) }}
                        className={"w-full border border-solid border-[#e5e7ea] rounded-[23px] flex justify-between items-center py-4 px-4"}
                    >
                        <p className={"text-base text-[#787b86]"}>Добавить пассажира</p>
                        <PlusImg className={"min-h-5 min-w-5"} />
                    </button>
                </div>
            </div>
        </div>
    );
};

interface props {
    id?: number;
    name?: string;
    surname?: string;
    middlename?: string;
    add?: Function;
    departamentId?: number;
}


import { RootState } from "@/app/config/store";
import { useSelector } from "react-redux";


const CartEmployee = (props: props) => {

    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null)
    const [searchEmployee, setSearchEmployee] = useState<string>('')

    useEffect(() => {

        if (deleteCountdown === 0 && props.id) {
            // delete
        }

        if (!deleteCountdown) {
            return;
        }

        const countdownInterval = setInterval(() => {


            if (deleteCountdown !== 0) {
                setDeleteCountdown(deleteCountdown - 1)
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [deleteCountdown]);

    const cancelDelete = () => {
        setDeleteCountdown(null);
    }

    const Staffers = useSelector((state: RootState) => state.employees.Passengers);

    const Staffers_find = Staffers.filter(item => {
        if (searchEmployee.length > 0) {
            let data = searchEmployee.split(' ')
            let flag = 0
            data.map(itemSearch => {
                if (item.Name.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase()) || item.Surname.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase()) || item.MiddleName.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase())) {
                    flag = 1
                }
            })

            if (flag) {
                return true
            }
        }
        return false
    })


    return (
        <div className="relative w-full">
            <div className={`w-full flex gap-2.5`}>
                <div className="min-w-9 h-9  flex justify-center items-center rounded-full bg-secondary">
                    <h3 className="text-xs font-medium uppercase">
                        {props.surname && props.name &&
                            <>
                                {props.surname[0] + props.name[0]}
                            </>
                        }
                    </h3>
                </div>
                <div
                    className="grow bg-secondary rounded-primary flex items-center justify-between gap-1 py-2 px-2.5"
                >
                    {deleteCountdown ? (
                        <div className="flex items-center justify-between grow" onClick={(e) => {
                            e.stopPropagation();
                            cancelDelete();
                        }}>
                            <h3 className="text-xs font-medium text-[#FF64A3]">
                                Отменить удаление
                            </h3>
                            <button>
                                <CrossImg className="red-fill min-w-4 min-h-4" />
                            </button>
                        </div>
                    ) : (
                        <>
                            {!props.add ?
                                <h3 className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{props.surname} {props.name} {props.middlename}</h3>
                                :
                                <input className="text-xs font-medium bg-[transparent]" value={searchEmployee} onInput={(e) => { setSearchEmployee(e.currentTarget.value) }} />
                            }
                        </>
                    )}
                </div>
                {deleteCountdown && (
                    <CountdownCircle
                        countdown={deleteCountdown}
                        onCancel={() => cancelDelete()}
                    />

                )}
                {
                    !deleteCountdown && !props.add && (
                        <button
                            onClick={() => setDeleteCountdown(5)}
                            className="min-w-5 min-h-5"
                        >
                            <TrashImg className="black-fill-hover black-stroke-hover transition" />
                        </button>
                    )
                }
            </div>
            <div className={`p-[15px] rounded-[26px] bg-[#ECEEF1] flex flex-col gap-[5px] absolute bottom-[-6px] right-0 left-0 translate-y-[100%] z-[10] transition-all duration-300 ${!Staffers_find.length && 'opacity-[0] invisible'}`}>
                {
                    Staffers_find.map(item => (
                        <button
                            className="px-[9px] h-[30px] flex items-center rounded-[12px] bg-primary">
                            <span className="text-[11px] font-medium leading-[1]">{item.Surname} {item.Name}</span>
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export { JourneyPassenger };
