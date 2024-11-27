import { createSlice } from '@reduxjs/toolkit';
import { changeCheckbox } from "@/shared/utils";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { level, accommodation, reports, right, taxi, tickets, access, deputy, require, gender, staffers, periods, sections, groups, access_staffers, documents_staffers, typeDocuments, categoryDocuments } from "../utils";

export interface FlightState {
    documents: CheckboxItem[];
    categoryDocuments: CheckboxItem[];
    level: CheckboxItem[];
    accommodation: CheckboxItem[];
    reports: CheckboxItem[];
    right: CheckboxItem[];
    taxi: CheckboxItem[];
    tickets: CheckboxItem[];
    deputy: CheckboxItem[];
    access: CheckboxItem[];
    require: CheckboxItem[];
    activeFilter: string;
    gender: CheckboxItem[];
    Staffers: staffers[];
    StaffersInformations: any[];
    StaffersAccess: access_staffers[];
    StaffersDocuments: documents_staffers[];
    Passengers: staffers[];
    PassengersInformations: any[];
    PassengersDocuments: documents_staffers[];
    Periods: periods[];
    Sections: sections[];
    SectionsInformation: sections[];
    Groups: groups[];
    GroupsInformation: groups[];
}

const initialState: FlightState = {
    documents: typeDocuments,
    categoryDocuments: categoryDocuments,
    level: level,
    accommodation: accommodation,
    reports: reports,
    right: right,
    taxi: taxi,
    tickets: tickets,
    deputy: deputy,
    access: access,
    require: require,
    activeFilter: 'user',
    gender: gender,
    Staffers: [],
    StaffersInformations: [],
    StaffersAccess: [],
    StaffersDocuments: [],
    Passengers: [],
    PassengersInformations: [],
    PassengersDocuments: [],
    Sections: [],
    SectionsInformation: [],
    Groups: [],
    GroupsInformation: [],
    Periods: []
};

const EmployeesStore = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.Groups = action.payload
        },
        setGroupsInformation: (state, action) => {
            state.GroupsInformation.push(action.payload[0])
        },
        changeGroup: (state, action) => {
            const { field, value, id } = action.payload;
            const GroupInformation = state.GroupsInformation.find(item => item.id === id)
            const Group = state.Groups.find(item => item.id === id)
            if (Group && GroupInformation) {
                if (field in Group) {
                    (Group as any)[field] = value;
                }

                if (field in GroupInformation) {
                    (GroupInformation as any)[field] = value;
                }
            }
        },
        addGroup: (state, action) => {
            state.Groups = [
                ...state.Groups,
                {
                    id: action.payload,
                    Name: null,
                    Supervisor: null,
                    PassengersCount: 0,
                    IsActive: true,
                    New: true
                }
            ]

            state.GroupsInformation = [
                ...state.GroupsInformation,
                {
                    id: action.payload,
                    Name: null,
                    Supervisor: null,
                    Passengers: [],
                    New: true
                }

            ]
        },
        delGroup: (state, action) => {
            state.Groups = state.Groups.filter(item => item.id !== action.payload)
        },
        addGroupEmployee: (state, action) => {
            const { id, employee } = action.payload
            const Group = state.Groups.find(item => item.id === id)
            const GroupInformation = state.GroupsInformation.find(item => item.id === id)


            if (GroupInformation) {
                GroupInformation.Passengers?.push(employee)

                if (Group) {
                    Group.PassengersCount = GroupInformation.Passengers?.length
                }
            }


        },
        delGroupEmployee: (state, action) => {
            const { id, id_employee } = action.payload
            const Group = state.GroupsInformation.find(item => item.id === id)

            if (Group) {
                Group.Passengers = Group.Passengers?.filter(item => item.id !== id_employee)
            }
        },
        setSections: (state, action) => {
            state.Sections = action.payload
        },
        setSectionsInformation: (state, action) => {
            state.SectionsInformation.push(action.payload[0])
        },
        changeSection: (state, action) => {
            const { field, value, id } = action.payload;
            const SectionInformation = state.SectionsInformation.find(item => item.id === id)
            const Section = state.Sections.find(item => item.id === id)
            if (Section && SectionInformation) {
                if (field in Section) {
                    (Section as any)[field] = value;
                }

                if (field in SectionInformation) {
                    (SectionInformation as any)[field] = value;
                }
            }
        },
        addSection: (state, action) => {
            state.Sections = [
                ...state.Sections,
                {
                    id: action.payload,
                    Name: null,
                    Supervisor: null,
                    EmployeesCount: 0,
                    New: true
                }
            ]

            state.SectionsInformation = [
                ...state.SectionsInformation,
                {
                    id: action.payload,
                    Name: null,
                    Supervisor: null,
                    Employees: [],
                    New: true
                }

            ]
        },
        delSection: (state, action) => {
            state.Sections = state.Sections.filter(item => item.id !== action.payload)
        },
        addSectionEmployee: (state, action) => {

            const { id, employee } = action.payload
            const Section = state.Sections.find(item => item.id === id)
            const SectionInformation = state.SectionsInformation.find(item => item.id === id)

            if (SectionInformation) {
                SectionInformation.Employees?.push(employee)

                if (Section) {
                    Section.EmployeesCount = SectionInformation.Employees?.length
                }
            }


        },
        delSectionEmployee: (state, action) => {
            const { id, id_employee } = action.payload
            const Section = state.SectionsInformation.find(item => item.id === id)

            if (Section) {
                Section.Employees = Section.Employees?.filter(item => item.id !== id_employee)
            }
        },
        setPeriods: (state, action) => {
            state.Periods = action.payload
        },
        changePeriod: (state, action) => {
            const { field, value, id } = action.payload;
            const information = state.Periods.find(item => item.id === id)
            if (information) {
                if (field in information) {
                    (information as any)[field] = value;
                }
            }
        },
        addPeriod: (state) => {
            state.Periods = [
                {
                    id: state.Periods.length + 1,
                    DateFrom: ' ',
                    DateTo: ' ',
                    DeputyId: null,
                    new: true
                },
                ...state.Periods
            ]
        },
        setStaffers: (state, action) => {
            state.Staffers = action.payload
        },
        setStaffersInformations: (state, action) => {
            state.StaffersInformations = action.payload
        },
        setStaffersDocuments: (state, action) => {
            state.StaffersDocuments.push(action.payload[0])
        },
        setPassengersDocuments: (state, action) => {
            state.PassengersDocuments.push(action.payload[0])
        },
        changeStaffersDocuments: (state, action) => {
            const { field, value, id, id_document, passenger } = action.payload;
            const data = passenger ? state.PassengersDocuments : state.StaffersDocuments
            const information = data.find(item => item.EmployeeId === id)?.Documents.find(item => item.id === id_document)
            if (information) {
                if (field in information) {
                    (information as any)[field] = value;

                    if(!information.New) {
                        information.Edit = true
                    }
                }
            }
        },
        setAccessEmployees: (state, action) => {
            state.StaffersAccess.push(action.payload[0])
        },
        changeStaffersInformations: (state, action) => {

            const { field, value, id, passenger } = action.payload;
            const data = passenger ? state.PassengersInformations : state.StaffersInformations
            const information = passenger ? data.find(item => item.id === id) : data.find(item => item.EmployeeId === id)
            if (information) {
                if (field in information) {
                    (information as any)[field] = value;
                }
            }
        },
        changeStaffers: (state, action) => {
            const { field, value, id, passenger } = action.payload;

            const data = passenger ? state.Passengers : state.Staffers
            const Staffer = data.find(item => item.id === id)
            if (Staffer) {
                if (field in Staffer) {
                    (Staffer as any)[field] = value;
                }
            }
        },
        setPassengers: (state, action) => {
            state.Passengers = action.payload
        },
        addPassengers: (state, action) => {
            const id = action.payload
            state.Passengers = [
                {
                    id: id,
                    Name: '',
                    Surname: '',
                    MiddleName: '',
                    IsActive: true
                },
                ...state.Passengers]

            state.PassengersInformations = [
                {
                    id: id,
                    Name: '',
                    Surname: '',
                    MiddleName: '',
                    IsActive: true,
                    Type: 'New',
                    PersonalInfoBirthDate: '',
                    PersonalInfoGender: 'male',
                    PersonalInfoName: '',
                    PersonalInfoNationality: '',
                    PersonalInfoSurname: '',

                },
                ...state.Passengers]


        },
        setPassengersInformations: (state, action) => {
            state.PassengersInformations = action.payload
        },

        setActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        setRequire: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.require = changeCheckbox(state.require, id, oneChoise);
        },
        setGender: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.gender = changeCheckbox(state.gender, id, oneChoise);
        },
        setDocument: (state, action) => {
            state.documents = changeCheckbox(state.documents, action.payload.id, true);
            const document = state.documents.find(item => item.id === action.payload.id)

            if (document) {
              
                const findStafferDocuments =  action.payload.passenger ? state.PassengersDocuments.find(item => item.Passengerid === action.payload.user_id) : state.StaffersDocuments.find(item => item.EmployeeId === action.payload.user_id)
                if (findStafferDocuments) {
                    findStafferDocuments.Documents = [
                        {
                            id: Date.now(),
                            DocumentType: document.code || '',
                            Type: '',
                            Nationality: '',
                            Species: '',
                            Number: '',
                            ValidityDeadline: null,
                            Surname: '',
                            Name: '',
                            MiddleName: '',
                            DateOfIssue: null,
                            New: true
                        },
                        ...findStafferDocuments.Documents]
                }

            }

        },

        delDocument: (state, action) => {

            const { id_document, id, passenger } = action.payload;

            if (!passenger) {
                const data = state.StaffersDocuments.find(item => item.EmployeeId === id)
                if (data) {

                    data.Documents = data.Documents.filter(item => item.id !== id_document)
                }
            }

        },
        setCategoryDocument: (state, action) => {
            state.categoryDocuments = changeCheckbox(state.categoryDocuments, action.payload, true);
        },
        setLevel: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.level = changeCheckbox(state.level, id, oneChoise);
        },
        setAccommodation: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.accommodation = changeCheckbox(state.accommodation, id, oneChoise);
        },
        setReports: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.reports = changeCheckbox(state.reports, id, oneChoise);
        },
        setRight: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.right = changeCheckbox(state.right, id, oneChoise);
        },
        setTaxi: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.taxi = changeCheckbox(state.taxi, id, oneChoise);
        },
        setTickets: (state, action) => {
            const { id, oneChoise } = action.payload;
            state.tickets = changeCheckbox(state.tickets, id, oneChoise);
        },

        changeAccessEmployees: (state, action) => {
            const { field, value, id } = action.payload;

            const information = state.StaffersAccess.find(item => item.EmployeeId === id)
            if (information) {
                if (field in information) {
                    (information as any)[field] = value;
                }
            }
        },
    }
})

export const {
    setGroups,
    setGroupsInformation,
    addGroup,
    addGroupEmployee,
    changeGroup,
    delGroup,
    delGroupEmployee,
    setSections,
    setSectionsInformation,
    addSection,
    delSection,
    changeSection,
    addSectionEmployee,
    delSectionEmployee,
    setPeriods,
    changePeriod,
    addPeriod,
    setLevel,
    setAccommodation,
    setReports,
    setRight,
    setTaxi,
    setTickets,
    setAccessEmployees,
    changeAccessEmployees,
    setRequire,
    setActiveFilter,
    changeStaffersInformations,
    setStaffersDocuments,
    setPassengersDocuments,
    setStaffersInformations,
    setGender,
    setStaffers,
    changeStaffers,
    setPassengers,
    addPassengers,
    setPassengersInformations,
    setCategoryDocument,
    setDocument,
    changeStaffersDocuments,
    delDocument
} = EmployeesStore.actions
export default EmployeesStore.reducer;