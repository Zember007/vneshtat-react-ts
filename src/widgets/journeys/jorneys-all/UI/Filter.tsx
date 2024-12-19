import FilterImg from '@/assets/icons/filter.svg?react'
import { Dropdown, InputDate } from '@/shared/UI';
import { useState } from 'react';

const Filter = () => {

    const [dates, setDates] = useState<Date[]>([]);

    const handleDateClick = (date: Date) => {
        let updatedDates = dates.filter(d => d !== undefined);

        if (updatedDates.length === 2) {
            updatedDates = [];
            setDates([]);
        }
        if (!dates[0] || updatedDates.length === 0) {
            updatedDates = [date];
        } else {
            updatedDates = [...updatedDates, date].sort((a, b) => a.getTime() - b.getTime());
        }

        setDates(updatedDates);
    }
    return (
        <div className='p-[20px] flex flex-col gap-[10px]'>
            <div className="flex gap-[10px] items-center pb-[15px] border-0 border-b border-solid border-[#E5E7EA]">
                <div className="w-[35px] h-[35px] rounded-[11px] bg-[#121212] flex items-center justify-center">
                    <FilterImg className='*:fill-primary' />
                </div>
                <span className='font-medium'>Фильтры</span>
            </div>

            <Dropdown
                title="Дата создания"
                >
                <div className="flex flex-row gap-2.5 w-full">
                    <InputDate
                        placeholder={"Дата от "}
                        extraClassBox='grow'
                        extraClass={"px-[10px] py-[5px] h-[26px] min-w-full max-w-full !rounded-[13px] !bg-primary *:text-[12px]"}
                        extraClassIcon='!w-[20px] !h-[20px]'
                        inputValue={dates}
                        viewValue={dates[0]}
                        isShortDate={true}
                        withIcon={true}
                        calendarOpt={{
                            onClickDay: handleDateClick,
                            allowPartialOptions: true,
                            selectRange: true
                        }}
                        setter={(dates: Date[]) => {
                            setDates(dates);
                        }}
                    />
                    <InputDate
                        placeholder={"Дата до"}
                        extraClassBox='grow'
                        extraClass={"px-[10px]  py-[5px] h-[26px] min-w-full max-w-full !rounded-[13px] !bg-primary *:text-[12px]"}
                        extraClassIcon='!w-[20px] !h-[20px]'
                        inputValue={dates}
                        viewValue={dates[1]}
                        isShortDate={true}
                        withIcon={true}
                        calendarOpt={{
                            onClickDay: handleDateClick,
                            allowPartialOptions: true,
                            selectRange: true
                        }}
                        setter={(dates: Date[]) => {
                            setDates(dates);
                        }}
                    />
                </div>

            </Dropdown>

            <Dropdown
                title="Начало поездки"
                >
                <div className="flex flex-row gap-2.5 w-full">
                    <InputDate
                        placeholder={"Дата от "}
                        extraClassBox='grow'
                        extraClass={"px-[10px] py-[5px] h-[26px] min-w-full max-w-full !rounded-[13px] !bg-primary *:text-[12px]"}
                        extraClassIcon='!w-[20px] !h-[20px]'
                        inputValue={dates}
                        viewValue={dates[0]}
                        isShortDate={true}
                        withIcon={true}
                        calendarOpt={{
                            onClickDay: handleDateClick,
                            allowPartialOptions: true,
                            selectRange: true
                        }}
                        setter={(dates: Date[]) => {
                            setDates(dates);
                        }}
                    />
                    <InputDate
                        placeholder={"Дата до"}
                        extraClassBox='grow'
                        extraClass={"px-[10px] py-[5px] h-[26px] min-w-full max-w-full !rounded-[13px] !bg-primary *:text-[12px]"}
                        extraClassIcon='!w-[20px] !h-[20px]'
                        inputValue={dates}
                        viewValue={dates[1]}
                        isShortDate={true}
                        withIcon={true}
                        calendarOpt={{
                            onClickDay: handleDateClick,
                            allowPartialOptions: true,
                            selectRange: true
                        }}
                        setter={(dates: Date[]) => {
                            setDates(dates);
                        }}
                    />
                </div>

            </Dropdown>

            <Dropdown
                title="Компания"
                >
                
                <input type='text' placeholder='Название компании' className='py-[6px] px-[9px] rounded-[13px] w-full text-[12px]'/>

            </Dropdown>

            <Dropdown
                title="Сотрудник"
                >
                
                <input type='text' placeholder='Имя' className='py-[6px] px-[9px] rounded-[13px] w-full text-[12px]'/>

            </Dropdown>

            <Dropdown
                title="Автор"
                >
                
                <input type='text' placeholder='Имя' className='py-[6px] px-[9px] rounded-[13px] w-full text-[12px]'/>

            </Dropdown>

        </div>
    );
};

export default Filter;