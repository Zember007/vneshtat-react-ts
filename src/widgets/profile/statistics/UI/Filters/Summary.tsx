
const Summary = () => {
    return (
        <div className="bg-[#ECEEF1] rounded-[23px] p-[13px] flex flex-col gap-[10px]">
            <span className='text-[14px] font-medium'>Поездки</span>
            <div className="flex flex-col gap-[6px]">
                <div className="py-[8px] px-[10px] rounded-[13px] bg-primary flex items-center justify-between">
                    <span className='text-[#9B9FAD] text-[12px] font-medium'>Создатель</span>
                    <span className='text-[12px] font-medium'>8 поездок</span>
                </div>
                <div className="py-[8px] px-[10px] rounded-[13px] bg-primary flex items-center justify-between">
                    <span className='text-[#9B9FAD] text-[12px] font-medium'>Участник</span>
                    <span className='text-[12px] font-medium'>54 поездки</span>
                </div>
                <div className="py-[8px] px-[10px] rounded-[13px] bg-primary flex items-center justify-between">
                    <span className='text-[#9B9FAD] text-[12px] font-medium'>Любимый город</span>
                    <span className='text-[12px] font-medium'>Самара</span>
                </div>
                <div className="py-[8px] px-[10px] rounded-[13px] bg-primary flex items-center justify-between">
                    <span className='text-[#9B9FAD] text-[12px] font-medium'>Любимый транспорт</span>
                    <span className='text-[12px] font-medium'>Самолёт</span>
                </div>
                <div className="py-[8px] px-[10px] rounded-[13px] bg-primary flex items-center justify-between">
                    <span className='text-[#9B9FAD] text-[12px] font-medium'>Часов в полёте</span>
                    <span className='text-[12px] font-medium'>215</span>
                </div>
            </div>
        </div>
    );
};

export default Summary;