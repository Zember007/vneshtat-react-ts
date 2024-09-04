import {RegistrationCompany} from "@/widgets/registration/registration-company";
import VneshtatImg from "@/assets/icons/vneshtat.svg?react";
import {useConfirmToken} from "@/shared/hooks/use-confirm-token";
import {useEffect} from "react";
import {setPage, setProgress} from "@/widgets/registration/registration-company/model/registration-company.store";
import {useDispatch} from "react-redux";

const Registration = () => {
    const {status, companyName} = useConfirmToken(localStorage.getItem("ConfirmToken") || "");
    localStorage.setItem("Status", status);
    localStorage.setItem("RegistrationCompanyName", companyName);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "completed") {
            dispatch(setProgress(2));
            dispatch(setPage(2));
        }
    }, [status])

    return (
        <div className={"px-[100px] h-[100vh]"}>
            <header className={"py-[30px] w-full flex justify-center"}>
                <VneshtatImg className={"grey-fill"}/>
            </header>
            <RegistrationCompany/>
            <footer className={"flex items-center justify-between"}>
                <p className={"text-base text-[#787B86]"}>Внештат - часть за пределами целого</p>
                <span className={"flex gap-4"}>
                    <p className={"text-base text-[#787B86]"}>Ru</p>
                    <p className={"text-base text-[#787B86]"}>Справка и поддержка</p>
                </span>
            </footer>
        </div>
    )
};

export default Registration;