import "./styles/index.css";
import {Layout} from "@/app/config/routes/layout";
import BasicLayout from "@/app/layouts/basic-layout";
import {useLocation, useNavigate} from "react-router-dom";
import {useVerifyToken} from "@/shared/hooks/use-verify-token";
import {useEffect} from "react";
import {getUser, getUserCompanies, getUserOnline} from "@/shared/utils/methods";
import {useDispatch} from "react-redux";
import {setCompanies, setIsOnline, setUser} from "@/app/model/user.store";
import {publicRoutes} from "@/shared/utils";

function App() {
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isAuthorized} = useVerifyToken();

    useEffect(() => {
        if (!isLoading && isAuthorized) {
            const setUserData = async () => {
                const user = await getUser();
                dispatch(setUser(user));
            }
            setUserData()

            const setUserOnline = async () => {
                const isOnline = await getUserOnline();
                dispatch(setIsOnline(isOnline));
            }
            setUserOnline();

            const setUserCompanies = async () => {
                const employeeId = localStorage.getItem("EmployeeId");
                const companyName = localStorage.getItem("CompanyName")
                if (!employeeId || !companyName) {
                    const companiesData = await getUserCompanies();
                    dispatch(setCompanies(companiesData.data))
                }
            }
            setUserCompanies();
            const intervalId = setInterval(() => {
                setUserOnline();
            }, 60 * 1000);

            return () => clearInterval(intervalId);
        }
    }, [isLoading, isAuthorized]);

    if (isLoading) {
        return <div></div>;
    }

    if (publicRoutes.includes(location)) {
        if (isAuthorized) {
            if (location === "/admin") return <BasicLayout component={<Layout/>}/>
            else navigate("/")
        } else return <Layout/>
    }

    return <BasicLayout component={<Layout/>}/>;
}

export {App}