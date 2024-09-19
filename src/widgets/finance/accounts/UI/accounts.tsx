import { useState } from 'react';
import SearchInput from './SearchInput'
import CheckerFilter from './CheckerFilter'
import InputDate from './InputDate'
import ReportCart from './ReportCart'
import Icon from "@/assets/icons/download_xlsx.svg?react";



const Accounts = () => {

    const [search, setSearch] = useState<string>('')
    const [dateBefore, setDateBefore] = useState<string>('')
    const [dateFrom, setDateFrom] = useState<string>('')

    const [default_filter, setDefault] = useState<boolean>(true)
    const [sum_filter, setSum] = useState<boolean>(false)
    const [new_filter, setNew] = useState<boolean>(false)

    const repots = [
        {
            number: '8812',
            status: 'payed',
            date: {
                created: '01.11.2005',
                before: '12.11.2024'
            },
            prices: {
                price: '8010',
                payed: '1222'
            }
        },
        {
            number: '8812',
            status: 'progress',
            date: {
                created: '01.11.2005',
                before: '12.11.2024'
            },
            prices: {
                price: '8010',
                payed: '1222'
            }
        },
        {
            number: '8812',
            status: 'progress',
            date: {
                created: '01.11.2005',
                before: '12.11.2024'
            },
            prices: {
                price: '8010',
                payed: '1222'
            }
        }
    ]
    return (
        <>

            <div className="search_block">
                <div className="search_block__inputs">
                    <SearchInput value={search} change={setSearch} placeholder='Фамилия сотрудника, номер билета, город' />
                    <InputDate change={setDateFrom} value={dateFrom} placeholder='Дата от' />
                    <InputDate change={setDateBefore} value={dateBefore} placeholder='Дата до' />
                </div>
                <div className="search_block__filters">

                    <input type="checkbox" id='input_type' className='input_type' />

                    <label htmlFor="input_type" className="type">

                        <span>Все</span>

                        <span>Активные</span>

                    </label>


                    <CheckerFilter change={setDefault} title='По умолчанию' active={default_filter} />

                    <CheckerFilter change={setSum} title='По сумме' active={sum_filter} />

                    <CheckerFilter change={setNew} title='Сначала новые' active={new_filter} />

                </div>
            </div>
            <div className="reports">
                <div className="reports__top">
                    <div className="reports__title">Счета</div>
                    <button className="reports__download">
                        <span>Скачать все</span>
                        <Icon />
                    </button>
                </div>
                <div className="reports__box">
                    {
                        repots.map(function (report) {
                            return (
                                <ReportCart key={report.number} number={report.number} status={report.status} date={report.date} prices={report.prices}></ReportCart>
                            )
                        })

                    }
                </div>
            </div>

        </>
    );
};

export {Accounts};