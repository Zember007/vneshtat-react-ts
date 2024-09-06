import {Input} from "@/shared/UI";
import {updateCredentialsState} from "../model/registration-company.store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {Dispatch, SetStateAction, useState} from "react";
import {getDeviceAndBrowserInfo, setAccessToken, setRefreshToken, validateEmail} from "@/shared/utils";

interface RegistrationCompanyCredentialsProps {
    setHasAccount: Dispatch<SetStateAction<boolean>>;
    handleSendInformation: () => void;
    isEmailAvailable: boolean | null;
    isPhoneAvailable: boolean | null;
    isLoginAvailable: boolean | null;
    setIsEmailAvailable: Dispatch<SetStateAction<boolean | null>>;
    setIsPhoneAvailable: Dispatch<SetStateAction<boolean | null>>;
    setIsLoginAvailable: Dispatch<SetStateAction<boolean | null>>;
}

const RegistrationCompanyCredentials = ({
                                            setHasAccount,
                                            handleSendInformation,
                                            isEmailAvailable,
                                            isPhoneAvailable,
                                            isLoginAvailable,
                                            setIsEmailAvailable,
                                            setIsPhoneAvailable,
                                            setIsLoginAvailable
                                        }: RegistrationCompanyCredentialsProps) => {
    const {email, phone, login, password} = useSelector((state: RootState) => state.registrationCompany.credentials);

    const {isInfoReady, isCredentialsReady} = useSelector((state: RootState) => state.registrationCompany);
    const [hasCreatedAccount, setHasCreatedAccount] = useState(false);
    const isReadyToLogin = isInfoReady && isCredentialsReady && isEmailAvailable && isPhoneAvailable && isLoginAvailable;
    const dispatch = useDispatch();

    async function handleLogin() {
        const formdata = new FormData();
        formdata.append("Username", login);
        formdata.append("Password", password);
        const {browserName, deviceName} = getDeviceAndBrowserInfo();
        formdata.append("DeviceName", deviceName);
        formdata.append("Browser", browserName);

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_in/auth_token_by_username", {
                method: "POST",
                body: formdata,
                redirect: "follow"
            });
            const data = await res.json();
            if (data.status === "success" && data.data) {
                setAccessToken(data.data.access_token);
                setRefreshToken(data.data.refresh_token);
            }
        } catch (error) {
        }
    }

    const handleCheckCredentials = async (field: string, value: string) => {
        const queryParams = new URLSearchParams({
            [field]: value,
        });
        const url = `${import.meta.env.VITE_API_URL}/auth/sign_up/check_vneshtat_id_credentials_available?${queryParams.toString()}`;
        const res = await fetch(url);
        return await res.json();
    }

    const handleInputChange = async (field: string, value: string) => {
        const upperField = field === "email" ? "Email" : field === "phone" ? "PhoneNumber" : field === "login" ? "Username" : "";
        dispatch(updateCredentialsState({field, value} as any));

        if (field === "email" && !validateEmail(value)) return;
        if (field === "phone" && value.length !== 12) return;

        const availability = await handleCheckCredentials(upperField, value);
        if (availability.status === "success") {
            if (field === "email") setIsEmailAvailable(availability.data);
            if (field === "phone") setIsPhoneAvailable(availability.data);
            if (field === "login") setIsLoginAvailable(availability.data);
        }
    };

    const handleSendCredentials = async () => {
        const formdata = new FormData();
        formdata.append("Email", email);
        formdata.append("PhoneNumber", phone);
        formdata.append("Username", login);
        formdata.append("Password", password);

        const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_up/create_vheshtat_id", {
            method: "POST",
            body: formdata
        });
        const data = await res.json();

        if (data.status === "success") {
            setHasCreatedAccount(true);
            await handleLogin();
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
        return data;
    };

    const handleRegistration = async () => {
        let sendCredentialsData;
        if (!hasCreatedAccount) {
            sendCredentialsData = await handleSendCredentials();
            if (sendCredentialsData.status !== "success") {
                return;
            }
        }
        if (hasCreatedAccount || sendCredentialsData?.status === "success") {
            await handleSendInformation();
        }
    };

    return (
        <>
            <div className={"flex flex-col gap-2.5 mt-5"}>
                <Input
                    extraClass={"!text-lg text-center !font-medium h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                    placeholder={"Email"}
                    value={email}
                    type={"email"}
                    onChange={e => handleInputChange("email", e.target.value)}
                />
                <Input
                    extraClass={"!text-lg text-center !font-medium h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                    placeholder={"Телефон"}
                    type={"phone"}
                    value={phone}
                    onChange={e => handleInputChange("phone", e.target.value)}
                />
                <Input
                    extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] text-blue !bg-primary first-letter-black`}
                    placeholder="Логин"
                    value={login ? `@${login}` : ""}
                    onChange={e => handleInputChange("login", e.target.value.startsWith('@') ? e.target.value.slice(1) : e.target.value)}
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
                {email && !isEmailAvailable ? (
                    <p className={"text-center text-[15px] text-[#FF64A3] px-7"}>
                        Вы ввели неправильную почту или почта занята
                    </p>
                ) : login && !isLoginAvailable ? (
                    <p className={"text-center text-[15px] text-[#FF64A3] px-7"}>
                        Вы ввели недоступный логин или логин занят
                    </p>
                ) : phone && !isPhoneAvailable ? (
                    <p className={"text-center text-[15px] text-[#FF64A3] px-7"}>
                        Вы ввели недоступный номер или номер занят
                    </p>
                ) : (
                    <>
            <span className={"flex items-center gap-2 w-[190px]"}>
                <p className={`text-xs font-medium text-[#787B86] ${password ? "text-blue" : ""}`}>6+</p>
                <p className={"text-xs text-[#787B86]"}>Не менее 6 символов</p>
            </span>
                        <span className={"flex items-center gap-2 w-[190px]"}>
                <p className={`text-xs font-medium text-[#787B86] ${password ? "text-blue" : ""}`}>Ff</p>
                <p className={"text-xs text-[#787B86]"}>Строчные и прописные буквы</p>
            </span>
                        <span className={"flex items-center gap-2 w-[190px]"}>
                <p className={`text-xs font-medium text-[#787B86] ${password ? "text-blue" : ""}`}>1#!</p>
                <p className={"text-xs text-[#787B86]"}>Цифры и другие символы</p>
            </span>
                    </>
                )}
            </div>
            <button
                className={"transition bg-black py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-full mt-auto disabled:cursor-not-allowed disabled:bg-secondary"}
                disabled={!isReadyToLogin}
                onClick={handleRegistration}
            >
                <h3 className={`text-lg font-medium ${isReadyToLogin ? "text-primary" : "text-black"}`}>
                    Создать аккаунт
                </h3>
            </button>
            <button
                className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center mt-2.5 w-full"}
                type={"button"}
                onClick={() => setHasAccount(true)}
            >
                <h3 className={`text-lg font-medium`}>Уже есть аккаунт</h3>
            </button>
        </>
    );
};

export {RegistrationCompanyCredentials};
