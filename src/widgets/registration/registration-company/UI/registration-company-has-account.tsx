import {Input, Switch} from "@/shared/UI";
import {updateAccountState} from "../model/registration-company.store";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {getDeviceAndBrowserInfo, setAccessToken, setRefreshToken} from "@/shared/utils";
import {getUser} from "@/shared/utils/methods";
import {setUser} from "@/app/model/user.store";
import {useTimer} from "@/shared/hooks/use-timer";
import ReCAPTCHA from "react-google-recaptcha";

const RegistrationCompanyHasAccount = ({isLoginClicked, setIsLoginClicked, setHasAccount, handleSendInformation}: {
    isLoginClicked: boolean,
    setIsLoginClicked: Dispatch<SetStateAction<boolean>>,
    setHasAccount: Dispatch<SetStateAction<boolean>>,
    handleSendInformation: () => void
}) => {
    const {
        isInfoReady,
        isAccountReady
    } = useSelector((state: RootState) => state.registrationCompany);
    const {
        phone,
        login,
        sms,
        withPhone,
        password
    } = useSelector((state: RootState) => state.registrationCompany.account);
    const [startTimer, setStartTimer] = useState(false);
    const second = useTimer(60, startTimer);
    const {fullname} = useSelector((state: RootState) => state.user);
    const [_, setPhoneStatus] = useState<"error" | "success" | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [smsToken, setSmsToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
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
            return data;
        } catch (error) {
        }
    }

    const sendSMScode = async () => {
        const formdata = new FormData();
        if (smsToken) formdata.append("Token", smsToken);
        formdata.append("SMSCode", sms);
        const {browserName, deviceName} = getDeviceAndBrowserInfo();
        formdata.append("DeviceName", deviceName);
        formdata.append("Browser", browserName);

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_in/auth_token_by_phone", {
                method: "POST",
                body: formdata
            });
            const data = await res.json();
            if (data.status === "error") {
                setPhoneStatus("error")
            }

            if (data.status === "success" && data.data) {
                setAccessToken(data.data.access_token);
                setRefreshToken(data.data.refresh_token);
                const user = await getUser();
                dispatch(setUser(user));
                setIsLoginClicked(true)
            } else {
                setPhoneStatus("error")
            }
        } catch (error) {
            setPhoneStatus("error")
        }
    }

    const getSMScode = async (captchaToken: string, phone: string) => {
        if (captchaToken && phone) {
            try {
                setStartTimer(true);
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/auth/sign_in/auth_token_by_phone?PhoneNumber=${encodeURIComponent(phone)}&ReCaptchaResponse=${encodeURIComponent(captchaToken)}`
                );
                const data = await response.json();
                if (data.status === "success") {
                    setSmsToken(data.data.token);
                }
            } catch (error) {
                setStartTimer(false);
                setPhoneStatus("error");
                if (recaptchaRef.current) {
                    recaptchaRef.current?.reset();
                }
                setCaptchaToken(null);
            }
        }
    };

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    const handleCaptchaAndSMS = async () => {
        const captchaToken = await recaptchaRef.current?.executeAsync();
        if (captchaToken) {
            setCaptchaToken(captchaToken as string);
            await getSMScode(captchaToken as string, phone);
        } else {
            setPhoneStatus("error");
        }
    };

    return isLoginClicked ? (
        <div className={"h-full flex flex-col justify-between"}>
            <div className={"h-full flex flex-col gap-2.5 mt-5"}>
                <Input
                    extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                    placeholder={"+7 (___) ___ - __ -__"}
                    withEraser={false}
                    value={phone}
                />
                <Input
                    extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] text-blue !bg-primary first-letter-black`}
                    placeholder="Логин"
                    value={fullname.name ? `@${fullname.name}` : "Логин не найден"}
                    withEraser={false}
                />
                <button
                    className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                    onClick={async () => {
                        await handleSendInformation();
                    }}
                    disabled={!isInfoReady}
                >
                    <p className={`text-lg font-medium text-primary ${!isInfoReady && "!text-[#9B9FAD]"}`}>Подключить
                        к компании</p>
                </button>
                <p className={"text-[15px] font-medium text-[#9B9FAD] text-center px-6 my-2.5"}>{isInfoReady ? "Убедитесь, что @id принадлежит вам" : "Для подключения заполните базовые данные в левом окне"}</p>
            </div>
            <button
                className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-full"}
                onClick={() => setIsLoginClicked(false)}
            >
                <h3 className={`text-lg font-medium`}>Сменить аккаунт</h3>
            </button>
        </div>
    ) : (
        <div className={"flex flex-col gap-2.5 mt-5"}>
            <Switch
                extraClass={"w-full h-[50px] !bg-[#FAFAFA] border border-solid border-[#E5E7EA]"}
                extraChildClass={"py-2.5 h-full w-[50%]"}
                selectedBg={"#ECEEF1"}
                unselectedBg={"#FAFAFA"}
                firstChild={<p
                    className={`font-medium text-base ${withPhone ? "text-[#121212]" : "text-[#9B9FAD]"}`}>Телефон</p>}
                secondChild={<p
                    className={`font-medium text-base ${withPhone ? "text-[#9B9FAD]" : "text-[#121212]"}`}>Логин</p>}
                isSelected={withPhone}
                setter={(value) => dispatch(updateAccountState({field: "withPhone", value: value as boolean}))}
            />
            {withPhone ? (
                <>
                    <Input
                        extraClass={"!text-lg !font-medium h-[50px] text-center rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                        placeholder={"+7 (___) ___ - __ -__"}
                        type={"phone"}
                        value={phone}
                        onChange={e => dispatch(updateAccountState({
                            field: "phone",
                            value: e.target.value
                        }))}
                    />
                    {!captchaToken ? (
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={import.meta.env.VITE_RECAPTHCA}
                            size="invisible"
                            onChange={handleCaptchaChange}
                        />
                    ) : null}
                    <Input
                        extraClass={"!text-lg !font-medium text-blue h-[50px] text-center rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                        placeholder={"Введите код из СМС"}
                        value={sms}
                        onChange={e => dispatch(updateAccountState({
                            field: "sms",
                            value: e.target.value
                        }))}
                    />
                </>
            ) : (
                <>
                    <Input
                        extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] text-blue !bg-primary first-letter-black`}
                        placeholder="Логин"
                        value={login ? `@${login}` : ""}
                        onChange={e => dispatch(updateAccountState({
                            field: "login",
                            value: e.target.value.startsWith('@') ? e.target.value.slice(1) : e.target.value
                        }))}
                    />
                    <Input
                        extraClass={"!text-lg !font-medium text-blue h-[50px] text-center rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                        placeholder={"Введите пароль"}
                        type={"password"}
                        value={password}
                        onChange={e => dispatch(updateAccountState({
                            field: "password",
                            value: e.target.value
                        }))}
                    />
                </>
            )}
            <button
                className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                disabled={!phone || startTimer}
                onClick={handleCaptchaAndSMS}
                type={"button"}
            >
                <p className={`text-lg font-medium ${!phone || startTimer ? "!text-[#9B9FAD]" : "text-primary"}`}>
                    {startTimer && second
                        ? `Отправить повторно ${second === 60 ? "60" : `0:${String(second).padStart(2, "0")}`}`
                        : "Получить код"}
                </p>
            </button>
            <button
                className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                disabled={!isAccountReady}
                onClick={withPhone ? sendSMScode : handleLogin}
            >
                <p className={`text-lg font-medium text-primary ${!isAccountReady && "!text-[#9B9FAD]"}`}>Войти</p>
            </button>
            <p className={"text-[15px] font-medium text-[#9B9FAD] text-center my-2.5"}>Далее вам
                будет предложено подключить ID к компании</p>
            <button
                className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center mt-auto w-full"}
                onClick={() => setHasAccount(false)}
            >
                <h3 className={`text-lg font-medium`}>Создать аккаунт</h3>
            </button>
        </div>
    )
};

export {RegistrationCompanyHasAccount};