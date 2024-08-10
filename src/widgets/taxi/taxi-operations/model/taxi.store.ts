import {createSlice} from "@reduxjs/toolkit";
import {CheckboxItem} from "@/shared/UI/checkbox/checkbox.props";
import {FilterData} from "@/shared/types";
import {changeCheckbox, checkIfChanged} from "@/shared/utils";

export const taxiClasses: CheckboxItem[] = [
    {id: 1, isSelected: false, content: "Эконом"},
    {id: 2, isSelected: false, content: "Комфорт"},
    {id: 3, isSelected: false, content: "Комфорт +"},
    {id: 4, isSelected: false, content: "Бизнес"},
    {id: 5, isSelected: false, content: "Минивэн"},
    {id: 6, isSelected: false, content: "Курьер"},
    {id: 7, isSelected: false, content: "Elite"},
    {id: 8, isSelected: false, content: "Premier"},
]

interface Taxi {
    id: number
    name: string,
    surname: string,
    voyagers: {
        price: number,
        count: number
    }[]
    isSelected: boolean
}

interface TaxiInitialState {
    dateFrom: Date | null
    dateTo: Date | null
    taxiClass: FilterData<CheckboxItem[]>
    taxis: Taxi[]
}

const initialState: TaxiInitialState = {
    dateFrom: null,
    dateTo: null,
    taxiClass: {
        data: taxiClasses,
        isChanged: false
    },
    taxis: [
        {id: 1, name: "Иван", surname: "Вознесенский", voyagers: [], isSelected: false},
        {id: 2, name: "Татьяна", surname: "Соколова", voyagers: [], isSelected: false},
        {id: 3, name: "Анастасия", surname: "Грибоедова", voyagers: [], isSelected: false}
    ]
}

export const taxiStore = createSlice({
    name: "taxi",
    initialState,
    reducers: {
        setDateFrom: (state, action) => {
            state.dateFrom = action.payload;
        },
        setDateTo: (state, action) => {
            state.dateTo = action.payload;
        },
        changeTaxiClass: (state, action) => {
            if (action.payload === "default") {
                state.taxiClass.data = initialState.taxiClass.data;
                state.taxiClass.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.taxiClass.data = changeCheckbox(state.taxiClass.data, id, oneChoise);
                state.taxiClass.isChanged = checkIfChanged(initialState.taxiClass.data, state.taxiClass.data);
            }
        }
    }
})

export const {setDateFrom, setDateTo, changeTaxiClass} = taxiStore.actions;
export default taxiStore.reducer