import TeamImg from '@/assets/icons/team-jorney.svg?react'

const PersonalCart = ({ select }: { select: Function }) => {
    return (
        <>
            <div className="grow flex flex-col gap-[10px] items-center justify-center">
                <TeamImg className="w-[40px] h-[40px] *:fill-[#007BFB]" />
                <div className="flex flex-col gap-[5px] text-center">
                    <span className="text-[#787B86] font-medium text-[18px]">Личные данные</span>
                    <p className="text-[#787B86] text-[12px]">
                        Ваши паспортные данные, контакты, документы и мильные карты.
                    </p>
                </div>
            </div>
            <button
            onClick={() => select()}
            className="rounded-[13px] bg-black py-[9px]">
                <span className="text-[14px] text-primary">Смотреть</span>
            </button>
        </>
    );
};

export { PersonalCart };