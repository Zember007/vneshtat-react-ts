// import clsx from "clsx";
// import Fix from "./Fix";
// import Procent from "./Procent";
// import Elite from "./Elite";
import WalletImg from '@/assets/icons/wallet.svg?react'
import VneshtatImg from '@/assets/icons/Vneshtat-king.svg?react'
import AdvanceImg from '@/assets/icons/extra_advance.svg?react'
import AirplaneImg from '@/assets/icons/airplane.svg?react'
import BonusImg from '@/assets/icons/bonus-arrow.svg?react'
import SuccessImg from '@/assets/icons/success-violet-noround.svg?react'
import TrainImg from '@/assets/icons/train-icon.svg?react'
import { useEffect } from "react";
import CloseIcon from '@/assets/icons/close.svg?react'
import CartGold from '@/assets/icons/Status-Cart-Gold.svg?react'
import CartPlatinum from '@/assets/icons/Status-Cart-Platinum.svg?react'
import CartSilver from '@/assets/icons/Status-Cart-Silver.svg?react'
import { Link } from "react-router-dom";
// import { getAccessToken } from "@/shared/utils";

interface tariff {
    TariffName: string;
    id: number;
}

const Tariffs = ({ tariffActive }: { tariffActive: tariff | boolean }) => {

    // const [active, setActive] = useState<string>('fix')
    // const [tariffs, setTariffs] = useState<any[]>([])
    // const [status, setStatus] = useState<any>(true)

    // const tariffSelect = tariffs.find(item => item.TariffName === active)

    // const EmployeeId = localStorage.getItem('EmployeeId')
    // const AccessToken = getAccessToken()


    // const getInformation = async () => {
    //     const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_tariffs');
    //     url.searchParams.append('EmployeeId', EmployeeId || '');

    //     try {
    //         const res = await fetch(url, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${AccessToken}`
    //             }
    //         });
    //         const data = await res.json();
    //         if (data.status === "error") {
    //             console.log("error", data);
    //         }

    //         if (data.status === "success" && data.data) {
    //             setTariffs(data.data);
    //         }
    //     } catch (error) {

    //         console.log(error);

    //     }

    // }

    // const getStatus = async () => {

    //     const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_tariff_treaty_status');
    //     url.searchParams.append('EmployeeId', EmployeeId || '');

    //     try {
    //         const res = await fetch(url, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${AccessToken}`
    //             }
    //         });
    //         const data = await res.json();
    //         if (data.status === "error") {
    //             console.log("error", data);
    //         }

    //         if (data.status === "success" && data.data) {
    //             console.log(data.data);
    //             setStatus(data.data)
    //         }
    //     } catch (error) {

    //         console.log(error);

    //     }

    // }

    // useEffect(() => {
    //     getInformation()
    // }, [])

    useEffect(() => {

    }, [tariffActive])



    return (
        <div className="grow py-[40px] px-[30px] rounded-[40px] bg-black flex flex-col gap-[30px]">

            <div className="flex flex-col gap-[20px]">
                <div className="flex justify-between">
                    <span className="text-[50px] leading-[1.2] text-[#9B9FAD] font-medium">Статусы</span>
                    <Link to={'/jobs/company'} className="px-[8px]">
                        <CloseIcon className="w-[25px] h-[25px] *:fill-[#BDBFC7]" />
                    </Link>
                </div>
                <div className="flex flex-col gap-[10px] ">
                    <div className="flex items-center justify-between *:w-[80px]">
                        <p className="text-[#9B9FAD] text-[14px] font-medium">
                            Standart
                        </p>
                        <p className="text-[#9B9FAD] text-[14px] font-medium text-center">
                            Standart <br />Plus
                        </p>
                        <p className="text-[#9B9FAD] text-[14px] font-medium text-center">
                            Standart <br />Master
                        </p>
                        <p className="text-[#9B9FAD] text-[14px] font-medium text-center">
                            Standart <br />Pro
                        </p>
                        <div>
                            <CartSilver className="w-full" />
                        </div>
                        <div>
                            <CartGold className="w-full" />
                        </div>
                        <div>
                            <CartPlatinum className="w-full" />
                        </div>
                    </div>
                    <div className="px-[13px] py-[10px] rounded-[14px] bg-[#252D35] mx-[15px] relative">
                        <div className="absolute rounded-[10px] sliderLinear z-0 top-[4px] left-[4px] bottom-[4px] w-[3%]"></div>

                        <div className="relative flex justify-between w-full">
                            <div className="h-[8px] w-[8px] bg-primary rounded-[50%]"></div>

                            <div className="h-[8px] w-[8px] bg-primary rounded-[50%]"></div>

                            <div className="h-[8px] w-[8px] bg-primary rounded-[50%]"></div>

                            <div className="h-[8px] w-[8px] bg-primary rounded-[50%]"></div>

                            <div className="h-[8px] w-[8px] bg-primary rounded-[50%]"></div>


                            <div className="h-[8px] w-[8px] bg-primary rounded-[50%]"></div>


                            <div className="h-[8px] w-[8px] bg-primary rounded-[50%]"></div>
                        </div>

                    </div>

                    <div className="mx-[15px] flex justify-between">
                        <p className="w-[99px] text-[#9B9FAD] text-[12px] font-medium">0-9 поездок</p>
                        <p className="w-[99px] text-[#9B9FAD] text-[12px] font-medium text-center">10-49 поездок</p>
                        <p className="w-[99px] text-[#9B9FAD] text-[12px] font-medium text-center">50-99 поездок</p>
                        <p className="w-[99px] text-[#9B9FAD] text-[12px] font-medium text-center">100-149 поездок</p>
                        <p className="w-[99px] text-[#9B9FAD] text-[12px] font-medium text-center">150-249 поездок</p>
                        <p className="w-[99px] text-[#9B9FAD] text-[12px] font-medium text-center">250-499 поездок</p>
                        <p className="w-[99px] text-[#9B9FAD] text-[12px] font-medium text-right">500+ поездок</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[15px]">
                <div className="flex gap-[15px]">
                    <div className="rounded-[26px] bg-black shadow-[0px_4px_34px_0px_rgba(255,255,255,0.17)] p-[22px] flex flex-col gap-[20px] grow">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className="text-[#9B9FAD] text-[20px] font-medium">Статус вашей компании</span>
                                <span className="text-[#9B9FAD] text-[36px] font-medium">Standart</span>
                            </div>
                            <div className="flex flex-col bg-[#252D35] rounded-[20px] px-[20px] py-[9px]">
                                <span className="text-[#9B9FAD] text-[36px] font-medium">0</span>
                                <span className="text-[#9B9FAD] text-[14px] font-medium">поездок</span>
                            </div>
                        </div>
                        <button className="rounded-[20px] bg-[#252D35] w-full py-[15px]  relative">
                            <div className="absolute rounded-[20px] w-[50%] top-0 bottom-0 left-0 bg-[#007BFB]"></div>
                           <span className='relative text-center font-medium text-primary'>Осталось 5 поездок до повышения</span>
                        </button>
                    </div>
                    <div className="flex h-full grow flex-col gap-[5px] justify-between rounded-[26px] bg-black shadow-[0px_4px_34px_0px_rgba(255,255,255,0.17)] p-[25px]">
                        <div className="flex items-center gap-[13px]">
                            <WalletImg className='h-[25px] w-auto mx-[4.5px]' />
                            <div className="flex flex-col">
                                <span className='leading-[1.2] text-[#007BFB] font-medium text-[20px]'>Оплата с депозита</span>
                                <span className='leading-[1.2] text-[#9B9FAD] font-medium text-[14px]'>Лимит не ограничен</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-[13px]">
                            <AdvanceImg className='h-[25px] w-auto' />
                            <div className="flex gap-[9px] items-center">
                                <span className='text-[#787B86] text-[20px]  font-medium'>До 90 000 ₽</span>
                                <span className='leading-[1.2] text-[#9B9FAD] font-medium text-[14px]'>на 3 дня</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-[13px]">
                            <AdvanceImg className='h-[25px] w-auto' />
                            <div className="flex gap-[9px] items-center">
                                <span className='text-[#787B86] text-[20px]  font-medium'>До 50 000 ₽</span>
                                <span className='leading-[1.2] text-[#9B9FAD] font-medium text-[14px]'>на 5 дня</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[15px]">
                    <div className="flex flex-col gap-[15px]">
                        <div className="rounded-[26px] bg-black shadow-[0px_4px_34px_0px_rgba(255,255,255,0.17)] p-[22px] flex flex-col gap-[20px] grow">
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[#9B9FAD] text-[20px] font-medium">История платежей</span>
                                    <span className="text-[#9B9FAD] text-[36px] font-medium">Овердрафт</span>
                                </div>
                                <div className="flex flex-col bg-[#252D35] rounded-[20px] px-[20px] py-[9px]">
                                    <span className="text-[#9B9FAD] text-[36px] font-medium">0</span>
                                    <span className="text-[#9B9FAD] text-[14px] font-medium">просроченных платежей</span>
                                </div>
                            </div>
                            <button className="rounded-[20px] bg-[#252D35] w-full py-[15px] text-center font-medium text-primary">
                                Открыть список платежей
                            </button>
                        </div>
                        <div className="rounded-[26px] bg-black shadow-[0px_4px_34px_0px_rgba(255,255,255,0.17)] p-[22px] flex flex-col gap-[15px] grow">
                            <span className="text-[#9B9FAD] text-[20px] font-medium">Сборы за оформление услуг</span>
                            <div className="flex gap-[10px]">
                                <div className="py-[15px] px-[22px] rounded-[20px] bg-[#252D35] flex flex-col gap-[3px]">
                                    <span className="text-[#9B9FAD] text-[20px] font-medium">Самостоятельно</span>
                                    <div className="flex gap-[15px] items-center">
                                        <AirplaneImg />
                                        <p className='text-[14px] text-[#787B86]'>120 ₽/билет</p>
                                    </div>
                                    <div className="flex gap-[15px] items-center">
                                        <TrainImg />
                                        <p className='text-[14px] text-[#787B86]'>120 ₽/билет</p>
                                    </div>
                                </div>
                                <div className="py-[15px] px-[22px] rounded-[20px] bg-[#252D35] flex flex-col gap-[3px]">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-primary text-[20px] font-medium">Через оператора</span>
                                        <BonusImg className='w-[16px] h-[16px]'/>
                                        <SuccessImg className='w-[16px] h-[16px]'/>
                                    </div>
                                    <div className="flex gap-[15px] items-center">
                                        <AirplaneImg />
                                        <p className='text-[14px] text-[#787B86]'>120 ₽/билет</p>
                                    </div>
                                    <div className="flex gap-[15px] items-center">
                                        <TrainImg />
                                        <p className='text-[14px] text-[#787B86]'>120 ₽/билет</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-[26px] grow bg-black shadow-[0px_4px_34px_0px_rgba(255,255,255,0.17)] p-[30px] flex flex-col">
                        <span className='text-[20px] font-medium text-[#9B9FAD]'>Скоро</span>
                        <div className="grow flex items-center justify-center">
                            <VneshtatImg />
                        </div>
                        <p className='text-center text-[14px] text-[#787B86]'>Кэшбэк, специальные предложения<br /> и многое другое</p>
                    </div>
                </div>
            </div>



        </div>
    );
};

export { Tariffs };