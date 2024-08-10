import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    carriers,
    priceRanges,
    prices,
    railwaysFrom,
    services,
    timeOnWayRanges,
    weignTypes
} from "../utils";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import {City, Range} from "@/shared/types";
import {changeCheckbox, checkIfChanged, getAccessToken} from "@/shared/utils";

interface FetchError {
    errors: string[] | string;
}

export interface FilterData<T> {
    data: T;
    isChanged: boolean;
}

export interface JourneyState {
    prices: FilterData<CheckboxItem[]>;
    weignTypes: FilterData<CheckboxItem[]>;
    carriers: FilterData<CheckboxItem[]>;
    railwaysFrom: FilterData<CheckboxItem[]>;
    railwaysTo: FilterData<CheckboxItem[]>;
    services: FilterData<CheckboxItem[]>;
    priceRange: FilterData<Range>;
    timeOnWay: FilterData<Range>;
    timeFrom: FilterData<Range>;
    timeTo: FilterData<Range>;
    cityFrom: City | null,
    cityTo: City | null,
    cityFromName: string,
    cityToName: string,
    dateTo: Date | null;
    dateBack: Date | null;
    tickets: any[];
    loading: boolean;
    error: string | null;
    validationErrors: { [key: string]: string[] } | null;
}

const initialState: JourneyState = {
    prices: { data: prices, isChanged: false },
    weignTypes: { data: weignTypes, isChanged: false },
    carriers: { data: carriers, isChanged: false },
    railwaysFrom: { data: railwaysFrom, isChanged: false },
    railwaysTo: { data: railwaysFrom, isChanged: false },
    services: { data: services, isChanged: false },
    priceRange: { data: priceRanges, isChanged: false },
    timeOnWay: { data: timeOnWayRanges, isChanged: false },
    timeFrom: { data: timeOnWayRanges, isChanged: false },
    timeTo: { data: timeOnWayRanges, isChanged: false },
    cityFrom: null,
    cityTo: null,
    cityFromName: "",
    cityToName: "",
    dateTo: null,
    dateBack: null,
    tickets: [],
    loading: false,
    error: null,
    validationErrors: null,
};

export const fetchJourneyTickets = createAsyncThunk<any, void, { rejectValue: FetchError }>(
    'journey/fetchTickets',
    async (_, { getState, rejectWithValue }) => {
        const state = (getState() as { journey: JourneyState }).journey;
        const { timeFrom, timeTo, dateTo, cityFrom, cityTo } = state;

        const url = new URL(import.meta.env.VITE_API_URL + '/search/train/search/');
        const params: { [key: string]: any } = {
            CarGrouping: 'DontGroup',
            SpecialPlacesDemand: 'NoValue',
            GetOnlyCarTransportationCoaches: 'False',
            GetOnlyNonRefundableTariffs: 'False',
            ExcludeProviders: 'null',
            Origin: cityFrom?.ExpressCode || '2000000',
            Destination: cityTo?.ExpressCode || '2004000',
            DepartureDate: dateTo ? dateTo.toISOString() : new Date().toISOString(),
            TimeFrom: timeFrom.isChanged ? (timeFrom.data.min / 60) : undefined,
            TimeTo: timeTo.isChanged ? (timeTo.data.max / 60) : undefined,
            GetByLocalTime: 'False'
        };
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined) {
                url.searchParams.append(key, params[key].toString());
            }
        });

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue({ errors: [error.message] });
        }
    }
);

const journeySlice = createSlice({
    name: 'journey',
    initialState,
    reducers: {
        setDateTo: (state, action) => {
            state.dateTo = action.payload;
        },
        setDateBack: (state, action) => {
            state.dateBack = action.payload;
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
        setTimeOnWay: (state, action) => {
            state.timeOnWay.data = action.payload;
            state.timeOnWay.isChanged = checkIfChanged(initialState.timeOnWay.data, action.payload);
        },
        setCityFrom: (state, action) => {
            state.cityFrom = action.payload;
        },
        setCityTo: (state, action) => {
            state.cityTo = action.payload;
        },
        setCityFromName: (state, action) => {
            state.cityFromName = action.payload;
        },
        setCityToName: (state, action) => {
            state.cityToName = action.payload;
        },
        setPrices: (state, action) => {
            if (action.payload === "default") {
                state.prices.data = initialState.prices.data;
                state.prices.isChanged = false;
            } else {
                const { id, oneChoise } = action.payload;
                state.prices.data = changeCheckbox(state.prices.data, id, oneChoise);
                state.prices.isChanged = checkIfChanged(initialState.prices.data, state.prices.data);
            }
        },
        setWeignTypes: (state, action) => {
            if (action.payload === "default") {
                state.weignTypes.data = initialState.weignTypes.data;
                state.weignTypes.isChanged = false;
            } else {
                const { id, oneChoise } = action.payload;
                state.weignTypes.data = changeCheckbox(state.weignTypes.data, id, oneChoise);
                state.weignTypes.isChanged = checkIfChanged(initialState.weignTypes.data, state.weignTypes.data);
            }
        },
        setCarriers: (state, action) => {
            if (action.payload === "default") {
                state.carriers.data = initialState.carriers.data;
                state.carriers.isChanged = false;
            } else {
                const { id, oneChoise } = action.payload;
                state.carriers.data = changeCheckbox(state.carriers.data, id, oneChoise);
                state.carriers.isChanged = checkIfChanged(initialState.carriers.data, state.carriers.data);
            }
        },
        setRailwaysFrom: (state, action) => {
            if (action.payload === "default") {
                state.railwaysFrom.data = initialState.railwaysFrom.data;
                state.railwaysFrom.isChanged = false;
            } else {
                const { id, oneChoise } = action.payload;
                state.railwaysFrom.data = changeCheckbox(state.railwaysFrom.data, id, oneChoise);
                state.railwaysFrom.isChanged = checkIfChanged(initialState.railwaysFrom.data, state.railwaysFrom.data);
            }
        },
        setRailwaysTo: (state, action) => {
            if (action.payload === "default") {
                state.railwaysTo.data = initialState.railwaysTo.data;
                state.railwaysTo.isChanged = false;
            } else {
                const { id, oneChoise } = action.payload;
                state.railwaysTo.data = changeCheckbox(state.railwaysTo.data, id, oneChoise);
                state.railwaysTo.isChanged = checkIfChanged(initialState.railwaysTo.data, state.railwaysTo.data);
            }
        },
        setServices: (state, action) => {
            if (action.payload === "default") {
                state.services.data = initialState.services.data;
                state.services.isChanged = false;
            } else {
                const { id, oneChoise } = action.payload;
                state.services.data = changeCheckbox(state.services.data, id, oneChoise);
                state.services.isChanged = checkIfChanged(initialState.services.data, state.services.data);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJourneyTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.validationErrors = null;
            })
            .addCase(fetchJourneyTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(fetchJourneyTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
                // @ts-ignore
                state.validationErrors = action.payload?.errors || null;
            });
    }
});

export const {
    setDateTo,
    setDateBack,
    setPriceRange,
    setTimeFrom,
    setTimeTo,
    setTimeOnWay,
    setCityFrom,
    setCityTo,
    setCityFromName,
    setCityToName,
    setPrices,
    setWeignTypes,
    setCarriers,
    setRailwaysFrom,
    setRailwaysTo,
    setServices,
} = journeySlice.actions;

export default journeySlice.reducer;
