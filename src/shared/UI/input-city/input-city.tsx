import {Input} from "@/shared/UI";
import {useState, useCallback} from "react";
import {City} from "@/shared/types";
import {InputCityProps} from "./input-city.props";
import {debounce} from "@/shared/utils";

const InputCity = ({extraClass = '', inputClass = '', value, setValue, callback, ...rest}: InputCityProps) => {
    const [cities, setCities] = useState<null | City[]>(null);

    const debouncedGetCities = useCallback(
        debounce(async (query: string) => {
            if (query.trim().length === 0) {
                setCities(null);
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL_DB}/cities/search/?query=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cities');
            }
            const {data} = await response.json();
            if (!!query.length) setCities(data);
        }, 300),
        []
    );

    return (
        <div className={`min-w-[255px] relative ${extraClass}`}>
            <Input
                className={`py-3 px-2.5 text-sm h-9 rounded-secondary bg-secondary w-full ${inputClass}`}
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setValue(newValue);
                    debouncedGetCities(newValue);
                }}
                {...rest}
            />
            {cities?.length && value.length ? (
                <div className={"bg-primary p-2.5 flex rounded-[23px] w-full top-10 flex-col gap-1 absolute z-20"}
                     style={{
                         background: 'rgba(245, 245, 245, 0.82)',
                         boxShadow: '0px 4px 6.5px 0px rgba(0, 0, 0, 0.04)',
                         backdropFilter: 'blur(4.8px)'
                     }}>
                    {cities.map(city => (
                        <div key={city.CityId} onClick={() => {
                            callback(city);
                            setValue(city.nameRu);
                            setCities(null);
                        }}
                             className={"py-[6px] px-2 flex justify-between items-center cursor-pointer rounded-primary w-full bg-secondary hover:bg-[#DCE0E5]"}>
                            <h6 className={"text-sm font-medium leading-none"}>{city.nameRu}</h6>
                            <p className={"text-[10px] leading-none text-[#787B86]"}>{city.nameEn.slice(0, 3).toUpperCase()}</p>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export {InputCity};
