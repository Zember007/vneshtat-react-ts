import clsx from "clsx";
import InnCheck from "./InnCheck";
import Bill from "./Bill";
import Contract from "./Contact";
import { useState } from "react";
import CloseIcon from '@/assets/icons/close.svg?react'
import CheckIcon from '@/assets/icons/check.svg?react'
import { Link } from "react-router-dom";

const Edit = ({companyInformation, bills, contractStatus , setCompanyInformation, setBills, setContractStatus} : {companyInformation:any, bills:any, contractStatus?:string, setCompanyInformation:Function, setBills:Function, setContractStatus:Function}) => {

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
                    <button onClick={() => setActive('inn')} className={clsx('rounded-[26px] mr-[25px] px-[30px] py-[17px] font-medium text-[25px] bg-[#ECEEF1] leading-[1.3] text-left transition-all duration-300  border border-[#E5E7EA] border-solid flex items-center justify-between', active === 'inn' && '!bg-primary !mr-[0]')}>
                        <span>Данные</span>
                        {companyInformation && <div className="w-[21px] h-[21px] rounded-[50%] bg-[#007BFB] flex items-center justify-center">
                            <CheckIcon />
                        </div>}
                    </button>
                    <button onClick={() => setActive('bill')} className={clsx('rounded-[26px] mr-[25px] px-[30px] py-[17px] font-medium text-[25px] bg-[#ECEEF1] leading-[1.3] text-left transition-all duration-300  border border-[#E5E7EA] border-solid flex items-center justify-between', active === 'bill' && '!bg-primary !mr-[0]')}>
                        <span>Расчетные счета</span>
                        {bills && <div className="w-[21px] h-[21px] rounded-[50%] bg-[#007BFB] flex items-center justify-center">
                            <CheckIcon />
                        </div>}
                    </button>
                    <button onClick={() => setActive('contract')} className={clsx('rounded-[26px] mr-[25px] px-[30px] py-[17px] font-medium text-[25px] bg-[#ECEEF1] leading-[1.3] text-left transition-all duration-300  border border-[#E5E7EA] border-solid', active === 'contract' && '!bg-primary !mr-[0]')}>
                        
                        <span>Договор</span>
                        {(contractStatus==='on_review' || contractStatus==='accepted') && <div className={`w-[21px] h-[21px] rounded-[50%] flex items-center justify-center ${contractStatus==='on_review' ? 'bg-[#FF64A3]' : 'bg-[#007BFB]'}`}>
                            <CheckIcon />
                        </div>}
                    </button>
                </div>
            </div>
            <div className="min-w-[600px] grow p-[35px] rounded-[50px] border border-solid border-[#E5E7EA] h-full w-full flex flex-col gap-[20px] justify-between">
                {active === 'inn' && <InnCheck information={companyInformation} next={(data:any) => {setCompanyInformation(data);setActive('bill')}}/>}
                {active === 'bill' && <Bill information={bills} setInformation={setBills} next={() => setActive('contract')} prev={() => setActive('inn')}/>}
                {active === 'contract' && <Contract status={contractStatus} setStatus={(status:string) => {setContractStatus(status)}}/>}
            </div>
        </div>
    );
};

export { Edit };