import SuccessBlueImg from '@/assets/icons/success-blue.svg?react'
import { getAccessToken } from '@/shared/utils';
import { useEffect, useState } from 'react';

interface informationPassword {
    IsSecurePassword: string,
    PasswordLastUpdate: string
}

const PasswordFilter = () => {

    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')

    const [informationPassword, setInformationPassword] = useState<informationPassword>({
        IsSecurePassword: '',
        PasswordLastUpdate: ''
    })

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/user/profile/get_profile_password_status');
        url.searchParams.append('EmployeeId', EmployeeId?.toString() ?? '');

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

                const information =  data.data
                information.PasswordLastUpdate = information.PasswordLastUpdate.split('-').reverse().join('.')
                setInformationPassword(information)
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

            <div className="flex flex-col gap-[10px] mt-[15px] h-full overflow-y-auto scroll max-h-[calc(100vh-330px)]">

                <div className={`bg-[#ECEEF1] transition-all duration-300 rounded-[13px] flex items-center gap-[5px] justify-center py-[9px]`}>
                    <SuccessBlueImg />
                    <span className="text-[14px]">{informationPassword.IsSecurePassword}</span>
                </div>
                <div className={`bg-[#ECEEF1] transition-all duration-300 rounded-[13px] flex items-center gap-[5px] justify-center py-[9px]`}>
                    <SuccessBlueImg />
                    <span className="text-[14px]">Обновлён {informationPassword.PasswordLastUpdate}</span>
                </div>
                <p className='text-center text-[11px] text-[#787B86]'>
                    Старайтесь обновлять пароль как минимум раз в 4 месяца. Так вас будет сложнее взломать.
                </p>
            </div>

            <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
                <button
                    className='text-[14px] text-primary bg-black rounded-[13px] py-[11px]'
                >Изменить пароль</button>
                <p
                    className='text-[11px] text-[#787B86] text-center'
                >
                    Чтобы изменить пароль, нужно подтверждение через телефон или почту.
                </p>
            </div>
        </div>
    );
};

export default PasswordFilter;