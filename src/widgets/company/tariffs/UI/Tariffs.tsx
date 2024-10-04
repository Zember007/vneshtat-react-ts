import clsx from "clsx";
import Fix from "./Fix";
import Procent from "./Procent";
import Elite from "./Elite";
import { useState } from "react";
import CloseIcon from '@/assets/icons/close.svg?react'
import { Link } from "react-router-dom";

const Tariffs = () => {

    const [active, setActive] = useState<string>('fix')

    return (
        <div className="grow p-[60px] pl-[35px] bg-primary rounded-[40px] flex gap-[25px] items-center relative leading-[1]">
            <Link to={'/jobs/company'} className="absolute top-[25px] right-[25px]">
                <CloseIcon className="w-[25px] h-[25px] *:fill-[#8C909C]" />
            </Link>
            <div className="flex flex-col gap-[47px]">
                <div className="flex flex-col gap-[15px]">
                    <span className="text-[44px] font-medium leading-[100%]">Подключайтесь и путешествуйте!</span>
                    <p className="text-[#787B86] text-[18px]">
                        Подберите оптимальный тариф для вашей компании, чтобы не платить больше необходимого.
                    </p>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <button onClick={() => setActive('fix')} className={clsx('flex items-center gap-[10px]  bg-[#ECEEF1] rounded-[26px] mr-[25px] px-[30px] py-[17px]  text-left transition-all duration-300', active === 'fix' && '!bg-primary !mr-[0] border border-[#E5E7EA] border-solid')}>
                        <span className="font-medium text-[25px]  leading-[1.3]">Фикс</span>
                        <p className="text-[18px] text-[#9B9FAD] font-medium">15 000 ₽/месяц</p>
                    </button>
                    <button onClick={() => setActive('procent')} className={clsx('flex items-center gap-[10px] bg-[#ECEEF1]  rounded-[26px] mr-[25px] px-[30px] py-[17px]  text-left transition-all duration-300', active === 'procent' && '!bg-primary !mr-[0] border border-[#E5E7EA] border-solid')}>
                        <span className="font-medium text-[25px]  leading-[1.3]">Процент</span>
                        <p className="text-[18px] text-[#9B9FAD] font-medium">150 ₽/услуга</p>
                    </button>
                    <button onClick={() => setActive('elite')} className={clsx('flex items-center gap-[10px] bg-[#ECEEF1] rounded-[26px] mr-[25px] px-[30px] py-[17px]  text-left transition-all duration-300', active === 'elite' && '!bg-primary !mr-[0] border border-[#E5E7EA] border-solid')}>
                        <span className="font-medium text-[25px]  leading-[1.3]">Elite</span>
                        <p className="text-[18px] text-[#9B9FAD] font-medium">Индивидуальная цена</p>
                    </button>
                </div>
            </div>
            <div className="grow p-[30px] rounded-[50px] border border-solid border-[#E5E7EA] h-full w-full">
                {active === 'fix' && <Fix />}
                {active === 'procent' && <Procent />}
                {active === 'elite' && <Elite />}
            </div>

        </div>
    );
};

export { Tariffs };