import Layout from '@/app/layouts/layout';
import { useState } from 'react';
import Infornation from '@/widgets/jobs/UI/Infornation';
import Modal from '@/widgets/jobs/UI/Modal';
import { ModalRight } from '@/shared/UI';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import WalletImg from '@/assets/icons/wallet.svg?react'
import AdvanceImg from '@/assets/icons/extra_advance.svg?react'
import SizeImg from '@/assets/icons/img-size.svg?react'
import TypeImg from '@/assets/icons/img-type.svg?react'
import ImgWrite from '@/assets/img/company/write.webp'


interface company {
    LegalName: string;
    Inn: string;
    ContractId: number;
}

interface tariff {
    TariffName: string;
    id: number;
}


const Preview = ({ companyInformation }: { companyInformation: company | boolean; tariffInformation: tariff | boolean }) => {



    const [viewContracts, setViewContracts] = useState<boolean>(false)
    const [changeLogo, setChangeLogo] = useState<boolean>(false)

    return (
        <>

            <Layout

                component={

                    <>
                        <div className="  h-full bg-[#FAFAFA] rounded-[40px] ">
                            {!companyInformation &&
                                <div className='p-[35px] flex items-center justify-between gap-[20px]'>
                                    <div className="flex flex-col gap-[16px] max-w-[380px]">
                                        <span className="text-[24px] font-medium text-[#9B9FAD]">Договор не подписан</span>
                                        <p className="text-[30px] font-medium text-[#000]">
                                            Подпишите договор, чтобы получить доступ
                                            ко всем функциям.
                                        </p>
                                        <Link to={'/jobs/company/edit'} className='self-start bg-[#007BFB] text-center w-[320px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Ввести данные</Link>
                                    </div>
                                    <div className="max-w-full">
                                        <img src={ImgWrite} alt="write" className="max-w-[100%]" />
                                    </div>
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
                                        <WalletImg className='h-[25px] w-auto mx-[4.5px]' />
                                        <span className='text-[#787B86] font-medium'>Не ограничен</span>
                                    </div>
                                    <div className="flex items-center gap-[13px]">
                                        <AdvanceImg className='h-[25px] w-auto' />
                                        <span className='text-[#787B86] font-medium'>До 90 000 ₽</span>
                                    </div>
                                    <div className="flex items-center gap-[13px]">
                                        <AdvanceImg className='h-[25px] w-auto' />
                                        <span className='text-[#787B86] font-medium'>До 50 000 ₽</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>



                }

                information={
                    <>
                       <Infornation />
                    </>
                }

                extraClassInformation='bg-[transparent]'

                navigation={

                    <div className=" bg-[#FAFAFA] rounded-[26px] px-[45px] py-[29px] flex items-center flex-col gap-[30px]">
                        <div className="h-[145px] w-[145px] rounded-[50%] border border-[#BDBFC7] border-solid flex items-center justify-center">
                            <span className='text-[#787B86] text-[48px] font-medium'>АБ</span>
                        </div>
                        <button
                            onClick={() => setChangeLogo(true)}
                            className='w-full py-[15px] bg-[#ECEEF1] rounded-[16px] text-center'>
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

            <ModalRight
                action={() => { }}
                button={
                    <>
                        <div className="flex gap-[10px] mt-[10px]">
                            <button className='bg-[#ECEEF1] w-full rounded-[16px] py-[14px] text-[18px] text-[#787B86] font-medium'>
                                Отмена
                            </button>
                            <button className='bg-[#ECEEF1] w-full rounded-[16px] py-[14px] text-[18px] text-[#787B86] font-medium'>
                                Сохранить
                            </button>
                        </div>
                    </>
                }
                active={changeLogo}
                close={() => setChangeLogo(false)}
                title='Логотип компании'
                description='Сотрудники с уровнем доступа Менеджер+ могут установить логотип компании. Он будет отображаться в разделе “О компании”, а также при входе в сервис.'
            >
                <div className="flex flex-col grow">
                    <div className="py-[25px] px-[32px] bg-[#ECEEF1] rounded-[23px] flex flex-col gap-[12px]">
                        <div className="flex items-center gap-[17px]">
                            <SizeImg />
                            <div className="flex gap-[13px] items-center">
                                <p className='text-[20px] font-medium'>800х800 px</p>
                                <p className='text-[14px] font-medium text-[#787B86]'>рекомендуемое разрешение</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-[17px]">
                            <TypeImg />
                            <div className="flex gap-[13px] items-center">
                                <p className='text-[20px] font-medium'>JPG, GIF, PNG, HEIC</p>
                                <p className='text-[14px] font-medium text-[#787B86]'>формат файла</p>
                            </div>
                        </div>
                    </div>

                    <div className="grow flex items-center justify-center">
                        <div className="w-[260px] h-[260px] rounded-[20px] border border-solid border-[#E5E7EA] flex items-center p-[23px]">
                            <button className='bg-black w-full rounded-[16px] py-[14.5px] text-[18px] text-primary font-medium'>
                                Выбрать файл
                            </button>
                        </div>
                    </div>

                    <hr className='h-[1px] w-full bg-[#E5E7EA]' />
                </div>
            </ModalRight>

        </>
    );
};

export { Preview };