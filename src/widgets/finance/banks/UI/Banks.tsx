
import BankCart from './BankCart'
import SberbankImg from "@/assets/icons/sberbank.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";
import Modal from '@/widgets/jobs/UI/Modal';
import { useState } from 'react';
import { banks } from '../../utils';



const Banks = ({ activeId, setActiveId }: { activeId: number | null; setActiveId:Function; }) => {

    const [addBank, setAddBank] = useState<boolean>(false)




    return (
        <>
            <div className="flex flex-col gap-[20px] rounded-[26px] px-[30px] py-[25px] bg-[#FAFAFA] h-full">
                <span className="text-[#121212] text-[25px] font-medium">Банковские счета</span>
                <div className="flex flex-col gap-[10px] h-full max-h-full overflow-y-auto scroll">
                    {
                        banks.map((bank) => (
                            <BankCart active={activeId} key={bank.id} EditBank={(id:number) => {setActiveId(id)}} title={bank.title} Img={SberbankImg} status={true} id={bank.id} />
                        ))
                    }
                </div>

                <button onClick={() => {setAddBank(true)}} className="flex items-center gap-[20px] rounded-[26px] border border-solid border-[#E5E7EA] px-[25px] py-[23px]">
                    <PlusImg className='h-[15px] w-[15px]' />
                    <span className='font-normal text-[#787B86]'>Добавить счет</span>
                </button>
            </div>


            <div className={addBank ? "modal__wrapper active" : "modal__wrapper"}>
                <Modal
                    action={setAddBank}
                    title='Счёт на аванс'
                    text='Укажите желаемую сумму аванса.'
                    button='Добавить'
                    body={
                        <div className='flex flex-col gap-[10px] w-full'>
                            <input type="text" placeholder='Название банка' className='w-full' />
                            <input type="text" placeholder='Номер счета' className='w-full' />
                            <input type="text" placeholder='Банк' className='w-full' />
                            <input type="text" placeholder='Город' className='w-full' />
                            <input type="text" placeholder='БИК' className='w-full' />
                            <input type="text" placeholder='Номер корреспондентского счета' className='w-full' />
                        </div>
                    }></Modal>
            </div>
        </>
    );
};

export { Banks };