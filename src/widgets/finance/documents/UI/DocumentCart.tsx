import Icon_xlsx from "@/assets/icons/download_xlsx.svg?react";
import Icon_pdf from "@/assets/icons/download_pdf.svg?react";

interface props { 
    title: string;
    date: string;
}

const DocumentCart = ( { title, date }: props) => {
    return (
        <div className='report_cart'>
            <div className="report_cart-block">

                <div className="report_cart-row">
                    <span className="report_cart-number">{title}</span>                 
                </div>

                <div className="report_cart-block-item">
                    <div className="report_cart-inf">
                        <div className="report_cart-inf-item">
                            <span>Дата</span>
                            <strong>{date}</strong>
                        </div>
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

export default DocumentCart;