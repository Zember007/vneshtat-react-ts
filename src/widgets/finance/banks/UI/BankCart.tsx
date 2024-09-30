import Icon_edit from "@/assets/icons/edit.svg?react";
import clsx from "clsx";

interface props {
    id: number;
    status: boolean;
    title: string;
    EditBank: Function;
    Img: any;
    active: number | null;
}

const BankCart = ({ id, status, title, Img, EditBank, active }: props) => {
    const status_title = status ? 'Действующий' : 'Не действующий'
    return (
        <div className={clsx("transition-all rounded-[26px] bg-[#ECEEF1] p-[10px] flex items-center justify-between", active === id && '!bg-[#121212]')}>
            <div className="flex items-center gap-[10px]">
                <Img className="h-[45px] w-[45px]" />
                <span className={clsx("transition-all text-[#121212] font-medium", active == id && '!text-[#FAFAFA]')}>{title}</span>
                <span className="text-[#9B9FAD] font-medium">{status_title}</span>
            </div>
            <button className="mr-[10px]" onClick={() => {active === id?EditBank(null):EditBank(id)}}><Icon_edit /></button>
        </div>
    );
};

export default BankCart;