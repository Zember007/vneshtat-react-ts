import AccessImg from '@/assets/icons/access.svg?react'
import SuccessBlueImg from '@/assets/icons/success-blue.svg?react'

const AccessCart = ({active}:{active:boolean}) => {
    return (
        <>
            <div className="grow flex flex-col gap-[10px] items-center justify-center">
                <AccessImg className="w-[40px] h-[40px] *:fill-[#007BFB]" />
                <div className="flex flex-col gap-[5px] text-center">
                    <span className="text-[#787B86] font-medium text-[18px]">Доступ</span>
                    <p className="text-[#787B86] text-[12px]">
                        Доступ к оформлению, тревел-политика и настройка периодов отсутствия.
                    </p>
                </div>
            </div>
            <div className={`transition-all duration-300 rounded-[13px] flex items-center gap-[5px] justify-center py-[9px] ${active ? 'bg-primary' : 'bg-[#ECEEF1]'}`}>
                <SuccessBlueImg />
                <span className="text-[14px]">Нет изменений</span>
            </div>
        </>
    );
};

export { AccessCart };