
import ArchiveImg from "@/assets/icons/archive.svg?react";
import ArchiveReverseImg from "@/assets/icons/archive_reverse.svg?react";
import MessageImg from "@/assets/icons/message.svg?react";
import clsx from "clsx";

interface props {
    id?: number
    Name: string;
    MiddleName: string;
    Surname: string;
    speciality?: string;
    archive?: boolean | null;
    lastVisite?: Date;
    viewMessage: boolean;
    online?: boolean;
    active?: number | null;
    select: Function;
}

const StafferCart = ({ Name, Surname, MiddleName, speciality, archive, lastVisite, viewMessage, active, id, select, online }: props) => {





    const getStatusOnline = (): string => {

        if (lastVisite) {

            if (online) {

                return 'Онлайн'

            } else {

                const date = new Date(lastVisite)


                const day = date.getDate()
                const month = date.getMonth() + 1
                const year = date.getFullYear()
                const hour = date.getHours()
                const minut = date.getMinutes()


                return 'Был онлайн ' + (day > 9 ? day : '0' + day) + '.' + (month > 9 ? month : '0' + month) + '.' + year + ' в ' + (hour > 9 ? hour : '0' + hour) + ':' + (minut > 9 ? minut : '0' + minut)
            }
        }

        return ''


    }



    return (

        <div className="flex gap-[10px] items-center">
            <div onClick={() => { active === id ? select(null) : select(id) }} className={clsx("cursor-pointer transition-all grow flex items-center justify-between bg-[#ECEEF1] pr-[25px] p-[12px] rounded-[20px]", active === id && '!bg-[#121212]')}>
                <div className="flex gap-[15px] items-center">
                    <div className="w-[30px] h-[30px] flex items-center justify-center bg-[#FAFAFA] rounded-[100%]">
                        {<span className='font-normal text-[14px] text-[#787B86]'>
                            {Name && Surname ?
                                Surname[0] + Name[0]
                                :
                                <>?</>
                            }
                        </span>}
                    </div>
                    <span className={clsx('transition-all font-medium', active === id && 'text-[#FAFAFA]')}>
                        {Name && Surname && MiddleName ?
                            <>{Surname} {Name} {MiddleName}</>
                            :
                            <>Новый безымянный пассажир</>
                        }
                    </span>
                    {
                        (!archive && lastVisite) && <span className={clsx("px-[10px] py-[4px] text-[#FAFAFA] text-[10px] font-medium bg-[#8C909C] rounded-[10px]", online && '!bg-[#007BFB]')}>
                            {getStatusOnline()}
                        </span>
                    }
                </div>
                {speciality && <span className='font-medium text-[#9B9FAD]'>{speciality}</span>}
            </div>
            {viewMessage && <button className='w-[35px] h-[35px] rounded-[11px] flex items-center justify-center bg-[#ECEEF1]'>
                <MessageImg className='w-[19px] h-auto' />
            </button>}
            <button className='w-[35px] h-[35px] rounded-[11px] flex items-center justify-center bg-[#ECEEF1]'>
                {!archive && <ArchiveImg className='w-[19px] h-auto' />}
                {archive && <ArchiveReverseImg className='w-[19px] h-auto' />}
            </button>
        </div>
    );
};

export { StafferCart };