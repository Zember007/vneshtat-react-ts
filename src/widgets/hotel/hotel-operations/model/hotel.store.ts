import {createSlice} from "@reduxjs/toolkit";
import {CheckboxItem} from "@/shared/UI/checkbox/checkbox.props";
import {City, FilterData, Range} from "@/shared/types";
import {
    bedType,
    facilities,
    nutritionTypes,
    paymentConditions,
    placingTypes,
    priceRanges,
    radiusRange, ratings,
    starsItems,
    travelPolitics
} from "../utils";
import {changeCheckbox, checkIfChanged} from "@/shared/utils";

interface HotelState {
    priceRange: FilterData<Range>;
    location: FilterData<{ radius: Range, from: string }>
    stars: FilterData<CheckboxItem[]>,
    placingType: FilterData<CheckboxItem[]>
    nutrition: FilterData<CheckboxItem[]>
    facilities: FilterData<CheckboxItem[]>
    bed: FilterData<CheckboxItem[]>
    paymentCondition: FilterData<CheckboxItem[]>
    travelPolitic: FilterData<CheckboxItem[]>
    rating: FilterData<Range>
    isFreeCancel: boolean
    forTrips: boolean
    dateTo: Date | null
    dateBack: Date | null
    city: City | null
    cityName: string
}

const initialState: HotelState = {
    location: {
        data: {
            radius: radiusRange,
            from: ""
        },
        isChanged: false
    },
    priceRange: {
        data: priceRanges,
        isChanged: false
    },
    stars: {
        data: starsItems,
        isChanged: false
    },
    placingType: {
        data: placingTypes,
        isChanged: false
    },
    nutrition: {
        data: nutritionTypes,
        isChanged: false
    },
    facilities: {
        data: facilities,
        isChanged: false
    },
    bed: {
        data: bedType,
        isChanged: false
    },
    paymentCondition: {
        data: paymentConditions,
        isChanged: false
    },
    travelPolitic: {
        data: travelPolitics,
        isChanged: false
    },
    rating: {
        data: ratings,
        isChanged: false,
    },
    isFreeCancel: false,
    forTrips: false,
    dateTo: null,
    dateBack: null,
    city: null,
    cityName: ""
}

const hotelStore = createSlice({
    initialState,
    name: "hotel",
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
        setLocationRadius: (state, action) => {
            if (action.payload === "default") {
                state.location.isChanged = false;
                state.location.data.radius = initialState.location.data.radius;
                state.location.data.from = initialState.location.data.from;
            } else {
                state.location.data.radius = action.payload;
                state.location.isChanged = checkIfChanged(initialState.location.data.radius, action.payload);
            }
        },
        setLocationFrom: (state, action) => {
            if (action.payload === "default") {
                state.location.isChanged = false;
                state.location.data.radius = initialState.location.data.radius;
                state.location.data.from = initialState.location.data.from;
            } else {
                state.location.data.from = action.payload;
                state.location.isChanged = checkIfChanged(initialState.location.data.from, action.payload);
            }
        },
        setStars: (state, action) => {
            if (action.payload === "default") {
                state.stars.data = initialState.stars.data;
                state.stars.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.stars.data = changeCheckbox(state.stars.data, id, oneChoise);
                state.stars.isChanged = checkIfChanged(initialState.stars.data, state.stars.data);
            }
        },
        setPlacingType: (state, action) => {
            if (action.payload === "default") {
                state.placingType.data = initialState.placingType.data;
                state.placingType.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.placingType.data = changeCheckbox(state.placingType.data, id, oneChoise);
                state.placingType.isChanged = checkIfChanged(initialState.placingType.data, state.placingType.data);
            }
        },
        setRating: (state, action) => {
            if (action.payload === "default") {
                state.rating.data = initialState.rating.data;
                state.rating.isChanged = false;
            } else {
                state.rating.data = action.payload
                state.rating.isChanged = checkIfChanged(initialState.rating.data, state.rating.data);
            }
        },
        setNutrition: (state, action) => {
            if (action.payload === "default") {
                state.nutrition.data = initialState.nutrition.data;
                state.nutrition.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.nutrition.data = changeCheckbox(state.nutrition.data, id, oneChoise);
                state.nutrition.isChanged = checkIfChanged(initialState.nutrition.data, state.nutrition.data);
            }
        },
        setFacilities: (state, action) => {
            if (action.payload === "default") {
                state.facilities.data = initialState.facilities.data;
                state.facilities.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.facilities.data = changeCheckbox(state.facilities.data, id, oneChoise);
                state.facilities.isChanged = checkIfChanged(initialState.facilities.data, state.facilities.data);
            }
        },
        setBed: (state, action) => {
            if (action.payload === "default") {
                state.bed.data = initialState.bed.data;
                state.bed.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.bed.data = changeCheckbox(state.bed.data, id, oneChoise);
                state.bed.isChanged = checkIfChanged(initialState.bed.data, state.bed.data);
            }
        },
        setPaymentCondition: (state, action) => {
            if (action.payload === "default") {
                state.paymentCondition.data = initialState.paymentCondition.data;
                state.paymentCondition.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.paymentCondition.data = changeCheckbox(state.paymentCondition.data, id, oneChoise);
                state.paymentCondition.isChanged = checkIfChanged(initialState.paymentCondition.data, state.paymentCondition.data);
            }
        },
        setTravelPolitic: (state, action) => {
            if (action.payload === "default") {
                state.travelPolitic.data = initialState.travelPolitic.data;
                state.travelPolitic.isChanged = false;
            } else {
                const {id, oneChoise} = action.payload;
                state.travelPolitic.data = changeCheckbox(state.travelPolitic.data, id, oneChoise);
                state.travelPolitic.isChanged = checkIfChanged(initialState.travelPolitic.data, state.travelPolitic.data);
            }
        },
        setIsFreeCancelFilter: (state, action) => {
            state.isFreeCancel = action.payload;
        },
        setForTrips: (state, action) => {
            state.forTrips = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setCityName: (state, action) => {
            state.cityName = action.payload;
        }
    },
});

export const {
    setPriceRange,
    setLocationRadius,
    setLocationFrom,
    setStars,
    setPlacingType,
    setNutrition,
    setFacilities,
    setBed,
    setPaymentCondition,
    setTravelPolitic,
    setIsFreeCancelFilter,
    setRating,
    setForTrips,
    setDateBack,
    setDateTo,
    setCity,
    setCityName
} = hotelStore.actions;

export default hotelStore.reducer;
