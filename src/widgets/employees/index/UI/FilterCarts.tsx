import S7 from '@/assets/icons/fligt/flight-avialogo.svg?react'

const FilterCarts = () => {
    return (
        <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
            <div className="flex items-center gap-[5px] rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                <S7 />
                <span className="text-[12px] font-medium">S7 Airlines</span>
            </div>
            <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Номер карты</span>
                <input value={'58485848'} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
            </div>
        </div>
    );
};

export default FilterCarts;