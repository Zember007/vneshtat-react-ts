import { useState, useEffect } from 'react'
import './style.scss'
import { Accounts } from "@/widgets/finance/accounts";
import { Banks } from "@/widgets/finance/banks";
import Button from "@/widgets/finance/UI/Button";
import Infornation from "@/widgets/finance/UI/Infornation";
import Letter from "@/widgets/finance/UI/Letter";
import Modal from "@/widgets/finance/UI/Modal";
import InputDate from "@/widgets/finance/accounts/UI/InputDate";

import { Link, useLocation, useNavigate } from "react-router-dom";


const finance = () => {

    const location = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {

        if (location === '/jobs/finance') {
            navigate('/jobs/finance/banks')
            console.log(1);

        }

    }, [])


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

    return (
        <>
            <main className='main'>
                <div className="main__column">
                    <div className="switcher">

                        {
                            links.map(item => (
                                <Link to={item.to} key={item.to} className={location === item.to ? "switcher-item active" : "switcher-item"}>{item.title}</Link>
                            ))
                        }

                    </div>


                    {
                        location.includes('/jobs/finance/banks') && <Banks />
                    }

                    {
                        location.includes('/jobs/finance/accounts') && <Accounts />
                    }

                    {
                        location.includes('/jobs/finance/documents') && <Accounts />
                    }

                    {
                        location.includes('/jobs/finance/report') && <Accounts />
                    }



                </div>
                <div className="main__column">
                    <Infornation />
                    <div className="finances__nav">
                        <div className="buttons_generates">
                            <Button action={setAct} title='Сформировать акт сверки' />
                            <Button action={setAdvance} title='Сформировать счёт на аванс' />
                        </div>
                        <Button action={setLetter} title='Гарантийное письмо' />
                    </div>
                </div>

                <div className={actOpen ? "modal__wrapper active" : "modal__wrapper"}>
                    <Modal
                        action={setAct}
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
                        action={setAdvance}
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


            </main>
        </>
    );
};

export default finance;