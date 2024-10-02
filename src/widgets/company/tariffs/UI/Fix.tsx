import Img from '@/assets/img/company/no_comissions.webp'
import Img1 from '@/assets/img/company/free_cancel.webp'
import Img2 from '@/assets/img/company/calendar.webp'

const Fix = () => {
    return (
        <div className="grid grid-cols-2 gap-[15px] h-full">
            <div className="bg-[#ECEEF1] h-full w-full rounded-[26px] flex items-center justify-center flex-col text-center">
                <img src={Img} alt="icon" />
                <span className='text-[25px] font-medium'>Без комиссии</span>
                <p className='text-[14px] text-[#787B86] max-w-[190px]'>
                    Плата за пользование сервисом фиксированная
                </p>
            </div>
            <div className="bg-[#ECEEF1] h-full w-full rounded-[26px] flex items-center justify-center flex-col text-center">
                <img src={Img1} alt="icon" />
                <span className='text-[25px] font-medium'>Бесплатная отмена</span>
                <p className='text-[14px] text-[#787B86] max-w-[190px]'>
                    Мы сами заплатим сборы за возврат билетов
                </p>
            </div>
            <div className="bg-[#ECEEF1] h-full w-full rounded-[26px] flex items-center justify-center flex-col text-center">
                <img src={Img2} alt="icon" />
                <span className='text-[25px] font-medium'>Без комиссии</span>
                <p className='text-[14px] text-[#787B86] max-w-[190px]'>
                    Плата за пользование сервисом фиксированная
                </p>
            </div>
            <div className="flex flex-col gap-[10px]">
                <div className="grow flex items-center justify-center text-center rounded-[26px] border border-solid border-[#E5E7EA]">
                    <span className='text-[#787B86] text-[14px] max-w-[170px]'>
                        Будет создан дополнительный договор к основному
                    </span>
                </div>
                <button className='bg-[#292933] py-[15px] rounded-[16px] text-primary text-[18px] font-medium w-full'>Подключить</button>
            </div>
        </div>
    );
};

export default Fix;