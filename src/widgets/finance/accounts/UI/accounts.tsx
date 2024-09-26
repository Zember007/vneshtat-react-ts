import { useState, useEffect } from 'react';
import SearchInput from '@/widgets/jobs/UI/SearchInput'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import InputDate from '../../UI/InputDate'
import ReportCart from './ReportCart'
import Icon from "@/assets/icons/download_xlsx.svg?react";
import { getAccessToken } from "@/shared/utils";
import Switcher from '@/widgets/jobs/UI/Switcher';

interface reports {
    number: number;
    Status: string;
    PaidAt: Date;
    PayDeadline: Date;
    FullBill: number;
    PaidBill: number;
}

const Accounts = () => {

    const [search, setSearch] = useState<string>('')
    const [dateBefore, setDateBefore] = useState<string>('')
    const [dateFrom, setDateFrom] = useState<string>('')

    const [default_filter, setDefault] = useState<boolean>(true)
    const [sum_filter, setSum] = useState<boolean>(false)
    const [new_filter, setNew] = useState<boolean>(false)

    const [repots, setReports] = useState<Array<reports>>([])
    const [switcher, setSwitcher] = useState<boolean>(false)

    useEffect(() => {
        getBills()
    }, [])

    const getBills = async () => {
        const EmployeeId = localStorage.getItem('EmployeeId')
        const url = new URL(import.meta.env.VITE_API_URL + '/company/finance/get_company_bills');
        url.searchParams.append('EmployeeId', EmployeeId || '');
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {
                setReports(data.data)
            }
        } catch (error) {

            console.log(error);

        }
    }

    
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

                    <Switcher items={['Все', 'Активные']} change={setSwitcher} checked={switcher}/>



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
                <div className="reports__box overflow-y-auto scroll">
                    {
                        repots.map(function (report, index) {
                            return (
                                <ReportCart key={index + 1} number={index + 1} Status={report.Status} PaidAt={report.PaidAt} PayDeadline={report.PayDeadline} FullBill={report.FullBill} PaidBill={report.PaidBill}></ReportCart>
                            )
                        })

                    }
                </div>
            </div>

        </>
    );
};

export { Accounts };