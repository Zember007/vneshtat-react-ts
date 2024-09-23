import { useState } from 'react';
import BankCart from './BankCart'
import SberbankImg from "@/assets/icons/sberbank.svg?react";
import AlphaImg from "@/assets/icons/alpha.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";




const Banks = ({edit}:{edit:any}) => {

    const banks = [
        {
            title: 'Альфа банк',
            Img: AlphaImg
        },
        {
            title: 'Сбербанк',
            Img: SberbankImg
        }
    ]

    const EditBank = (index: number) => {
        console.log(index);
        
        const send = {
            list: [
                {
                    title: 'Номер счёта',
                    data: '4400 2493 2871 7824 2873'
                },
                {
                    title: 'Банк',
                    data: 'Волго-вятский банк ПАО Сбербанк'
                },
                {
                    title: 'Город',
                    data: 'г. Нижний Новгород'
                },
                {
                    title: 'БИК',
                    data: '034920843'
                },
                {
                    title: 'Корр. счёт',
                    data: '0309090084920843'
                },
                {
                    title: 'Статус',
                    data: 'Действующий'
                }
            ],

            edit: true
        }

        edit(send)
    }




    return (
        <>
            <div className="flex flex-col gap-[20px] rounded-[26px] px-[30px] py-[25px] bg-[#FAFAFA] h-full">
                <span className="text-[#121212] text-[25px] font-medium">Банковские счета</span>
                <div className="flex flex-col gap-[10px] h-full max-h-full overflow-y-auto scroll">
                    {
                        banks.map((bank, index) => (
                            <BankCart key={index} EditBank={EditBank} title={bank.title} Img={bank.Img} status={true} index={index} />
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