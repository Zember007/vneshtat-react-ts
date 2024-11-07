
import BankCart from './BankCart'
import SberbankImg from "@/assets/icons/sberbank.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";
import Modal from '@/widgets/jobs/UI/Modal';
import { useState } from 'react';
import { banks } from '../../utils';



const Banks = ({ activeId, setActiveId }: { activeId: number | null; setActiveId: Function; }) => {

    const [addBank, setAddBank] = useState<boolean>(false)
    const [bankData, setBankData] = useState<any>({
        Name:'',
        Number:'',
        Bank:'',
        City:'',
        Bic:'',
        NumberAccount:'',
    })


    // const EmployeeId = localStorage.getItem('EmployeeId')
    // const AccessToken = getAccessToken()

    // const CreateBankAccount = async () => {
    //     const formdata = new FormData()

    //     formdata.append('EmployeeId', EmployeeId ?? '')
    //     formdata.append('Name', bankData.Name)
    //     formdata.append('AccountNumber', bankData.Number)
    //     formdata.append('Bank', bankData.Bank)
    //     formdata.append('City', bankData.City)
    //     formdata.append('BIK', bankData.Bic)
    //     formdata.append('СorrespondentAccountNumber', bankData.NumberAccount)

    //     try {
    //         const res = await fetch(import.meta.env.VITE_API_URL + '/company/finance/create_company_bank_account', {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${AccessToken}`
    //             },
    //             body: formdata
    //         });
    //         const data = await res.json();
    //         if (data.status === "error") {
    //             console.log("error", data);
    //         }

    //         if (data.status === "success") {
    //             console.log(data);
    //             // AddEmployee()
    //         }

    //     } catch (error) {

    //         console.log(error);

    //     }
    // }

    // const GetBanks = async (onlines: number[]) => {
    //     const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile');
    //     url.searchParams.append('EmployeeId', EmployeeId || '');
    //     try {
    //         const res = await fetch(url, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${AccessToken}`
    //             }
    //         });
    //         const data = await res.json();
    //         if (data.status === "error") {
    //             console.log("error", data);
    //         }

    //         if (data.status === "success" && data.data) {

    //             const employees:any[] = data.data

    //             employees.forEach(el => {
    //                 const online = onlines.find(item_online => item_online == el.id)
                    
    //                 el.isSelected = false
    //                 el.content = `${el.Surname} ${el.Name}`

    //                 el.online = online? true : false
    //             })

    //             dispatch(setStaffers(employees))

    //         }
    //     } catch (error) {

    //         console.log(error);

    //     }

    // }


    return (
        <>
            <div className="flex flex-col gap-[20px] rounded-[26px] px-[30px] py-[25px] bg-[#FAFAFA] h-full">
                <span className="text-[#121212] text-[25px] font-medium">Банковские счета</span>
                <div className="flex flex-col gap-[10px] h-full max-h-full overflow-y-auto scroll">
                    {
                        banks.map((bank) => (
                            <BankCart active={activeId} key={bank.id} EditBank={(id: number) => { setActiveId(id) }} title={bank.title} Img={SberbankImg} status={true} id={bank.id} />
                        ))
                    }
                </div>

                <button onClick={() => { setAddBank(true) }} className="flex items-center gap-[20px] rounded-[26px] border border-solid border-[#E5E7EA] px-[25px] py-[23px]">
                    <PlusImg className='h-[15px] w-[15px]' />
                    <span className='font-normal text-[#787B86]'>Добавить счет</span>
                </button>
            </div>


            <div className={addBank ? "modal__wrapper active" : "modal__wrapper"}>
                
                <Modal
                    action={() => {
                       
                    }}
                    close={() => {setAddBank(false)}}
                    title='Счёт на аванс'
                    text='Укажите желаемую сумму аванса.'
                    button='Добавить'
                    body={
                        <div className='flex flex-col gap-[10px] w-full'>
                            <input
                            onInput={(e) => {                
                                setBankData({
                                    Name: e.currentTarget.value,
                                    Number: bankData.Number,
                                    Bank: bankData.Bank,
                                    City: bankData.City,
                                    Bic: bankData.Bic,
                                    NumberAccount: bankData.NumberAccount,
                                })  
                            }}
                            value={bankData.Name} type="text" placeholder='Название банка' className='w-full' />
                            <input
                            onInput={(e) => {
          
                                setBankData({
                                    Name: bankData.Name,
                                    Number: e.currentTarget.value,
                                    Bank: bankData.Bank,
                                    City: bankData.City,
                                    Bic: bankData.Bic,
                                    NumberAccount: bankData.NumberAccount,
                                })  
                            }}
                            value={bankData.Number} type="text" placeholder='Номер счета' className='w-full' />
                            <input
                            onInput={(e) => {
                               
                                setBankData({
                                    Name: bankData.Name,
                                    Number: bankData.Number,
                                    Bank: e.currentTarget.value,
                                    City: bankData.City,
                                    Bic: bankData.Bic,
                                    NumberAccount: bankData.NumberAccount,
                                })  
                            }}
                            value={bankData.Bank} type="text" placeholder='Банк' className='w-full' />
                            <input
                            onInput={(e) => {
                                
                                setBankData({
                                    Name: bankData.Name,
                                    Number: bankData.Number,
                                    Bank: bankData.Bank,
                                    City: e.currentTarget.value,
                                    Bic: bankData.Bic,
                                    NumberAccount: bankData.NumberAccount,
                                })  
                            }}
                            value={bankData.City} type="text" placeholder='Город' className='w-full' />
                            <input
                            onInput={(e) => {
                               
                                setBankData({
                                    Name: bankData.Name,
                                    Number: bankData.Number,
                                    Bank: bankData.Bank,
                                    City: bankData.City,
                                    Bic: e.currentTarget.value,
                                    NumberAccount: bankData.NumberAccount,
                                })  
                            }}
                            value={bankData.Bic} type="text" placeholder='БИК' className='w-full' />
                            <input
                            onInput={(e) => {           
                               
                                setBankData({
                                    Name: bankData.Name,
                                    Number: bankData.Number,
                                    Bank: bankData.Bank,
                                    City: bankData.City,
                                    Bic: bankData.Bic,
                                    NumberAccount: e.currentTarget.value,
                                })  
                            }}
                            value={bankData.NumberAccount} type="text" placeholder='Номер корреспондентского счета' className='w-full' />
                        </div>
                    }></Modal>
            </div>
        </>
    );
};

export { Banks };