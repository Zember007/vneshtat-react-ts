import {useDispatch, useSelector} from "react-redux";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import contractImg from "@/assets/icons/contract.png";
import {RootState} from "@/app/config/store";
import {ChangeEvent} from "react";
import {
    setPage,
    updateCompanyState,
    updateUploadedFile,
} from "@/widgets/registration/registration-company/model/registration-company.store";
import {Input} from "@/shared/UI";

const RegistrationCompanyFirst = () => {
    const {isCompanyReady} = useSelector((state: RootState) => state.registrationCompany);
    const {
        legalName,
        legalAddress,
        shortName,
        kpp,
        inn,
        uploadedFile
    } = useSelector((state: RootState) => state.registrationCompany.company);
    const dispatch = useDispatch();

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            dispatch(updateUploadedFile(file));
        }
    };

    const handleRegistration = async () => {
        const formdata = new FormData();
        formdata.append("LegalName", legalName);
        formdata.append("ShortName", shortName);
        formdata.append("Inn", inn);
        formdata.append("Kpp", kpp);
        formdata.append("LegalAddress", legalAddress);
        formdata.append("ContractFile", uploadedFile!, "mock.pdf");
        const token = localStorage.getItem("ConfirmToken");
        if (token) {
            formdata.append("Token", token);
        }

        const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_up/complete_company_registration", {
            method: "PATCH",
            body: formdata
        })
        const data = await res.json();
        if(data.status === "success"){
            dispatch(setPage(2))
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

    return (
        <div className={"flex flex-col items-center justify-center gap-5 h-[calc(100%-110px)]"}>
            <div className={"flex items-center gap-4"}>
                <div className={"flex flex-col gap-4 w-[320px] h-[620px]"}>
                    <div className={"p-6 bg-primary rounded-[35px]"}>
                        <div
                            className={"flex items-center justify-between pl-6 py-4 pr-4 rounded-[16px] border border-solid border-[#E5E7EA]"}>
                            <h2 className={"text-lg text-[#9B9FAD]"}>{localStorage.getItem("RegistrationCompanyName")}</h2>
                            <SuccessImg className={"min-w-6 min-h-6 grey-fill"}/>
                        </div>
                    </div>
                    <div className={"p-6 bg-primary rounded-[35px] h-full"}>
                        <h2 className={"text-lg text-center"}>Данные компании</h2>
                        <div className={"flex flex-col gap-2.5 mt-4"}>
                            <Input
                                extraClass={"h-[50px] text-center rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                placeholder={"Юридическое название"}
                                value={legalName}
                                onChange={e => dispatch(updateCompanyState({
                                    field: "legalName",
                                    value: e.target.value
                                }))}
                            />
                            <Input
                                extraClass={"h-[50px] text-center rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                placeholder={"Короткое название"}
                                value={shortName}
                                onChange={e => dispatch(updateCompanyState({
                                    field: "shortName",
                                    value: e.target.value
                                }))}
                            />
                            <Input
                                extraClass={"h-[50px] text-center rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                placeholder={"Инн"}
                                type={"number"}
                                maxLength={12}
                                value={inn}
                                onChange={e => dispatch(updateCompanyState({field: "inn", value: e.target.value}))}
                            />
                            <Input
                                extraClass={"h-[50px] text-center rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                placeholder={"Кпп"}
                                type={"number"}
                                maxLength={9}
                                value={kpp}
                                onChange={e => dispatch(updateCompanyState({field: "kpp", value: e.target.value}))}
                            />
                            <Input
                                extraClass={"h-[50px] text-center rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                                placeholder={"Юридический адрес"}
                                value={legalAddress}
                                onChange={e => dispatch(updateCompanyState({
                                    field: "legalAddress",
                                    value: e.target.value
                                }))}
                            />
                        </div>
                    </div>
                </div>
                <div className={"w-[320px] h-[620px] p-6 bg-primary rounded-[35px] flex flex-col justify-between"}>
                    <div>
                        <div
                            className={`${isCompanyReady ? "p-6" : "px-5 py-16"} border border-solid border-[#ECEEF1] rounded-[16px]`}>
                            {isCompanyReady ? (
                                <img src={contractImg} alt="contract" className={"rounded-secondary w-full"}/>
                            ) : (
                                <p className={"text-[15px] font-medium text-[#9B9FAD]"}>Данные компании заносятся в
                                    договор автоматически. Вам останется только подписать его.</p>
                            )}
                        </div>
                        <button
                            className={"transition bg-black py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-full mt-4 disabled:cursor-not-allowed disabled:bg-secondary"}
                            disabled={!isCompanyReady || !!uploadedFile}
                        >
                            <p className={`text-lg font-medium ${isCompanyReady && !uploadedFile ? "text-primary" : "text-[#787B86]"}`}>Скачать
                                договор</p>
                        </button>
                        <button
                            className={"transition bg-secondary py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-full mt-2.5 disabled:cursor-not-allowed"}
                            disabled={!isCompanyReady || !!uploadedFile}
                            onClick={() => document.getElementById("fileInput")?.click()}>
                            <p className={`text-lg font-medium ${isCompanyReady && !uploadedFile ? "text-[#787B86]" : "text-[#9B9FAD]"}`}>Загрузить
                                договор</p>
                        </button>
                        {isCompanyReady && uploadedFile && (
                            <button
                                className={"transition py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-full mt-2.5 border border-solid border-[#E5E7EA] bg-primary"}
                                disabled={!isCompanyReady}>
                                <p className={`text-base whitespace-nowrap overflow-hidden text-ellipsis font-medium text-[#9B9FAD]`}>{uploadedFile.name}</p>
                            </button>
                        )}
                        <input
                            id="fileInput"
                            type="file"
                            accept="application/pdf"
                            style={{display: "none"}}
                            onChange={handleFileUpload}
                        />
                    </div>
                    <button
                        className={"transition bg-black py-4 px-9 rounded-[16px] h-[50px] flex items-center justify-center w-full mt-2.5 disabled:cursor-not-allowed disabled:bg-secondary"}
                        disabled={!isCompanyReady || !uploadedFile}
                        onClick={() => handleRegistration()}
                    >
                        <h3 className={`text-lg font-medium ${isCompanyReady && uploadedFile ? "text-primary" : "text-[#787B86]"}`}>Зарегистрировать</h3>
                    </button>
                </div>
            </div>
        </div>
    );
};

export {RegistrationCompanyFirst};