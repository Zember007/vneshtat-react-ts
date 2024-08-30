import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {Input, Popup, Switch} from "@/shared/UI";
import CrossImg from "@/assets/icons/cross.svg?react";
import {setIsCeo, setIsOpen, updateInfo} from "../model/promo.store";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const PromoPopups = () => {
    const isCeo = useSelector((store: RootState) => store.promo.isCeo);
    const {fullname, companyName, travelFrequency, phone, email} = useSelector((store: RootState) => store.promo.info);
    const [status, setStatus] = useState<"success" | "error" | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resetInformation = () => {
        dispatch(setIsCeo(true));
        dispatch(updateInfo({field: "fullname", value: ""}))
        dispatch(updateInfo({field: "companyName", value: ""}))
        dispatch(updateInfo({field: "travelFrequency", value: ""}))
        dispatch(updateInfo({field: "phone", value: ""}))
        dispatch(updateInfo({field: "email", value: ""}))
    }

    const createConsultingProposal = async () => {
        const formData = new FormData();
        formData.append("FullName", fullname);
        formData.append("IsCEO", isCeo ? "1" : "0");
        formData.append("CompanyName", companyName);
        formData.append("TravelFrequency", travelFrequency);
        formData.append("PhoneNumber", phone);
        formData.append("Email", email);

        const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_up/create_consultation_proposal", {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        });
        const data = await res.json();
        if(!res.ok || !(data.status === "success")) setStatus("error")
        if (data.status === "success") {
            setStatus("success")
        }

        resetInformation();
    }

    const handleClose = () => {
        dispatch(setIsOpen(false))
        navigate("/promo")
    }

    return (
        <Popup isCentered withShadow extraClass={"h-full flex items-center gap-[18px] py-24"}>
            {status === null ? (
                <>
                    <div className={"h-[542px] pt-5 px-9 pb-9 bg-primary flex flex-col rounded-[35px] w-[440px] gap-5"}>
                        <div className={"flex flex-col gap-2.5"}>
                            <div className={"flex items-center justify-between"}>
                                <h1 className={"text-2xl text-[#787B86]"}>Знакомство</h1>
                                <button onClick={handleClose}>
                                    <CrossImg className={"grey-fill min-h-6 min-w-6"}/>
                                </button>
                            </div>
                            <p className={"text-sm text-[#787B86]"}>Расскажите пару слов о себе и мы позвоним вам в
                                течение 15 минут.</p>
                        </div>
                        <div>
                            <Switch
                                extraClass={"w-full h-[42px] !bg-[#F5F5F5]"}
                                extraChildClass={"py-2 h-full px-7 w-[50%]"}
                                selectedBg={"#FBFBFB"}
                                unselectedBg={"#F5F5F5"}
                                firstChild={<p className={`${isCeo ? "text-[#787B86]" : "text-[#9B9FAD]"}`}>Я
                                    руководитель</p>}
                                secondChild={<p className={`${isCeo ? "text-[#9B9FAD]" : "text-[#787B86]"}`}>Я не
                                    руководитель</p>}
                                isSelected={isCeo}
                                setter={(val) => dispatch(setIsCeo(val))}
                            />
                        </div>
                        <div className={"flex flex-col gap-2.5"}>
                            <label className="relative">
                                <Input
                                    extraClass={"w-full bg-[#F5F5F5] text-[#9B9AD] font-medium px-6 py-3 placeholder:text-md"}
                                    placeholder="Как к вам обращаться?"
                                    value={fullname}
                                    onChange={(e) => dispatch(updateInfo({field: "fullname", value: e.target.value}))}
                                />
                                {!fullname && (
                                    <span className="absolute right-6 top-3 text-[#9B9FAD] text-sm font-medium">
                                        Иван
                                    </span>
                                )}
                            </label>
                            <label className="relative">
                                <Input
                                    extraClass={"w-full bg-[#F5F5F5] text-[#9B9AD] font-medium px-6 py-3 placeholder:text-md"}
                                    placeholder={"Название компании"}
                                    value={companyName}
                                    onChange={(e) => dispatch(updateInfo({
                                        field: "companyName",
                                        value: e.target.value
                                    }))}
                                />
                                {!companyName && (
                                    <span className="absolute right-6 top-3 text-[#9B9FAD] text-sm font-medium">
                                        Альфа
                                    </span>
                                )}
                            </label>
                            <label className="relative">
                                <Input
                                    extraClass={"w-full bg-[#F5F5F5] text-[#9B9AD] font-medium px-6 py-3 placeholder:text-md"}
                                    placeholder={"Кол-во командировок"}
                                    value={travelFrequency}
                                    onChange={(e) => dispatch(updateInfo({
                                        field: "travelFrequency",
                                        value: e.target.value
                                    }))}
                                />
                                {!travelFrequency && (
                                    <span className="absolute right-6 top-3 text-[#9B9FAD] text-sm font-medium">
                                        Более 100 в месяц
                                    </span>
                                )}
                            </label>
                            <label className="relative">
                                <Input
                                    extraClass={"w-full bg-[#F5F5F5] text-[#9B9AD] font-medium py-3 !pl-3 placeholder:text-md"}
                                    placeholder={"Номер телефона"}
                                    type={"phone"}
                                    value={phone}
                                    onChange={(e) => dispatch(updateInfo({field: "phone", value: e.target.value}))}
                                />
                                {!phone && (
                                    <span className="absolute right-6 top-3 text-[#9B9FAD] text-sm font-medium">
                                        +7 (___) ___ - __ -__
                                    </span>
                                )}
                            </label>
                            <label className="relative">
                                <Input
                                    extraClass={"w-full bg-[#F5F5F5] text-[#9B9AD] font-medium px-6 py-3 placeholder:text-md"}
                                    type={"email"}
                                    placeholder={"Email"}
                                    value={email}
                                    onChange={(e) => dispatch(updateInfo({field: "email", value: e.target.value}))}
                                />
                                {!email && (
                                    <span className="absolute right-6 top-3 text-[#9B9FAD] text-sm font-medium">
                                        johndoe@gmail.com
                                    </span>
                                )}
                            </label>
                        </div>
                        <button
                            className={"w-full flex justify-center items-center py-3 h-[42px] rounded-primary bg-black"}
                            onClick={createConsultingProposal}>
                            <p className={"text-sm text-primary"}>Отправить форму</p>
                        </button>
                    </div>
                    <div className={"h-[542px] pt-5 px-9 pb-9 bg-primary flex flex-col w-[340px] rounded-[35px]"}>
                        <h1 className={"text-2xl text-[#787B86]"}>Чего ожидать от звонка?</h1>
                        <p className={"text-sm text-[#787B86] mt-[14px]"}>Наш менеджер ответит на все ваши вопросы по
                            работе сервиса.</p>
                        <ul className={"list-disc flex flex-col gap-0.5 ml-5 mt-1"}>
                            <li className={"text-sm font-normal text-[#787B86]"}>расскажет о доступных тарифах и
                                подберёт оптимальный для вас
                            </li>
                            <li className={"text-sm font-normal text-[#787B86]"}>если необходимо, поможет подготовить
                                презентацию для начальства
                            </li>
                            <li className={"text-sm font-normal text-[#787B86]"}>предоставит доступ к демо-версии
                                сервиса.
                            </li>
                        </ul>
                        <div className={"rounded-primary bg-secondary mt-[25px] h-full w-full"}/>
                    </div>
                </>
            ) : status === "success" ? (
                <>
                    <div
                        className={"h-[542px] pt-7 px-7 pb-9 bg-primary flex flex-col rounded-[35px] w-[440px] justify-between"}>
                        <div className={"flex justify-end"}>
                            <button onClick={handleClose}>
                                <CrossImg className={"grey-fill min-h-6 min-w-6"}/>
                            </button>
                        </div>
                        <div className={"flex flex-col gap-[14px] px-2"}>
                            <h1 className={"text-2xl text-[#007BFB]"}>Форма отправлена!</h1>
                            <p className={"text-sm text-[#787B86]"}>В течение 15 минут наш менеджер позвонит вам,
                                ответит на все ваши вопросы, подберет тариф и предоставит демо-доступ к сервису.</p>
                        </div>
                        <div className={"flex justify-end px-2"}>
                            <button
                                className={"flex justify-center items-center py-3 px-10 h-[42px] rounded-primary bg-[#F5F5F5]"}
                                onClick={handleClose}>
                                <p className={"text-sm text-[#787B86]"}>Отменить</p>
                            </button>
                        </div>
                    </div>
                    <div className={"h-[542px] pt-5 px-9 pb-9 bg-primary flex flex-col w-[340px] rounded-[35px]"}>
                        <h1 className={"text-2xl text-[#787B86]"}>Чтобы скоротать ожидание</h1>
                        <p className={"text-sm text-[#787B86] mt-[14px]"}>Если вам предстоит согласовывать с
                            руководством подключение вашей компании к Внештату , мы готовы с этим помочь. Прочитайте
                            статью о том, как именно мы можем это сделать.</p>
                        <div className={"rounded-primary bg-secondary mt-[25px] h-full w-full"}/>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={"h-[542px] pt-7 px-7 pb-9 bg-primary flex flex-col rounded-[35px] w-[440px] justify-between"}>
                        <div className={"flex justify-end"}>
                            <button onClick={handleClose}>
                                <CrossImg className={"grey-fill min-h-6 min-w-6"}/>
                            </button>
                        </div>
                        <div className={"flex flex-col gap-[14px] px-2"}>
                            <h1 className={"text-2xl text-[#FF64A3]"}>Произошла ошибка!</h1>
                            <p className={"text-sm text-[#787B86]"}>Из-за технической неполадки форма не была
                                отправлена. Пожалуйста, перезагрузите страницу и заполните ее снова.</p>
                        </div>
                        <div className={"flex justify-end px-2"}>
                            <button
                                className={"flex justify-center items-center py-3 px-10 h-[42px] rounded-primary bg-[#F5F5F5]"}
                                onClick={handleClose}>
                                <p className={"text-sm text-[#787B86]"}>Отменить</p>
                            </button>
                        </div>
                    </div>
                    <div className={"h-[542px] pt-5 px-9 pb-9 bg-primary flex flex-col w-[340px] rounded-[35px]"}>
                        <div className={"rounded-primary bg-secondary mt-3 h-[10%] w-full"}/>
                        <div className={"rounded-primary bg-secondary mt-3 h-[20%] w-full"}/>
                        <div className={"rounded-primary bg-secondary mt-3 h-full w-full"}/>
                    </div>
                </>
            )}
        </Popup>
    )
};

export {PromoPopups};
