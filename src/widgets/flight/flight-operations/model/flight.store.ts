import { createSlice } from '@reduxjs/toolkit';
import { airportsFrom, classes, priceRanges, timeOnWayRanges } from "../utils";
import { changeCheckbox, checkIfChanged } from "@/shared/utils";
import {City, FilterData, Range} from "@/shared/types";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";

export interface Flight {
    id: number;
    departureCity: City | null;
    arrivalCity: City | null;
    flightDate: Date | null;
    deleteCountdown: null | number
}

export interface FlightState {
    flights: Flight[];
    cityFrom: string,
    cityTo: string,
    priceRange: FilterData<Range>;
    timeFrom: FilterData<Range>;
    timeTo: FilterData<Range>;
    airportFrom: FilterData<CheckboxItem[]>;
    airportTo: FilterData<CheckboxItem[]>;
    class: CheckboxItem[];
}

const initialState: FlightState = {
    flights: [
        {id: 1, departureCity: null, arrivalCity: null, flightDate: null, deleteCountdown: null},
    ],
    cityFrom: "",
    cityTo: "",
    priceRange: {data: priceRanges, isChanged: false},
    timeFrom: {data: timeOnWayRanges, isChanged: false},
    timeTo: {data: timeOnWayRanges, isChanged: false},
    airportFrom: {data: airportsFrom, isChanged: false},
    airportTo: {data: airportsFrom, isChanged: false},
    class: classes,
};

const flightStore = createSlice({
    name: "flight",
    initialState,
    reducers: {
        addFlight: (state) => {
            const newFlightId = state.flights.length + 1;
            state.flights.push({id: newFlightId, departureCity: null, deleteCountdown: null, arrivalCity: null, flightDate: null});
        },
        removeFlight: (state, action) => {
            state.flights = state.flights.filter(flight => flight.id !== action.payload);
        },
        updateFlight: (state, action) => {
            const {id, field, value} = action.payload;
            const flight: Flight | undefined = state.flights.find(flight => flight.id === id);
            if (flight) {
                if (field in flight) {
                    (flight as any)[field] = value;
                }
            }
        },
        setCityFrom: (state, action) => {
            state.cityFrom = action.payload;
        },
        setCityTo: (state, action) => {
            state.cityTo = action.payload;
        },
        setClass: (state, action) => {
            const {id, oneChoise} = action.payload;
            state.class = changeCheckbox(state.class, id, oneChoise);
        },
        setPriceRange: (state, action) => {
            state.priceRange.data = action.payload;
            state.priceRange.isChanged = checkIfChanged(initialState.priceRange.data, action.payload);
        },
        setTimeFrom: (state, action) => {
            state.timeFrom.data = action.payload;
            state.timeFrom.isChanged = checkIfChanged(initialState.timeFrom.data, action.payload);
        },
        setTimeTo: (state, action) => {
            state.timeTo.data = action.payload;
            state.timeTo.isChanged = checkIfChanged(initialState.timeTo.data, action.payload);
        },
        setAirportFrom: (state, action) => {
            if (action.payload === "default") {
                state.airportFrom.data = initialState.airportFrom.data;
                state.airportFrom.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.airportFrom.data = changeCheckbox(state.airportFrom.data, id, oneChoise);
                state.airportFrom.isChanged = checkIfChanged(initialState.airportFrom.data, state.airportFrom.data);
            }
        },
        setAirportTo: (state, action) => {
            if (action.payload === "default") {
                state.airportTo.data = initialState.airportTo.data;
                state.airportTo.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.airportTo.data = changeCheckbox(state.airportTo.data, id, oneChoise);
                state.airportTo.isChanged = checkIfChanged(initialState.airportTo.data, state.airportTo.data);
            }
        },
    }
})

export const {
    setPriceRange,
    setAirportFrom,
    setAirportTo,
    setTimeFrom,
    setTimeTo,
    setClass,
    removeFlight,
    updateFlight,
    addFlight,
    setCityFrom,
    setCityTo
} = flightStore.actions
export default flightStore.reducer;