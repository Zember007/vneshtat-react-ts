
import { useEffect, useRef, useState } from "react";

const Bill = ({ next, prev }: { next: Function;prev: Function }) => {

    const [bills, setBills] = useState([
        {
            id: 0,
            bill: '',
            bic: '',
            bank: '',
            corporate_bill: ''
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

    return (
        <>
            <div  className="flex flex-col gap-[15px] items-center grow scroll overflow-y-auto max-h-[calc(100vh-430px)] min-h-[290px]" >

                <div className='flex flex-col gap-[15px] max-w-[520px] my-auto'>
                    {bills.map(item => (
                        <div className="flex flex-col gap-[10px] border-[#ECEEF1] border-0 border-b border-solid pb-[15px]">
                            <div className="grid grid-cols-2">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>Расчетный счет</span>
                                <input type="text" onInput={(e) => {
                                    const element = e.currentTarget as HTMLInputElement
                                    const value = element.value
                                    item.bill = value
                                    EditBill(item.id, { ...item })
                                }} value={item.bill} placeholder='00000000000' className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                            </div>
                            <div className="grid grid-cols-2">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>БИК банка</span>
                                <input type="text" onInput={(e) => {
                                    const element = e.currentTarget as HTMLInputElement
                                    const value = element.value
                                    item.bic = value
                                    EditBill(item.id, { ...item })
                                }} value={item.bic} placeholder='044525225' className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                            </div>
                            <div className="grid grid-cols-2">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>Название банка</span>
                                <input type="text" onInput={(e) => {
                                    const element = e.currentTarget as HTMLInputElement
                                    const value = element.value
                                    item.bank = value
                                    EditBill(item.id, { ...item })
                                }} value={item.bank} placeholder='ПАО Сбербанк' className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                            </div>
                            <div className="grid grid-cols-2">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>Корпоративный счет</span>
                                <input type="text" onInput={(e) => {
                                    const element = e.currentTarget as HTMLInputElement
                                    const value = element.value
                                    item.corporate_bill = value
                                    EditBill(item.id, { ...item })
                                }} value={item.corporate_bill} placeholder='00000000000' className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            setBills(prevState =>
                                [...prevState, {
                                    id: bills.length,
                                    bill: '',
                                    bic: '',
                                    bank: '',
                                    corporate_bill: ''
                                }]
                            )
                        }}
                        className='border-[#ECEEF1] border border-solid rounded-[15px] py-[14px] w-full'>
                        <span className='text-[18px] font-medium text-[#787B86]'>Добавить еще один расчетный счет</span>
                    </button>
                </div>
            </div>
            <div className="pt-[20px]  border-[#ECEEF1] border-0 border-t border-solid">
                <div className='flex gap-[10px]'>
                    <button onClick={() => prev()} className='w-full bg-[#ECEEF1] px-[60px] py-[15px] rounded-[16px] text-[18px] font-medium text-[#787B86]'>Назад</button>
                    <button onClick={() => next()} className='w-full bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Далее</button>
                </div>
            </div>
        </>
    );
};

export default Bill;