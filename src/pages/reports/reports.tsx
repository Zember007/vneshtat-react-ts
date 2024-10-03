import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Layout from '@/widgets/jobs/layout/layout';
import Button from '@/widgets/jobs/UI/Button';
import { Services } from '@/widgets/reports/services';
import { ServicesFilters } from '@/widgets/reports/services';



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


    const [filterStep, setFilterStep] = useState<number | null>(0)


    return (
        <>
            <Layout component={


                <>
                    <div className="flex gap-[10px]">
                        {links.map(item => (
                            <Button to={item.to} key={item.to} Class={location === item.to ? 'text-[#007BFB]' : ''} title={item.title}></Button>
                        ))}
                    </div>
                    <div className="grow h-full rounded-[26px] bg-[#FAFAFA]">
                        {
                            location.includes('/jobs/reports/services') && <Services />
                        }

                        {/* {
                        location.includes('/jobs/reports/business') && <Accounts />
                    } */}
                    </div>
                </>


            }

                information={
                    <>
                        {
                            location.includes('/jobs/reports/services') && <ServicesFilters filterStep={filterStep} setFilterStep={setFilterStep} />
                        }
                    </>
                }

                navigation={
                          
                        location.includes('/jobs/reports/services') && (
                            <button className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full"
                            onClick={() => {
                                if(filterStep != 2) {
                                    setFilterStep(filterStep+1)
                                }
                            }}
                            ><p className="text-[16px] text-primary">{
                                filterStep == 0? 'Выбрать сотрудников' :filterStep==1? 'Отобразить' : 'Скачать в .xlsx'
                            }</p></button>    
                        )
                        
                }
            />



        </>
    );
};

export default reports;