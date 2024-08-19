import {getAccessToken, getRefreshToken, setAccessToken} from "@/shared/utils/index";
import {jwtDecode} from "jwt-decode";

export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const decodeJWT = (token: string) => {
    return jwtDecode(token);
};

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;
    const formdata = new FormData();
    formdata.append("RefreshToken", refreshToken);
    const res = await fetch(import.meta.env.VITE_API_URL + "/auth/sign_in/auth_token", {
        method: "PATCH",
        body: formdata
    });
    const data = await res.json();

    if (data.message === "token_has_been_refreshed") {
        setAccessToken(data.data.access_token);
        return true;
    } else if (data.message === "error_while_refreshing_token") {
        console.log(data)
        localStorage.clear();
        return false;
    } else {
        return false;
    }
};

export async function getUser() {
    const token = getAccessToken();
    if (token) {
        const res = await fetch(import.meta.env.VITE_API_URL + "/user/main_info/get_user", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if (res.ok) {
            const data = await res.json()

            if (data.status === "success") {
                return {
                    name: data.data.Name,
                    surname: data.data.Surname
                }
            }
        }
    }
}

export async function getUserOnline() {
    const token = getAccessToken();
    let failures = 0;
    const maxRetries = 3;
    const body = new FormData();
    body.append("EmployeeId", localStorage.getItem("EmployeeId") || "");

    async function makeRequest() {
        const res = await fetch(import.meta.env.VITE_API_URL + "/user/utility/update_last_online", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "PATCH",
            body
        });

        if (res.ok) {
            const data = await res.json();

            if (data.status === "success") {
                return true;
            } else if (data.status === "error") {
                failures++;
                if (failures >= maxRetries) {
                    return false;
                }
                await delay(5000);
                return makeRequest();
            }
        } else {
            return false;
        }
    }

    return token ? makeRequest() : false;
}

export async function getUserCompanies() {
    if (getAccessToken()) {
        const res = await fetch(import.meta.env.VITE_API_URL + "/user/main_info/get_user_companies", {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        return await res.json();
    }
}