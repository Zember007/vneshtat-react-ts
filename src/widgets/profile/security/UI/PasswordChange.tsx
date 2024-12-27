import CLoseImg from '@/assets/icons/close.svg?react'
import { Input, Switch } from '@/shared/UI';
import { getAccessToken } from '@/shared/utils';
import { useEffect, useState } from 'react';

interface passwords {
    password: string,
    confirmPassword: string,
    oldPassword: string
}

interface verification{
    value: string
    code: string
    send: boolean
}

const PasswordChange = ({ active, close }: { active: boolean, close: Function }) => {

    const [password, setPassword] = useState<passwords>({
        password: '',
        confirmPassword: '',
        oldPassword: ''
    })

    const [forgotPassword, setForgotPassword] = useState<boolean>(false)
    const [verificationStatus, setVerificationStatus] = useState<boolean>(false)
    const [restoreWithPhone, setRestoreWithPhone] = useState<boolean>(false)
    const [verificationData, setVerificationData] = useState<verification>({
        value: '',
        code: '',
        send: false
    })

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()


    const checkCode = async () => {


        const SecretKey = localStorage.getItem('SecretKey')

        const url_prefix = restoreWithPhone ? 'get_password_recovery_by_sms_key' : 'get_password_recovery_by_email_key'
        const url = new URL(import.meta.env.VITE_API_URL + '/user/profile/' + url_prefix)

        url.searchParams.append('SecretKey', SecretKey || '')
        url.searchParams.append(restoreWithPhone ? 'SMSCode' : 'Code', verificationData.code)

        try {
            const res = await fetch(url, {
                method: "GET",
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {

                setVerificationStatus(true)

            }
        } catch (error) {

            console.log(error);

        }


    }

    const sendCode = async () => {


        const formdata = new FormData()

        formdata.append(restoreWithPhone ? 'PhoneNumber' : 'Email', verificationData.value)

        const url = restoreWithPhone ? 'create_password_recovery_by_sms' : 'create_password_recovery_by_email'

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/user/profile/' + url, {
                method: "POST",
                body: formdata
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {

                setVerificationData((prev) => ({
                    ...prev,
                    send: true
                }))

                localStorage.setItem('SecretKey', data.data.token as string)


            }
        } catch (error) {

            console.log(error);

        }


    }

    const changePassword = async () => {

        const SecretKey = localStorage.getItem('SecretKey')

        const formdata = new FormData()

        formdata.append(forgotPassword ? 'SecretKey' : 'EmployeeId', forgotPassword ? (SecretKey || '') : (EmployeeId || ''))
        formdata.append(forgotPassword ? (restoreWithPhone ? 'SMSCode' : 'Code') : 'OldPassword', forgotPassword ? verificationData.code : password.oldPassword)
        formdata.append('NewPassword', password.password)

        const url = forgotPassword ? (restoreWithPhone ? 'change_password_by_sms_code' : 'change_password_by_email_code') : 'change_profile_password'

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/user/profile/' + url, {
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

                close()

            }
        } catch (error) {

            console.log(error);

        }


    }

    useEffect(() => {
        setForgotPassword(false)
        setVerificationStatus(false)
        setRestoreWithPhone(false)
        setVerificationData({
            value: '',
            code: '',
            send: false
        })
        setPassword({
            password: '',
            confirmPassword: '',
            oldPassword: ''
        })
    },[active])

    return (
        <div className={`z-[100] fixed bg-[#1212124d] top-0 bottom-0 right-0 left-0 flex items-center justify-center transition-all duration-500 ${!active && 'invisible opacity-0'} `}>
            <div className="w-[380px] p-[30px] rounded-[36px] bg-primary flex flex-col gap-[30px]">
                <div className="flex justify-between">
                    <h2 className='text-[25px] font-medium'>Смена пароля</h2>
                    <button
                        onClick={() => { close() }}>
                        <CLoseImg className='w-[25px] h-[25px] *:fill-[#BDBFC7]' />
                    </button>
                </div>
                <form className='flex flex-col gap-[20px]'>
                    {!forgotPassword &&
                        <div className="flex flex-col gap-[10px]">
                            <Input
                                extraClass={` h-[50px] text-center w-full !pl-[18px] !rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary !font-medium`}
                                title="Старый пароль"
                                type={"password"}
                                value={password.oldPassword}
                                onChange={e => {
                                    const value = e.target.value
                                    setPassword((prev) => ({
                                        ...prev,
                                        oldPassword: value
                                    }))
                                }}
                            />
                            <button
                                onClick={() => setForgotPassword(true)}
                                className='text-[14px] text-[#787B86] text-center'>Не помню пароль</button>
                        </div>
                    }

                    {forgotPassword && !verificationStatus &&
                        <>
                            <div className="flex flex-col gap-[10px]">
                                <Switch
                                    extraClass={"w-full h-[50px] !bg-[#FAFAFA] border border-solid border-[#E5E7EA]"}
                                    extraChildClass={"py-2.5 h-full w-[50%]"}
                                    selectedBg={"#ECEEF1"}
                                    unselectedBg={"#FAFAFA"}
                                    firstChild={<p
                                        className={`font-medium text-base ${restoreWithPhone ? "text-[#121212]" : "text-[#9B9FAD]"}`}>Телефон</p>}
                                    secondChild={<p
                                        className={`font-medium text-base ${restoreWithPhone ? "text-[#9B9FAD]" : "text-[#121212]"}`}>Почта</p>}
                                    isSelected={restoreWithPhone}
                                    setter={(value) => {
                                        setVerificationData((prev) => ({
                                            ...prev,
                                            value: ''
                                        }))
                                        setRestoreWithPhone(value)
                                    }}
                                />

                                {restoreWithPhone &&
                                    <Input
                                        extraClass={` h-[50px] !text-center w-full !pl-[18px] !rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary !font-medium`}
                                        title="Номер телефона"
                                        placeholder='+7 (___) ___ - __ -__'
                                        type={"phone"}
                                        value={verificationData.value}
                                        onChange={e => {
                                            const value = e.target.value
                                            setVerificationData((prev) => ({
                                                ...prev,
                                                value: value
                                            }))
                                        }}
                                    />
                                }
                                {!restoreWithPhone &&
                                    <Input
                                        extraClass={` h-[50px] !text-center w-full !pl-[18px] !rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary !font-medium`}
                                        title="Email"
                                        type={"email"}
                                        withEraser={false}
                                        value={verificationData.value}
                                        onChange={e => {
                                            const value = e.target.value
                                            setVerificationData((prev) => ({
                                                ...prev,
                                                value: value
                                            }))
                                        }}
                                    />
                                }

                                {verificationData.send &&
                                    <>
                                        <Input
                                            extraClass={` h-[50px] !text-center w-full !pl-[18px] !rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary !font-medium`}
                                            title={restoreWithPhone ? "Код из СМС" : "Код из письма"}
                                            type={"text"}
                                            withEraser={false}
                                            value={verificationData.code}
                                            onChange={e => {
                                                const value = e.target.value
                                                setVerificationData((prev) => ({
                                                    ...prev,
                                                    code: value
                                                }))
                                            }}
                                        />
                                    </>
                                }

                            </div>

                            <button
                            onClick={(e) => {
                                e.preventDefault()
                                verificationData.send ? checkCode() : sendCode()
                            }}
                                className={` rounded-[13px] py-[12px] ${(verificationData.value || verificationData.code) ? 'bg-black' : 'bg-[#DCE0E5]'}`}>
                                <p className={`text-[14px] ${(verificationData.value || verificationData.code) ? 'text-primary' : 'text-[#787B86]'}`}>{verificationData.send ? 'Подтвердить' : 'Отправить код на номер'}</p>
                            </button>
                        </>
                    }

                    {
                        (!forgotPassword || verificationStatus) &&
                        <>
                            <div className="flex flex-col gap-[10px]">
                                <Input
                                    extraClass={` h-[50px] text-center w-full !pl-[18px] !rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary !font-medium`}
                                    extraClassInput=' '
                                    title="Новый пароль"
                                    type={"password"}
                                    value={password.password}
                                    onChange={e => {
                                        const value = e.target.value
                                        setPassword((prev) => ({
                                            ...prev,
                                            password: value
                                        }))
                                    }}
                                />
                                <Input
                                    extraClass={` h-[50px] text-center w-full !pl-[18px] !rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary !font-medium`}
                                    title="Повторите"
                                    type={"password"}
                                    value={password.confirmPassword}
                                    onChange={e => {
                                        const value = e.target.value
                                        setPassword((prev) => ({
                                            ...prev,
                                            confirmPassword: value
                                        }))
                                    }}
                                />
                                <div className="flex gap-[5px] justify-center">
                                    <div className="flex flex-col gap-[2px] *:leading-[1.2]">
                                        <span className='text-[12px] text-[#787B86] font-medium'>6+</span>
                                        <span className='text-[12px] text-[#787B86] font-medium'>Ff</span>
                                        <span className='text-[12px] text-[#787B86] font-medium'>1#!</span>
                                    </div>
                                    <div className="flex flex-col gap-[2px] *:leading-[1.2]">
                                        <span className='text-[12px] text-[#787B86]'>Не менее 6 символов</span>
                                        <span className='text-[12px] text-[#787B86]'>Строчные и прописные буквы</span>
                                        <span className='text-[12px] text-[#787B86]'>Цифры и другие символы</span>
                                    </div>
                                </div>
                            </div>
                            <button
                            onClick={(e) => {
                                e.preventDefault()
                                changePassword()
                            }}
                            disabled={(password.password !== password.confirmPassword) || !password.password}
                                className='bg-black group disabled:bg-[#DCE0E5] rounded-[13px] py-[12px]'>
                                <p className="group-disabled:text-[#787B86] text-[14px] text-primary">Сменить пароль</p>
                            </button>
                        </>
                    }
                </form>
            </div>


        </div>
    );
};

export default PasswordChange;