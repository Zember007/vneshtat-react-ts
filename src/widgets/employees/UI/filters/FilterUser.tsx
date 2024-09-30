const FilterUser = () => {
    return (
        <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
            <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                <span className=" text-[12px] font-medium text-[#9B9FAD]">Фамилия</span>
                <input value={'Вознесенский'} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
            </div>
        </div>
    );
};

export default FilterUser;