import { updateInfoState } from "@/widgets/registration/registration-company/model/registration-company.store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const useConfirmToken = (token: string) => {
    const navigate = useNavigate();
    const location = useLocation().pathname
    const [status, setStatus] = useState("");
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (!token) {
            navigate("/try")
            return;
        }

        let url = ''
        
        
        if (location.includes('/connect') || localStorage.getItem('connect_employee') === 'true') {

            localStorage.setItem('connect_employee', 'true')
            url = `/auth/sign_up/check_employee_registration?Token=${token}`
        } else {
            localStorage.setItem('connect_employee', 'false')
            url = `/auth/sign_up/check_company_registration?Token=${token}`
        }

        const connect = localStorage.getItem('connect_employee')


        const checkConfirmToken = async () => {
            const res = await fetch(import.meta.env.VITE_API_URL + url);
            const data = await res.json();
            console.log(data);
            if (data.status === "success") {
                setStatus(data.data.Status);
                localStorage.clear();

                localStorage.setItem('connect_employee', connect ?? '')

                if (data.data.CompanyName) {
                    setCompanyName(data.data.CompanyName);
                }
                if (data.data.Surname) {

                    dispatch(updateInfoState({
                        field: "surname",
                        value: data.data.Surname
                    }))
                }
                if (data.data.Name) {
                    dispatch(updateInfoState({
                        field: "name",
                        value: data.data.Name
                    }))
                }
                if (data.data.Middlename) {
                    dispatch(updateInfoState({
                        field: "middlename",
                        value: data.data.Middlename
                    }))
                }
                if (data.data.BirthDate) {
                    dispatch(updateInfoState({
                        field: "birthday",
                        value: data.data.BirthDate.split('-').reverse().join('-')
                    }))
                }
                localStorage.setItem("ConfirmToken", token);
                navigate("/sign-up");

            } else {
                alert(`Возникла ошибка: ${data.message}. Повторите позже или повторите заявку`);
                navigate("/try");
            }
        }

        checkConfirmToken();
    }, []);

    return { status, companyName }
};

export { useConfirmToken };