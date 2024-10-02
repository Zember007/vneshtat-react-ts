import { useState, useEffect } from 'react';
import SearchInput from '@/widgets/jobs/UI/SearchInput'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import {InputDate} from "@/shared/UI";
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

    const [dates, setDates] = useState<Date[]>([]);

    const [search, setSearch] = useState<string>('')
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