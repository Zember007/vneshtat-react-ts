import Icon_xlsx from "@/assets/icons/download_xlsx.svg?react";
import Icon_pdf from "@/assets/icons/download_pdf.svg?react";


interface props {
    number: number;
    Status: string;
    PaidAt: Date;
    PayDeadline: Date;
    FullBill: number;
    PaidBill: number;
}

const ReportCart = (props: props) => {
    const GetDate = (date: Date): string => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return (day > 9 ? day : '0' + day) + '.' + (month > 9 ? month : '0' + month) + '.' + year
    }
    return (
        <div className='report_cart'>
            <div className="report_cart-block">

                <div className="report_cart-row">
                    <span className="report_cart-number">№ {props.number}</span>
                    <span className={'report_cart-status ' + props.Status}>{props.Status === 'no-payed' ? 'Просрочен' : props.Status !== 'waiting_for_payment' ? 'Оплачен' : 'Ожидает оплаты '}</span>
                </div>

                <div className="report_cart-block-item">
                    <div className="report_cart-inf">
                        <div className="report_cart-inf-item">
                            <span>Дата</span>
                            <strong>{GetDate(props.PaidAt)}</strong>
                        </div>
                        <div className="report_cart-inf-item">
                            <span>Оплатить до</span>
                            <strong>{GetDate(props.PayDeadline)}</strong>
                        </div>
                    </div>

                    <div className="report_cart-pay">
                        <strong>{props.FullBill} ₽</strong>
                        <span>{props.PaidBill} ₽ оплачено </span>
                    </div>
                </div>
            </div>
            <div className="report_cart-nav">
                <button className='report_cart-download'>
                    <Icon_xlsx />
                </button>
                <button className='report_cart-download'>
                    <Icon_pdf />
                </button>
            </div>
        </div>
    );
};

export default ReportCart;