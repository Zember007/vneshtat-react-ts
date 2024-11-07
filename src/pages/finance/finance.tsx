import { useState, useEffect } from 'react'
import './style.scss'
import { Accounts } from "@/widgets/finance/accounts";
import { Documents } from "@/widgets/finance/documents";
import { Report } from "@/widgets/finance/report";
import { Banks } from "@/widgets/finance/banks";
import Button from "@/widgets/finance/UI/Button";
import Infornation from "@/widgets/jobs/UI/Infornation";
import Letter from "@/widgets/finance/UI/Letter";
import Modal from "@/widgets/jobs/UI/Modal";
import InputDate from "@/widgets/finance/UI/InputDate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from '@/app/layouts/layout';


const finance = () => {

    const location = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {

        if (location === '/jobs/finance') {
            navigate('/jobs/finance/banks')
        }



    }, [location])


    const [selectedBankId, setSelectedBankId] = useState<number | null>(null)





    const [actOpen, setAct] = useState<boolean>(false)
    const [advance, setAdvance] = useState<boolean>(false)
    const [letter, setLetter] = useState<boolean>(false)


    const [actDateBefore, setActDateBefore] = useState<string>('')
    const [actDateFrom, setActDateFrom] = useState<string>('')


    const links = [
        { title: 'Банки', to: '/jobs/finance/banks' },
        { title: 'Счета', to: '/jobs/finance/accounts' },
        { title: 'Закрывающие документы', to: '/jobs/finance/documents' },
        { title: 'Отчёт по движению средств', to: '/jobs/finance/report' },
    ]



    const [viewInfornation, setViewInfornation] = useState<boolean>(true)






    return (
        <>
            <Layout component={
                <>
                    <div className="switcher">

                        {links.map((item,index) => (                            
                            <Link to={item.to} key={index} className={`px-[25px] py-[15px] rounded-[13px] bg-[#FAFAFA] font-normal transition-all ${location === item.to && 'text-[#007BFB]'}`}>
                                {item.title}
                            </Link>
                        ))}

                    </div>


                    {
                        location.includes('/jobs/finance/banks') && <Banks activeId={selectedBankId} setActiveId={setSelectedBankId} />
                    }

                    {
                        location.includes('/jobs/finance/accounts') && <Accounts />
                    }

                    {
                        location.includes('/jobs/finance/documents') && <Documents />
                    }

                    {
                        location.includes('/jobs/finance/report') && <Report />
                    }

                </>
            }

                information={
                    <>
                        {viewInfornation && (<Infornation close={setViewInfornation} selectedBankId={selectedBankId} />)}
                    </>
                }
                navigation={
                    <div className="finances__nav">
                        <div className="buttons_generates">
                            <Button action={setAct} title='Сформировать акт сверки' />
                            <Button action={setAdvance} title='Сформировать счёт на аванс' />
                        </div>
                        <Button action={setLetter} title='Гарантийное письмо' />
                    </div>
                }
            />



            <div className={actOpen ? "modal__wrapper active" : "modal__wrapper"}>
                <Modal
                    action={() => { }}
                    close={() => { setAct(false) }}
                    title='Акт-сверки'
                    text='Укажите период для формирования документа.'
                    button='Скачать'
                    body={
                        <>
                            <InputDate value={actDateFrom} placeholder='Дата от' change={setActDateFrom} />
                            <InputDate value={actDateBefore} placeholder='Дата до' change={setActDateBefore} />
                        </>
                    }></Modal>
            </div>

            <div className={advance ? "modal__wrapper active" : "modal__wrapper"}>
                <Modal
                    action={() => {}}
                    close={() => { setAdvance(false) }}
                    title='Счёт на аванс'
                    text='Укажите желаемую сумму аванса.'
                    button='Сформировать'
                    body={
                        <>
                            <input type="text" placeholder='50 000,00 ₽' className='input_default' />
                        </>
                    }></Modal>
            </div>

            <div className={letter ? "modal__wrapper active" : "modal__wrapper"}>
                <Letter
                    action={setLetter}
                ></Letter>
            </div>
        </>
    );
};

export default finance;