import StatisticsImg from '@/assets/icons/finance-jorney.svg?react'

const StatisticsCart = ({ active, select }: { select: Function; active:boolean }) => {
    return (
        <>
            <div className="flex flex-col gap-[10px] items-center mt-[5px]">
                <StatisticsImg className="w-[40px] h-[40px]" />
                <div className="flex flex-col gap-[5px] text-center">
                    <span className="text-[#787B86] font-medium text-[18px]">Статистика</span>
                    <p className="text-[#787B86] text-[12px]">
                        Последние поездки и личная статистика по категориям услуг.
                    </p>
                </div>
            </div>
            <div className="grow flex flex-col gap-[10px] justify-center">
                <div className={`transition-all duration-300 ${active ? 'bg-primary' : 'bg-[#ECEEF1]'} py-[9px] px-[13px] rounded-[13px] flex items-center justify-between`}>
                    <span className="text-[14px] text-[#787B86]">Самара</span>
                    <span className="text-[14px] text-black font-medium">24.05.2024</span>
                </div>
                <div className={`transition-all duration-300 ${active ? 'bg-primary' : 'bg-[#ECEEF1]'} py-[9px] px-[13px] rounded-[13px] flex items-center justify-between`}>
                    <span className="text-[14px] text-[#787B86]">Самара</span>
                    <span className="text-[14px] text-black font-medium">24.05.2024</span>
                </div>
                <div className={`transition-all duration-300 ${active ? 'bg-primary' : 'bg-[#ECEEF1]'} py-[9px] px-[13px] rounded-[13px] flex items-center justify-between`}>
                    <span className="text-[14px] text-[#787B86]">Самара</span>
                    <span className="text-[14px] text-black font-medium">24.05.2024</span>
                </div>
                <div className="flex gap-[10px]">
                    <div className="rounded-[11px] bg-[#007BFB] p-[10px] grow flex flex-col gap-[5px] justify-center">
                        <div className="flex flex-col">
                            <div className="flex gap-[5px] items-start">
                                <span className="text-[36px] font-medium text-primary leading-[1]">89</span>
                                <div className="rounded-[7px] py-[3px] px-[6.5px] bg-primary text-[#007BFB] text-[12px] leading-[1]">+3</div>
                            </div>
                            <span className="text-[14px] text-primary">Поездок</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 131 42" fill="none">
                            <path d="M0 41H7.7037L13 39.1249L20.2222 38.1873H29.8519C31.1358 37.6665 33.8 36.4997 34.1852 35.9997C34.5704 35.4997 39.4815 35.7914 41.8889 35.9997L45.7407 31.0017L51.5185 26.6264L58.7407 25.3764H66.4444L71.2593 18.1885H78L81.8519 13.8132H89.5556H97.2593L101.111 9.75049H121.333L123.259 5.37525H127.593L130 1" stroke="#FAFAFA" />
                        </svg>
                    </div>
                    <div className={`p-[10px] rounded-[11px] transition-all duration-300 ${active ? 'bg-primary' : 'bg-[#ECEEF1]'} flex flex-col justify-between`}>
                        <div className="flex flex-col">
                            <span className="text-[18px] font-medium">5</span>
                            <span className="text-[14px] leading-[90%]">активных поездок</span>
                        </div>
                        <div className="flex flex-col *:text-[#787B86]">
                            <span className="text-[18px] font-medium">84</span>
                            <span className="text-[14px] leading-[90%]">завер-<br />шённых</span>
                        </div>
                    </div>
                </div>
            </div>

            <button
            onClick={() => {select()}}
            className="rounded-[13px] bg-black py-[9px]">
                <span className="text-[14px] text-primary">Смотреть</span>
            </button>
        </>
    );
};

export { StatisticsCart };