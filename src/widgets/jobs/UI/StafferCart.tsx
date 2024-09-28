
import ArchiveImg from "@/assets/icons/archive.svg?react";
import MessageImg from "@/assets/icons/message.svg?react";
import clsx from "clsx";

interface props {
    id: number
    name: string;
    speciality?: string;
    archive?: boolean;
    online?: boolean;
    lastVisite?: Date;
    viewMessage: boolean;
    viewOnline: boolean;
    active?: number | null;
    select:Function;
}

const StafferCart = ({ name, speciality, archive, online, lastVisite, viewMessage, viewOnline, active, id, select }: props) => {

    const GetInitials = (name: string): string => {

        let splitName = name.split(' ')
        return splitName[0][0] + splitName[1][0]
    }


    const getStatusOnline = (): string => {

        if (online) {

            return 'Онлайн'

        } else {
            const date = lastVisite?? new Date() 
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            const hour = date.getHours()
            const minut = date.getMinutes()

            return 'Был онлайн ' + (day > 9 ? day : '0' + day) + '.' + (month > 9 ? month : '0' + month) + '.' + year + ' в ' + (hour > 9 ? hour : '0' + hour) + ':' + (minut > 9 ? minut : '0' + minut)
        }


    }



    return (
        <div className="flex gap-[10px] items-center">
            <div onClick={() => {active === id?select(null):select(id)}} className={clsx("cursor-pointer transition-all grow flex items-center justify-between bg-[#ECEEF1] pr-[25px] p-[12px] rounded-[20px]", active === id && '!bg-[#121212]')}>
                <div className="flex gap-[15px] items-center">
                    <div className="w-[30px] h-[30px] flex items-center justify-center bg-[#FAFAFA] rounded-[100%]">
                        <span className='font-normal text-[14px] text-[#787B86]'>{GetInitials(name)}</span>
                    </div>
                    <span className={clsx('transition-all font-medium', active === id && 'text-[#FAFAFA]')}>{name}</span>
                    {
                      (!archive && viewOnline) &&  <span className={clsx("px-[10px] py-[4px] text-[#FAFAFA] text-[10px] font-medium bg-[#8C909C] rounded-[10px]", online && 'bg-[#007BFB]')}>
                            {getStatusOnline()}
                        </span>
                    }
                </div>
                {speciality && <span className='font-medium text-[#9B9FAD]'>{speciality}</span>}
            </div>
            {viewMessage && <button className='w-[35px] h-[35px] rounded-[11px] flex items-center justify-center bg-[#ECEEF1]'>
                <MessageImg className='w-[19px] h-auto' />
            </button> }
            <button className='w-[35px] h-[35px] rounded-[11px] flex items-center justify-center bg-[#ECEEF1]'>
                <ArchiveImg className='w-[19px] h-auto' />
            </button>
        </div>
    );
};

export default StafferCart;