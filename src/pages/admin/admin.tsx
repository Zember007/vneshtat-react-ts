import {useEffect, useState} from "react";
import {getDayOfWeek} from "@/shared/utils";

type UserStatus = "in_queue" | "in_progress" | "completed";

interface User {
    id: number
    CompanyName: string
    Email: string
    PhoneNumber: string
    FullName: string
    IsCEO: boolean
    Processed: boolean
    Status: UserStatus
    SubmissionDate: string
    TravelFrequency: string
}

const Admin = () => {
    const [users, setUsers] = useState<User[]>([]);

    const getStatusText = (status: UserStatus): string => {
        if (status === "in_queue") return "В очереди ожидания";
        if (status === "in_progress") return "В процессе заполнения";
        if (status === "completed") return "Регистрация завершена, подключение к компании";
        return "Неизвестный статус";
    };

    const getDate = (date: string) => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${String(newDate.getMonth() + 1).padStart(2, "0")}/${newDate.getFullYear()} в ${newDate.getHours()}:${newDate.getMinutes()}, ${getDayOfWeek(newDate)}`
    }

    const handleApprove = async (id: number) => {
        const formdata = new FormData();
        formdata.append("id", id.toString())
        const res = await fetch(import.meta.env.VITE_API_URL + "/admin/temp_app/control_consultation_proposals", {
            method: "POST",
            body: formdata
        })
        const data = await res.json();
        if (data.status === "success") setUsers(prev => prev.filter((user) => user.id !== id))
    }

    useEffect(() => {
        const getConsultationProposal = async () => {
            const res = await fetch(import.meta.env.VITE_API_URL + "/admin/temp_app/control_consultation_proposals");
            const data = await res.json();
            if (data.status === "success") setUsers(data.data)
        }

        getConsultationProposal()
    }, [])

    return (
        <div className={"grid grid-cols-2 p-5 px-8 gap-5 overflow-y-scroll hidden-scroll"}>
            {users.length ? users.map((user) => (
                <div key={user.id} className={"w-full p-5 bg-primary rounded-[26px] flex justify-between"}>
                    <div className={"flex flex-col gap-2"}>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>#:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{user.id}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>Название компании:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{user.CompanyName}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>Почта:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{user.Email}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>Номер телефона:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{user.PhoneNumber}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>Полное имя:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{user.FullName}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>Ген. директор:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{user.IsCEO ? "Да" : "Нет"}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>Обработано:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{user.Processed ? "Да" : "Нет"}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>Статус:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{getStatusText(user.Status)}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>День подачи заявки:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{getDate(user.SubmissionDate)}</h6>
                    </span>
                        <span className={"flex items-center gap-5"}>
                        <h1 className={"text-xl leading-none text-[#9B9FAD]"}>Частота бизнес поездок:</h1>
                        <h6 className={"text-lg leading-none font-medium"}>{user.TravelFrequency}</h6>
                    </span>
                    </div>
                    <div className={"flex items-end justify-end gap-4"}>
                        <button className={"py-2 px-6 h-9 bg-[#FF64A3] rounded-primary"}>
                            <p className={"text-primary leading-none"}>Отклонить</p>
                        </button>
                        <button className={"py-2 px-6 h-9 bg-black rounded-primary"}
                                onClick={() => handleApprove(user.id)}>
                            <p className={"text-primary leading-none"}>Подтвердить</p>
                        </button>
                    </div>
                </div>
            )) : (
                <h1>Нет пользователей для просмотра</h1>
            )}
        </div>
    )
};

export default Admin;