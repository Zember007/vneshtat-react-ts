
const Jorneys = () => {
    return (
        <div className="bg-[#ECEEF1] rounded-[23px] p-[13px] flex flex-col gap-[10px]">
            <span className='text-[14px] font-medium'>Поездки</span>
            <div className="flex flex-col gap-[6px]">
                <div className="py-[8px] px-[10px] rounded-[13px] bg-primary flex items-center justify-between">
                    <div className="flex items-center gap-[5px]">
                        <span className="text-[11px] font-medium">S7</span>
                        <span className="text-[11px] font-medium text-[#9B9FAD]">2550</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                        <span className="text-[11px] font-medium">08:55</span>
                        <div className="w-[5px] h-[5px] rounded-[50%] bg-[#E5E7EA]"></div>
                        <span className="text-[11px] font-medium">12:15</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jorneys;