import Icon from "@/assets/icons/cross.svg?react";


interface InputProps {
    active: boolean;
    title: string;
    change: any;
}

const CheckerFilter = (props: InputProps) => {
    return (
        <div className={props.active ? 'checker_box active' : 'checker_box'}>
            <button onClick={() => props.change(false)}><Icon /></button>
            <div className='checker' onClick={() => props.change(true)}>
                {props.title}</div>
        </div>
    );
};

export default CheckerFilter;