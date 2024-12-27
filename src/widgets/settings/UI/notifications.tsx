import { Link } from "react-router-dom";
import TelegramImg from "@/assets/icons/telegram.svg?react";
import CalendarImg from "@/assets/icons/google_calendar.svg?react";
import MailImg from "@/assets/icons/mail.svg?react";
import NotificationsImg from "@/assets/icons/notifications_desktop.svg?react";
import { useEffect, useState } from "react";
import Telegram from "./services_notifications/Telegram";
import Mail from "./services_notifications/Mail";
import GoogleCalendar from "./services_notifications/GoogleCalendar";
import Desktop from "./services_notifications/Desktop";
import { getAccessToken } from "@/shared/utils";

interface telegram {
    "Username": string
}

interface calendar {
    "Email": string
}

interface notificationsData {
    "Email": string,
    "Telegramm": telegram[],
    "GoogleCalendar": calendar[]
}

const Notifications = ({ active }: { active: boolean }) => {

    const [activeTab, setActiveTab] = useState<string | null>(null)
    const [notificationsData, setNotificationsData] = useState<notificationsData>()

    useEffect(() => {
        if (!active) {
            setActiveTab(null)
        }
    }, [active])

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/user/settings/get_email_notifications');
        url.searchParams.append('EmployeeId', EmployeeId || '');

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {
                const information = data.data
                setNotificationsData(information)

            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
    }, [])
    return (
        <div className={`flex gap-[15px] transition-all duration-300 ${active && 'grow'}`}>
            <div className="rounded-[26px] bg-primary grow p-[20px] ">

                <div className={`flex flex-col overflow-hidden transition-all duration-300`}>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-[10px]">
                            <span className={`${!active && 'text-[#787B86]'} text-[25px] font-medium`}>Настройки уведомлений</span>
                            {!active && <p className="text-[#787B86] max-w-[530px]">Здесь можно настроить категории уведомлений, привязать к ним почту и мессенджеры.</p>}
                        </div>

                        {!active && <Link to={'/settings/notifications'} className="text-center self-end w-[255px] rounded-[18px] bg-[#ECEEF1] py-[15px]">
                            <p>Перейти к настройкам</p>
                        </Link>}
                    </div>
                    <div className={`flex flex-col gap-[10px] transition-all duration-300 mt-[20px] overflow-hidden max-h-[330px] ${!active && '!max-h-[0px] !mt-[0px]'}`}>
                        <div className="p-[14px] rounded-[23px] bg-[#ECEEF1] flex items-center justify-between">
                            <div className="flex gap-[20px] items-center">
                                <TelegramImg />
                                <div className="flex flex-col *:leading-[1.2]">
                                    <span className="font-medium">Привязка Telegram</span>
                                    <span className="font-medium text-[#787B86]">Чат-бот Внештата</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-[15px]">
                                {notificationsData?.Telegramm.length && <span className="text-[#787B86] text-[14px] font-medium">Привязан</span>}
                                <button
                                    onClick={() => setActiveTab('telegram')}
                                    className={`py-[9px] px-[25px] rounded-[13px] bg-black w-[119px] duration-300 transition-all ${activeTab === 'telegram' && '!bg-primary'}`}>
                                    <p className={`text-[14px] font-medium text-primary duration-300 transition-all ${activeTab === 'telegram' && '!text-[#007BFB]'}`}>{activeTab === 'telegram' ? 'Инфо' : 'Привязать'}</p>
                                </button>
                            </div>
                        </div>
                        <div className="p-[14px] rounded-[23px] bg-[#ECEEF1] flex items-center justify-between">
                            <div className="flex gap-[20px] items-center">
                                <CalendarImg />
                                <div className="flex flex-col *:leading-[1.2]">
                                    <span className="font-medium">Google Календарь</span>
                                    <span className="font-medium text-[#787B86]">Все дела в единой системе</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-[15px]">
                                {notificationsData?.GoogleCalendar.length && <span className="text-[#787B86] text-[14px] font-medium">Привязан</span>}
                                <button
                                    onClick={() => { setActiveTab('calendar') }}
                                    className={`py-[9px] px-[25px] rounded-[13px] bg-black w-[119px] duration-300 transition-all ${activeTab === 'calendar' && '!bg-primary'}`}>
                                    <p className={`text-[14px] font-medium text-primary duration-300 transition-all ${activeTab === 'calendar' && '!text-[#007BFB]'}`}>{activeTab === 'calendar' ? 'Инфо' : 'Привязать'}</p>
                                </button>
                            </div>
                        </div>
                        <div className="p-[14px] rounded-[23px] bg-[#ECEEF1] flex items-center justify-between">
                            <div className="flex gap-[20px] items-center">
                                <MailImg />
                                <div className="flex flex-col *:leading-[1.2]">
                                    <span className="font-medium">Привязка почты</span>
                                    <span className="font-medium text-[#787B86]">Настройка категорий писем</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-[15px]">
                                {notificationsData?.Email && <span className="text-[#787B86] text-[14px] font-medium">Привязан</span>}
                                <button
                                    onClick={() => { setActiveTab('mail') }}
                                    className={`py-[9px] px-[25px] rounded-[13px] bg-black w-[119px] duration-300 transition-all ${activeTab === 'mail' && '!bg-primary'}`}>
                                    <p className={`text-[14px] font-medium text-primary duration-300 transition-all ${activeTab === 'mail' && '!text-[#007BFB]'}`}>{activeTab === 'mail' ? 'Инфо' : 'Привязать'}</p>
                                </button>
                            </div>
                        </div>
                        <div className="p-[14px] rounded-[23px] bg-[#ECEEF1] flex items-center justify-between">
                            <div className="flex gap-[20px] items-center">
                                <NotificationsImg />
                                <div className="flex flex-col *:leading-[1.2]">
                                    <span className="font-medium">Уведомления на рабочем столе</span>
                                    <span className="font-medium text-[#787B86]">Браузерные уведомления</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-[15px]">
                                {/* <span className="text-[#787B86] text-[14px] font-medium">Включены</span> */}
                                <button
                                    onClick={() => { setActiveTab('desktop') }}
                                    className={`py-[9px] px-[25px] rounded-[13px] bg-black w-[119px] duration-300 transition-all ${activeTab === 'desktop' && '!bg-primary'}`}>
                                    <p className={`text-[14px] font-medium text-primary duration-300 transition-all ${activeTab === 'desktop' && '!text-[#007BFB]'}`}>{activeTab === 'desktop' ? 'Инфо' : 'Привязать'}</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="rounded-[26px] bg-primary w-[300px] p-[20px]">
                {activeTab === 'telegram' && <Telegram  close={() => { setActiveTab(null) }} />}
                {activeTab === 'mail' && <Mail close={() => { setActiveTab(null) }} />}
                {activeTab === 'calendar' && <GoogleCalendar close={() => { setActiveTab(null) }} />}
                {activeTab === 'desktop' && <Desktop close={() => { setActiveTab(null) }} />}
                {active && !activeTab &&
                    <div className="h-full flex items-center justify-center">
                        <p className="text-[#787B86] px-[20px]">
                            Чтобы точно не пропустить ничего важного. Каждый пользователь может настроить уведомления под себя.
                        </p>
                    </div>
                }
            </div>
        </div>
    );
};

export { Notifications };