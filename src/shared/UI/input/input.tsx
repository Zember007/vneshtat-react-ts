import clsx from "clsx";
import EyeImg from "@/assets/icons/eye.svg?react";
import EyeClosedImg from "@/assets/icons/eye-closed.svg?react";
import CrossImg from "@/assets/icons/cross.svg?react";
import { InputProps } from "./input.props";
import { useState, useEffect, ChangeEvent } from "react";

const Input = ({ extraClass, withEraser = true, ...rest }: InputProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(rest.value || '');

    useEffect(() => {
        if (rest.type === "phone") {
            let formattedValue: string = inputValue as string;
            if (formattedValue.startsWith('7')) {
                formattedValue = '+7' + formattedValue.slice(1);
            }
            setInputValue(formattedValue);
        }
    }, [rest.type]);

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('7')) {
            value = '+7' + value.slice(1);
        } else if (!value.startsWith('9')) {
            value = '';
        }
        setInputValue(value);
        if (rest.onChange) {
            rest.onChange({ ...e, target: { ...e.target, value } });
        }
    };

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        setInputValue(value);
        if (rest.onChange) {
            rest.onChange({ ...e, target: { ...e.target, value } });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if(rest.onChange){
            rest.onChange(e);
        }
    }

    const handleClear = () => {
        setInputValue("");
        if (rest.onChange) {
            rest.onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
        }
    };

    return rest.type === "password" ? (
        <div className="relative">
            <input
                className={clsx("bg-secondary rounded-primary text-sm py-2 px-2.5 w-full", extraClass)}
                {...rest}
                type={isOpen ? "text" : "password"}
            />
            {rest.value && (
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                    {isOpen ? <EyeClosedImg className={"transition blue-fill-hover"}/> : <EyeImg className={"transition blue-fill-hover"}/>}
                </button>
            )}
        </div>
    ) : rest.type === "phone" ? (
        <input
            className={clsx("bg-secondary rounded-primary text-sm py-2 px-2.5", extraClass)}
            {...rest}
            type="text"
            value={inputValue}
            onChange={handlePhoneChange}
        />
    ) : rest.type === "number" ? (
        <input
            className={clsx("bg-secondary rounded-primary text-sm py-2 px-2.5 w-full", extraClass)}
            {...rest}
            type="text"
            value={inputValue}
            onChange={handleNumberChange}
        />
    ) : (
        <div className={"relative"}>
            <input
                className={clsx(`bg-secondary rounded-primary text-sm py-2 px-2.5 w-full`, extraClass)}
                type={rest.type || "text"}
                {...rest}
                onChange={handleChange}
            />
            {inputValue && withEraser ? (
                <button onClick={handleClear} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CrossImg className={"black-fill"}/>
                </button>
            ) : null}
        </div>
    );
};

export { Input };
