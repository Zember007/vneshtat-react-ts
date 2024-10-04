import clsx from "clsx";
import InnCheck from "./InnCheck";
import Bill from "./Bill";
import Contract from "./Contact";
import { useState } from "react";
import CloseIcon from '@/assets/icons/close.svg?react'
import { Link } from "react-router-dom";

const Edit = () => {

    const [active, setActive] = useState<string>('inn')
    
    return (
        <div className="grow p-[60px] pl-[35px] bg-primary rounded-[40px] flex gap-[25px] items-center relative h-[calc(100vh-60px)] leading-[1]">
            <Link to={'/jobs/company'} className="absolute top-[25px] right-[25px]">
                <CloseIcon className="w-[25px] h-[25px] *:fill-[#8C909C]"/>
            </Link>
            <div className="flex flex-col gap-[47px]">
                <div className="flex flex-col gap-[15px]">
                    <span className="text-[44px] font-medium">Данные компании</span>
                    <p className="text-[#787B86] text-[18px]">
                        Чтобы выбрать тариф и получить полный доступ к сервису, заполните данные вашей компании, добавьте расчетный счет и подпишите договор.
                    </p>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <button onClick={() => setActive('inn')} className={clsx('rounded-[26px] mr-[25px] px-[30px] py-[17px] font-medium text-[25px] bg-[#ECEEF1] leading-[1.3] text-left transition-all duration-300', active === 'inn' && '!bg-primary !mr-[0] border border-[#E5E7EA] border-solid')}>Данные</button>
                    <button onClick={() => setActive('bill')} className={clsx('rounded-[26px] mr-[25px] px-[30px] py-[17px] font-medium text-[25px] bg-[#ECEEF1] leading-[1.3] text-left transition-all duration-300', active === 'bill' && '!bg-primary !mr-[0] border border-[#E5E7EA] border-solid')}>Расчетные счета</button>
                    <button onClick={() => setActive('contract')} className={clsx('rounded-[26px] mr-[25px] px-[30px] py-[17px] font-medium text-[25px] bg-[#ECEEF1] leading-[1.3] text-left transition-all duration-300', active === 'contract' && '!bg-primary !mr-[0] border border-[#E5E7EA] border-solid')}>Договор</button>
                </div>
            </div>
            <div className="grow p-[35px] rounded-[50px] border border-solid border-[#E5E7EA] h-full w-full flex flex-col gap-[20px] justify-between">
                {active === 'inn' && <InnCheck next={() => setActive('bill')}/>}
                {active === 'bill' && <Bill next={() => setActive('contract')} prev={() => setActive('inn')}/>}
                {active === 'contract' && <Contract/>}
            </div>
        </div>
    );
};

export { Edit };