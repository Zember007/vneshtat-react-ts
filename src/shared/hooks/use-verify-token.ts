import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {refreshAccessToken, decodeJWT} from "@/shared/utils/methods";
import {getAccessToken, getRefreshToken, publicRoutes} from "@/shared/utils";

export const useVerifyToken = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const location = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        let refreshTokenTimeout: any = null;

        const verifyToken = async () => {
            const token = getAccessToken();
            
            if (token) {
                const {exp} = decodeJWT(token) as { exp: number };
                const currentTime = Math.floor(Date.now() / 1000);
                const isTokenExpired = exp - 10 < currentTime;

                if (isTokenExpired) {
                    const isTokenRefreshed = await refreshAccessToken();
                    if (!isTokenRefreshed) {
                        setIsAuthorized(false);
                        if (!publicRoutes.includes(location)) {
                            navigate("/promo");
                        }
                    } else {
                        setIsAuthorized(true);
                        scheduleTokenRefresh(exp, currentTime);
                    }
                } else {
                    setIsAuthorized(true);
                    scheduleTokenRefresh(exp, currentTime);
                }
            } else {
                if (getRefreshToken()) {
                    const isTokenRefreshed = await refreshAccessToken();
                    if (isTokenRefreshed) {
                        setIsAuthorized(true);
                        const {exp} = decodeJWT(getAccessToken() as string) as { exp: number };
                        const currentTime = Math.floor(Date.now() / 1000);
                        scheduleTokenRefresh(exp, currentTime);
                    } else {
                        setIsAuthorized(false);
                        if (!publicRoutes.includes(location)) {
                            navigate("/promo");
                        }
                    }
                } else {
                    setIsAuthorized(false);
                    if (!publicRoutes.includes(location)) {
                        navigate("/promo");
                    }
                }
            }
            setIsLoading(false);
        };

        const scheduleTokenRefresh = (exp: number, currentTime: number) => {
            if (refreshTokenTimeout) {
                clearTimeout(refreshTokenTimeout);
            }

            const timeToExpiration = exp - currentTime;
            const refreshInterval = Math.max(timeToExpiration - 10, 0) * 1000;

            refreshTokenTimeout = setTimeout(async () => {
                const isTokenRefreshed = await refreshAccessToken();
                if (isTokenRefreshed) {
                    const newExp = decodeJWT(getAccessToken() as string).exp;
                    const newCurrentTime = Math.floor(Date.now() / 1000);
                    scheduleTokenRefresh(newExp as number, newCurrentTime);
                }
            }, refreshInterval);
        };

        verifyToken();

        return () => {
            if (refreshTokenTimeout) {
                clearTimeout(refreshTokenTimeout);
            }
        };
    }, []);

    return {isLoading, isAuthorized};
};