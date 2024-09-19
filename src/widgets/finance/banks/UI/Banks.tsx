import { useState } from 'react';
import BankCart from './BankCart'
import SberbankImg from "@/assets/icons/sberbank.svg?react";
import AlphaImg from "@/assets/icons/alpha.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";




const Banks = () => {

    const [banks, setBanks] = useState([
        {
            title: 'Альфа банк',
            Img: AlphaImg
        },
        {
            title: 'Сбербанк',
            Img: SberbankImg
        }
    ])

    const EditBank = (id: Number) => {
        console.log(id);

    }




    return (
        <>
            <div className="flex flex-col gap-[20px] rounded-[26px] px-[30px] py-[25px] bg-[#FAFAFA] h-full">
                <span className="text-[#121212] text-[25px] font-medium">Банковские счета</span>
                <div className="flex flex-col gap-[10px] h-full max-h-full">
                    {
                        banks.map((bank, index) => (
                            <BankCart key={index} EditBank={EditBank} title={bank.title} Img={bank.Img} status={true} id={index} />
                        ))
                    }
                </div>

                <button className="flex items-center gap-[20px] rounded-[26px] border border-solid border-[#E5E7EA] px-[25px] py-[23px]">
                    <PlusImg className='h-[15px] w-[15px]'/>
                    <span className='font-normal text-[#787B86]'>Добавить счет</span>
                </button>
            </div>


        </>
    );
};

export { Banks };