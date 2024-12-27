import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LoginState {
    withPhone: boolean,
    isLoginReady: boolean,
    isRestore: boolean,
    phone: string,
    sms: string,
    login: string
    password: string
    restore: {
        isLoginReady: boolean,
        isSubmitted: boolean,
        withPhone: boolean,
        phone: string,
        sms: string,
        email: string
        password: string
        rePassword: string,
        sendCode: boolean
    }
}

const initialState: LoginState = {
    withPhone: true,
    isLoginReady: false,
    isRestore: false,
    phone: "",
    sms: "",
    login: "",
    password: "",
    restore: {
        isLoginReady: false,
        isSubmitted: false,
        withPhone: false,
        phone: "",
        sms: "",
        email: "",
        password: "",
        rePassword: "",
        sendCode: false
    }
}

const loginStore = createSlice({
    name: "login",
    initialState,
    reducers: {
        updateLoginState: <K extends keyof LoginState>(
            state: any,
            action: PayloadAction<{ field: K; value: LoginState[K] }>
        ) => {
            const {field, value} = action.payload;
            if (field in state) {
                (state as any)[field] = value
            }

            const {withPhone, phone, sms, login, password} = state;
            state.isLoginReady = !withPhone ? !!phone && !!sms : !!login && !!password;
        },
        updateRestoreState: <K extends keyof LoginState["restore"]>(
            state: LoginState,
            action: PayloadAction<{ field: K; value: LoginState["restore"][K] }>
        ) => {
            const { field, value } = action.payload;
            state.restore[field] = value;

            const { withPhone, phone, sms, email } = state.restore;
            state.restore.isLoginReady = withPhone ? !!phone && !!sms : !!email && !!sms;
        }
    }
})

export const {updateLoginState, updateRestoreState} = loginStore.actions
export default loginStore.reducer