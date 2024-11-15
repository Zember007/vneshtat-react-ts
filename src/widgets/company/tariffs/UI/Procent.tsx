import Img from '@/assets/img/company/discount.webp'
import Img1 from '@/assets/img/company/discount_cancel.webp'
import Img2 from '@/assets/img/company/interesting.webp'
import { useState } from 'react';
import Contract from './Contract';


const Procent = ({ status, setStatus }: { status?: string; setStatus: Function }) => {

    const [select, setSelect] = useState<boolean>(false)

    return (
        <>
            {!status && !select ?
                <div className="grid grid-cols-2 gap-[15px] h-full">
                    <div className="bg-[#ECEEF1] h-full w-full rounded-[26px] flex items-center justify-center flex-col text-center">
                        <img src={Img} alt="icon" />
                        <span className='text-[25px] font-medium'>Только комиссия</span>
                        <p className='text-[14px] text-[#787B86] max-w-[190px]'>
                            Если нет поездок - вы ничего не платите
                        </p>
                    </div>
                    <div className="bg-[#ECEEF1] h-full w-full rounded-[26px] flex items-center justify-center flex-col text-center">
                        <img src={Img1} alt="icon" />
                        <span className='text-[25px] font-medium'>Отмена со скидкой</span>
                        <p className='text-[14px] text-[#787B86] max-w-[190px]'>
                            Если захотите отменить бронь, мы заплатим половину штрафа
                        </p>
                    </div>
                    <div className="bg-[#ECEEF1] h-full w-full rounded-[26px] flex items-center justify-center flex-col text-center">
                        <img src={Img2} alt="icon" />
                        <span className='text-[25px] font-medium'>Интересная фича</span>
                        <p className='text-[14px] text-[#787B86] max-w-[190px]'>
                            А еще при выборе этого тарифа вы получаете капибару
                        </p>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="grow flex items-center justify-center text-center rounded-[26px] border border-solid border-[#E5E7EA]">
                            <span className='text-[#787B86] text-[14px] max-w-[170px]'>
                                Будет создано приложение к договору
                            </span>
                        </div>
                        <button
                        onClick={() => {setSelect(true)}}
                        className='bg-[#292933] py-[15px] rounded-[16px] text-primary text-[18px] font-medium w-full'>Подключить</button>
                    </div>
                </div>
                :
                <Contract TarrifId=''  setStatus={() => setStatus()} status=''/>
            }
        </>
    );
};

export default Procent;