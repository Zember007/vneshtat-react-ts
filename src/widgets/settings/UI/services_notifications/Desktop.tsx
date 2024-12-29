import CloseImg from '@/assets/icons/close.svg?react'
import { getAccessToken } from '@/shared/utils';

const Desktop = ({ close, data, setData }: { close: Function; data: boolean; setData: Function }) => {

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const editDesktop = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/user/settings/edit_desktop_notification');
        const formdata = new FormData()
        formdata.append('EmployeeId' , EmployeeId || '')

        try {
            const res = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
                 body: formdata
            });
            const result = await res.json();
            if (result.status === "error") {
                console.log("error", result);
            }

            if (result.status === "success") {

                setData(!data)

            }
        } catch (error) {

            console.log(error);

        }

    }

    return (
        <div className="flex flex-col gap-[10px] h-full">
            <div className="mt-[5px] flex items-center justify-between pb-[10px] border-0 border-b border-solid border-[#D9D9D9]">
                <span className="font-medium">Уведомления на рабочем столе</span>
                <button
                    onClick={() => { close() }}>
                    <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                </button>
            </div>
            <div className="grow h-full flex flex-col justify-between">
                <div className="flex flex-col gap-[15px]">
                    <p className="text-[#787B86] text-[14px]">
                        При включении уведомлений обязательно нажмите в своем браузере “Разрешить”. Иначе они будут заблокированы.
                    </p>
                </div>
                <div className="flex items-center flex-col gap-[10px]">
                    <button
                        onClick={() => { editDesktop() }}
                        className="w-[255px] rounded-[18px] bg-black py-[15px]">
                        <p className="text-primary">{!data ? 'Включить' : 'Отключить'} уведомления</p>
                    </button>
                    <p className="text-[#787B86] text-[12px] text-center">
                        В верхней части браузера появится окно подтверждения.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Desktop;