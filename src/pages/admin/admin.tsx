import {useEffect, useRef, useState} from "react";
import {getDayOfWeek} from "@/shared/utils";
import {Input} from "@/shared/UI";
import ReCAPTCHA from "react-google-recaptcha";

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
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async () => {
        if (captchaToken && phoneNumber) {
            const data = {
                phoneNumber: phoneNumber,
                ReCaptchaResponse: captchaToken
            };

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/auth/sign_in/auth_token_by_phone?PhoneNumber=${encodeURIComponent(data.phoneNumber)}&ReCaptchaResponse=${encodeURIComponent(data.ReCaptchaResponse)}`
                );
                const responseData = await response.json();
                console.log("data", responseData);
                console.log("Успех:", response);
            } catch (error) {
                console.error("Ошибка при отправке данных:", error);
            }

            if (recaptchaRef.current) {
                recaptchaRef.current?.reset();
            }
            setCaptchaToken(null);
        } else {
            alert("Пожалуйста, введите номер телефона и подтвердите капчу.");
        }
    };

    const getStatusText = (status: UserStatus): string => {
        switch (status) {
            case "in_queue":
                return "В очереди ожидания";
            case "in_progress":
                return "В процессе заполнения";
            case "completed":
                return "Регистрация завершена, подключение к компании";
            default:
                return "Неизвестный статус";
        }
    };

    const getDate = (date: string): string => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${String(newDate.getMonth() + 1).padStart(2, "0")}/${newDate.getFullYear()} в ${newDate.getHours()}:${newDate.getMinutes()}, ${getDayOfWeek(newDate)}`;
    };

    const handleApprove = async (id: number) => {
        const formdata = new FormData();
        formdata.append("id", id.toString());
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/temp_app/control_consultation_proposals`, {
            method: "POST",
            body: formdata,
        });
        const data = await res.json();
        if (data.status === "success") {
            setUsers((prev) => prev.filter((user) => user.id !== id));
        }
    };

    useEffect(() => {
        const getConsultationProposal = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/temp_app/control_consultation_proposals`);
            const data = await res.json();
            if (data.status === "success") {
                setUsers(data.data);
            }
        };

        getConsultationProposal();
    }, []);

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
            <div className={"flex items-center flex-col gap-4"}>
                <Input placeholder={"Номер телефона"} type={"phone"} value={phoneNumber} onChange={handlePhoneNumberChange}/>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTHCA}
                    onChange={handleCaptchaChange}
                />
                <button className={"px-8 py-2 bg-black rounded-primary text-primary"} onClick={handleSubmit}>Отправить</button>
            </div>
        </div>
    )
};

export default Admin;