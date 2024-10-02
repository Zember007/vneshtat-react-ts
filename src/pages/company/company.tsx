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
                   <div className=''>

                   </div>
                    

                }

                information={
                    <>
                        {viewInfornation && (<Infornation close={setViewInfornation} />)}
                    </>
                }

                navigation={

                   <div className="h-full w-full bg-[#FAFAFA] rounded-[40px] px-[45px] py-[30px] flex items-center flex-col gap-[30px]">
                        <div className="h-[145px] w-[145px] rounded-[50%]">
                            АБ
                        </div>
                        <button className='w-full py-[15px] bg-[#ECEEF1] rounded-[16px] text-center'>
                            <span className='text-[18px] font-medium text-[#787B86]'>Изменить логотип</span>
                        </button>
                   </div>

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