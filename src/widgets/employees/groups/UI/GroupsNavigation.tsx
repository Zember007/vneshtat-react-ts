import { RootState } from "@/app/config/store";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../model/index.store";
import { getAccessToken } from "@/shared/utils";


const GroupsNavigation = ({ selectedGroupsId, select }: { selectedGroupsId: number | null; select: Function }) => {


    const dispatch = useDispatch()

    const Groups = useSelector((state: RootState) => state.employees.GroupsInformation);
    const GroupSelected = Groups.find(item => item.id === selectedGroupsId);
    const EmployeesNew = GroupSelected?.Passengers?.filter(item => item.New)

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const Create = async () => {
        const formdata = new FormData()

        formdata.append('EmployeeId', EmployeeId ?? '')
        formdata.append('Name', GroupSelected?.Name ?? '')
        formdata.append('SupervisorId', GroupSelected?.Supervisor?.id.toString() ?? '')

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/create_passengers_group', {
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
        formdata.append('GroupId', GroupSelected?.id.toString() ?? '')
        formdata.append('Name', GroupSelected?.Name ?? '')
        formdata.append('SupervisorId', GroupSelected?.Supervisor?.id.toString() ?? '')

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/edit_passengers_group', {
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
                EmployeeId: EmployeeId || '',
                GroupId: GroupSelected?.id?.toString() || '',
                AddingPassengerId: EmployeesNew.map((item) => (item.id.toString()))
            };


            try {
                const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/add_passenger_to_company_group', {
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

    const safeGroup = () => {
        if (GroupSelected?.New) {
            Create()
        } else {
            Update()
            AddEmployee()
        }
    }

    const ExportGroups = async () => {

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/export_confirmed_company_passengers_group?GroupId=1&EmployeeId=' + EmployeeId, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = 'ExportData.xlsx'
            document.body.appendChild(a)

            a.click()
            a.remove()

            window.URL.revokeObjectURL(url)

        } catch (error) {

            console.log(error);

        }
    }

    return (
        <>
            {!selectedGroupsId && <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px] pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:h-[1px] relative after:w-[50px] after:bg-[#C0C7D1]">
                    <button
                        className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                    >Импорт</button>
                    <button
                    onClick={() => {ExportGroups()}}
                        className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                    >Экспорт</button>
                </div>
                <button
                onClick={() => {const id = Date.now(); dispatch(addGroup(id)); select(id)}}
                className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                    <p className="text-[16px] text-primary">
                        Создать группу
                    </p>
                </button>

            </div>}
            {selectedGroupsId && <button
                onClick={() => {
                    safeGroup()
                }}
                className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                <p className="text-[16px] text-primary">
                    Сохранить
                </p>
            </button>}
        </>
    );
};

export { GroupsNavigation };