import ArrowTop from "@/assets/icons/arrow-top.svg?react";

interface report {
    time: Date,
    act: string,
    receipt: number,
    writingOff: number,
}


interface props {
    date: Date,
    receipt: number,
    writingOff: number,
    data: Array<report>,
}

const BankCart = ({ date, receipt, writingOff, data }: props) => {

    const GetDate = (date: Date): string => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return (day > 9 ? day : '0' + day) + '.' + (month > 9 ? month : '0' + month) + '.' + year
    }

    const GetTime = (date: Date): string => {
        const hour = date.getHours()
        const minut = date.getMinutes()

        return (hour > 9 ? hour : '0' + hour) + ':' + (minut > 9 ? minut : '0' + minut)
    }

    console.log(data);


    return (
        <div className="flex gap-[10px] items-start">
            <div className="rounded-[26px] bg-[#ECEEF1] p-[15px]">
                <span className="rounded-[13px] px-[15px] py-[8px] bg-[#FBFBFB] text-[12px] font-medium text-[#007BFB]">{GetDate(date)}</span>
            </div>

            <div className="grow rounded-[26px] bg-[#ECEEF1] p-[15px]">
                <div className="rounded-[13px] p-[13px] bg-[#FBFBFB] flex flex-col gap-[10px]">
                    <div className="grid grid-cols-[1.5fr_4fr_2fr_2fr_22px] gap-[8px]  pb-[10px] border-0 border-b border-solid border-[#E5E7EA]">
                        <span className="text-[#9B9FAD] text-[12px] font-medium">Время</span>
                        <span className="text-[#9B9FAD] text-[12px] font-medium">Действие</span>
                        <span className="text-[#9B9FAD] text-[12px] font-medium">Списание</span>
                        <span className="text-[#9B9FAD] text-[12px] font-medium">Поступление</span>
                        <ArrowTop className="w-[22px] h-[22px]" />
                    </div>
                    {
                        data.map(item => (
                            <div className="grid grid-cols-[1.5fr_4fr_2fr_2fr_22px] gap-[8px]  pb-[10px] border-0 border-b border-solid border-[#E5E7EA]">
                                <span className=" text-[12px] font-medium">{GetTime(item.time)}</span>
                                <p className=" text-[12px] font-normal">{item.act}</p>
                                <span className=" text-[12px] font-medium">{(item.receipt + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽</span>
                                <span className=" text-[12px] font-medium">{(item.writingOff + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}  ₽</span>
                            </div>
                        ))
                    }

                    <div className="grid grid-cols-[1.5fr_4fr_2fr_2fr_22px] gap-[8px]">
                        <span className=" text-[12px] font-medium">Итого за день</span>
                        <div></div>
                        <span className=" text-[12px] font-medium">{(receipt + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽</span>
                        <span className=" text-[12px] font-medium">{(writingOff + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}  ₽</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankCart;