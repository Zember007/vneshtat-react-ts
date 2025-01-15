/* import { useEffect, useState } from "react";
import { getAccessToken } from "@/shared/utils"; */
import WalletImg from '@/assets/icons/wallet.svg?react'
import TimeImg from '@/assets/icons/time.svg?react'
import AdvanceImg from '@/assets/icons/extra_advance.svg?react'

/* interface Information {
    title: string;
    data: string;
}
 */


const Infornation = () => {

/* 
    const [infornations, setInfornations] = useState<Array<Information>>([])

    useEffect(() => {

        getFinanceDetails()

    }, [])



    const getSum = (data: number) => {
        return (data + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' RUB'
    }

    const getFinanceDetails = async () => {
        const EmployeeId = localStorage.getItem('EmployeeId')
        const url = new URL(import.meta.env.VITE_API_URL + '/company/finance/get_company_financial_details');
        url.searchParams.append('EmployeeId', EmployeeId || '');
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {
                console.log(data.data)

                const details = [
                    { title: 'Задолженность', data: data.data.Debt ? getSum(data.data.Debt) : 'Отсутствует' },
                    { title: 'Баланс', data: getSum(data.data.Balance) },
                    { title: 'Кредитный лимит', data: !data.data.CreditLimit ? 'Неограничен' : getSum(data.data.CreditLimit) },
                    { title: 'Лимит по договору ', data: !data.data.ContractLimit ? 'Не установлен' : getSum(data.data.ContractLimit) },
                    { title: 'Статус', data: data.data.Status !== 'unactive' ? 'Активно' : 'Не активно' },
                ]


                setInfornations(details)

            }
        } catch (error) {

            console.log(error);

        }
    } */


    return (
        <div className='flex flex-col gap-[7px] w-[300px] min-w-[300px]'>
            <div className="rounded-[30px] bg-[#ECEEF1] p-[20px] pt-[30px] flex flex-col gap-[15px]">
                <div className="flex justify-between">
                    <WalletImg />
                    <span className="text-[14px] font-medium text-[#9B9FAD]">Депозит</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[25px] font-medium text-[#007BFB] leading-[1]">5 490 000 ₽</span>
                    <span className="text-[14px] font-medium text-[#9B9FAD] leading-[1]">Доступно</span>
                </div>
            </div>
            <div className="rounded-[30px] bg-[#ECEEF1] p-[20px] pt-[30px] flex flex-col gap-[15px]">
                <div className="flex justify-between">
                    <TimeImg className="w-[38px] h-[25px]" />
                    <span className="text-[14px] font-medium text-[#9B9FAD]">Овердрафт</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[25px] font-medium text-[#787B86] leading-[1]">100 000 ₽</span>
                    <span className="text-[14px] font-medium text-[#9B9FAD] leading-[1]">Доступно</span>
                </div>

                <div className="rounded-[15px] bg-primary p-[15px]">
                    <span className="text-[20px] font-medium text-[#9B9FAD] leading-[1]">Нет <br /> задолженности</span>
                </div>
            </div>

            <div className="rounded-[30px] bg-[#ECEEF1] p-[20px] pt-[30px] flex flex-col gap-[15px]">
                <div className="flex justify-between">
                    <AdvanceImg />
                    <span className="text-[14px] font-medium text-[#9B9FAD]">Экстра аванс</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[25px] font-medium text-[#787B86] leading-[1]">10 000 ₽</span>
                    <span className="text-[14px] font-medium text-[#9B9FAD] leading-[1]">Доступно</span>
                </div>

                <button className="rounded-[15px] bg-primary p-[10px] text-[15px] font-medium text-[#007BFB] lending-[1]">Подать заявку</button>
            </div>
        </div>
    );
};

export default Infornation;