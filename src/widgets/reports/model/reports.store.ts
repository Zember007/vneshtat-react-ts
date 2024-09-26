import { createSlice } from '@reduxjs/toolkit';
import { Departments, NoDepartments, Services } from "../utils";
import { changeCheckbox, checkIfChanged } from "@/shared/utils";
import { FilterData } from "@/shared/types";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";

export interface DepartmentsState {
    departments: FilterData<CheckboxItem[]>;
    noDepartments: FilterData<CheckboxItem[]>;
    services: FilterData<CheckboxItem[]>;
}

const initialState: DepartmentsState = {
    departments: {data: Departments, isChanged: false},
    noDepartments: {data: NoDepartments, isChanged: false},
    services: {data: Services, isChanged: false},
};

const reportsStore = createSlice({
    name: "reports",
    initialState,
    reducers: {
        setDepartments: (state, action) => {
            if (action.payload === "default") {
                state.departments.data = initialState.departments.data;
                state.departments.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.departments.data = changeCheckbox(state.departments.data, id, oneChoise);
                state.departments.isChanged = checkIfChanged(initialState.departments.data, state.departments.data);
            }
        },

        setNoDepartments: (state, action) => {
            if (action.payload === "default") {
                state.noDepartments.data = initialState.noDepartments.data;
                state.noDepartments.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.noDepartments.data = changeCheckbox(state.noDepartments.data, id, oneChoise);
                state.noDepartments.isChanged = checkIfChanged(initialState.noDepartments.data, state.noDepartments.data);
            }
        },

        setServices: (state, action) => {
            if (action.payload === "default") {
                state.services.data = initialState.services.data;
                state.services.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.services.data = changeCheckbox(state.services.data, id, oneChoise);
                state.services.isChanged = checkIfChanged(initialState.services.data, state.services.data);
            }
        }
    }
})

export const {
    setDepartments,
    setNoDepartments,
    setServices
} = reportsStore.actions
export default reportsStore.reducer;