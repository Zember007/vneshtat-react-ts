import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const useConfirmToken = (token: string) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        if(!token){
            navigate("/promo")
            return;
        }

        const checkConfirmToken = async () => {
            const res = await fetch(import.meta.env.VITE_API_URL + `/auth/sign_up/check_company_registration?Token=${token}`);
            const data = await res.json();
            if (data.status === "success") {
                setStatus(data.data.Status);
                setCompanyName(data.data.CompanyName);
                localStorage.setItem("confirmToken", token);
                if (data.data.Status === "in_progress") navigate("/sign-up");
                if (data.data.Status === "completed") navigate("/sign-in");
            } else {
                alert(`Возникла ошибка: ${data.message}. Повторите позже или повторите заявку`);
                navigate("/promo");
            }
        }

        checkConfirmToken();
    }, []);

    return {status, companyName}
};

export {useConfirmToken};