import { useState } from 'react';
import DocumentCart from './DocumentCart'
import SearchInput from '../../UI/SearchInput'
import CheckerFilter from '../../UI/CheckerFilter'
import InputDate from '../../UI/InputDate'
import Icon from "@/assets/icons/download_xlsx.svg?react";


const Documents = () => {


    const documents = [
        { title: 'УПД № 483990 ', date: '01.09.2023' },
        { title: 'УПД № 483990 ', date: '01.09.2023' },
        { title: 'УПД № 483990 ', date: '01.09.2023' },
    ]

    const [search, setSearch] = useState<string>('')
    const [dateBefore, setDateBefore] = useState<string>('')
    const [dateFrom, setDateFrom] = useState<string>('')


    const [default_filter, setDefault] = useState<boolean>(true)
    const [type_filter, setType] = useState<boolean>(false)
    const [new_filter, setNew] = useState<boolean>(false)


    return (
        <>
            <div className="search_block">
                <div className="search_block__inputs">
                    <SearchInput value={search} change={setSearch} placeholder='Фамилия сотрудника, номер билета, город' />
                    <InputDate change={setDateFrom} value={dateFrom} placeholder='Дата от' />
                    <InputDate change={setDateBefore} value={dateBefore} placeholder='Дата до' />
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