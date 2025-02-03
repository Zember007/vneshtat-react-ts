import WalletImg from '@/assets/icons/wallet.svg?react'
import TimeImg from '@/assets/icons/time.svg?react'



const Infornation = () => {





    return (
        <div className="flex flex-col gap-[10px] h-full">
            <div className="rounded-[30px] bg-primary grow justify-between p-[20px] pt-[30px] flex flex-col gap-[15px]">
                <div className="flex justify-between">
                    <WalletImg />
                    <span className="text-[14px] font-medium text-[#9B9FAD]">Депозит</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[22px] font-medium text-[#007BFB] leading-[1]">5 490 000 ₽</span>
                    <span className="text-[14px] font-medium text-[#9B9FAD] leading-[1]">Доступно</span>
                </div>
            </div>
            <div className="rounded-[30px] grow justify-between bg-primary p-[20px] pt-[30px] flex flex-col gap-[15px]">
                <div className="flex justify-between">
                    <TimeImg className="w-[38px] h-[25px]" />
                    <span className="text-[14px] font-medium text-[#9B9FAD]">Овердрафт</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[22px] font-medium text-[#787B86] leading-[1]">100 000 ₽</span>
                    <span className="text-[14px] font-medium text-[#9B9FAD] leading-[1]">Доступно</span>
                </div>
            </div>
        </div>
    );
};

export default Infornation;