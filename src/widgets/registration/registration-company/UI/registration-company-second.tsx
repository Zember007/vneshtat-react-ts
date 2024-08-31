import {useDispatch, useSelector} from "react-redux";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import ArrowImg from "@/assets/icons/arrow-long.svg?react";
import LogoId from "@/assets/icons/logo-id.svg?react";
import {RootState} from "@/app/config/store";
import {setPage, updateInfoState} from "../model/registration-company.store";
import {Input} from "@/shared/UI";
import {ChangeEvent, useState} from "react";
import {RegistrationCompanyHasAccount} from "./registration-company-has-account";
import {RegistrationCompanyCredentials} from "./registration-company-credentials";
import {getAccessToken} from "@/shared/utils";
import {getUserCompanies} from "@/shared/utils/methods";
import {setCompanies} from "@/app/model/user.store";
import {useNavigate} from "react-router-dom";

const formatDisplayDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length <= 2) {
        return cleaned;
    } else if (cleaned.length <= 4) {
        return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    } else if (cleaned.length <= 8) {
        return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4)}`;
    } else {
        return value;
    }
};

const isValidDay = (day: number) => day >= 1 && day <= 31;
const isValidMonth = (month: number) => month >= 1 && month <= 12;

const formatDateForSubmission = (date: string): string => {
    const [day, month, year] = date.split('-');
    return `${parseInt(day, 10)}-${parseInt(month, 10)}-${year}`;
};

const convertToInternalDate = (displayValue: string): string | null => {
    const parts = displayValue.split('-');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);

        if (isValidDay(dayNum) && isValidMonth(monthNum)) {
            return formatDateForSubmission(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        }
    }
    return null;
};

const RegistrationCompanySecond = () => {
    const [hasAccount, setHasAccount] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const {name, surname, middlename, birthday} = useSelector((state: RootState) => state.registrationCompany.info);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedValue = formatDisplayDate(value);

        dispatch(updateInfoState({
            field: "birthday",
            value: formattedValue,
        }));
    };

    const handleSendInformation = async () => {
        const formdata = new FormData();
        const confirmToken = localStorage.getItem("ConfirmToken");
        const formattedData = convertToInternalDate(birthday);
        formdata.append("Name", name);
        formdata.append("Surname", surname);
        formdata.append("MiddleName", middlename);
        if (formattedData) {
            formdata.append("BirthDate", formattedData);
        }
        if (confirmToken) {
            formdata.append("Token", confirmToken)
        }

        const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_up/connect_vheshtat_id_and_create_company", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getAccessToken()}`
            },
            body: formdata
        });
        const data = await res.json();
        if (data.status === "success") {
            localStorage.removeItem("RegistrationCompanyName");
            localStorage.removeItem("ConfirmToken");
            const companiesData = await getUserCompanies();
            dispatch(setCompanies(companiesData.data))
            navigate("/")
        }
    };

    return (
        <div className={"flex flex-col items-center justify-center gap-5 h-[calc(100%-110px)]"}>
            <div className={"flex items-center gap-4"}>
                <div className={"flex flex-col gap-4 w-[320px] h-[620px]"}>
                    <div className={"p-6 bg-primary rounded-[35px] relative"}>
                        <button className={"absolute right-[366px] top-[30%]"} onClick={() => dispatch(setPage(1))}>
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
                                    onChange={handleDateChange}
                                    maxLength={10}
                                    title="Формат даты: ГГГГ-М-Д"
                                />
                            </div>
                        </div>
                        <p className={"text-[15px] font-medium text-[#9B9FAD] text-center"}>Данные можно будет изменить
                            в личном кабинете сервиса</p>
                    </div>
                </div>
                <div className={"w-[320px] h-[620px] p-6 bg-primary rounded-[35px] flex flex-col"}>
                    <div className={"flex justify-center"}>
                        <LogoId/>
                    </div>
                    {hasAccount ? (
                        <RegistrationCompanyHasAccount
                            isLoginClicked={isLoginClicked}
                            setIsLoginClicked={setIsLoginClicked}
                            setHasAccount={setHasAccount}
                            handleSendInformation={handleSendInformation}
                        />
                    ) : (
                        <RegistrationCompanyCredentials setHasAccount={setHasAccount} handleSendInformation={handleSendInformation}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export {RegistrationCompanySecond};