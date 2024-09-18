import Icon from "@/assets/icons/calendar.svg?react";



interface InputProps {
    value: string;
    placeholder: string;
    change: any;
  }

const InputDate = (props: InputProps) => { 
    return (
        <div className="inpt_date-box">
            <input value={props.value} type="text" placeholder={props.placeholder} className="inpt_date-value" />
            <input onChange={(e)=> {props.change(e.target.value)}} type="date" className="inpt_date" />
            <Icon className="w-[30px] h-auto" />
        </div>
    );
};

export default InputDate;