import DesktopImg from '@/assets/icons/desktop.svg?react'
import MobileImg from '@/assets/icons/mobile.svg?react'
import { getAccessToken } from '@/shared/utils';
import { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react'

interface history {
    id: number;
    Status: string;
    DeviceName: string;
    Browser: string;
    City: string;
    IsCurrent: boolean;
}

const HistoryFilter = () => {

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const [sessions, setSessions] = useState<history[]>([])

    const currentSession = sessions.filter(item => item.IsCurrent)
    const Sessions = sessions.filter(item => !item.IsCurrent)

    const getHistory = async () => {

        const url = new URL(import.meta.env.VITE_API_URL + '/user/profile/get_profile_sessions')
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
                setSessions(data.data)
            }
        } catch (error) {

            console.log(error);

        }


    }

    useEffect(() => {
        getHistory()
    },[])

    return (
        <div className="flex flex-col gap-[15px] justify-between grow ">

            <SimpleBar className='max-h-[calc(100vh-490px)]'>
                <div className="flex flex-col gap-[20px] mt-[15px] h-full ">

                    <div className="flex flex-col gap-[10px]">
                        <span className="text-[#000] font-medium">Текущий сеанс</span>
                        {
                            currentSession.map(item => (
                                <div className="flex gap-[5px]">
                                    <div className="grow bg-[#ECEEF1] rounded-[13px] flex gap-[10px] p-[15px] items-center">
                                        <DesktopImg />
                                        <span className='text-[14px] font-medium'>{item.DeviceName}</span>
                                    </div>
                                    <div className="bg-[#ECEEF1] rounded-[13px] flex flex-col gap-[2px] justify-center px-[15px]">
                                        <span className='text-[11px] text-[#787B86] leading-[1]'>{item.Browser}</span>
                                        <span className='text-[11px] text-[#9B9FAD] leading-[1]'>{item.City}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        <span className="text-[#000] font-medium">Другие сеансы</span>
                        <div className="flex flex-col gap-[5px]">


                            {
                                Sessions.map(item => (
                                    <div className="flex gap-[5px] bg-[#ECEEF1] rounded-[13px]">
                                        <div className="grow  flex gap-[10px] p-[15px] items-center">
                                            <MobileImg />
                                            <span className='text-[14px] font-medium'>{item.DeviceName}</span>
                                        </div>
                                        <div className=" flex flex-col gap-[2px] justify-center px-[15px]">
                                            <span className='text-[11px] text-[#787B86] leading-[1]'>{item.Browser}</span>
                                            <span className='text-[11px] text-[#9B9FAD] leading-[1]'>{item.City}</span>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
            </SimpleBar>

            <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
                <button
                    className='text-[14px] text-primary bg-black rounded-[13px] py-[11px]'
                >Завершить другие сеансы</button>
                <p
                    className='text-[11px] text-[#787B86] text-center'
                >
                    Выйти из аккаунта на всех устройствах, кроме этого.
                </p>
            </div>
        </div>
    );
};

export default HistoryFilter;