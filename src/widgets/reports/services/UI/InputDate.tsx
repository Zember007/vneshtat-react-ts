import Icon from "@/assets/icons/calendar.svg?react";



interface InputProps {
    value: string;
    placeholder?: string;
    change: Function;
  }


const InputDate = (props: InputProps) => { 

    return (
        <div className={"flex items-center relative  gap-[6px]"}>
            <input value="13.01.11" type="text" placeholder={props.placeholder} className="w-[100%] text-right text-[#9B9FAD] text-[12px] font-medium bg-[transparent]" />
            <input onChange={(e)=> {props.change(e.target.value)}} type="date" className="inpt_date" />
            <Icon className="w-[20px] h-auto" />
        </div>
    );
};

export default InputDate;