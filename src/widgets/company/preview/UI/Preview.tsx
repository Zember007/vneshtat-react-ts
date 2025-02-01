import Layout from '@/app/layouts/layout';
import ImgWrite from '@/assets/img/company/write.webp'
import { useState } from 'react';
import Infornation from '@/widgets/jobs/UI/Infornation';
import Modal from '@/widgets/jobs/UI/Modal';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import WalletImg from '@/assets/icons/wallet.svg?react'
import AdvanceImg from '@/assets/icons/extra_advance.svg?react'

interface company {
    LegalName: string;
    Inn: string;
    ContractId: number;
}

interface tariff {
    TariffName: string;
    id: number;
}


const Preview = ({ companyInformation, tariffInformation }: { companyInformation: company | boolean; tariffInformation: tariff | boolean }) => {



    const [viewInfornation, setViewInfornation] = useState<boolean>(true)
    const [viewContracts, setViewContracts] = useState<boolean>(false)

    return (
        <>

            <Layout

                component={

                    <>
                        <div className="  h-full bg-[#FAFAFA] rounded-[40px] ">
                            {!companyInformation &&
                                <div className='text-center py-[50px] flex items-center justify-center flex-col gap-[15px]'>
                                    <span className='text-[44px] font-medium'>Добро пожаловать во Внештат!</span>
                                    <Link to={'/jobs/company/edit'} className='bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Заполнить данные компании</Link>
                                    <p className='text-[#787B86] mt-[5px]'>
                                        Чтобы получить полный доступ к сервису, нужно заполнить<br /> данные вашей компании, подписать договор и выбрать тариф
                                    </p>
                                </div>
                            }
                            {typeof companyInformation !== 'boolean' &&
                                <div className='py-[30px] px-[35px] flex items-center justify-between'>
                                    <div className="flex flex-col gap-[10px] items-start">
                                        <span className='text-[#9B9FAD] text-[25px] font-medium'>Договор подписан</span>
                                        <h1 className='text-[#000] text-[44px] font-medium'>{companyInformation.LegalName}</h1>
                                        <p className='text-[18px] text-[#9B9FAD]'>
                                            ИНН: {companyInformation.Inn} <br />
                                            Номер договора: {companyInformation.ContractId}
                                        </p>
                                        <Link to={'/jobs/company/edit'} className='bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium mt-[10px]'>Смотреть данные и договор</Link>
                                    </div>

                                    <img src={ImgWrite} alt="write" className="max-w-[100%]" />
                                </div>
                            }
                        </div>

                        <div className="bg-black p-[40px] rounded-[40px] relative flex gap-[15px]">
                            <div className="flex flex-col gap-[15px] grow">
                                <div className="flex flex-col gap-[5px]">
                                    <span className="text-[24px] font-medium text-[#9B9FAD] leading-[1.2]">Статус</span>
                                    <span className="text-[40px] font-medium text-[#9B9FAD] leading-[1.2]">Standart</span>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <div className="rounded-[20px] bg-[#252D35] p-[5px]">
                                        <div className="h-[42px] flex justify-between">
                                            <div className="bg-[#333D47] rounded-[16px] h-full px-[22px] flex items-center">
                                                <div className="h-[8px] w-[8px] rounded-[50%] bg-primary"></div>
                                            </div>

                                            <div className="grow h-full"></div>

                                            <div className=" rounded-[16px] h-full px-[22px] flex items-center">
                                                <div className="h-[8px] w-[8px] rounded-[50%] bg-[#8C909C]"></div>
                                            </div>

                                            <div className="grow h-full"></div>

                                            <div className=" rounded-[16px] h-full px-[22px] flex items-center">
                                                <div className="h-[8px] w-[8px] rounded-[50%] bg-[#8C909C]"></div>
                                            </div>

                                            <div className="grow h-full"></div>

                                            <div className=" rounded-[16px] h-full px-[22px] flex items-center">
                                                <div className="h-[8px] w-[8px] rounded-[50%] bg-[#8C909C]"></div>
                                            </div>

                                            <div className="grow h-full"></div>

                                            <div className=" rounded-[16px] h-full px-[22px] flex items-center">
                                                <div className="h-[8px] w-[8px] rounded-[50%] bg-[#8C909C]"></div>
                                            </div>

                                            <div className="grow h-full"></div>

                                            <div className=" rounded-[16px] h-full px-[22px] flex items-center">
                                                <div className="h-[8px] w-[8px] rounded-[50%] bg-[#8C909C]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <Link to={'/jobs/company/tariffs'} className="rounded-[20px] bg-[#252D35] w-full py-[15px] text-center font-medium text-primary">
                                        Осталось 10 поездок до повышения
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[14px] p-[20px] rounded-[26px] bg-[#252D35]">
                                <div className="flex flex-col">
                                    <span className=" font-medium text-[#9B9FAD] leading-[1.2] text-[20px]">Лимиты</span>
                                    <span className=" font-medium text-[#9B9FAD] leading-[1.2] text-[14px]">Для оплаты счетов</span>
                                </div>

                                <div className="flex h-full grow flex-col gap-[5px] justify-between">
                                    <div className="flex items-center gap-[13px]">
                                        <WalletImg className='h-[25px] w-auto mx-[4.5px]'/>
                                        <span className='text-[#787B86] font-medium'>Не ограничен</span>
                                    </div>
                                    <div className="flex items-center gap-[13px]">
                                        <AdvanceImg className='h-[25px] w-auto'/>
                                        <span className='text-[#787B86] font-medium'>До 90 000 ₽</span>
                                    </div>
                                    <div className="flex items-center gap-[13px]">
                                        <AdvanceImg className='h-[25px] w-auto'/>
                                        <span className='text-[#787B86] font-medium'>До 50 000 ₽</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>



                }

                information={
                    <>
                        {viewInfornation && (<Infornation close={setViewInfornation} />)}
                    </>
                }

                extraClassInformation='bg-[transparent]'

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