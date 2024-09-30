import { useEffect, useState } from "react";
import { getAccessToken } from "@/shared/utils";
import { banks } from "@/widgets/finance/utils";

interface props {
    selectedBankId?: number | null;
    close: any;
}

interface Information {
    title: string;
    data: string;
}



const Infornation = ({ close, selectedBankId }: props) => {

    const selectedBank = banks.find(item => item.id === selectedBankId);


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
    }


    return (
        <div className='flex flex-col gap-[10px] p-[20px]'>
            <div className="flex items-center justify-between pb-[10px] border-0 border-b border-[#E5E7EA] border-solid">
                <div className="font-medium">Информация</div>
                <button onClick={() => close(false)}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645C14.1583 3.45118 13.8417 3.45118 13.6464 3.64645L9 8.29289L4.35355 3.64645C4.15829 3.45118 3.84171 3.45118 3.64645 3.64645C3.45118 3.84171 3.45118 4.15829 3.64645 4.35355L8.29289 9L3.64645 13.6464C3.45118 13.8417 3.45118 14.1583 3.64645 14.3536C3.84171 14.5488 4.15829 14.5488 4.35355 14.3536L9 9.70711L13.6464 14.3536C13.8417 14.5488 14.1583 14.5488 14.3536 14.3536C14.5488 14.1583 14.5488 13.8417 14.3536 13.6464L9.70711 9L14.3536 4.35355Z" fill="#BDBFC7" />
                    </svg>
                </button>
            </div>
            <div className="p-[13px] flex flex-col gap-[6px] bg-[#ECEEF1] rounded-[23px]">
                {!selectedBank && infornations.map(item => (
                    <div className="bg-[#FAFAFA] rounded-[13px] px-[10px] py-[8px] flex justify-between">
                        <span className="font-medium text-[12px] text-[#9B9FAD]">{item.title}</span>
                        <strong className="font-medium text-[12px]">{item.data}</strong>
                    </div>
                ))}

                {selectedBank && (
                    <>
                    <div className="bg-[#FAFAFA] gap-[30px] rounded-[13px] px-[10px] py-[8px] flex justify-between">
                        <span className="font-medium whitespace-nowrap text-[12px] text-[#9B9FAD]">Номер счёта</span>
                        <strong className="text-right font-medium text-[12px]">{selectedBank.account_number}</strong>
                    </div> 
                    <div className="bg-[#FAFAFA] gap-[30px] rounded-[13px] px-[10px] py-[8px] flex justify-between">
                        <span className="font-medium whitespace-nowrap text-[12px] text-[#9B9FAD]">Банк</span>
                        <strong className="text-right font-medium text-[12px]">{selectedBank.bank}</strong>
                    </div>
                    <div className="bg-[#FAFAFA] gap-[30px] rounded-[13px] px-[10px] py-[8px] flex justify-between">
                        <span className="font-medium whitespace-nowrap text-[12px] text-[#9B9FAD]">Город</span>
                        <strong className="text-right font-medium text-[12px]">{selectedBank.city}</strong>
                    </div>
                    <div className="bg-[#FAFAFA] gap-[30px] rounded-[13px] px-[10px] py-[8px] flex justify-between">
                        <span className="font-medium whitespace-nowrap text-[12px] text-[#9B9FAD]">БИК</span>
                        <strong className="text-right font-medium text-[12px]">{selectedBank.bic}</strong>
                    </div>
                    <div className="bg-[#FAFAFA] gap-[30px] rounded-[13px] px-[10px] py-[8px] flex justify-between">
                        <span className="font-medium whitespace-nowrap text-[12px] text-[#9B9FAD]">Корр. счёт</span>
                        <strong className="text-right font-medium text-[12px]">{selectedBank.account_corporate}</strong>
                    </div>
                    <div className="bg-[#FAFAFA] gap-[30px] rounded-[13px] px-[10px] py-[8px] flex justify-between">
                        <span className="font-medium whitespace-nowrap text-[12px] text-[#9B9FAD]">Статус</span>
                        <strong className="text-right font-medium text-[12px]">{selectedBank.status ? 'Действующий' : 'Недействующий'}</strong>
                    </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default Infornation;