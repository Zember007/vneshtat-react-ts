import CLoseImg from '@/assets/icons/close.svg?react'
import { Input } from '@/shared/UI';
import { useState } from 'react';

interface passwords {
    password: string,
    confirmPassword: string,
    oldPassword: string
}

const PasswordChange = ({ active, close }: { active: boolean, close: Function }) => {

    const [password, setPassword] = useState<passwords>({
        password: '',
        confirmPassword: '',
        oldPassword: ''
    })

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
                        <button className='text-[14px] text-[#787B86] text-center'>Не помню пароль</button>
                    </div>

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
                        className='bg-[#DCE0E5] rounded-[13px] py-[12px]'>
                        <p className="text-[14px] text-[#787B86]">Сменить пароль</p>
                    </button>
                </form>
            </div>
            {/* <Switch
                                            extraClass={"w-full h-[50px] !bg-[#FAFAFA] border border-solid border-[#E5E7EA]"}
                                            extraChildClass={"py-2.5 h-full w-[50%]"}
                                            selectedBg={"#ECEEF1"}
                                            unselectedBg={"#FAFAFA"}
                                            firstChild={<p
                                                className={`font-medium text-base ${restoreWithPhone ? "text-[#121212]" : "text-[#9B9FAD]"}`}>Телефон</p>}
                                            secondChild={<p
                                                className={`font-medium text-base ${restoreWithPhone ? "text-[#9B9FAD]" : "text-[#121212]"}`}>Почта</p>}
                                            isSelected={restoreWithPhone}
                                            setter={(value) => dispatch(updateRestoreState({
                                                field: "withPhone",
                                                value: value as boolean
                                            }))}
                                        />*/}

        </div>
    );
};

export default PasswordChange;