import Icon from "@/assets/icons/search.svg?react";


interface InputProps {
    value: string;
    placeholder: string;
    change: any;
}

const InputDate = (props: InputProps) => {
    return (
        <label className='inpt_search-box'>
            <Icon />
            <input onChange={(e) => props.change(e.target.value)} value={props.value} type="text" placeholder={props.placeholder} className="inpt_search" />
        </label>
    );
};

export default InputDate;