import "./styles/index.css";
import {Layout} from "@/app/config/routes/layout";
import BasicLayout from "@/app/layouts/basic-layout";
import {useLocation} from "react-router-dom";
import {useVerifyToken} from "@/shared/hooks/use-verify-token";
import {useEffect} from "react";
import {getUser, getUserCompanies, getUserOnline} from "@/shared/utils/methods";
import {useDispatch} from "react-redux";
import {setCompanies, setIsOnline, setUser} from "@/app/model/user.store";

function App() {
    const location = useLocation().pathname;
    const dispatch = useDispatch();
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
                const companiesData = await getUserCompanies();
                dispatch(setCompanies(companiesData.data))
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

    if (["/promo", "/sign-up", "/sign-in", "/try", "/admin"].includes(location)) {
        if (isAuthorized) return null;
        else return <Layout/>;
    }

    return <BasicLayout component={<Layout/>}/>;
}

export {App}