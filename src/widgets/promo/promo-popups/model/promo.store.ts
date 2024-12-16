import {createSlice} from "@reduxjs/toolkit";
import {CheckboxItem} from "@/shared/UI/checkbox/checkbox.props";

interface PromoStoreState {
    isCeo: boolean,
    isOpen: boolean
    info: {
        fullname: string,
        companyName: string,
        travelFrequency: CheckboxItem[],
        phone: string,
        email: string,
    }
}

const initialState: PromoStoreState = {
    isCeo: true,
    isOpen: false,
    info: {
        fullname: "",
        companyName: "",
        travelFrequency: [
            {content: "До 10 командировок в месяц", isSelected: false, id: 1},
            {content: "От 10 до 100 командировок в месяц", isSelected: false, id: 2},
            {content: "Более 100 командировок в месяц", isSelected: false, id: 3},
            {content: "Затрудняюсь ответить", isSelected: false, id: 4},
        ],
        phone: "",
        email: "",
    }
}

const promoStore = createSlice({
    name: "promo",
    initialState,
    reducers: {
        setIsCeo: (state, action) => {
            state.isCeo = action.payload
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        changeTravelFrequency: (state, action) => {
            state.info.travelFrequency = state.info.travelFrequency.map((item) => ({...item, isSelected: item.id === action.payload}))
        },
        updateInfo: (state, action) => {
            const {field, value} = action.payload
            if (field in state.info) {
                (state.info as any)[field] = value
            }
        }
    }
})

export const {setIsCeo, updateInfo, setIsOpen, changeTravelFrequency} = promoStore.actions
export default promoStore.reducer