import { Link } from "react-router-dom";
import TelegramImg from "@/assets/icons/telegram.svg?react";
import CalendarImg from "@/assets/icons/google_calendar.svg?react";
import MailImg from "@/assets/icons/mail.svg?react";
import NotificationsImg from "@/assets/icons/notifications_desktop.svg?react";


const Notifications = ({ active }: { active: boolean }) => {
    return (
        <div className={`flex gap-[15px] transition-all duration-300 ${active && 'grow'}`}>
            <div className="rounded-[26px] bg-primary grow p-[30px] ">
                {!active &&
                    <div className="flex flex-col gap-[35px]">
                        <div className="flex flex-col gap-[10px]">
                            <span className="text-[#787B86] text-[25px] font-medium">Настройки уведомлений</span>
                            <p className="text-[#787B86] max-w-[350px]">Здесь можно настроить категории уведомлений, привязать к ним почту и мессенджеры.</p>
                        </div>

                        <Link to={'/settings/notifications'} className="text-center self-end w-[255px] rounded-[18px] bg-[#ECEEF1] py-[15px]">
                            <p>Перейти к настройкам</p>
                        </Link>
                    </div>
                }
                {
                    active &&
                    
                    <div className="flex flex-col gap-[20px]">
                        <span className="text-[25px] font-medium">Настройки уведомлений</span>
                        <div className="flex flex-col gap-[10px]">
                            <div className="p-[14px] rounded-[23px] bg-[#ECEEF1] flex items-center justify-between">
                                <div className="flex gap-[20px] items-center">
                                    <TelegramImg />
                                    <div className="flex flex-col *:leading-[1.2]">
                                        <span className="font-medium">Привязка Telegram</span>
                                        <span className="font-medium text-[#787B86]">Чат-бот Внештата</span>
                                    </div>
                                </div>
                                <button className="py-[9px] px-[25px] rounded-[13px] bg-black">
                                    <p className="text-[14px] font-medium text-primary">Привязать</p>
                                </button>
                            </div>
                            <div className="p-[14px] rounded-[23px] bg-[#ECEEF1] flex items-center justify-between">
                                <div className="flex gap-[20px] items-center">
                                    <CalendarImg />
                                    <div className="flex flex-col *:leading-[1.2]">
                                        <span className="font-medium">Google Календарь</span>
                                        <span className="font-medium text-[#787B86]">Все дела в единой системе</span>
                                    </div>
                                </div>
                                <button className="py-[9px] px-[25px] rounded-[13px] bg-black">
                                    <p className="text-[14px] font-medium text-primary">Привязать</p>
                                </button>
                            </div>
                            <div className="p-[14px] rounded-[23px] bg-[#ECEEF1] flex items-center justify-between">
                                <div className="flex gap-[20px] items-center">
                                    <MailImg />
                                    <div className="flex flex-col *:leading-[1.2]">
                                        <span className="font-medium">Привязка почты</span>
                                        <span className="font-medium text-[#787B86]">Настройка категорий писем</span>
                                    </div>
                                </div>
                                <button className="py-[9px] px-[25px] rounded-[13px] bg-black">
                                    <p className="text-[14px] font-medium text-primary">Привязать</p>
                                </button>
                            </div>
                            <div className="p-[14px] rounded-[23px] bg-[#ECEEF1] flex items-center justify-between">
                                <div className="flex gap-[20px] items-center">
                                    <NotificationsImg />
                                    <div className="flex flex-col *:leading-[1.2]">
                                        <span className="font-medium">Уведомления на рабочем столе</span>
                                        <span className="font-medium text-[#787B86]">Браузерные уведомления</span>
                                    </div>
                                </div>
                                <button className="py-[9px] px-[25px] rounded-[13px] bg-black">
                                    <p className="text-[14px] font-medium text-primary">Привязать</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                }
            </div>
            <div className="rounded-[26px] bg-primary min-w-[300px] p-[20px]"></div>
        </div>
    );
};

export { Notifications };