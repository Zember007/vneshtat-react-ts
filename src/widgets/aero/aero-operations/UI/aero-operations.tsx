import { useState } from "react";
/* import { mockTariff } from "@/widgets/aero/aero-content/utils"; */
import TeamIng from "@/assets/icons/team.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import TicketImg from "@/assets/icons/ticket.svg?react";
import { Passenger } from "@/shared/types";
import { Dropdown, PassengerItem } from "@/shared/UI";


const AeroOperations = () => {

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

    const links = [
        {
            icon: RouteImg,
            code: 'route'
        },
        {
            icon: TeamIng,
            code: 'team'
        },
        {
            icon: TicketImg,
            code: 'ticket'
        }
    ]

    const [activeFilter, setActiveFilter] = useState<string>('route')


    return (

        <div className={"p-[20px] h-full flex flex-col gap-[20px]"}>

            <div className="flex gap-[10px]">
                {links.map((item) => (
                    <button
                        onClick={() => { setActiveFilter(item.code) }}
                        className={`w-[35px] h-[35px] flex items-center justify-center rounded-[11px] ${activeFilter !== item.code ? 'bg-[#ECEEF1]' : 'bg-[#121212]'}`}>
                        <item.icon className={`w-[19px] h-[19px] ${activeFilter === item.code ? '*:fill-[#FAFAFA]' : '*:fill-[#121212]'}`} />
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-[10px]">
                <h3 className="font-medium text-[16px]">{activeFilter === 'route' ? 'Маршрут' : activeFilter === 'team' ? 'Пассажиры' : ''}</h3>
                <hr className="h-[1px] bg-[#E5E7EA]" />
                {
                    activeFilter === 'route' &&
                    <>


                        <div className="flex flex-col gap-[15px]">
                            <span className="font-medium text-[14px]">Тип транспорта</span>
                            <Dropdown
                                isAbsoluteDrop={true}
                                title="Тип"
                                extraClassBox="!rounded-[13px] h-[30px] w-full"
                                extraClass=" !py-[9px] !px-[15px] "
                                extraClassTitle="!text-[#787B86] !text-[12px]"
                            >
                                <></>
                            </Dropdown>
                        </div>

                        <hr className="h-[1px] bg-[#E5E7EA]" />

                        <div className="flex flex-col gap-[15px]">
                            <span className="font-medium text-[14px]">Тип билета</span>
                            <Dropdown
                                isAbsoluteDrop={true}
                                title="Билет"
                                extraClassBox="!rounded-[13px] h-[30px] w-full"
                                extraClass=" !py-[9px] !px-[15px] "
                                extraClassTitle="!text-[#787B86] !text-[12px]"
                            >
                                <></>
                            </Dropdown>
                        </div>

                        <hr className="h-[1px] bg-[#E5E7EA]" />

                        <div className="flex flex-col gap-[15px]">
                            <span className="font-medium text-[14px]">Тариф</span>
                            <Dropdown
                                isAbsoluteDrop={true}
                                title="Тариф"
                                extraClassBox="!rounded-[13px] h-[30px] w-full"
                                extraClass=" !py-[9px] !px-[15px] "
                                extraClassTitle="!text-[#787B86] !text-[12px]"
                            >
                                <></>
                            </Dropdown>
                        </div>
                    </>
                }

                {activeFilter === 'team' &&
                    <>
                        {passengers.map((item) => ((
                            <PassengerItem
                                delete={(id: number) => {setPassengers(passengers.filter(item => item.id !== id))}}
                                id={item.id}
                                name={item.name}
                                internationalPassport={item.internationalPw}
                                passport={item.password}
                                surname={item.surname}
                                key={item.id}
                                extraClassName="max-w-[100px]"
                            />
                        )))}
                    </>
                }

            </div>

        </div>

    )
};

export { AeroOperations };