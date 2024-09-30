import { createSlice } from '@reduxjs/toolkit';
import { changeCheckbox } from "@/shared/utils";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { level, accommodation, reports, right, taxi, tickets, access, deputy, require } from "../utils";

export interface FlightState {
    level: CheckboxItem[];
    accommodation: CheckboxItem[];
    reports: CheckboxItem[];
    right: CheckboxItem[];
    taxi: CheckboxItem[];
    tickets: CheckboxItem[];
    access: CheckboxItem[];
    deputy: CheckboxItem[];
    require: CheckboxItem[];
}

const initialState: FlightState = {
    level: level,
    accommodation: accommodation,
    reports: reports,
    right: right,
    taxi: taxi,
    tickets: tickets,
    access: access,
    deputy: deputy,
    require: require
};

const EmployeesStore = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setRequire: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.require = changeCheckbox(state.require, id, oneChoise);
        },
        setDeputy: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.deputy = changeCheckbox(state.deputy, id, oneChoise);
        },
        setLevel: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.level = changeCheckbox(state.level, id, oneChoise);
        },
        setAccommodation: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.accommodation = changeCheckbox(state.accommodation, id, oneChoise);
        },
        setReports: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.reports = changeCheckbox(state.reports, id, oneChoise);
        },
        setRight: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.right = changeCheckbox(state.right, id, oneChoise);
        },
        setTaxi: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.taxi = changeCheckbox(state.taxi, id, oneChoise);
        },
        setTickets: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.tickets = changeCheckbox(state.tickets, id, oneChoise);
        },
        setAccess: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.access = changeCheckbox(state.access, id, oneChoise);
        },
    }
})

export const {
    setLevel,
    setAccommodation,
    setReports,
    setRight,
    setTaxi,
    setTickets,
    setAccess,
    setDeputy,
    setRequire
} = EmployeesStore.actions
export default EmployeesStore.reducer;