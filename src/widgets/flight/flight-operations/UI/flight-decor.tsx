import { Dropdown } from "@/shared/UI";
import WarnImg from '@/assets/icons/warn.svg?react'
import LogoImg from '@/assets/icons/fligt/flight-avialogo.svg?react'
import RefundImg from '@/assets/icons/refund-arrow.svg?react'
import ChangeImg from '@/assets/icons/change-arrow.svg?react'
import BaggageImg from '@/assets/icons/hand-luggage.svg?react'
import SuccessVImg from '@/assets/icons/success-violet.svg?react'
import SuccessImg from '@/assets/icons/success.svg?react'
import TransferImg from '@/assets/icons/transfer-people.svg?react'

const FlightDecor = () => {
    return (
        <div className="flex flex-col gap-[10px]">
            <Dropdown title="Тариф" extraClass="!pl-[20px]" >
                <div className="flex flex-col gap-[10px]">
                    <div className="bg-primary p-[10px] rounded-[13px] flex flex-col gap-[10px]">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-[10px] justify-between w-full">
                                <div className="flex items-center gap-[5px]">
                                    <SuccessVImg className="w-[18px] h-[18px]" />
                                    <span className="text-[12px] font-medium">Базовый</span>
                                </div>
                                <button>
                                    <WarnImg className="w-[18px] h-[18px] *:fill-[#BDBFC7]" />
                                </button>
                            </div>

                            <div className="flex items-center gap-[5px]">
                                <span className="text-[12px] font-medium">8570,00 ₽</span>
                                <span className="text-[12px] text-[#9B9FAD]">за 1 пассажира</span>
                            </div>
                        </div>
                        <hr className="h-[1px] w-full bg-[#E5E7EA]" />
                        <div className="flex flex-col gap-[6px]">
                            <div className="flex items-center gap-[5px]">
                                <SuccessImg className="w-[18px] h-[18px]" />
                                <span className="text-[11px]">Без багажа</span>
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <BaggageImg className="w-[18px] h-[18px] *:fill-[#121212]" />
                                <span className="text-[11px]">Ручная кладь</span>
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <RefundImg className="w-[18px] h-[18px] *:fill-[#121212]" />
                                <span className="text-[11px]">Обмен: 3000 ₽ </span>
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <ChangeImg className="w-[18px] h-[18px]" />
                                <span className="text-[11px]">Возврат: запрещен</span>
                            </div>
                        </div>
                        <hr className="h-[1px] w-full bg-[#E5E7EA]" />
                        <p className="text-[10px] text-[#787B86] text-center">Доступно мест: 36</p>
                    </div>

                    <div className="bg-primary p-[10px] rounded-[13px] flex flex-col gap-[10px]">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-[10px] justify-between w-full">
                                <div className="flex items-center gap-[5px]">
                                    <SuccessImg className="w-[18px] h-[18px] *:fill-[#121212]" />
                                    <span className="text-[12px] font-medium">Стандарт</span>
                                </div>
                                <button>
                                    <WarnImg className="w-[18px] h-[18px] *:fill-[#BDBFC7]" />
                                </button>
                            </div>

                            <div className="flex items-center gap-[5px]">
                                <span className="text-[12px] font-medium">17 140,00 ₽</span>
                                <span className="text-[12px] text-[#9B9FAD]">за 1 пассажира</span>
                            </div>
                        </div>
                        <hr className="h-[1px] w-full bg-[#E5E7EA]" />
                        <div className="flex flex-col gap-[6px]">
                            <div className="flex items-center gap-[5px]">
                                <SuccessImg className="w-[18px] h-[18px]" />
                                <span className="text-[11px]">Без багажа</span>
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <BaggageImg className="w-[18px] h-[18px] *:fill-[#121212]" />
                                <span className="text-[11px]">Ручная кладь</span>
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <RefundImg className="w-[18px] h-[18px] *:fill-[#121212]" />
                                <span className="text-[11px]">Обмен: 3000 ₽ </span>
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <ChangeImg className="w-[18px] h-[18px]" />
                                <span className="text-[11px]">Возврат: запрещен</span>
                            </div>
                        </div>
                        <hr className="h-[1px] w-full bg-[#E5E7EA]" />
                        <p className="text-[10px] text-[#787B86] text-center">Доступно мест: 36</p>
                    </div>
                </div>
            </Dropdown>

            <Dropdown title={"Класс"} selectedText={'Эконом'} extraClass="!pl-[20px]">
                <></>
            </Dropdown>

            <Dropdown title="Перелёт 1" extraClass="!pl-[20px]">
                <div className="flex flex-col gap-[10px]">
                    <div className={`flex flex-col mt-[10px]  rounded-[13px] transition-all duration-300 bg-primary p-[10px] gap-[10px]`}>
                        <div className="flex flex-col gap-[5px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-[5px]">
                                    <LogoImg />
                                    <span className="text-[12px] font-medium">016А</span>
                                    <span className="text-[#9B9FAD] text-[12px] font-medium">Сапсан</span>
                                </div>
                                <button>
                                    <WarnImg className="w-[18px] h-[18px] *:fill-[#BDBFC7]" />
                                </button>
                            </div>
                            <span className="text-[#9B9FAD] text-[11px] font-medium pl-[20px]">4ч 35м</span>
                        </div>

                        <div className={`flex flex-col gap-[10px] overflow-hidden transition-all duration-300`}>
                            <div className="flex gap-[7px] before:w-[5px] before:bg-[#E5E7EA] before:content-[''] before:block">
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex gap-[15px]">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">08:55</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">28 дек, чт</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">Санкт-
                                                Петербург</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">Московский вкз.</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-[15px]">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">08:55</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">28 дек, чт</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">Санкт-
                                                Петербург</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">Московский вкз.</span>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <hr className="h-[1px] bg-[#E5E7EA]" />

                            <p className="text-[#787B86] text-[10px] text-center">Доступно мест: 36</p>
                        </div>
                    </div>
                </div>
            </Dropdown>

            <Dropdown title="Перелёт 2" extraClass="!pl-[20px]">
                <div className="flex flex-col gap-[10px]">
                    <div className={`flex flex-col mt-[10px]  rounded-[13px] transition-all duration-300 bg-primary p-[10px] gap-[10px]`}>
                        <div className="flex flex-col gap-[5px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-[5px]">
                                    <LogoImg />
                                    <span className="text-[12px] font-medium">016А</span>
                                    <span className="text-[#9B9FAD] text-[12px] font-medium">Сапсан</span>
                                </div>
                                <button>
                                    <WarnImg className="w-[18px] h-[18px] *:fill-[#BDBFC7]" />
                                </button>
                            </div>
                            <span className="text-[#9B9FAD] text-[11px] font-medium pl-[20px]">4ч 35м</span>
                        </div>

                        <div className={`flex flex-col gap-[10px] overflow-hidden transition-all duration-300`}>
                            <div className="flex gap-[7px] before:w-[5px] before:bg-[#E5E7EA] before:content-[''] before:block">
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex gap-[15px]">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">08:55</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">28 дек, чт</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">Санкт-
                                                Петербург</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">Московский вкз.</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-[15px]">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">08:55</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">28 дек, чт</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">Санкт-
                                                Петербург</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">Московский вкз.</span>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <hr className="h-[1px] bg-[#E5E7EA]" />

                            <p className="text-[#787B86] text-[10px] text-center">Доступно мест: 36</p>
                        </div>
                    </div>

                    <div className="rounded-[13px] transition-all duration-300 bg-primary p-[10px] flex flex-col gap-[5px]">
                        <div className="flex gap-[5px]">
                            <TransferImg />
                            <span className="text-[12px] font-medium">Пересадка</span>
                        </div>
                        <div className="mx-auto flex items-center gap-[5px]">
                            <span className="text-[12px] text-[#9B9FAD] font-medium">2ч 08м</span>
                            <span className="text-[10px] text-[#9B9FAD]">Домодедово, DME</span>
                        </div>
                    </div>

                    <div className={`flex flex-col mt-[10px]  rounded-[13px] transition-all duration-300 bg-primary p-[10px] gap-[10px]`}>
                        <div className="flex flex-col gap-[5px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-[5px]">
                                    <LogoImg />
                                    <span className="text-[12px] font-medium">016А</span>
                                    <span className="text-[#9B9FAD] text-[12px] font-medium">Сапсан</span>
                                </div>
                                <button>
                                    <WarnImg className="w-[18px] h-[18px] *:fill-[#BDBFC7]" />
                                </button>
                            </div>
                            <span className="text-[#9B9FAD] text-[11px] font-medium pl-[20px]">4ч 35м</span>
                        </div>

                        <div className={`flex flex-col gap-[10px] overflow-hidden transition-all duration-300`}>
                            <div className="flex gap-[7px] before:w-[5px] before:bg-[#E5E7EA] before:content-[''] before:block">
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex gap-[15px]">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">08:55</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">28 дек, чт</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">Санкт-
                                                Петербург</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">Московский вкз.</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-[15px]">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">08:55</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">28 дек, чт</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">Санкт-
                                                Петербург</span>
                                            <span className="text-[10px] text-[#9B9FAD] ">Московский вкз.</span>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <hr className="h-[1px] bg-[#E5E7EA]" />

                            <p className="text-[#787B86] text-[10px] text-center">Доступно мест: 36</p>
                        </div>
                    </div>
                </div>
            </Dropdown>
        </div>
    )
};

export { FlightDecor };