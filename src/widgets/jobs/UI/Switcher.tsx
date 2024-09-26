interface props {
    checked: boolean;
    change: Function;
    items: Array<string>
}

const Switcher = ({ checked, items, change }: props) => {
    return (
        <div>
            <label className="p-[4px] bg-[#ECEEF1] rounded-[13px] inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={(e) => change(e.target.checked)} checked={checked} className='hidden peer' />

                <span className="px-[10px] py-[6px] text-[12px] font-medium bg-[#FAFAFA] rounded-[11px] peer-checked:bg-[transparent] transition-all">{items[0]}</span>

                <span className="px-[10px] py-[6px] text-[12px] font-medium rounded-[11px] peer-checked:bg-[#FAFAFA] transition-all">{items[1]}</span>

            </label>
        </div>
    );
};

export default Switcher;