import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface RegistrationCompanyStoreState {
    progress: number;
    page: number;
    isCompanyReady: boolean;
    isInfoReady: boolean;
    isAccountReady: boolean,
    isCredentialsReady: boolean;
    uploadedFileReady: boolean;
    company: {
        legalName: string;
        legalAddress: string;
        shortName: string;
        kpp: string;
        inn: string;
        token: string;
        uploadedFile: File | null;
    };
    info: {
        name: string;
        surname: string;
        middlename: string;
        birthday: string;
        token: string;
    };
    credentials: {
        email: string;
        phone: string;
        login: string;
        password: string;
    };
    account: {
        withPhone: boolean,
        phone: string,
        sms: string,
        login: string
        password: string
    }
}

const initialState: RegistrationCompanyStoreState = {
    progress: 3,
    page: 1,
    isCompanyReady: false,
    isInfoReady: false,
    isCredentialsReady: false,
    isAccountReady: false,
    uploadedFileReady: false,
    company: {
        legalName: "",
        legalAddress: "",
        shortName: "",
        kpp: "",
        inn: "",
        token: "",
        uploadedFile: null,
    },
    info: {
        name: "",
        surname: "",
        middlename: "",
        birthday: "",
        token: "",
    },
    credentials: {
        email: "",
        phone: "",
        login: "",
        password: ""
    },
    account: {
        withPhone: true,
        phone: "",
        sms: "",
        login: "",
        password: ""
    }
};

const registrationCompanyStore = createSlice({
    name: "registration-company",
    initialState,
    reducers: {
        updateCompanyState: (
            state,
            action: PayloadAction<{
                field: keyof RegistrationCompanyStoreState["company"];
                value: RegistrationCompanyStoreState["company"][keyof RegistrationCompanyStoreState["company"]];
            }>
        ) => {
            const {field, value} = action.payload;
            if (field in state.company) {
                (state.company as any)[field] = value
            }

            const {legalName, legalAddress, shortName, kpp, inn} = state.company;
            state.isCompanyReady = !!legalName && !!legalAddress && !!shortName && !!kpp && !!inn;
        },
        updateUploadedFile: (
            state,
            action: PayloadAction<File | null>
        ) => {
            state.company.uploadedFile = action.payload;

            if (state.company.uploadedFile) {
                if (!state.uploadedFileReady) state.uploadedFileReady = true;
                state.progress += 1
            } else {
                state.progress -= 1
            }
        },
        updateInfoState: (
            state,
            action: PayloadAction<{
                field: keyof RegistrationCompanyStoreState["info"];
                value: RegistrationCompanyStoreState["info"][keyof RegistrationCompanyStoreState["info"]];
            }>
        ) => {
            const {field, value} = action.payload;
            const wasAllFieldsFilled = state.isInfoReady;

            if (field in state.info) {
                (state.info as any)[field] = value
            }

            const {name, surname, middlename, birthday} = state.info;
            const isAllFieldsFilled = !!name && !!surname && !!middlename && !!birthday && birthday.length === 10;
            if (isAllFieldsFilled !== wasAllFieldsFilled) {
                state.isInfoReady = isAllFieldsFilled;
                state.progress += isAllFieldsFilled ? 1 : -1;
            }
        },
        updateCredentialsState: (
            state,
            action: PayloadAction<{
                field: keyof RegistrationCompanyStoreState["credentials"];
                value: RegistrationCompanyStoreState["credentials"][keyof RegistrationCompanyStoreState["credentials"]];
            }>
        ) => {
            const {field, value} = action.payload;
            const wasAllFieldsFilled = state.isCredentialsReady;

            if (field in state.credentials) {
                (state.credentials as any)[field] = value;
            }
            const {email, login, phone, password} = state.credentials;
            const isAllFieldsFilled = !!email && !!login && !!phone && !!password;
            if (wasAllFieldsFilled !== isAllFieldsFilled) {
                state.isCredentialsReady = isAllFieldsFilled;
                state.progress += isAllFieldsFilled ? 1 : -1;
            }
        },
        updateAccountState: <K extends keyof RegistrationCompanyStoreState["account"]>(
            state: any,
            action: PayloadAction<{ field: K; value: RegistrationCompanyStoreState["account"][K] }>
        ) => {
            const {field, value} = action.payload;
            if (field in state.account) {
                (state.account as any)[field] = value
            }

            const {withPhone, login, phone, sms, password} = state.account;
            state.isAccountReady = withPhone ? !!phone && !!sms : !!login && !!password;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        }
    }
});

export const {
    setProgress,
    updateInfoState,
    updateCompanyState,
    updateCredentialsState,
    updateUploadedFile,
    setPage,
    updateAccountState
} = registrationCompanyStore.actions;
export default registrationCompanyStore.reducer;
