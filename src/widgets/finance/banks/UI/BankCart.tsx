import Icon_edit from "@/assets/icons/edit.svg?react";


interface props {
    id: Number,
    status: Boolean,
    title: String,
    EditBank: any,
    Img: any
}

const BankCart = ({ id, status, title, Img, EditBank }: props) => {
    const status_title = status ? 'Действующий' : 'Не действующий'
    return (
        <div className="rounded-[26px] bg-[#ECEEF1] p-[10px] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
                <Img className="h-[45px] w-[45px]" />
                <span className="text-[#121212] font-medium">{title}</span>
                <span className="text-[#9B9FAD] font-medium">{status_title}</span>
            </div>
            <button className="mr-[10px]" onClick={() => {EditBank(id)}}><Icon_edit /></button>
        </div>
    );
};

export default BankCart;