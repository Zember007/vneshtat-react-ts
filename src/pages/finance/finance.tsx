import { useState } from 'react'
import './style.scss'
import { Accounts } from "@/widgets/finance/accounts";
import Button from "@/widgets/finance/UI/Button";
import Infornation from "@/widgets/finance/UI/Infornation";
import Letter from "@/widgets/finance/UI/Letter";
import Modal from "@/widgets/finance/UI/Modal";
import SwitcherItem from "@/widgets/finance/UI/SwitcherItem";


const finance = () => {
    const [typeFinance, setTypeFinance] = useState<string>('report')



    const [actOpen, setAct] = useState<boolean>(false)
    const [advance, setAdvance] = useState<boolean>(false)
    const [letter, setLetter] = useState<boolean>(false)
    return (
        <>
            <main className='main'>
                <div className="main__column">
                    <div className="switcher">
                        <SwitcherItem data='banks' active={typeFinance} title='Банки' change={setTypeFinance} />
                        <SwitcherItem data='accounts' active={typeFinance} title='Счета' change={setTypeFinance} />
                        <SwitcherItem data='close_documents' active={typeFinance} title='Закрывающие документы' change={setTypeFinance} />
                        <SwitcherItem data='report' active={typeFinance} title='Отчёт по движению средств' change={setTypeFinance} />
                    </div>

                    <Accounts />

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
                                <div className="inpt_date-box">
                                    <input type="text" placeholder='Дата от' className="inpt_date-value" />
                                    <input type="date" className="inpt_date" />
                                    <img src="/images/icons/calendar.svg" alt="calendar" />
                                </div>
                                <div className="inpt_date-box">
                                    <input type="text" placeholder='Дата до' className="inpt_date-value" />
                                    <input type="date" className="inpt_date" />
                                    <img src="/images/icons/calendar.svg" alt="calendar" />
                                </div>
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