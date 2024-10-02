import { useState } from 'react';
import DocumentCart from './DocumentCart'
import SearchInput from '@/widgets/jobs/UI/SearchInput'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import {InputDate} from "@/shared/UI";
import Icon from "@/assets/icons/download_xlsx.svg?react";


const Documents = () => {


    const documents = [
        { title: 'УПД № 483990 ', date: '01.09.2023' },
        { title: 'УПД № 483990 ', date: '01.09.2023' },
        { title: 'УПД № 483990 ', date: '01.09.2023' },
    ]

    const [search, setSearch] = useState<string>('')
    const [dates, setDates] = useState<Date[]>([]);


    const [default_filter, setDefault] = useState<boolean>(true)
    const [type_filter, setType] = useState<boolean>(false)
    const [new_filter, setNew] = useState<boolean>(false)

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
        <>
            <div className="search_block min-h-[134px]">
                <div className="search_block__inputs">
                    <SearchInput value={search} change={setSearch} placeholder='Фамилия сотрудника, номер билета, город' />
                    <InputDate
                        placeholder={"Дата от "}
                        extraClass={"p-[11px] h-[41px] min-w-[120px] max-w-[120px] !rounded-[13px]"}
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
                        extraClass={"p-[11px] h-[41px] min-w-[120px] max-w-[120px] !rounded-[13px]"}
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
                <div className="search_block__filters">
                
                    <CheckerFilter change={setDefault} title='По умолчанию' active={default_filter} />

                    <CheckerFilter change={setType} title='По типу' active={type_filter} />

                    <CheckerFilter change={setNew} title='Сначала новые' active={new_filter} />

                </div>
            </div>
            <div className="flex flex-col gap-[20px] rounded-[26px] px-[30px] py-[25px] bg-[#FAFAFA] h-full">
                <div className="reports__top">
                    <div className="reports__title">Счета</div>
                    <button className="reports__download">
                        <span>Скачать все</span>
                        <Icon />
                    </button>
                </div>
                <div className="flex flex-col gap-[10px] h-full max-h-full overflow-y-auto scroll">
                    {documents.map(item => (
                        <DocumentCart title={item.title} date={item.date} />
                    ))}
                </div>
            </div>


        </>
    );
};

export { Documents };