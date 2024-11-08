
import ArchiveImg from "@/assets/icons/archive.svg?react";
import ArchiveReverseImg from "@/assets/icons/archive_reverse.svg?react";
import MessageImg from "@/assets/icons/message.svg?react";
import { getAccessToken } from "@/shared/utils";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { changeStaffers } from "../../model/index.store";

interface props {
    id: number
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
    passenger?: boolean;
}

const StafferCart = ({ Name, Surname, MiddleName, speciality, archive, lastVisite, viewMessage, active, id, select, online, passenger }: props) => {

    const dispatch = useDispatch()



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

    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')

    const ArchiveMove = async () => {

        const formdata = new FormData();

        formdata.append('EmployeeId', EmployeeId ?? '')
        

        if(passenger) {
            formdata.append('PassengerId', id.toString())
        } else {
            formdata.append('DepartmentEmployeeId', id.toString())
        }

        const url = passenger ? 'change_status_company_groups_passanger' : 'change_status_company_department_employee'

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/' + url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
                body: formdata
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                dispatch(changeStaffers({id: id, field:'IsActive', value: archive, passenger: passenger}))
            }

        } catch (error) {

            console.log(error);

        }

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
            <button
                onClick={
                    () => ArchiveMove()
                }
                className='w-[35px] h-[35px] rounded-[11px] flex items-center justify-center bg-[#ECEEF1]'>
                {!archive && <ArchiveImg className='w-[19px] h-auto' />}
                {archive && <ArchiveReverseImg className='w-[19px] h-auto' />}
            </button>
        </div>
    );
};

export { StafferCart };