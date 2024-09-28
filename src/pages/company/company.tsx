import Layout from '@/widgets/jobs/layout/layout';

// import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import CloseImg from '@/assets/icons/cross.svg?react'


const employees = () => {

    // const location = useLocation().pathname

    useEffect(() => {

    }, [])



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
                    <div className='p-[20px] flex flex-col gap-[10px]'>
                        <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                            <span className="font-medium ">Информация</span>
                            <button>
                                <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                            </button>
                        </div>
                    </div>
                }

                navigation={

                    <button className='bg-[#DCE0E5] py-[13px] w-full rounded-[13px] text-[14px]'>Договоры</button>

                }
            />

        </>
    );
};

export default employees;