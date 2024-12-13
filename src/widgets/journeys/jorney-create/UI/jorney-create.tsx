import Layout from "@/app/layouts/layout-jorney";
import SuccessImg from '@/assets/icons/success-violet-noround.svg?react'
import { Dropdown } from "@/shared/UI";
import { Link } from "react-router-dom";


const JorneyCreate = () => {

    return (
        <Layout

            block={
                <>
                    <div className="h-full flex flex-col gap-[30px] items-start">
                        <span className="text-[25px] font-medium">Создать новый шаблон</span>
                        <div className="flex gap-[50px]">
                            <div className="flex flex-col gap-[30px]">
                                <label className="flex flex-col gap-[10px]">
                                    <span className="text-[14px] text-[#787B86] font-medium">Название</span>

                                    <input type="text" className="w-full py-[11px] px-[20px] bg-[#ECEEF1] rounded-[13px] placeholder:text-[#787B86] text-[14px] font-medium" placeholder="Безымянная поездка #1" />
                                </label>
                                <div className="flex gap-[30px]">
                                    <div className="flex flex-col gap-[10px]">
                                        <span className="text-[14px] text-[#787B86] font-medium">Проект</span>
                                        <div className="py-[11px] px-[20px] bg-[#ECEEF1] rounded-[13px] w-[150px]">
                                            <p className="text-[14px] font-medium">Альфа</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <span className="text-[14px] text-[#787B86] font-medium">Контактное лицо</span>

                                        <div className="flex gap-[5px]">
                                            <div className="bg-[#ECEEF1] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center">
                                                <p className="text-[14px] font-medium leading-[1]">ВИ</p>
                                            </div>
                                            <div className="py-[11px] px-[20px] bg-[#ECEEF1] rounded-[13px] w-[200px]">
                                                <p className="text-[14px] font-medium">Вознесенский Иван</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="w-[250px]">
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-[14px] text-[#787B86] font-medium">Центр затрат</span>
                                    <div className="flex flex-col gap-[6px]">
                                        <div className="relative">
                                            <Dropdown
                                                isAbsoluteDrop={true}
                                                title="Продукт">
                                                <></>
                                            </Dropdown>
                                        </div>
                                        <div className="relative">
                                            <Dropdown
                                                isAbsoluteDrop={true}
                                                title="Проект">
                                                <></>
                                            </Dropdown>
                                        </div>
                                        <div className="relative">

                                            <Dropdown
                                                isAbsoluteDrop={true}
                                                title="Цель">
                                                <></>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-[16px] self-end">
                            <Link to={'/templates/all'} className="py-[15px] w-[255px] bg-[#ECEEF1] rounded-[18px] text-center">
                                <p className="text-[16px]">Использовать шаблон</p>
                            </Link>
                            <Link to={'/journeys/item'} className="py-[15px] w-[255px] bg-[#121212] rounded-[18px] text-center">
                                <p className="text-primary text-[16px]">Перейти в поездку</p>
                            </Link>
                        </div>
                    </div>
                </>
            }

            block1={
                <div className="h-full justify-center items-start flex flex-col gap-[30px]">
                    <div className="*:text-[#787B86] flex flex-col gap-[15px]">
                        <div className="items-center flex gap-[10px]">
                            <span className="text-[25px] font-medium">Создать индивидуальный заказ</span>
                            <SuccessImg />
                        </div>
                        <p className="max-w-[320px]">Вы можете создать индивидуальный заказ и доверить нам подбор билетов.</p>
                    </div>

                    <Link to={'/templates/all'} className="py-[15px] self-end px-[35px] bg-[#ECEEF1] rounded-[18px] text-center">
                        <p className="text-[16px]">Создать</p>
                    </Link>

                </div>
            }


        />
    );
};

export { JorneyCreate };