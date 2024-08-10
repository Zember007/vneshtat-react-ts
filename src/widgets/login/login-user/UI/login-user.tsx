import UAParser from 'ua-parser-js';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {Input, Switch} from "@/shared/UI";
import LogoIdImg from "@/assets/icons/logo-id.svg?react";
import AlphaImg from "@/assets/icons/alpha.svg?react";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import ArrowImg from "@/assets/icons/arrow-long.svg?react";
import {useState} from "react";
import {updateLoginState, updateRestoreState} from "../model/login.store";
import {setAccessToken, setRefreshToken} from "@/shared/utils";
import {useNavigate} from "react-router-dom";
import {setCompanies, setUser} from "@/app/model/user.store";
import {getUser, getUserCompanies} from "@/shared/utils/methods";

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
    const {companies} = useSelector((state: RootState) => state.user)
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogin() {
        const formdata = new FormData();
        formdata.append("Username", login);
        formdata.append("Password", password);
        const parser = new UAParser();
        const result = parser.getResult();
        const deviceName = result.device.model || result.os.name || "Unknown";
        const browserName = result.browser.name || "Unknown";
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
                const user = await getUser();
                dispatch(setUser(user));

                // get companies
                const companiesData = await getUserCompanies();
                if (!companiesData.length) navigate("/")
                else dispatch(setCompanies(companiesData));
            }
        } catch (error) {
            console.error("Error fetching tokens:", error);
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
                            <ArrowImg/>
                        </button>
                        {companies?.map((item) => (
                            <div className={"bg-primary p-6 rounded-[35px] w-[320px]"} key={item.EmployeeId}>
                                <div className={"flex justify-center items-center"}>
                                    <AlphaImg/>
                                </div>
                                <div
                                    className={"flex items-center justify-between pl-6 py-4 pr-4 mt-5 h-[50px] rounded-[16px] border border-solid border-[#E5E7EA]"}>
                                    <h2 className={"text-lg text-[#9B9FAD]"}>{item.CompanyName}</h2>
                                    <SuccessImg className={"min-w-6 min-h-6 blue-fill"}/>
                                </div>
                                <button
                                    className={"w-full flex justify-center items-center py-3 mt-2.5 h-[50px] rounded-primary bg-[#292933]"}
                                    onClick={() => {
                                        localStorage.setItem("EmployeeId", item.EmployeeId.toString());
                                        navigate("/")
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
                <div className={"w-[320px] flex flex-col gap-6"}>
                    <h1 className={"text-[30px] text-center"}>Войти в аккаунт</h1>
                    {isRestore ? (
                        <div className={"flex flex-col bg-primary gap-5 p-6 rounded-[35px] h-[520px] relative"}>
                            <div className={"flex justify-center"}>
                                <h2 className={"text-[25px] text-center leading-7"}>Восстановление</h2>
                            </div>
                            <form className={"flex flex-col gap-2.5"} autoComplete={"on"}>
                                {isSubmitted ? (
                                    <>
                                        <button className={"absolute -left-12 top-6"}
                                                onClick={() => dispatch(updateRestoreState({
                                                    field: "isSubmitted",
                                                    value: false
                                                }))}>
                                            <ArrowImg/>
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
                                            <ArrowImg/>
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
                                                    className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-[270px] absolute bottom-6"}
                                                    onClick={() => navigate("/sign-up")}
                                                >
                                                    <h3 className={`text-lg font-medium`}>Создать аккаунт</h3>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Input
                                                    extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] text-blue !bg-primary first-letter-black`}
                                                    placeholder="Почта"
                                                    value={restoreEmail ? `@${restoreEmail}` : ""}
                                                    onChange={e => dispatch(updateRestoreState({
                                                        field: "email",
                                                        value: e.target.value.startsWith('@') ? e.target.value.slice(1) : e.target.value
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
                                                    className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-[270px] absolute bottom-6"}
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
                        <div className={"flex flex-col bg-primary gap-5 p-6 rounded-[35px] h-[520px] relative"}>
                            <div className={"flex justify-center"}>
                                <LogoIdImg/>
                            </div>
                            <form className={"flex flex-col gap-2.5"} autoComplete={"on"}>
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
                                    setter={(value) => dispatch(updateLoginState({
                                        field: "withPhone",
                                        value: value as boolean
                                    }))}
                                />
                                {withPhone ? (
                                    <>
                                        <Input
                                            extraClass={"!text-lg !font-medium h-[50px] rounded-[16px] text-center border border-solid border-[#E5E7EA] !bg-primary"}
                                            placeholder={"+7 (___) ___ - __ -__"}
                                            type={"phone"}
                                            value={phone}
                                            onChange={e => dispatch(updateLoginState({
                                                field: "phone",
                                                value: e.target.value
                                            }))}
                                        />
                                        <Input
                                            extraClass={"!text-lg !font-medium text-blue text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                            placeholder={"Введите код из СМС"}
                                            value={sms}
                                            onChange={e => dispatch(updateLoginState({
                                                field: "sms",
                                                value: e.target.value
                                            }))}
                                        />
                                        <button
                                            className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                            disabled={!!sms}>
                                            <p className={`text-lg font-medium text-primary ${sms && "!text-[#9B9FAD]"}`}>{sms ? "Отправить повторно 0:59" : "Получить код"}</p>
                                        </button>
                                        <button
                                            className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                            disabled={!isLoginReady}
                                            onClick={() => {
                                                setIsLoginClicked(true);
                                                handleLogin();
                                            }}
                                        >
                                            <p className={`text-lg font-medium text-primary ${!isLoginReady && "!text-[#9B9FAD]"}`}>Войти</p>
                                        </button>
                                        {phone ? (
                                            <p className={"text-center text-[15px] text-[#FF64A3] px-7"}>Аккаунта,
                                                привязанного к
                                                этому номеру не найдено</p>
                                        ) : null}
                                        <button
                                            className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-[270px] absolute bottom-6"}
                                            onClick={() => navigate("/sign-up")}
                                        >
                                            <h3 className={`text-lg font-medium`}>Создать аккаунт</h3>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] text-blue !bg-primary first-letter-black`}
                                            placeholder="Логин"
                                            value={login ? `@${login}` : ""}
                                            onChange={e => dispatch(updateLoginState({
                                                field: "login",
                                                value: e.target.value.startsWith('@') ? e.target.value.slice(1) : e.target.value
                                            }))}
                                            autoComplete={"on"}
                                        />
                                        <Input
                                            extraClass={`!text-lg !font-medium h-[50px] text-center w-full rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary first-letter-black`}
                                            placeholder="Пароль"
                                            type={"password"}
                                            value={password}
                                            onChange={e => dispatch(updateLoginState({
                                                field: "password",
                                                value: e.target.value
                                            }))}
                                            autoComplete={"on"}
                                        />
                                        {login ? (
                                            <p className={"text-center text-[15px] text-[#FF64A3] px-7"}>Аккаунта, с
                                                таким
                                                ID не найдено</p>
                                        ) : <div className={"flex flex-col items-center my-1"}>
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
                                        </div>}
                                        <button
                                            className={"w-full flex justify-center items-center py-3 h-[50px] rounded-primary bg-[#292933] disabled:bg-secondary"}
                                            disabled={!isLoginReady}
                                            onClick={() => {
                                                setIsLoginClicked(true);
                                                handleLogin();
                                            }}
                                        >
                                            <p className={`text-lg font-medium text-primary ${!isLoginReady && "!text-[#9B9FAD]"}`}>Войти</p>
                                        </button>
                                        <button
                                            onClick={() => dispatch(updateLoginState({
                                                field: "isRestore",
                                                value: true
                                            }))}>
                                            <p className={"text-[#9B9FAD] text-base font-medium leading-none"}>Восстановить
                                                пароль</p>
                                        </button>
                                        <button
                                            className={"transition border border-solid border-[#E5E7EA] bg-primary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-[270px] absolute bottom-6"}
                                            onClick={() => navigate("/sign-up")}
                                        >
                                            <h3 className={`text-lg font-medium`}>Создать аккаунт</h3>
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

export {LoginUser};