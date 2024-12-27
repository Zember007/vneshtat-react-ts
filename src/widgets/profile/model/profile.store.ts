import { createSlice } from '@reduxjs/toolkit';
import { changeCheckbox } from "@/shared/utils";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { autoExitSwith, idleTime } from '../utils';


export interface FlightState {
    autoExitSwith: CheckboxItem[];
    idleTime: CheckboxItem[];
    activePersonalFilter: string;
}

const initialState: FlightState = {
    autoExitSwith: autoExitSwith,
    idleTime: idleTime,
    activePersonalFilter: 'user'
};

const ProfileStore = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setActivePersonalFilter: (state, action) => {
            state.activePersonalFilter = action.payload
        },
        setSwitchExit: (state, action) => {
            state.autoExitSwith = changeCheckbox(state.autoExitSwith, action.payload, true);
        },
        setIdleTime: (state, action) => {
            state.idleTime = changeCheckbox(state.idleTime, action.payload, true);
        },
    }
})

export const {
    setSwitchExit,
    setIdleTime,
    setActivePersonalFilter
} = ProfileStore.actions
export default ProfileStore.reducer;