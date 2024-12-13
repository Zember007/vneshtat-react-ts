
import { getAccessToken } from "@/shared/utils";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

const Bill = ({ next, prev, information, setInformation }: { next: Function; prev: Function; information: any; setInformation: Function }) => {

    const [bills, setBills] = useState([
        {
            id: 0,
            AccountNumber: '',
            BIK: '',
            Name: '',
            CorrespondentAccountNumber: '',
            new: true
        }
    ])

    const EditBill = (id: number, newitem: any) => {
        setBills(prevState =>
            prevState.map(item =>
                item.id === id
                    ? newitem
                    : item
            )
        )
    }

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()


    const sendBills = () => {

        bills.filter(item => item.new).forEach(async (el) => {
            const formdata = new FormData()

            formdata.append('EmployeeId', EmployeeId || '')
            formdata.append('AccountNumber', el.AccountNumber || '')
            formdata.append('BIK', el.BIK || '')
            formdata.append('Name', el.Name || '')
            formdata.append('CorrespondentAccountNumber', el.CorrespondentAccountNumber || '')

            try {
                const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/create_company_bank_accounts', {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${AccessToken}`
                    },
                    body: formdata
                });
                const data = await res.json();
                if (data.status === "error") {
                    console.log("error", data);
                }

                if (data.status === "success") {

                    setInformation(bills)


                }
            } catch (error) {

                console.log(error);

            }
        })

        next()

    }

    useEffect(() => {
        if (information) {
            setBills(information)
        }
    }, [information])

    return (
        <>
            <SimpleBar className="max-h-[calc(100vh-430px)]">
                <div className="flex flex-col gap-[15px] items-center grow min-h-[290px]" >

                    <div className='flex flex-col gap-[15px] max-w-[520px] my-auto'>
                        {bills.map(item => (
                            <div className="flex flex-col gap-[10px] border-[#ECEEF1] border-0 border-b border-solid pb-[15px]">
                                <div className="grid grid-cols-2 items-center">
                                    <span className='text-[18px] font-medium text-[#9B9FAD]'>Расчетный счет</span>
                                    <input type="text" onInput={(e) => {
                                        const element = e.currentTarget as HTMLInputElement
                                        const value = element.value
                                        item.AccountNumber = value
                                        EditBill(item.id, { ...item })
                                    }} value={item.AccountNumber} placeholder='00000000000' className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <span className='text-[18px] font-medium text-[#9B9FAD]'>БИК банка</span>
                                    <input type="text" onInput={(e) => {
                                        const element = e.currentTarget as HTMLInputElement
                                        const value = element.value
                                        item.BIK = value
                                        EditBill(item.id, { ...item })
                                    }} value={item.BIK} placeholder='044525225' className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <span className='text-[18px] font-medium text-[#9B9FAD]'>Название банка</span>
                                    <input type="text" onInput={(e) => {
                                        const element = e.currentTarget as HTMLInputElement
                                        const value = element.value
                                        item.Name = value
                                        EditBill(item.id, { ...item })
                                    }} value={item.Name} placeholder='ПАО Сбербанк' className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <span className='text-[18px] font-medium text-[#9B9FAD]'>Корпоративный счет</span>
                                    <input type="text" onInput={(e) => {
                                        const element = e.currentTarget as HTMLInputElement
                                        const value = element.value
                                        item.CorrespondentAccountNumber = value
                                        EditBill(item.id, { ...item })
                                    }} value={item.CorrespondentAccountNumber} placeholder='00000000000' className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                setBills(prevState =>
                                    [...prevState, {
                                        id: Date.now(),
                                        AccountNumber: '',
                                        BIK: '',
                                        Name: '',
                                        CorrespondentAccountNumber: '',
                                        new: true
                                    }]
                                )
                            }}
                            className='border-[#ECEEF1] border border-solid rounded-[15px] py-[14px] w-full'>
                            <span className='text-[18px] font-medium text-[#787B86]'>Добавить еще один расчетный счет</span>
                        </button>
                    </div>
                </div>
            </SimpleBar>
            <div className="pt-[20px]  border-[#ECEEF1] border-0 border-t border-solid">
                <div className='flex gap-[10px]'>
                    <button onClick={() => prev()} className='w-full bg-[#ECEEF1] px-[60px] py-[15px] rounded-[16px] text-[18px] font-medium text-[#787B86]'>Назад</button>
                    <button onClick={() => sendBills()} className='w-full bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Далее</button>
                </div>
            </div>
        </>
    );
};

export default Bill;