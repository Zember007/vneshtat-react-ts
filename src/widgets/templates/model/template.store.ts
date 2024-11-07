import { createSlice } from '@reduxjs/toolkit';
import { changeCheckbox } from "@/shared/utils";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { center_costs, projects, passagersType, serviceTypes, Services, RouteItem } from "../utils";

export interface TemplateState {
    center_costs: CheckboxItem[];
    projects: CheckboxItem[];
    passagersType: CheckboxItem[];
    serviceTypes: CheckboxItem[];
    services: Services[];
}

const initialState: TemplateState = {
    center_costs: center_costs,
    projects: projects,
    passagersType: passagersType,
    serviceTypes: serviceTypes,
    services: [
        {
            id: 0,
            type: null,
            route: {
                class: null,
                items: [
                    {
                        id: 1,
                        cityFrom: null,
                        cityBefore: null
                    }
                ]
            },
            city: null,
            team: null,
            filters: null,
            option: null,
        }
    ]
};

const TemplateStore = createSlice({
    name: "template",
    initialState,
    reducers: {
        addService: (state) => {
            const newServiceId = state.services.length + 1;
            state.services.push({
                id: newServiceId,
                type: null,
                route: {
                    class: null,
                    items: [
                        {
                            id: 1,
                            cityFrom: null,
                            cityBefore: null
                        }
                    ]
                },
                city: null,
                team: null,
                filters: null,
                option: null,
            });
        },
        removeService: (state, action) => {

            state.services = state.services.filter(service => service.id !== action.payload);

        },
        updateService: (state, action) => {
            const { id, field, value } = action.payload;
            const service: Services | undefined = state.services.find(service => service.id === id);
            if (service) {
                if (field in service) {
                    (service as any)[field] = value;
                }
            }
        },
        addRoute: (state, action) => {
            const service: Services | undefined = state.services.find(service => service.id === action.payload)
            console.log(service);

            if (service) {
                const newRouteId = service.route.items.length + 1;
                service.route.items = [...service.route.items, { id: newRouteId, cityFrom: null, cityBefore: null }];
            }
        },

        removeRoute: (state, action) => {
            const service: Services | undefined = state.services.find(service => service.id === action.payload.id)
            if (service) {
                service.route.items = service.route.items.filter(item => item.id !== action.payload.id_route);
            }
        },

        changeCity: (state, action) => {
            const service: Services | undefined = state.services.find(service => service.id === action.payload.id)
            console.log(service);
            if (service) {

                const route: RouteItem | undefined = service.route.items.find(service => service.id === action.payload.id_route)

                if (route) {
                    if (action.payload.city === 'from') {
                        route.cityFrom = action.payload.value
                        
                        
                    } else if (action.payload.city === 'before') {
                        route.cityBefore = action.payload.value
                    }
                }

            }
        },

        setClassRoutes: (state, action) => {
            const service: Services | undefined = state.services.find(service => service.id === action.payload.id)
            console.log(service);
            if (service) {

                service.route.class = action.payload.value

            }
        },


        setProject: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.projects = changeCheckbox(state.projects, id, oneChoise);
        },
        setCenterCosts: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.center_costs = changeCheckbox(state.center_costs, id, oneChoise);
        },
        setPassagersType: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.passagersType = changeCheckbox(state.passagersType, id, oneChoise);
        },
        setServiceTypes: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.serviceTypes = changeCheckbox(state.serviceTypes, id, oneChoise);
        }
    }
})

export const {
    setProject,
    setCenterCosts,
    setPassagersType,
    setServiceTypes,
    addService,
    removeService,
    updateService,
    addRoute,
    changeCity,
    removeRoute,
    setClassRoutes
} = TemplateStore.actions
export default TemplateStore.reducer;