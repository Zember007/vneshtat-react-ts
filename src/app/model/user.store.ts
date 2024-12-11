import {createSlice} from "@reduxjs/toolkit";

export interface Company {
    CompanyName: string,
    EmployeeId: number,
    Status?: string
}

interface UserStore {
    fullname: {
        name: string,
        surname: string
    }
    isOnline: boolean
    companies: Company[]
}

const initialState: UserStore = {
    fullname: {
        name: "",
        surname: ""
    },
    isOnline: false,
    companies: []
}

export const userStore = createSlice({
    name: "user-slice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.fullname = action.payload
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setIsOnline: (state, action) => {
            state.isOnline = action.payload;
        }
    }
})

export const { setUser, setCompanies, setIsOnline } = userStore.actions;
export default userStore.reducer;