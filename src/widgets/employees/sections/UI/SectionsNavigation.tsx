import { RootState } from "@/app/config/store";
import { useDispatch, useSelector } from "react-redux";
import { addSection } from "../../model/index.store";
import { getAccessToken } from "@/shared/utils";

const SectionsNavigation = ({ selectedSectionId, select }: { selectedSectionId: number | null; select: Function }) => {

    const dispatch = useDispatch()

    const Sections = useSelector((state: RootState) => state.employees.SectionsInformation);
    const SectionSelected = Sections.find(item => item.id === selectedSectionId);
    const EmployeesNew = SectionSelected?.Employees?.filter(item => item.New)

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const Create = async () => {
        const formdata = new FormData()

        formdata.append('EmployeeId', EmployeeId ?? '')
        formdata.append('Name', SectionSelected?.Name ?? '')
        formdata.append('SupervisorId', SectionSelected?.Supervisor?.id.toString() ?? '')

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/create_employees_profile_deparment', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
                body: formdata
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                console.log(data);
                // AddEmployee()
            }

        } catch (error) {

            console.log(error);

        }
    }

    const Update = async () => {
        const formdata = new FormData()

        formdata.append('EmployeeId', EmployeeId ?? '')
        formdata.append('DepartmentId', SectionSelected?.id.toString() ?? '')
        formdata.append('Name', SectionSelected?.Name ?? '')
        formdata.append('SupervisorId', SectionSelected?.Supervisor?.id.toString() ?? '')

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/edit_employees_profile_department', {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
                body: formdata
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                console.log(data);
                // AddEmployee()
            }

        } catch (error) {

            console.log(error);

        }
    }

    const AddEmployee = async () => {
        
        if (EmployeesNew?.length) {

            const formdata = {
                EmployeeId: EmployeeId,
                DepartmentId: SectionSelected?.id?.toString() ?? '',
                AddingEmployeeId: EmployeesNew.map((item) => (item.id.toString()))
            };


            try {
                const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/add_employee_to_company_department', {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formdata)
                });
                const data = await res.json();
                if (data.status === "error") {
                    console.log("error", data);
                }

                if (data.status === "success") {
                    console.log(data);

                }

            } catch (error) {

                console.log(error);

            }
        }
    }

    const safeSection = () => {
        if (SectionSelected?.New) {
            Create()
        } else {
            Update()
            AddEmployee()
        }
    }

    return (

        <>
            {!selectedSectionId && <button
                onClick={() => {
                    const id = Date.now();
                    dispatch(addSection(id))
                    select(id)
                }}
                className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                <p className="text-[16px] text-primary">
                    Создать отдел
                </p>
            </button>}
            {selectedSectionId && <button
                onClick={() => {
                    safeSection()
                }}
                className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                <p className="text-[16px] text-primary">
                    Сохранить
                </p>
            </button>}
        </>


    );
};

export { SectionsNavigation };