import {Input} from "@/shared/UI";
import {setPage, updateCredentialsState} from "../model/registration-company.store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {Dispatch, SetStateAction} from "react";

const RegistrationCompanyCredentials = ({setHasAccount}: { setHasAccount: Dispatch<SetStateAction<boolean>> }) => {
    const {name, surname, middlename, birthday} = useSelector((state: RootState) => state.registrationCompany.info);
    const {email, phone, login, password} = useSelector((state: RootState) => state.registrationCompany.credentials);
    const {isInfoReady, isCredentialsReady} = useSelector((state: RootState) => state.registrationCompany);
    const isEmailDisabled = Boolean(phone) || Boolean(login);
    const isPhoneDisabled = Boolean(email) || Boolean(login);
    const isLoginDisabled = Boolean(email) || Boolean(phone);
    const dispatch = useDispatch();

    const handleCheckCredentials = async () => {
        const queryParams = new URLSearchParams({
            Email: email,
            PhoneNumber: phone,
            Username: name
        });
        const url = `${import.meta.env.VITE_API_URL}/auth/sign_up/check_vneshtat_id_credentials_available?${queryParams.toString()}`;
        const res = await fetch(url)
        const data = await res.json();
        console.log(data, "check")
        return data;
    }

    const handleSendInformation = async () => {
        const formdata = new FormData();
        formdata.append("Name", name);
        formdata.append("Surname", surname);
        formdata.append("MiddleName", middlename);
        formdata.append("BirthDate", birthday);
        const token = localStorage.getItem("ConfirmToken");
        if (token) {
            formdata.append("Token", token);
        }

        const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_up/connect_vheshtat_id_and_create_company", {
            method: "POST",
            body: formdata
        })
        const data = await res.json();
        console.log(data, "info")
        return data;
    }

    const handleSendCredentials = async () => {
        const formdata = new FormData();
        formdata.append("Email", email);
        formdata.append("PhoneNumber", phone);
        formdata.append("Username", name);
        formdata.append("Password", password);

        const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_up/create_vheshtat_id", {
            method: "POST",
            body: formdata
        })
        const data = await res.json();
        console.log(data, "credentials")
        if (data.status === "success") {
            dispatch(setPage(4))
        } else {
            const errorMessages = Object.entries(data.errors)
                .map(([key, messages]) => {
                    if (Array.isArray(messages) && messages.every(msg => typeof msg === 'string')) {
                        return `${key}: ${messages.join(', ')}`;
                    } else {
                        return `${key}: Invalid message format`;
                    }
                })
                .join('\n');

            alert(`Ошибка:\n${errorMessages}`);
        }
    }

    const handleRegistration = async () => {
        console.log("yes")
        const checkCredentialsData = await handleCheckCredentials();
        console.log(checkCredentialsData)
        if (checkCredentialsData.status === "success") {
            const sendInformationData = await handleSendInformation();
            if (sendInformationData.status === "success") {
                await handleSendCredentials();
            }
        }
    }

    return (
        <>
            <div className={"flex flex-col gap-2.5 mt-5"}>
                <Input
                    extraClass={"!text-lg text-center !font-medium h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                    placeholder={"Email"}
                    value={email}
                    type={"email"}
                    disabled={isEmailDisabled}
                    onChange={e => dispatch(updateCredentialsState({
                        field: "email",
                        value: e.target.value
                    }))}
                />
                <Input
                    extraClass={"!text-lg text-center !font-medium h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                    placeholder={"Телефон"}
                    type={"phone"}
                    value={phone}
                    disabled={isPhoneDisabled}
                    onChange={e => dispatch(updateCredentialsState({
                        field: "phone",
                        value: e.target.value
                    }))}
                />
                <Input
                    extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] text-blue !bg-primary first-letter-black`}
                    placeholder="Логин"
                    value={login ? `@${login}` : ""}
                    disabled={isLoginDisabled}
                    onChange={e => dispatch(updateCredentialsState({
                        field: "login",
                        value: e.target.value.startsWith('@') ? e.target.value.slice(1) : e.target.value
                    }))}
                />
                <Input
                    extraClass={"!text-lg text-center !font-medium h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                    placeholder={"Пароль"}
                    value={password}
                    type={"password"}
                    onChange={e => dispatch(updateCredentialsState({
                        field: "password",
                        value: e.target.value
                    }))}
                />
            </div>
            <div className={"flex flex-col items-center mt-4"}>
                                 <span className={"flex items-center gap-2 w-[190px]"}>
                                 <p className={`text-xs font-medium text-[#787B86] ${password && "text-blue"}`}>6+</p>
                                 <p className={"text-xs text-[#787B86]"}>Не менее 6 символов</p>
                             </span>
                <span className={"flex items-center gap-2 w-[190px]"}>
                                     <p className={`text-xs font-medium text-[#787B86] ${password && "text-blue"}`}>Ff</p>
                                     <p className={"text-xs text-[#787B86]"}>Строчные и прописные буквы</p>
                                 </span>
                <span className={"flex items-center gap-2 w-[190px]"}>
                                <p className={`text-xs font-medium text-[#787B86] ${password && "text-blue"}`}>1#!</p>
                                <p className={"text-xs text-[#787B86]"}>Цифры и другие символы</p>
                            </span>
            </div>
            <button
                className={"transition bg-black py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-full mt-4 disabled:cursor-not-allowed disabled:bg-secondary"}
                disabled={!isInfoReady || !isCredentialsReady}
                onClick={handleRegistration}
            >
                <h3 className={`text-lg font-medium ${isInfoReady && isCredentialsReady ? "text-primary" : "text-black"}`}>Создать
                    аккаунт</h3>
            </button>
            <button
                className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-full mt-2.5"}
                onClick={() => setHasAccount(true)}
            >
                <h3 className={`text-lg font-medium`}>Уже есть аккаунт</h3>
            </button>
        </>
    )
};

export {RegistrationCompanyCredentials};