import Layout from "@/app/layouts/layout";

import DownloadImg from '@/assets/icons/download.svg?react'
import MapImg from '@/assets/icons/map.svg?react'
import MessageImg from '@/assets/icons/message.svg?react'
import NotifyImg from '@/assets/icons/notify-blue.svg?react'
import SuccessImg from '@/assets/icons/success-blue.svg?react'
import WarnImg from '@/assets/icons/warn.svg?react'
import TeamImg from '@/assets/icons/team-jorney.svg?react'
import HistoryImg from '@/assets/icons/history-jorney.svg?react'
import FinanceImg from '@/assets/icons/finance-jorney.svg?react'
import PlusImg from '@/assets/icons/plus.svg?react'
import PlaneImg from "@/assets/icons/plane.svg?react";
import BusImg from "@/assets/icons/bus.svg?react";
import BedImg from "@/assets/icons/bed.svg?react";

const JorneyInformation = () => {
    return (
        <Layout
            component={
                <div className="flex flex-col gap-[15px] grow">
                    <div className="rounded-[26px] p-[15px] bg-primary flex items-center justify-between">
                        <span className='text-[20px] font-medium text-[#787B86]'>Информация о поездке</span>
                        <div className="flex gap-[5px]">
                            <button className="w-[35px] h-[35px] flex items-center justify-center rounded-[11px] bg-[#ECEEF1]">
                                <DownloadImg />
                            </button>
                            <button onClick={() => { close() }} className="bg-[#ECEEF1] rounded-[13px] w-[216px] text-[#787B86]">Закрыть</button>
                        </div>
                    </div>
                    <div className="flex gap-[15px] grow w-full">
                        <div className="flex flex-col gap-[15px] grow">
                            <div className="rounded-[26px] p-[15px] bg-primary flex flex-col gap-[10px]">
                                <div className="rounded-[23px] bg-[#007BFB] py-[20px] flex flex-col items-center text-center *:text-primary">
                                    <span className='text-[18px] font-medium'>55 дней 22 часа</span>
                                    <span className='text-[12px]'>до начала поездки</span>
                                </div>
                                <div className="flex gap-[5px]">
                                    <button className="bg-[#ECEEF1] rounded-[13px] px-[10px]">
                                        <DownloadImg className='w-[25px] h-[25px]' />
                                    </button>
                                    <button className="bg-[#ECEEF1] rounded-[13px] px-[10px]">
                                        <MapImg className='w-[25px] h-[25px]' />
                                    </button>
                                    <div className="flex flex-col gap-[5px] grow">
                                        <button className="bg-[#ECEEF1] rounded-[13px] py-[8.5px] px-[15px] flex gap-[5px] items-center justify-center">
                                            <NotifyImg />
                                            <span className='text-[14px]'>Уведомления</span>
                                        </button>
                                        <button className="bg-[#ECEEF1] rounded-[13px] py-[8.5px] px-[15px] flex gap-[5px] items-center justify-center">
                                            <MessageImg className='w-[18px] h-[18px] blue-fill' />
                                            <span className='text-[14px]'>Чат поездки</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-[#ECEEF1] rounded-[13px] py-[8.5px] px-[15px] flex gap-[5px] items-center justify-center">
                                    <SuccessImg />
                                    <span className='text-[14px]'>Согласование не требуется</span>
                                </div>
                            </div>
                            <div className="rounded-[26px] p-[15px] bg-primary grow flex flex-col gap-[40px] justify-center">
                                <div className="flex flex-col gap-[10px] items-center">
                                    <WarnImg />
                                    <div className="flex flex-col gap-[5px] text-center">
                                        <span className='text-[18px] font-medium text-[#787B86]'>Информация</span>
                                        <p className='text-[12px] text-[#787B86]'>Название поездки, контактное лицо, проект, центр затрат и ID поездки.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <div className="bg-[#ECEEF1] rounded-[13px] py-[8.5px] px-[15px] flex gap-[5px] items-center justify-center">
                                        <SuccessImg />
                                        <span className='text-[14px]'>Данные заполнены</span>
                                    </div>
                                    <div className="bg-[#ECEEF1] rounded-[13px] py-[8.5px] px-[15px] flex gap-[5px] items-center justify-center">
                                        <span className='text-[14px]'>T7G6-2356</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[26px] p-[15px] bg-primary grow flex flex-col justify-between gap-[10px]">
                            <div className="flex flex-col gap-[40px]">
                                <div className="flex flex-col gap-[10px] items-center">
                                    <TeamImg />
                                    <div className="flex flex-col gap-[5px] text-center">
                                        <span className='text-[18px] font-medium text-[#787B86]'>Участники</span>
                                        <p className='text-[12px] text-[#787B86]'>Ваши паспортные данные, документы и трудовой договор.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex gap-[5px]">
                                        <div className="bg-[#ECEEF1] rounded-[13px] py-[10px] px-[15px] flex flex-col grow">
                                            <span className='text-[12px] font-medium'>Иван Полторацкий</span>
                                            <span className='text-[10px]  text-[#007BFB]'>Онлайн</span>
                                        </div>
                                        <button className="bg-[#ECEEF1] rounded-[13px] px-[8px]">
                                            <DownloadImg className='w-[18px] h-[18px]' />
                                        </button>
                                        <button className="bg-[#ECEEF1] rounded-[13px] px-[8px]">
                                            <MapImg className='w-[18px] h-[18px]' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className='rounded-[23px] border border-solid border-[#E5E7EA] p-[13px] flex justify-between items-center'>
                                <span className='text-[#787B86] text-[12px] font-normal'>Добавить сотрудника</span>
                                <PlusImg className='w-[14px] h-auto' />
                            </button>
                        </div>
                        <div className="flex flex-col gap-[15px]">
                            <div className="rounded-[26px] p-[15px] pb-[25px] bg-primary">
                                <div className="flex flex-col gap-[10px] items-center">
                                    <HistoryImg />
                                    <div className="flex flex-col gap-[5px] text-center">
                                        <span className='text-[18px] font-medium text-[#787B86]'>История действий</span>
                                        <p className='text-[12px] text-[#787B86]'>Информация о тратах в поездке по категориям.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-[26px] p-[15px] bg-primary flex flex-col gap-[40px] grow">
                                <div className="flex flex-col gap-[10px] items-center">
                                    <FinanceImg />
                                    <div className="flex flex-col gap-[5px] text-center">
                                        <span className='text-[18px] font-medium text-[#787B86]'>Финансы</span>
                                        <p className='text-[12px] text-[#787B86]'>Информация о тратах в поездке по категориям.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-[10px]">
                                        <div className="p-[20px] rounded-[10px] bg-[#ECEEF1]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none">
                                                <path d="M4.01384 56.2328C0.404155 48.9044 -0.81315 40.6274 0.533704 32.5701C1.88056 24.5127 5.72356 17.0816 11.5204 11.3256C17.3173 5.56956 24.7753 1.77914 32.842 0.489242C40.9087 -0.80066 49.1768 0.475083 56.4795 4.13644L49.7699 17.519C45.2703 15.2631 40.176 14.4771 35.2058 15.2718C30.2355 16.0666 25.6403 18.402 22.0686 21.9486C18.4969 25.4951 16.1291 30.0737 15.2992 35.0382C14.4694 40.0027 15.2194 45.1025 17.4435 49.6179L4.01384 56.2328Z" fill="#FF866E" />
                                                <path d="M69.3475 63.4954C65.234 68.5917 59.9034 72.57 53.8473 75.0632C47.7912 77.5565 41.2048 78.4846 34.6956 77.7617C28.1863 77.0389 21.9639 74.6884 16.6024 70.9272C11.2409 67.166 6.91292 62.1152 4.01771 56.2406L17.4459 49.6227C19.2298 53.2423 21.8964 56.3543 25.1999 58.6718C28.5033 60.9892 32.3372 62.4374 36.3478 62.8828C40.3585 63.3282 44.4167 62.7564 48.1481 61.2201C51.8795 59.6839 55.1639 57.2327 57.6984 54.0927L69.3475 63.4954Z" fill="#F7D8D0" />
                                                <path d="M68.9933 14.0721C74.7531 21.0023 77.9353 29.7132 77.999 38.7242C78.0628 47.7352 75.0041 56.4903 69.3428 63.5013L57.6955 54.0963C61.1837 49.7765 63.0683 44.3822 63.029 38.8301C62.9897 33.278 61.029 27.9108 57.4802 23.6408L68.9933 14.0721Z" fill="#9761FF" />
                                                <path d="M56.4769 4.13517C61.2922 6.54894 65.5552 9.93398 68.9974 14.077L57.4827 23.6438C55.3618 21.0912 52.7352 19.0055 49.7683 17.5183L56.4769 4.13517Z" fill="#BFBEFC" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-[5px] w-full">
                                            <div className="flex justify-between items-center p-[6px] rounded-[10px] bg-[#ECEEF1]">
                                                <div className="flex items-stretch gap-[8px]">
                                                    <div className="w-[7px] rounded-[6px] bg-[#BFBEFC]"></div>
                                                    <PlaneImg className='w-[18px] h-[18px] *:fill-[#8C909C]' />
                                                </div>
                                                <span className='text-[12px] font-medium'>8470 ₽</span>
                                            </div>
                                            <div className="flex justify-between items-center p-[6px] rounded-[10px] bg-[#ECEEF1]">
                                                <div className="flex items-stretch gap-[8px]">
                                                    <div className="w-[7px] rounded-[6px] bg-[#9761FF]"></div>
                                                    <BusImg className='w-[18px] h-[18px] *:fill-[#8C909C]' />
                                                </div>
                                                <span className='text-[12px] font-medium'>8470 ₽</span>
                                            </div>
                                            <div className="flex justify-between items-center p-[6px] rounded-[10px] bg-[#ECEEF1]">
                                                <div className="flex items-stretch gap-[8px]">
                                                    <div className="w-[7px] rounded-[6px] bg-[#F7D8D0]"></div>
                                                    <BedImg className='w-[18px] h-[18px] *:fill-[#8C909C]' />
                                                </div>
                                                <span className='text-[12px] font-medium'>8470 ₽</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            information={
                <div>
                    
                </div>
            }

            navigation={false}
        />

    );
};

export default JorneyInformation;