import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import Layout from '@/widgets/jobs/layout/layout';
import clsx from "clsx";



const reports = () => {

    const location = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {

        if (location === '/jobs/reports') {
            navigate('/jobs/reports/services')
        }

    }, [])


    const links = [
        { title: 'Отчёт по услугам', to: '/jobs/reports/services' },
        { title: 'Бизнес-аналитика', to: '/jobs/reports/business' }
    ]


    return (
        <>
            <Layout component={


                <>
                    <div className="flex gap-[10px]">
                        {links.map(item => (
                            <Link to={item.to} key={item.to} className={clsx('px-[25px] py-[15px] rounded-[13px] bg-[#FAFAFA] font-normal transition-all ',location === item.to && 'text-[#007BFB]')}>{item.title}</Link>
                        ))}
                    </div>
                    <div className="grow h-full rounded-[26px] bg-[#FAFAFA] flex items-center justify-center">
                        <span className='font-normal text-[#787B86] text-center max-w-[390px]'>Выберите календарный отрезок и параметры формирования отчёта.</span>
                    </div>
                </>


            } />

                    {/* 
                    {
                        location.includes('/jobs/reports/services') && <Banks />
                    }

                    {
                        location.includes('/jobs/reports/business') && <Accounts />
                    } */}

        </>
    );
};

export default reports;