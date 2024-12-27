import { createSlice } from '@reduxjs/toolkit';
import { changeCheckbox } from "@/shared/utils";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { currency, langs, theme, time_zone, time_zone_jorneys, email_jorneys, email_jorneys_time, email_reserve, email_reserve_time, email_services } from '../utils';


export interface FlightState {
    currency: CheckboxItem[];
    langs: CheckboxItem[];
    theme: CheckboxItem[];
    time_zone: CheckboxItem[];
    time_zone_jorneys: CheckboxItem[];
    email_jorneys: CheckboxItem[];
    email_jorneys_time: CheckboxItem[];
    email_reserve: CheckboxItem[];
    email_reserve_time: CheckboxItem[];
    email_services: CheckboxItem[];
}

const initialState: FlightState = {
    currency: currency,
    langs: langs,
    theme: theme,
    time_zone: time_zone,
    time_zone_jorneys: time_zone_jorneys,
    email_jorneys: email_jorneys,
    email_jorneys_time: email_jorneys_time,
    email_reserve: email_reserve,
    email_reserve_time: email_reserve_time,
    email_services: email_services
};

const SettingsStore = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = changeCheckbox(state.currency, action.payload, true);
        },
        setLang: (state, action) => {
            state.langs = changeCheckbox(state.langs, action.payload, true);
        },
        setTheme: (state, action) => {
            state.theme = changeCheckbox(state.theme, action.payload, true);
        },
        setTimeZone: (state, action) => {
            state.time_zone = changeCheckbox(state.time_zone, action.payload, true);
        },
        setTimeZoneJorneys: (state, action) => {
            state.time_zone_jorneys = changeCheckbox(state.time_zone_jorneys, action.payload, true);
        },

        setEmailServices: (state, action) => {
            state.email_services = changeCheckbox(state.email_services, action.payload, false);
        },
        setEmailJorneys: (state, action) => {
            state.email_jorneys = changeCheckbox(state.email_jorneys, action.payload, false);
        },
        setEmailReserve: (state, action) => {
            state.email_reserve = changeCheckbox(state.email_reserve, action.payload, false);
        },
        setEmailReserveTime: (state, action) => {
            state.email_reserve_time = changeCheckbox(state.email_reserve_time, action.payload, true);
        },
        setEmailJorneysTime: (state, action) => {
            state.email_jorneys_time = changeCheckbox(state.email_jorneys_time, action.payload, true);
        },
    }
})

export const {
    setCurrency,
    setLang,
    setTheme,
    setTimeZone,
    setTimeZoneJorneys,
    setEmailServices,
    setEmailJorneys,
    setEmailJorneysTime,
    setEmailReserve,
    setEmailReserveTime
} = SettingsStore.actions
export default SettingsStore.reducer;