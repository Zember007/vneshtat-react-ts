import { createSlice } from '@reduxjs/toolkit';
import { changeCheckbox } from "@/shared/utils";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { autoExitSwith, idleTime } from '../utils';


export interface FlightState {
    autoExitSwith: CheckboxItem[];
    idleTime: CheckboxItem[];
}

const initialState: FlightState = {
    autoExitSwith: autoExitSwith,
    idleTime: idleTime
};

const ProfileStore = createSlice({
    name: "profile",
    initialState,
    reducers: {
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
    setIdleTime
} = ProfileStore.actions
export default ProfileStore.reducer;