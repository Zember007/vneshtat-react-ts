import ArrowImg from '@/assets/icons/arrow-long.svg?react'
import CartImg from '@/assets/icons/cart.svg?react'
import TimeImg from '@/assets/icons/time.svg?react'
import TimerImg from '@/assets/icons/timer.svg?react'

const OpenInformation = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div
            className={`overflow-hidden transition-all h-full ml-[335px] mt-[85px] ultra:ml-[255px] flex gap-[15px] ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="flex flex-col gap-[15px] grow">
                <div className="flex gap-[10px] justify-between">
                    <div className="flex gap-[10px]">
                        <div className="rounded-[26px] w-[110px] h-[110px] bg-primary p-[8px]">
                            <div className="rounded-[19px] border h-full border-solid border-[#E5E7EA] p-[12px]">
                                <span className="text-[11px] font-medium text-[#9B9FAD]">Обновление</span>
                            </div>
                        </div>
                        <div className="rounded-[26px] w-[110px] h-[110px] bg-primary p-[8px]">
                            <div className="rounded-[19px] border h-full border-solid border-[#E5E7EA] p-[12px]">
                                <span className="text-[11px] font-medium text-[#9B9FAD]">Обновление</span>
                            </div>
                        </div>
                        <div className="rounded-[26px] w-[110px] h-[110px] bg-primary p-[8px]">
                            <div className="rounded-[19px] border h-full border-solid border-[#E5E7EA] p-[12px]">
                                <span className="text-[11px] font-medium text-[#9B9FAD]">Новости</span>
                            </div>
                        </div>
                        <div className="rounded-[26px] w-[110px] h-[110px] bg-primary p-[8px]">
                            <div className="rounded-[19px] border h-full border-solid border-[#E5E7EA] p-[12px]">
                                <span className="text-[11px] font-medium text-[#9B9FAD]">Рекомендуем</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-[26px] w-[110px] h-[110px] border border-solid border-[#E5E7EA] flex items-center justify-center">
                        <button className='w-[36px] h-[36px] rounded-[50%] bg-primary flex items-center justify-center'>
                            <ArrowImg className='h-[18px] w-[18px] rotate-[180deg]' />
                        </button>
                    </div>
                </div>

                <div className="flex gap-[10px]">
                    <div className="px-[25px] py-[20px] rounded-[26px] flex flex-col gap-[15px] bg-primary">
                        <span className='text-[18px] font-medium text-[#787B86]'>Новые сообщения</span>
                        <div className="flex flex-col gap-[10px]">
                            <div className="items-start rounded-[18px] bg-[#ECEEF1] px-[25px] py-[20px] flex flex-col gap-[8px]">
                                <p className='text-[14px] mr-[40px]'>
                                    Мне кажется, самым лучшим решением будет, если мы с Иваном уже отправимся на встречу, а Артём и Алексей останутся на вокзале до получения дальнейших распоряжений.
                                </p>
                                <span className='self-end text-[#9B9FAD] text-[10px] font-medium'>17:45</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-[10px]">
                                    <div className="bg-[#ECEEF1] rounded-[50%] w-[35px] h-[35px] flex items-center justify-center">
                                        <span className='text-[#007BFB] text-[14px]'>ИП</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-[5px]">
                                            <span className='font-medium leading-[1.2]'>Иван Полторацкий</span>
                                            <div className="bg-[#FF866E] leading-[1] font-medium text-primary text-[11px] h-[16px] w-[16px] rounded-[50%] flex items-center justify-center">4</div>
                                        </div>
                                        <span className='text-[#007BFB] text-[12px] font-medium leading-[1.2]'>Онлайн</span>
                                    </div>
                                </div>

                                <div className="flex gap-[10px]">
                                    <button className='w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center'>
                                        <ArrowImg className='h-[18px] w-[18px]' />
                                    </button>

                                    <button className='w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center'>
                                        <ArrowImg className='h-[18px] w-[18px] rotate-[180deg]' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="bg-[#ECEEF1] rounded-[26px] p-[20px] flex flex-col justify-between grow min-w-[145px]">
                            <CartImg />
                            <div className="flex flex-col">
                                <span className='text-[#007BFB] text-[18px] font-medium'>5 490 893 ₽</span>
                                <span className='text-[#9B9FAD] text-[11px] font-medium'>Альфа банк</span>
                            </div>
                        </div>

                        <div className="bg-[#ECEEF1] rounded-[26px] p-[20px] flex flex-col justify-between grow min-w-[145px]">
                            <div className="flex items-center justify-between">
                                <TimeImg />
                                <span className='text-[#9B9FAD] text-[11px] font-medium'>до 19.04.24</span>
                            </div>
                            <div className="flex flex-col">
                                <span className='text-[#9B9FAD] text-[18px] font-medium'>1 403 832 ₽</span>
                                <span className='text-[#9B9FAD] text-[11px] font-medium'>Аванс</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-[25px] py-[20px] rounded-[26px] flex flex-col gap-[15px] bg-primary grow">
                    <span className='text-[18px] font-medium text-[#787B86]'>Ожидают согласования</span>
                    <div className="flex gap-[15px] grow items-center">
                        <div className="flex flex-col gap-[5px] max-w-[130px]">
                            <div className="rounded-[16px] bg-[#ECEEF1] p-[10px] flex flex-col gap-[10px]">

                                <div className="self-end bg-[#007BFB] rounded-[11px] px-[10px] py-[3px] text-[10px] font-medium text-primary">
                                    Послезавтра
                                </div>
                                <p className="text-[#787B86] font-medium">
                                    Инспекция
                                    в Самару
                                </p>


                            </div>
                            <button className="py-[8px] bg-black rounded-[13px] flex items-center justify-center gap-[5px]">
                                <TimerImg className=' w-[18px] h-[18px]' />
                                <span className='text-primary font-medium leading-[1]'>15:47</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-w-[300px] h-full px-[25px] py-[20px] rounded-[26px] flex flex-col gap-[15px] bg-primary">
                <span className='text-[25px] font-medium text-[#000000]'>История действий</span>
                <div className="pt-[10px] border-0 border-t border-solid border-[#E5E7EA] flex flex-col gap-[6px]">
                    <div className="bg-[#ECEEF1] rounded-[13px] p-[12px] flex flex-col gap-[7px]">
                        <div className="flex justify-between leading-[1.2]">
                            <div className="flex flex-col">
                                <span className="text-[12px] font-medium">Поездки</span>
                                <span className="text-[12px] font-medium text-[#9B9FAD]">Поездка F-4859</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-medium text-[#787B86]">09:30:34</span>
                                <span className="text-[12px] font-medium text-[#9B9FAD]">17.05.2024</span>
                            </div>
                        </div>
                        <div className="flex gap-[3px] items-center">
                            <span className="text-[12px] font-medium text-[#787B86]">Услуга AV-1134:</span>
                            <span className="text-[12px] font-medium text-[#007BFB]">Оформлена</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { OpenInformation };