import InputSelect from '@/widgets/jobs/UI/InputSelect'
import { setIdleTime, setSwitchExit } from '../../../model/profile.store'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/config/store'
import { getAccessToken } from '@/shared/utils';
import { useEffect } from 'react';

const AutoexitFilter = () => {

    const dispatch = useDispatch()

    const switchExit = useSelector((state: RootState) => state.profile.autoExitSwith);
    const idleTime = useSelector((state: RootState) => state.profile.idleTime);

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {

        const url = new URL(import.meta.env.VITE_API_URL + '/user/profile/get_profile_auto_exit')
        url.searchParams.append('EmployeeId', EmployeeId || '')

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {
                
                if (data.data.AutoExit) {
                    dispatch(setSwitchExit(1))
                }

                if (data.data.InvactiveInMinutes) {
                    dispatch(setIdleTime(idleTime.find(item => item.code == data.data.InvactiveInMinutes)?.id))
                }

            }
        } catch (error) {

            console.log(error);

        }


    }

    const setInformation = async ({autoExit, time}: {autoExit: string, time: string}) => {

        const formdata = {
            AutoExit: autoExit === 'on' ? true : false,
            InvactiveInMinutes: Number(time)
        }

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/user/profile/change_profile_auto_exit', {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                
                console.log(data);
                

            }
        } catch (error) {

            console.log(error);

        }
    }

    useEffect(() => {
        getInformation()
    }, [])

    return (
        <div className="flex flex-col gap-[15px] justify-between grow ">

            <div className="flex flex-col gap-[10px] p-[13px] rounded-[23px] bg-[#ECEEF1]">
                <InputSelect data={switchExit} change={(id: number) => {
                    dispatch(setSwitchExit(id))
                    setInformation({
                        autoExit: switchExit.find(item => item.id === id)?.code || '',
                        time: idleTime.find(item => item.isSelected)?.code || ''
                    })
                }} title='Автовыход' />

                <InputSelect data={idleTime} change={(id: number) => {
                    dispatch(setIdleTime(id))
                    setInformation({
                        autoExit: switchExit.find(item => item.isSelected)?.code || '',
                        time: idleTime.find(item => item.id === id)?.code || ''
                    })
                }} title='Время бездействия' />
            </div>

            <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
            </div>
        </div>
    );
};

export default AutoexitFilter;