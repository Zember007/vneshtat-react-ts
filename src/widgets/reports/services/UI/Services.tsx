import Switcher from "@/widgets/jobs/UI/Switcher";
import { useState } from "react";

const Services = () => {

    const [switcher, setSwitcher] = useState<boolean>(false)




    return (
        <>

            {/* <span className='font-normal text-[#787B86] text-center max-w-[390px]'>Выберите календарный отрезок и параметры формирования отчёта.</span> */}

            <div className="flex flex-col gap-[15px] p-[20px] h-full">


                <Switcher items={['Всё', 'По услугам']} change={setSwitcher} checked={switcher} />



                <div  className="grow h-[calc(100vh-320px)] overflow-y-auto scroll">
                    <div className="p-[15px] bg-[#ECEEF1] rounded-[13px]">
                        <div className="h-full bg-[#FBFBFBD1] p-[15px] rounded-[13px] flex flex-col gap-[10px]">
                            <div className="*:text-[12px] gap-[10px] *:font-medium *:text-[#9B9FAD] grid grid-cols-[1fr_1fr_1fr_3fr_1.5fr_1.5fr_1.5fr_1fr] pb-[10px] border-0 border-b border-solid border-[#E5E7EA]">
                                <span>Дата</span>
                                <span>Поездка</span>
                                <span>Услуга</span>
                                <span>Описание</span>
                                <span>Сотрудники</span>
                                <span>Центр затрат</span>
                                <span>Проект</span>
                                <span>Итого</span>
                            </div>
                            <div className="flex flex-col gap-[6px] text-[12px]">
                                <div className="grid grid-cols-[1fr_1fr_1fr_3fr_1.5fr_1.5fr_1.5fr_1fr] gap-[10px] pb-[6px] border-0 border-b border-solid border-[#E5E7EA]">
                                    <div className="flex flex-col gap-[2px]"><span>01.01.2023</span></div>
                                    <div className="flex flex-col gap-[2px]"><span>7398-3929</span></div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Авиабилет</span>
                                        <span>Продажа</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Вознесенский Иван</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Администрация</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Дорожное строительство</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span className="text-[#787B86]">22 550,20</span>
                                        <span className="text-[#787B86]">+150,00</span>
                                        <span>22 700,20</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[1fr_1fr_1fr_3fr_1.5fr_1.5fr_1.5fr_1fr] gap-[10px] pb-[6px] border-0 border-b border-solid border-[#E5E7EA]">
                                    <div className="flex flex-col gap-[2px]"><span>01.01.2023</span></div>
                                    <div className="flex flex-col gap-[2px]"><span>7398-3929</span></div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Авиабилет</span>
                                        <span>Продажа</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Вознесенский Иван</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Администрация</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Дорожное строительство</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span className="text-[#787B86]">22 550,20</span>
                                        <span className="text-[#787B86]">+150,00</span>
                                        <span>22 700,20</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[1fr_1fr_1fr_3fr_1.5fr_1.5fr_1.5fr_1fr] gap-[10px] pb-[6px] border-0 border-b border-solid border-[#E5E7EA]">
                                    <div className="flex flex-col gap-[2px]"><span>01.01.2023</span></div>
                                    <div className="flex flex-col gap-[2px]"><span>7398-3929</span></div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Авиабилет</span>
                                        <span>Продажа</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Вознесенский Иван</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Администрация</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Дорожное строительство</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span className="text-[#787B86]">22 550,20</span>
                                        <span className="text-[#787B86]">+150,00</span>
                                        <span>22 700,20</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[1fr_1fr_1fr_3fr_1.5fr_1.5fr_1.5fr_1fr] gap-[10px] pb-[6px] border-0 border-b border-solid border-[#E5E7EA]">
                                    <div className="flex flex-col gap-[2px]"><span>01.01.2023</span></div>
                                    <div className="flex flex-col gap-[2px]"><span>7398-3929</span></div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Авиабилет</span>
                                        <span>Продажа</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Вознесенский Иван</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Администрация</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Дорожное строительство</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span className="text-[#787B86]">22 550,20</span>
                                        <span className="text-[#787B86]">+150,00</span>
                                        <span>22 700,20</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[1fr_1fr_1fr_3fr_1.5fr_1.5fr_1.5fr_1fr] gap-[10px] pb-[6px] border-0 border-b border-solid border-[#E5E7EA]">
                                    <div className="flex flex-col gap-[2px]"><span>01.01.2023</span></div>
                                    <div className="flex flex-col gap-[2px]"><span>7398-3929</span></div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Авиабилет</span>
                                        <span>Продажа</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Вознесенский Иван</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Администрация</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span>Дорожное строительство</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <span className="text-[#787B86]">22 550,20</span>
                                        <span className="text-[#787B86]">+150,00</span>
                                        <span>22 700,20</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export { Services };