import SuccessBlueImg from '@/assets/icons/success-blue.svg?react'
import SecurityImg from '@/assets/icons/security.svg?react'

const SecurityCart = ({active, status}:{active:boolean; status: string}) => {
    return (
        <>
            <div className="grow flex flex-col gap-[10px] items-center justify-center">
                <SecurityImg />
                <div className="flex flex-col gap-[5px] text-center">
                    <span className="text-[#787B86] font-medium text-[18px]">Безопасность</span>
                    <p className="text-[#787B86] text-[12px]">
                        Смена пароля, контроль истории активности, привязка аккаунта к ID и настройка автовыхода
                    </p>
                </div>
            </div>
            <div className={`${active ? 'bg-primary' : 'bg-[#ECEEF1]'} transition-all duration-300 rounded-[13px] flex items-center gap-[5px] justify-center py-[9px]`}>
                <SuccessBlueImg />
                <span className="text-[14px]">{status}</span>
            </div>
        </>
    );
};

export { SecurityCart };