/* import CLoseImg from '@/assets/icons/close.svg?react'
import { Input } from '@/shared/UI'; */

const PasswordChange = ({active}:{active:boolean}) => {
    return (
        <div className={`z-[100] fixed bg-[#1212124d] top-0 bottom-0 right-0 left-0 flex items-center justify-center transition-all duration-500 ${!active && 'invisible opacity-0'} `}>
            <div className="min-w-[380px] p-[30px] rounded-[36px] bg-primary">

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