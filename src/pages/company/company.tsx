import Layout from '@/widgets/jobs/layout/layout';

// import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Infornation from '@/widgets/jobs/UI/Infornation';
import Modal from '@/widgets/jobs/UI/Modal';
import clsx from 'clsx';


const company = () => {

    // const location = useLocation().pathname

    useEffect(() => {

    }, [])

    const [viewInfornation, setViewInfornation] = useState<boolean>(true)
    const [viewContracts, setViewContracts] = useState<boolean>(false)

    return (
        <>

            <Layout

                component={

                    <div className='rounded-[40px] bg-[#FAFAFA] py-[25px] px-[30px] flex flex-col gap-[20px]'>
                        <span className='text-[25px] font-medium'>Реквизиты компании ООО “Альфа”</span>
                        <div className="flex gap-[25px]">
                            <div className="flex flex-col gap-[13px]">
                                <span className='font-medium text-[#9B9FAD]'>Короткое название</span>
                                <span className='font-medium text-[#9B9FAD]'>Номер договора</span>
                                <span className='font-medium text-[#9B9FAD]'>ИНН</span>
                                <span className='font-medium text-[#9B9FAD]'>КПП</span>
                                <span className='font-medium text-[#9B9FAD]'>Юридический адрес</span>
                                <span className='font-medium text-[#9B9FAD]'>CEO</span>
                            </div>
                            <div className="flex flex-col gap-[13px]">
                                <span className='font-medium'>Альфа</span>
                                <span className='font-medium'>11 141</span>
                                <span className='font-medium'>07.11.2021</span>
                                <span className='font-medium'>37419248737</span>
                                <span className='font-medium'>440000, г. Пенза, ул. Пушкина 2, оф. 907</span>
                                <span className='font-medium'>Петров Сергей Петрович</span>
                            </div>
                        </div>
                    </div>

                }

                information={
                    <>
                        {viewInfornation && (<Infornation close={setViewInfornation} />)}
                    </>
                }

                navigation={

                    <button onClick={() => {setViewContracts(true)}} className='bg-[#DCE0E5] py-[13px] w-full rounded-[13px] text-[14px]'>Договоры</button>

                }
            />

            <div className={clsx(" transition-all duration-500 fixed z-[1000]", !viewContracts ? 'invisible opacity-0' : 'visible opacity-100')}>
                <Modal
                    action={setViewContracts}
                    title='Договоры'
                    text='Здесь лежат копии договоров между компанией и Внештатом.'
                    body={
                        <div className='flex items-start flex-col gap-[5px]'>
                            <button className='font-normal text-[14px] px-[15px] py-[10px] rounded-[13px] bg-[#ECEEF1]'>Договор Внештат - Альфа 18.02.2023</button>
                            <button className='font-normal text-[14px] px-[15px] py-[10px] rounded-[13px] bg-[#ECEEF1]'>Дополнительный договор Внештат - Альфа 22.09.2023</button>
                        </div>
                    }></Modal>
            </div>

        </>
    );
};

export default company;