
import AlfaImg from "@/assets/icons/alpha.svg?react";
import PlusImg from "@/assets/icons/plus.svg?react";
import WithdrawImg from "@/assets/icons/withdraw.svg?react";
import ActImg from "@/assets/icons/act.svg?react";





const Assets = () => {




    return (
        <>
            <div className="flex gap-[15px] h-full items-start">
                <div className="flex flex-col gap-[20px] w-1/2 p-[20px] rounded-[40px] bg-primary h-full">
                    <span className='text-[25px] font-medium'>Расчетные счета</span>


                    <div className="flex flex-col gap-[10px] grow">
                        <div className="p-[10px] rounded-[26px] bg-[#ECEEF1] flex items-center gap-[10px]">
                            <AlfaImg className='w-[35px] h-[35px]' />
                            <span className=' font-medium'>Альфа Банк</span>
                            <span className='text-[#9B9FAD] font-medium'>Действующий</span>
                        </div>
                    </div>


                    <button className="flex items-center gap-[10px] rounded-[26px] border border-solid border-[#E5E7EA] p-[15px]">
                        <PlusImg className='h-[15px] w-[15px]' />
                        <span className='font-normal text-[#787B86]'>Добавить счет</span>
                    </button>
                </div>

                <div className="p-[20px] rounded-[40px] bg-primary w-1/2 flex flex-col gap-[20px]">
                    <span className='text-[25px] font-medium'>Действия со счетами</span>
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex gap-[10px]">
                            <button className="text-left p-[15px] rounded-[16px] bg-[#ECEEF1] flex flex-col gap-[20px] w-1/2">
                                <WithdrawImg className="rotate-[180deg]" />
                                <p className="text-[#787B86] font-medium leading-[1.2]">
                                    Пополнить <br />
                                    баланс
                                </p>
                            </button>
                            <button className="text-left p-[15px] rounded-[16px] bg-[#ECEEF1] flex flex-col gap-[20px] w-1/2">
                                <WithdrawImg />
                                <p className="text-[#787B86] font-medium leading-[1.2]">
                                    Вывести <br />
                                    средства
                                </p>
                            </button>
                        </div>
                        <button className="text-left p-[16px] rounded-[16px] bg-[#ECEEF1] flex justify-center items-center gap-[7px]">
                            <ActImg />
                            <p className="text-[#787B86] font-medium leading-[1.2]">Сформировать акт сверки</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Assets };