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
    dateFrom: Date | null
    dateTo: Date | null
    isSelected: boolean
}

interface TaxiInitialState {
    taxiClass: FilterData<CheckboxItem[]>
    taxis: Taxi[]
}

const initialState: TaxiInitialState = {
    taxiClass: {
        data: taxiClasses,
        isChanged: false
    },
    taxis: [
        {id: 1, name: "Иван", surname: "Вознесенский", voyagers: [], isSelected: false, dateFrom: null, dateTo: null},
        {id: 2, name: "Татьяна", surname: "Соколова", voyagers: [], isSelected: false, dateFrom: null, dateTo: null},
        {id: 3, name: "Анастасия", surname: "Грибоедова", voyagers: [], isSelected: false, dateFrom: null, dateTo: null}
    ]
}

export const taxiStore = createSlice({
    name: "taxi",
    initialState,
    reducers: {
        setDateFrom: (state, action) => {
            const {id, date} = action.payload;
            state.taxis = state.taxis.map((taxi) => {
                return {
                    ...taxi,
                    dateFrom: id === taxi.id && date
                }
            })
        },
        setDateTo: (state, action) => {
            const {id, date} = action.payload;
            state.taxis = state.taxis.map((taxi) => {
                return {
                    ...taxi,
                    dateTo: id === taxi.id && date
                }
            })
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
        },
        changeSelectedTaxi: (state, action) => {
            state.taxis = state.taxis.map((taxi) => {
                return {
                    ...taxi,
                    isSelected: taxi.id === action.payload && !taxi.isSelected
                }
            })
        },
        addVoyager: (state, action) => {
            const { price, id } = action.payload;
            state.taxis = state.taxis.map((taxi) => {
                if (taxi.id === id) {
                    const existingVoyagerIndex = taxi.voyagers.findIndex(voyager => voyager.price === price);

                    if (existingVoyagerIndex !== -1) {
                        const updatedVoyagers = taxi.voyagers.map((voyager, index) =>
                            index === existingVoyagerIndex
                                ? { ...voyager, count: voyager.count + 1 }
                                : voyager
                        );
                        return { ...taxi, voyagers: updatedVoyagers };
                    } else {
                        return {
                            ...taxi,
                            voyagers: [...taxi.voyagers, { price, count: 1 }]
                        };
                    }
                }
                return taxi;
            });
        }
    }
})

export const {setDateFrom, setDateTo, changeTaxiClass, addVoyager, changeSelectedTaxi} = taxiStore.actions;
export default taxiStore.reducer