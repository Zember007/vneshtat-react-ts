import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const useConfirmToken = (token: string) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        if(!token){
            navigate("/try")
            return;
        }

        const checkConfirmToken = async () => {
            const res = await fetch(import.meta.env.VITE_API_URL + `/auth/sign_up/check_company_registration?Token=${token}`);
            const data = await res.json();
            console.log(data);
            if (data.status === "success") {
                
                localStorage.clear();
                setStatus(data.data.Status);
                setCompanyName(data.data.CompanyName);
                localStorage.setItem("ConfirmToken", token);
                localStorage.setItem("Status", data.data.Status)
                if (data.data.Status === "in_progress" || data.data.Status === "completed") {
                    navigate("/sign-up");
                }
            } else {
                alert(`Возникла ошибка: ${data.message}. Повторите позже или повторите заявку`);
                navigate("/try");
            }
        }

        checkConfirmToken();
    }, []);

    return {status, companyName}
};

export {useConfirmToken};