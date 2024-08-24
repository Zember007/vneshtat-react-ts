import {useDispatch, useSelector} from "react-redux";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import ArrowImg from "@/assets/icons/arrow-long.svg?react";
import LogoId from "@/assets/icons/logo-id.svg?react";
import {RootState} from "@/app/config/store";
import {setPage, updateInfoState} from "../model/registration-company.store";
import {Input} from "@/shared/UI";
import {useState} from "react";
import {RegistrationCompanyHasAccount} from "./registration-company-has-account";
import {RegistrationCompanyCredentials} from "./registration-company-credentials";

const RegistrationCompanySecond = () => {
    const [hasAccount, setHasAccount] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const {name, surname, middlename, birthday} = useSelector((state: RootState) => state.registrationCompany.info);
    const dispatch = useDispatch();

    return (
        <div className={"flex flex-col items-center justify-center gap-5 h-[calc(100%-110px)]"}>
            <div className={"flex items-center gap-4"}>
                <div className={"flex flex-col gap-4 w-[320px] h-[520px]"}>
                    <div className={"p-6 bg-primary rounded-[35px] relative"}>
                        <button className={"absolute right-[336px] top-[30%]"} onClick={() => dispatch(setPage(1))}>
                            <ArrowImg/>
                        </button>
                        <div
                            className={"flex items-center justify-between pl-6 py-4 pr-4 rounded-[16px] border border-solid border-[#E5E7EA]"}>
                            <h2 className={"text-lg text-[#9B9FAD]"}>{localStorage.getItem("RegistrationCompanyName")}</h2>
                            <SuccessImg className={"min-w-6 min-h-6 blue-fill"}/>
                        </div>
                    </div>
                    <div className={"p-6 bg-primary rounded-[35px] h-full flex flex-col justify-between"}>
                        <div>
                            <h2 className={"text-lg text-center"}>Личные данные</h2>
                            <div className={"flex flex-col gap-2.5 mt-4"}>
                                <Input
                                    extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                    placeholder={"Фамилия"}
                                    value={name}
                                    onChange={e => dispatch(updateInfoState({
                                        field: "name",
                                        value: e.target.value
                                    }))}
                                />
                                <Input
                                    extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                    placeholder={"Имя"}
                                    value={surname}
                                    onChange={e => dispatch(updateInfoState({
                                        field: "surname",
                                        value: e.target.value
                                    }))}
                                />
                                <Input
                                    extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                    placeholder={"Отчество"}
                                    value={middlename}
                                    onChange={e => dispatch(updateInfoState({
                                        field: "middlename",
                                        value: e.target.value
                                    }))}
                                />
                                <Input
                                    extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                    placeholder={"Дата рождения"}
                                    value={birthday}
                                    onChange={e => dispatch(updateInfoState({
                                        field: "birthday",
                                        value: e.target.value
                                    }))}
                                />
                            </div>
                        </div>
                        <p className={"text-[15px] font-medium text-[#9B9FAD] text-center"}>Данные можно будет изменить
                            в личном кабинете сервиса</p>
                    </div>
                </div>
                <div className={"w-[320px] h-[520px] p-6 bg-primary rounded-[35px] flex flex-col"}>
                    <div className={"flex justify-center"}>
                        <LogoId/>
                    </div>
                    {hasAccount ? (
                        <RegistrationCompanyHasAccount
                            isLoginClicked={isLoginClicked}
                            setIsLoginClicked={setIsLoginClicked}
                            setHasAccount={setHasAccount}
                        />
                    ) : (
                        <RegistrationCompanyCredentials setHasAccount={setHasAccount}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export {RegistrationCompanySecond};