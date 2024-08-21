import clsx from "clsx";
import EyeImg from "@/assets/icons/eye.svg?react";
import EyeClosedImg from "@/assets/icons/eye-closed.svg?react";
import CrossImg from "@/assets/icons/cross.svg?react";
import {InputProps} from "./input.props";
import {useState, useEffect, ChangeEvent} from "react";

const formatPhoneNumber = (value: string): string => {
    let cleaned = value.replace(/\D/g, '');

    if (cleaned.startsWith('8')) {
        cleaned = '7' + cleaned.slice(1);
    }

    if (cleaned.startsWith('7')) {
        cleaned = '7' + cleaned.slice(1);
    }

    let formatted = '+7';
    if (cleaned.length > 1) {
        formatted += ` (${cleaned.substring(1, 4)}`;
    }
    if (cleaned.length >= 5) {
        formatted += `) ${cleaned.substring(4, 7)}`;
    }
    if (cleaned.length >= 8) {
        formatted += `-${cleaned.substring(7, 9)}`;
    }
    if (cleaned.length >= 10) {
        formatted += `-${cleaned.substring(9, 11)}`;
    }

    return formatted;
};

const Input = ({extraClass, withEraser = true, ...rest}: InputProps) => {
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

    useEffect(() => {
        setInputValue(rest.value || "");
    }, [rest.value])

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cleanedValue = value.replace(/\D/g, '');

        if (cleanedValue === '') {
            setInputValue('');
            if (rest.onChange) {
                rest.onChange({ ...e, target: { ...e.target, value: '' } });
            }
            return;
        }

        const formattedValue = formatPhoneNumber(cleanedValue);
        setInputValue(formattedValue);
        if (rest.onChange) {
            rest.onChange({ ...e, target: { ...e.target, value: formattedValue } });
        }
    };

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        setInputValue(value);
        if (rest.onChange) {
            rest.onChange({...e, target: {...e.target, value}});
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (rest.onChange) {
            rest.onChange(e);
        }
    }

    const handleClear = () => {
        setInputValue("");
        if (rest.onChange) {
            rest.onChange({target: {value: ""}} as ChangeEvent<HTMLInputElement>);
        }
    };

    return rest.type === "password" ? (
        <label className="relative">
            <input
                className={clsx("bg-secondary rounded-primary text-sm py-2 px-2.5 w-full", extraClass)}
                {...rest}
                type={isOpen ? "text" : "password"}
            />
            {rest.value && (
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                    {isOpen ? <EyeClosedImg className={"transition blue-fill-hover"}/> :
                        <EyeImg className={"transition blue-fill-hover"}/>}
                </button>
            )}
        </label>
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
        <label className={"relative"}>
            <input
                className={clsx(`bg-secondary rounded-primary text-sm py-2 px-2.5 w-full`, extraClass)}
                type={rest.type || "text"}
                {...rest}
                onChange={handleChange}
            />
            {inputValue && withEraser ? (
                <button
                    onClick={handleClear}
                    type={"button"}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CrossImg className={"black-fill"}/>
                </button>
            ) : null}
        </label>
    );
};

export {Input};
