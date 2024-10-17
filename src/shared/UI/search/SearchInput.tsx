import Icon from "@/assets/icons/search.svg?react";


interface InputProps {
    value: string | null;
    placeholder?: string;
    change: any;
}

const SearchInput = (props: InputProps) => {
    return (
        <label className='py-[10px] px-[20px] flex gap-[5px] bg-[#ECEEF1] rounded-[13px] grow'>
            <Icon className="w-[18px] h-[18px]"/>
            <input onChange={(e) => props.change(e.target.value)} value={props.value?props.value:''} type="text" placeholder={props.placeholder} className="w-full bg-[transparent] font-normal text-[14px] placeholder:text-[#787B86]" />
        </label>
    );
};

export  {SearchInput};