import Layout from '@/app/layouts/layout';
import ImgWrite from '@/assets/img/company/write.webp'

import { useEffect, useState } from 'react';
import Infornation from '@/widgets/jobs/UI/Infornation';
import Modal from '@/widgets/jobs/UI/Modal';
import clsx from 'clsx';
import ImgTravels from '@/assets/img/company/travels.webp'
import { Link } from 'react-router-dom';


const Preview = ({ information }: { information: any }) => {

    // const location = useLocation().pathname

    useEffect(() => {

    }, [])

    const [viewInfornation, setViewInfornation] = useState<boolean>(true)
    const [viewContracts, setViewContracts] = useState<boolean>(false)

    return (
        <>

            <Layout

                component={

                    <>
                        <div className="  h-full bg-[#FAFAFA] rounded-[26px] ">
                            {!information &&
                                <div className='text-center py-[50px] flex items-center justify-center flex-col gap-[15px]'>
                                    <span className='text-[44px] font-medium'>Добро пожаловать во Внештат!</span>
                                    <Link to={'/jobs/company/edit'} className='bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Заполнить данные компании</Link>
                                    <p className='text-[#787B86] mt-[5px]'>
                                        Чтобы получить полный доступ к сервису, нужно заполнить<br /> данные вашей компании, подписать договор и выбрать тариф
                                    </p>
                                </div>
                            }
                            {information &&
                                <div className='py-[30px] px-[35px] flex items-center justify-between'>
                                    <div className="flex flex-col gap-[10px]">
                                        <span className='text-[#9B9FAD] text-[25px] font-medium'>Договор подписан</span>
                                        <h1 className='text-[#000] text-[44px] font-medium'>{information.LegalName}</h1>
                                        <p className='text-[18px] text-[#9B9FAD]'>
                                            ИНН: {information.Inn} <br />
                                            Номер договора: {information.Inn}
                                        </p>
                                        <Link to={'/jobs/company/edit'} className='bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium mt-[10px]'>Смотреть данные и договор</Link>
                                    </div>

                                    <img src={ImgWrite} alt="write" className="max-w-[100%]" />
                                </div>
                            }
                        </div>
                        <div className="pt-[36px] pb-[16px] bg-[#FAFAFA] relative rounded-[26px] flex items-center justify-center">
                            <img src={ImgTravels} alt="travels" />
                            <div className="absolute top-[0] right-[0] left-[0] bottom-[0] flex items-center justify-center flex-col gap-[15px]">
                                <span className='text-[44px] font-medium'>Подключайтесь и путешествуйте!</span>
                                <Link to={'/jobs/company/tariffs'} className='bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Смотреть тарифы</Link>
                            </div>
                        </div>
                    </>



                }

                information={
                    <>
                        {viewInfornation && (<Infornation close={setViewInfornation} />)}
                    </>
                }

                navigation={

                    <div className=" bg-[#FAFAFA] rounded-[26px] px-[45px] py-[29px] flex items-center flex-col gap-[30px]">
                        <div className="h-[145px] w-[145px] rounded-[50%] border border-[#BDBFC7] border-solid flex items-center justify-center">
                            <span className='text-[#787B86] text-[48px] font-medium'>АБ</span>
                        </div>
                        <button className='w-full py-[15px] bg-[#ECEEF1] rounded-[16px] text-center'>
                            <span className='text-[#787B86] text-[18px] font-medium '>Изменить логотип</span>
                        </button>
                    </div>

                }
            />

            <div className={clsx(" transition-all duration-500 fixed z-[1000]", !viewContracts ? 'invisible opacity-0' : 'visible opacity-100')}>
                <Modal
                    close={() => { }}
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

export { Preview };