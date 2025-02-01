import clsx from "clsx";
import InnCheck from "./InnCheck";
import Bill from "./Bill";
import Contract from "./Contact";
import { useEffect, useState } from "react";
import CloseIcon from '@/assets/icons/close.svg?react'
import CheckIcon from '@/assets/icons/check.svg?react'
import { Link } from "react-router-dom";
import { getAccessToken } from "@/shared/utils";

interface company {
    LegalName: string;
    Inn: string;
    ContractId: number;
}

const Edit = ({activeCompany}:{activeCompany: company | boolean}) => {

    const [active, setActive] = useState<string>('inn')

    const [companyInformation, setCompanyInformation] = useState<any>()
    const [bills, setBills] = useState()
    const [contractStatus, setContractStatus] = useState<string>()

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_information');
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
                console.log(data.data);
                
                setCompanyInformation(data.data)
            }
        } catch (error) {

            console.log(error);

        }

    }

    const getInformationBills = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_bank_accounts');
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

                console.log(data.data);

                if (data.data.length) {
                    setBills(data.data)
                }

            }
        } catch (error) {

            console.log(error);

        }

    }


    const getStatusContract = async() => {
        
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_treaty_status');
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

                console.log(data.data);
                setContractStatus(data.data.Status)

            }
        } catch (error) {

            console.log(error);

        }
    }

    useEffect(() => {
        getInformation()
        getInformationBills()
       
    },[])

    useEffect(() => {
        if(activeCompany === false) {
            getStatusContract()
        } else if(typeof activeCompany !== 'boolean') {
            setContractStatus('accepted')
        }
    },[activeCompany])
    
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
                        {companyInformation && companyInformation.FIO && <div className="w-[21px] h-[21px] rounded-[50%] bg-[#007BFB] flex items-center justify-center">
                            <CheckIcon />
                        </div>}
                    </button>
                    <button onClick={() => setActive('bill')} className={clsx('rounded-[26px] mr-[25px] px-[30px] py-[17px] font-medium text-[25px] bg-[#ECEEF1] leading-[1.3] text-left transition-all duration-300  border border-[#E5E7EA] border-solid flex items-center justify-between', active === 'bill' && '!bg-primary !mr-[0]')}>
                        <span>Расчетные счета</span>
                        {bills && <div className="w-[21px] h-[21px] rounded-[50%] bg-[#007BFB] flex items-center justify-center">
                            <CheckIcon />
                        </div>}
                    </button>
                    <button onClick={() => setActive('contract')} className={clsx('rounded-[26px] mr-[25px] px-[30px] py-[17px] font-medium text-[25px] bg-[#ECEEF1] leading-[1.3] text-left transition-all duration-300  border border-[#E5E7EA] border-solid flex items-center justify-between', active === 'contract' && '!bg-primary !mr-[0]')}>
                        
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