
// import { useEffect, useRef, useState } from "react";
import ImgContract from '@/assets/img/company/contract.webp'

const Contract = () => {



    return (
        <>
            <div className="flex flex-col gap-[15px] items-center justify-center grow">
                <img src={ImgContract} alt="contract" className="mb-[20px] max-w-[160px] mb-[20px]" />

                <div className="flex gap-[10px]">
                    <button className='w-full bg-[#292933] px-[30px] py-[14px] rounded-[16px] text-primary text-[18px] font-medium whitespace-nowrap'>Скачать договор</button>
                    <button className='w-full bg-[#292933] px-[30px] py-[14px] rounded-[16px] text-primary text-[18px] font-medium whitespace-nowrap'>Загрузить договор</button>
                </div>

                <p className="text-center text-[18px]">
                    Договор успешно сформирован. <br />
                    Вы можете скачать его и подписать <br />
                    (а ЭЦП мы поддерживаем?). <br />
                </p>
               
            </div>

        </>
    );
};

export default Contract;