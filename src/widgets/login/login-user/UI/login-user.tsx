import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { Input, Switch } from "@/shared/UI";
import LogoIdImg from "@/assets/icons/logo-id.svg?react";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import ArrowImg from "@/assets/icons/arrow-long.svg?react";
import { useRef, useState } from "react";
import { updateLoginState, updateRestoreState } from "../model/login.store";
import { getDeviceAndBrowserInfo, setAccessToken, setRefreshToken } from "@/shared/utils";
import { useNavigate } from "react-router-dom";
import { Company, setCompanies, setUser } from "@/app/model/user.store";
import { getUser } from "@/shared/utils/methods";
import ReCAPTCHA from "react-google-recaptcha";
import { useTimer } from "@/shared/hooks/use-timer";

const LoginUser = () => {
    const {
        withPhone,
        sms,
        phone,
        login,
        password,
        isLoginReady,
        isRestore
    } = useSelector((state: RootState) => state.login)
    const {
        withPhone: restoreWithPhone,
        sms: restoreSms,
        phone: restorePhone,
        email: restoreEmail,
        password: restorePassword,
        rePassword: restoreRePassword,
        isSubmitted,
        isLoginReady: isRestoreLoginReady,
    } = useSelector((state: RootState) => state.login.restore);
    const { companies } = useSelector((state: RootState) => state.user)
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const [phoneStatus, setPhoneStatus] = useState<"error" | "success" | null>(null);
    const [loginStatus, setLoginStatus] = useState<"error" | "success" | null>(null);
    const [startTimer, setStartTimer] = useState(false);
    const second = useTimer(60, startTimer);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogin() {
        
        const formdata = new FormData();
        formdata.append("Username", login);
        formdata.append("Password", password);
        const { browserName, deviceName } = getDeviceAndBrowserInfo();
        formdata.append("DeviceName", deviceName);
        formdata.append("Browser", browserName);

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_in/start_sign_in_proccess/username", {
                method: "POST",
                body: formdata,
                redirect: "follow"
            });
            const data = await res.json();
            if (data.status === "error") {
                setLoginStatus("error")
            }

            if (data.status === "success" && data.data) {

                localStorage.setItem("SecretKey", data.data.SecretKey.toString());

                if (!data.data.Companies.length) navigate("/")
                else dispatch(setCompanies(data.data.Companies));
                setIsLoginClicked(true)
            }
        } catch (error) {
            setLoginStatus("error")
        }
    }



    const sendSMScode = async () => {



        const url = new URL(import.meta.env.VITE_API_URL + "/auth/sign_in/apply_sms_code_or_2fa")

        url.searchParams.set('SecretKey', localStorage.getItem("SecretKey") || '')
        url.searchParams.set('VerificationCode', sms)

        try {
            const res = await fetch(url, {
                method: "GET"
            });
            const data = await res.json();
            if (data.status === "error") {
                setPhoneStatus("error")
            }

            if (data.status === "success" && data.data) {



                if (!data.data.Companies.length) navigate("/")
                else dispatch(setCompanies(data.data.Companies));
                setIsLoginClicked(true)

            }
        } catch (error) {
            setPhoneStatus("error")
        }
    }

    const getSMScode = async (captchaToken: string, phone: string) => {
        if (captchaToken && phone) {
            try {
                setStartTimer(true);

                const url = new URL(`${import.meta.env.VITE_API_URL}/auth/sign_in/start_sign_in_proccess/phone_number`)

                url.searchParams.set('PhoneNumber', encodeURIComponent(phone))
                url.searchParams.set('ReCaptchaResponse', encodeURIComponent(captchaToken))

                const { browserName, deviceName } = getDeviceAndBrowserInfo();
                url.searchParams.set("DeviceName", deviceName);
                url.searchParams.set("Browser", browserName);

                const response = await fetch(url, {
                    method: "GET"
                });
                const data = await response.json();
                if (data.status === "success") {
                    localStorage.setItem("SecretKey", data.data.SecretKey.toString());
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

    const handleCheckCredentials = async (field: string, value: string) => {
        const queryParams = new URLSearchParams({
            [field]: value,
        });
        const url = `${import.meta.env.VITE_API_URL}/auth/sign_up/check_vneshtat_id_credentials_available?${queryParams.toString()}`;
        const res = await fetch(url);
        const { data } = await res.json();
        return data ? "error" : "success";
    }

    const handleInputChange = async (field: string, value: string) => {
        const upperField = field === "phone" ? "PhoneNumber" : field === "login" ? "Username" : "";

        if (field === "phone" && value.length !== 12) return;

        const availability = await handleCheckCredentials(upperField, value);
        if (field === "login") {
            setLoginStatus(availability);
            if(availability === 'success') {
                handleLogin()
            }
        }
        if (field === "phone") {
            setPhoneStatus(availability);
            if(availability === 'success') {
                sendSMScode()
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

    const LoginCompany = async (company: Company) => {

        const url = new URL(import.meta.env.VITE_API_URL + "/auth/sign_in/authorize_user");
        url.searchParams.append('EmployeeId', company.EmployeeId.toString() || '');
        url.searchParams.append('SecretKey', localStorage.getItem("SecretKey") || '');

        try {
            const res = await fetch(url, {
                method: "GET"
            });
            const data = await res.json();
            if (data.status === "error") {
                setLoginStatus("error")
            }

            if (data.status === "success" && data.data) {
                setAccessToken(data.data.AccessToken);
                setRefreshToken(data.data.RefreshToken);
                const user = await getUser();
                dispatch(setUser(user));

                localStorage.setItem("EmployeeId", company.EmployeeId.toString());
                localStorage.setItem("CompanyName", company.CompanyName.toString());

                navigate("/")


            }
        } catch (error) {
            setLoginStatus("error")
        }
    }


    return (
        <div className={"h-[calc(100vh-54px)] flex justify-center items-center"}>
            {isLoginClicked ? (
                <div className={"flex flex-col gap-6"}>
                    <h1 className={"text-[30px] text-center"}>В какую компанию войти?</h1>
                    <form className={"flex items-center justify-center w-full gap-4 relative"} autoComplete={"on"}>
                        <button className={"absolute right-[calc(100%+14px)] top-2.5"}
                            onClick={() => setIsLoginClicked(false)}>
                            <ArrowImg />
                        </button>
                        {companies?.map((item) => (
                            <div className={"bg-primary p-6 rounded-[35px] w-[320px]"} key={item.EmployeeId}>
                                <div className="w-[95px] mx-auto h-[95px] flex items-center justify-center rounded-[50%] border border-solid border-[#E5E7EA]">
                                    <span className="font-medium text-[54px] text-[#9B9FAD]">
                                        {item.CompanyName.split(' ')[0][0]}
                                    </span>
                                </div>
                                <div
                                    className={"flex items-center justify-between pl-6 py-4 pr-4 mt-5 h-[50px] rounded-[16px] border border-solid border-[#E5E7EA]"}>
                                    <h2 className={"text-lg text-[#9B9FAD]"}>{item.CompanyName}</h2>
                                    <SuccessImg className={"min-w-6 min-h-6 blue-fill"} />
                                </div>
                                <button
                                    className={"w-full flex justify-center items-center py-3 mt-2.5 h-[50px] rounded-primary bg-[#292933]"}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        LoginCompany(item)
                                    }}
                                >
                                    <p className={`text-lg font-medium text-primary`}>Войти</p>
                                </button>
                            </div>
                        ))}
                    </form>
                    <p className={"text-base text-center font-medium text-[#9B9FAD]"}>Вы всегда можете переключить
                        компанию в
                        Личном кабинете</p>
                </div>
            ) : (
                <div className={"w-[350px] flex flex-col gap-6"}>
                    <h1 className={"text-[30px] text-center"}>Войти в аккаунт</h1>
                    {isRestore ? (
                        <div className={"flex flex-col bg-primary gap-5 p-6 rounded-[35px]  relative"}>
                            <div className={"flex justify-center"}>
                                <h2 className={"text-[25px] text-center leading-7"}>Восстановление</h2>
                            </div>
                            <form className={"flex flex-col gap-2.5"} autoComplete={"on"} onSubmit={handleLogin}>
                                {isSubmitted ? (
                                    <>
                                        <button className={"absolute -left-12 top-6"}
                                            onClick={() => dispatch(updateRestoreState({
                                                field: "isSubmitted",
                                                value: false
                                            }))}>
                                            <ArrowImg />
                                        </button>
                                        <Input
                                            extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] text-blue !bg-primary first-letter-black`}
                                            placeholder="Логин"
                                            value={"@ivan_voznes"}
                                        />
                                        <Input
                                            extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary first-letter-black`}
                                            placeholder="Новый пароль"
                                            type={"password"}
                                            value={restorePassword}
                                            onChange={e => dispatch(updateRestoreState({
                                                field: "password",
                                                value: e.target.value
                                            }))}
                                        />
                                        <Input
                                            extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary first-letter-black`}
                                            placeholder="Повторите новый пароль"
                                            type={"password"}
                                            value={restoreRePassword}
                                            onChange={e => dispatch(updateRestoreState({
                                                field: "rePassword",
                                                value: e.target.value
                                            }))}
                                        />
                                        <div className={"flex flex-col items-center my-1"}>
                                            <span className={"flex items-center gap-2 w-[190px]"}>
                                                <p className={`text-xs font-medium text-[#787B86] ${restorePassword && "text-blue"}`}>6+</p>
                                                <p className={"text-xs text-[#787B86]"}>Не менее 6 символов</p>
                                            </span>
                                            <span className={"flex items-center gap-2 w-[190px]"}>
                                                <p className={`text-xs font-medium text-[#787B86] ${restorePassword && "text-blue"}`}>Ff</p>
                                                <p className={"text-xs text-[#787B86]"}>Строчные и прописные буквы</p>
                                            </span>
                                            <span className={"flex items-center gap-2 w-[190px]"}>
                                                <p className={`text-xs font-medium text-[#787B86] ${restorePassword && "text-blue"}`}>1#!</p>
                                                <p className={"text-xs text-[#787B86]"}>Цифры и другие символы</p>
                                            </span>
                                        </div>
                                        <button
                                            className={"transition w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                            disabled={!restorePassword || !restoreRePassword}
                                        >
                                            <p className={`text-lg font-medium text-primary ${!restorePassword || !restoreRePassword && "!text-[#9B9FAD]"}`}>Сохранить</p>
                                        </button>
                                        <button
                                            className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-[270px] absolute bottom-6"}
                                            onClick={() => navigate("/sign-up")}
                                        >
                                            <h3 className={`text-lg font-medium`}>Создать аккаунт</h3>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className={"absolute -left-12 top-6"}
                                            onClick={() => dispatch(updateLoginState({
                                                field: "isRestore",
                                                value: false
                                            }))}>
                                            <ArrowImg />
                                        </button>
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
                                            setter={(value) => dispatch(updateRestoreState({
                                                field: "withPhone",
                                                value: value as boolean
                                            }))}
                                        />
                                        {restoreWithPhone ? (
                                            <>
                                                <Input
                                                    extraClass={"!text-lg !font-medium h-[50px] rounded-[16px] text-center border border-solid border-[#E5E7EA] !bg-primary"}
                                                    placeholder={"+7 (___) ___ - __ -__"}
                                                    type={"phone"}
                                                    value={restorePhone}
                                                    onChange={e => dispatch(updateRestoreState({
                                                        field: "phone",
                                                        value: e.target.value
                                                    }))}
                                                />
                                                <Input
                                                    extraClass={"!text-lg !font-medium text-blue text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                                    placeholder={"Введите код из СМС"}
                                                    value={restoreSms}
                                                    onChange={e => dispatch(updateRestoreState({
                                                        field: "sms",
                                                        value: e.target.value
                                                    }))}
                                                />
                                                <button
                                                    className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                                    disabled={!!restoreSms}>
                                                    <p className={`text-lg font-medium text-primary ${restoreSms && "!text-[#9B9FAD]"}`}>{restoreSms ? "Отправить повторно 0:59" : "Получить код"}</p>
                                                </button>
                                                <button
                                                    className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                                    disabled={!isRestoreLoginReady}
                                                    onClick={() => {
                                                        dispatch(updateRestoreState({
                                                            field: "isSubmitted",
                                                            value: true
                                                        }))
                                                    }}
                                                >
                                                    <p className={`text-lg font-medium text-primary ${!isRestoreLoginReady && "!text-[#9B9FAD]"}`}>Подтвердить</p>
                                                </button>
                                                {restorePhone ? (
                                                    restoreSms ? (
                                                        <p className={"text-center text-[15px] text-[#9B9FAD] px-7"}>Далее
                                                            вам
                                                            будет предложено подключить ID к компании</p>
                                                    ) : (
                                                        <p className={"text-center text-[15px] text-[#FF64A3] px-7"}>Аккаунта,
                                                            привязанного к
                                                            этому номеру не найдено</p>
                                                    )
                                                ) : null}
                                                <button
                                                    className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center"}
                                                    onClick={() => navigate("/sign-up")}
                                                >
                                                    <h3 className={`text-lg font-medium`}>Создать аккаунт</h3>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Input
                                                    extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary first-letter-black`}
                                                    placeholder="Почта"
                                                    type={"email"}
                                                    value={restoreEmail}
                                                    onChange={e => dispatch(updateRestoreState({
                                                        field: "email",
                                                        value: e.target.value
                                                    }))}
                                                />
                                                <Input
                                                    extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary first-letter-black`}
                                                    placeholder="Введите код из СМС"
                                                    value={restoreSms}
                                                    onChange={e => dispatch(updateRestoreState({
                                                        field: "sms",
                                                        value: e.target.value
                                                    }))}
                                                />
                                                <button
                                                    className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                                    disabled={!!restoreSms}>
                                                    <p className={`text-lg font-medium text-primary ${restoreSms && "!text-[#9B9FAD]"}`}>{restoreSms ? "Отправить повторно 0:59" : "Получить код"}</p>
                                                </button>
                                                <button
                                                    className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                                    disabled={!isRestoreLoginReady}
                                                    onClick={() => {
                                                        dispatch(updateRestoreState({
                                                            field: "isSubmitted",
                                                            value: true
                                                        }))
                                                    }}
                                                >
                                                    <p className={`text-lg font-medium text-primary ${!isRestoreLoginReady && "!text-[#9B9FAD]"}`}>Подтвердить</p>
                                                </button>
                                                <button
                                                    className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center"}
                                                    onClick={() => navigate("/sign-up")}
                                                >
                                                    <h3 className={`text-lg font-medium`}>Создать аккаунт</h3>
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </form>
                        </div>
                    ) : (
                        <div className={"flex flex-col bg-primary gap-5 p-6 rounded-[35px] relative"}>
                            <div className={"flex justify-center"}>
                                <LogoIdImg />
                            </div>
                            <form className={"flex flex-col"} autoComplete={"on"}
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    if (!withPhone) {
                                        handleInputChange("phone", phone)                                        
                                    } else {
                                        handleInputChange("login", login)                                        
                                    }
                                }}>
                                <Switch
                                    extraClass={"w-full h-[50px] !bg-[#FAFAFA] border border-solid border-[#E5E7EA]"}
                                    extraChildClass={"py-2.5 h-full w-[50%]"}
                                    selectedBg={"#ECEEF1"}
                                    unselectedBg={"#FAFAFA"}
                                    firstChild={<p
                                        className={`font-medium text-base ${withPhone ? "text-[#9B9FAD]" : "text-[#121212]"}`}>Логин</p>
                                    }
                                    secondChild={
                                        <p
                                            className={`font-medium text-base ${withPhone ? "text-[#121212]" : "text-[#9B9FAD]"}`}>Телефон</p>
                                    }
                                    isSelected={withPhone}
                                    setter={(value) => dispatch(updateLoginState({
                                        field: "withPhone",
                                        value: value as boolean
                                    }))}
                                />
                                {withPhone ? (
                                    <>
                                        <Input
                                            extraClass={`!text-lg !font-medium mt-2.5 h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] ${loginStatus === "error" ? "#FF64A3" : "text-blue"} !bg-primary first-letter-black`}
                                            placeholder="Логин"
                                            value={login ? `@${login}` : ""}
                                            onChange={e => dispatch(updateLoginState({ field:"login", value: e.target.value } as any))}
                                            autoComplete={"on"}
                                        />
                                        <Input
                                            extraClass={`!text-lg !font-medium mt-2.5 h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary first-letter-black`}
                                            placeholder="Пароль"
                                            type={"password"}
                                            value={password}
                                            onChange={e => dispatch(updateLoginState({
                                                field: "password",
                                                value: e.target.value
                                            }))}
                                            autoComplete={"on"}
                                        />
                                        {loginStatus === "error" ? (
                                            <p className={"text-center mt-2.5 text-[15px] text-[#FF64A3] px-7"}>Аккаунта,
                                                с
                                                таким
                                                ID не найдено</p>
                                        ) : <div className={"flex flex-col mt-2.5 items-center my-1"}>
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
                                        }
                                        <button
                                            className={"w-full mt-2.5 flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                            disabled={!isLoginReady}
                                            type={"submit"}
                                        >
                                            <p className={`text-lg font-medium text-primary ${!isLoginReady && "!text-[#9B9FAD]"}`}>Войти</p>
                                        </button>
                                        <button
                                            className={"mt-2.5"}
                                            onClick={() => dispatch(updateLoginState({
                                                field: "isRestore",
                                                value: true
                                            }))}
                                            type={"button"}
                                        >
                                            <p className={"text-[#9B9FAD] text-base font-medium leading-none"}>Восстановить
                                                пароль</p>
                                        </button>
                                        <button
                                            className={"mt-2.5 border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center"}
                                            onClick={() => navigate("/sign-up")}
                                            type={"button"}
                                        >
                                            <h3 className={`text-lg font-medium`}>Создать аккаунт</h3>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            extraClass={"!text-lg !font-medium mt-2.5 h-[50px] rounded-[16px] text-center border border-solid border-[#E5E7EA] !bg-primary"}
                                            placeholder={"+7 (___) ___ - __ -__"}
                                            type={"phone"}
                                            value={phone}
                                            onChange={e => dispatch(updateLoginState({ field: "phone", value: e.target.value } as any))}
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
                                            extraClass={"!text-lg !font-medium mt-2.5 text-blue text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                            placeholder={"Введите код из СМС"}
                                            value={sms}
                                            onChange={e => dispatch(updateLoginState({
                                                field: "sms",
                                                value: e.target.value
                                            }))}
                                        />
                                        <button
                                            className={"w-full flex justify-center mt-2.5 items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                            type={"button"}
                                            disabled={!phone || startTimer}
                                            onClick={handleCaptchaAndSMS}
                                        >
                                            <p className={`text-lg font-medium ${!phone || startTimer ? "!text-[#9B9FAD]" : "text-primary"}`}>
                                                {startTimer && second
                                                    ? `Отправить повторно ${second === 60 ? "01:00" : `0:${String(second).padStart(2, "0")}`}`
                                                    : "Получить код"}
                                            </p>
                                        </button>
                                        {phoneStatus === "error" ? (
                                            <p className={"text-center mt-2.5 text-[15px] text-[#FF64A3] px-7"}>Аккаунта,
                                                привязанного к
                                                этому номеру не найдено</p>
                                        ) : null}
                                        <button
                                            className={"w-full flex mt-2.5 justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                            disabled={!isLoginReady}
                                            type={"submit"}
                                        >
                                            <p className={`text-lg font-medium text-primary ${!isLoginReady && "!text-[#9B9FAD]"}`}>Войти</p>
                                        </button>
                                    </>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};

export { LoginUser };