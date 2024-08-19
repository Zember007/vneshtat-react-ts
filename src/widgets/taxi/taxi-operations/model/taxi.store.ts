import {createSlice, nanoid} from "@reduxjs/toolkit";
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

interface Voyager {
    price: number,
    count: number,
    isSelected: boolean,
    id: string,
    dateBack: Date | null,
    dateTo: Date | null
}

interface Taxi {
    id: number
    name: string,
    surname: string,
    voyagers: Voyager[]
    isSelected: boolean
    dateBack: Date | null,
    dateTo: Date | null
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
        {id: 1, name: "Иван", surname: "Вознесенский", voyagers: [], isSelected: false, dateTo: null, dateBack: null},
        {id: 2, name: "Татьяна", surname: "Соколова", voyagers: [], isSelected: false, dateTo: null, dateBack: null},
        {id: 3, name: "Анастасия", surname: "Грибоедова", voyagers: [], isSelected: false, dateTo: null, dateBack: null}
    ]
}

export const taxiStore = createSlice({
    name: "taxi",
    initialState,
    reducers: {
        setDateBack: (state, action) => {
            const {id, date} = action.payload;
            state.taxis = state.taxis.map((taxi) => {
                return {
                    ...taxi,
                    dateBack: id === taxi.id && date
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
            state.taxis = state.taxis.map(taxi => ({
                ...taxi,
                voyagers: taxi.voyagers.map(voyager => ({
                    ...voyager,
                    isSelected: false
                }))
            }));

            state.taxis = state.taxis.map(taxi => ({
                ...taxi,
                isSelected: taxi.id === action.payload && !taxi.isSelected
            }));
        },
        addVoyager: (state, action) => {
            const {price, id} = action.payload;
            state.taxis = state.taxis.map((taxi) => {
                if (taxi.id === id) {
                    const existingVoyagerIndex = taxi.voyagers.findIndex(voyager => voyager.price === price);

                    if (existingVoyagerIndex !== -1) {
                        const updatedVoyagers = taxi.voyagers.map((voyager, index) =>
                            index === existingVoyagerIndex
                                ? {...voyager, count: voyager.count + 1}
                                : voyager
                        );
                        return {...taxi, voyagers: updatedVoyagers};
                    } else {
                        return {
                            ...taxi,
                            voyagers: [...taxi.voyagers, {
                                price,
                                count: 1,
                                id: nanoid(),
                                isSelected: false,
                                dateBack: taxi.dateBack,
                                dateTo: taxi.dateTo
                            }]
                        };
                    }
                }
                return taxi;
            });
        },
        deleteVoyager: (state, action) => {
            const { voyagerId } = action.payload;

            state.taxis = state.taxis.map((taxi) => {
                const updatedVoyagers = taxi.voyagers.reduce<Voyager[]>((acc, item) => {
                    if (item.id === voyagerId) {
                        if (item.count > 1) {
                            acc.push({
                                ...item,
                                count: item.count - 1
                            });
                        }
                    } else {
                        acc.push(item);
                    }
                    return acc;
                }, []);

                return {
                    ...taxi,
                    voyagers: updatedVoyagers
                };
            });
        },
        selectVoyager: (state, action) => {
            const {voyagerId} = action.payload;

            state.taxis = state.taxis.map((taxi) => {
                return {
                    ...taxi,
                    isSelected: false,
                    voyagers: taxi.voyagers.map((item) => ({
                        ...item,
                        isSelected: voyagerId === item.id
                    }))
                }
            })
        },
        updateVoyager: (state, action) => {
            const {voyagerId, data} = action.payload;

            state.taxis = state.taxis.map(taxi => {
                return {
                    ...taxi,
                    voyagers: taxi.voyagers.map(voyager => {
                        if (voyager.id === voyagerId) {
                            return {
                                ...voyager,
                                ...data
                            }
                        }
                        return voyager;
                    })
                }
            });
        }
    }
})

export const {
    setDateBack,
    setDateTo,
    changeTaxiClass,
    updateVoyager,
    selectVoyager,
    addVoyager,
    changeSelectedTaxi,
    deleteVoyager
} = taxiStore.actions;
export default taxiStore.reducer