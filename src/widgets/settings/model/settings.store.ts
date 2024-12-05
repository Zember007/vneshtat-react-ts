import { createSlice } from '@reduxjs/toolkit';
import { changeCheckbox } from "@/shared/utils";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { currency, langs, theme, time_zone, time_zone_jorneys } from '../utils';


export interface FlightState {
    currency: CheckboxItem[];
    langs: CheckboxItem[];
    theme: CheckboxItem[];
    time_zone: CheckboxItem[];
    time_zone_jorneys: CheckboxItem[];
}

const initialState: FlightState = {
    currency: currency,
    langs: langs,
    theme: theme,
    time_zone: time_zone,
    time_zone_jorneys: time_zone_jorneys,
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
    }
})

export const {
    setCurrency,
    setLang,
    setTheme,
    setTimeZone,
    setTimeZoneJorneys
} = SettingsStore.actions
export default SettingsStore.reducer;