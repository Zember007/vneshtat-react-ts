import FlightLogoImg from '@/assets/icons/fligt/flight-avialogo.svg?react'
import MessageImg from '@/assets/icons/message.svg?react'
import CopyImg from '@/assets/icons/copy.svg?react'
import NotifyImg from '@/assets/icons/notify.svg?react'

const ServiceCart = () => {
    return (
        <div className="flex gap-[15px]">
            <div className="flex flex-col gap-[10px] my-auto">
                <button className="w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center">
                    <CopyImg className='w-[19px] h-[19px]' />
                </button>
                <button className="w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center ">
                    <MessageImg className='w-[19px] h-[19px]' />

                </button>
                <button className="w-[35px] h-[35px] rounded-[11px] bg-[#ECEEF1] flex items-center justify-center ">
                    <NotifyImg className='w-[19px] h-[19px]' />
                   
                </button>
            </div>
            <div className="grow  bg-[#ECEEF1] rounded-[23px] p-[20px] flex flex-col justify-between">
                <div className="flex items-center gap-[5px]">
                    <span className="text-[18px] font-medium">Перелёт Москва - Санкт-Петербург</span>
                    <div className="rounded-[10px] bg-[#007BFB] py-[3px] px-[10px] text-[10px] font-medium text-primary">Оформлено</div>
                </div>

                <div className="flex items-center gap-[25px]">
                    <div className="flex gap-[10px]">
                        <div className="pt-[5px]">
                            <FlightLogoImg className='w-[20px] h-[20px]' />
                        </div>
                        <div className="flex flex-col">
                            <span className='text-[25px] font-medium leading-[1.2]'>18:55</span>
                            <span className='text-[14px]'>21.09 пн</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[5px] grow">
                        <div className="flex gap-[5px] justify-center items-center">
                            <span className='text-[12px]'>в пути 2 ч  50 мин </span>
                            <span className='text-[12px] text-[#787B86]'>S7 2550</span>
                        </div>
                        <hr className='w-full h-[5px] bg-[#C0C7D1] rounded-[5px]'/>
                        <div className="flex items-center justify-between *:text-[#787B86] *:text-[12px]">
                            <span className='uppercase'>Dme</span>
                            <p>без пересадок</p>
                            <span className='uppercase'>Led</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className='text-[25px] font-medium leading-[1.2]'>20:35</span>
                        <span className='text-[14px]'>21.09 пн</span>
                    </div>
                </div>

                <div className="flex items-center gap-[5px] text-[14px] uppercase">
                    <div className="w-[35px] h-[35px] rounded-[50%] flex items-center justify-center bg-primary">
                        <span>Ви</span>
                    </div>
                    <div className="w-[35px] h-[35px] rounded-[50%] flex items-center justify-center bg-primary">
                        <span>Ст</span>
                    </div>
                    <div className="w-[35px] h-[35px] rounded-[50%] flex items-center justify-center bg-primary">
                        <span className='text-[#787B86]'>+2</span>
                    </div>
                </div>
            </div>
            <div className=" bg-[#ECEEF1] rounded-[23px] p-[15px] min-w-[215px] flex flex-col gap-[5px]">
                <div className="rounded-[13px] bg-primary text-center py-[8px]">
                    <span className="text-[#787B86]">8 570 ₽</span>
                </div>
                <button className="rounded-[13px] bg-primary text-center py-[8px]">
                    <span className="text-[#007BFB] text-[16px]">Запросить отмену</span>
                </button>
                <button className="rounded-[13px] bg-primary text-center py-[8px] pointer-events-none">
                    <span className="text-[#787B86] text-[16px]">Обмен недоступен</span>
                </button>
                <button className="rounded-[13px] bg-[#121212] text-center py-[8px]">
                    <span className="text-primary text-[16px]">Билеты</span>
                </button>
            </div>
        </div>
    );
};

export default ServiceCart;