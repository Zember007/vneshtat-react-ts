
import { useState } from "react";
import AddTeam from "./modals/AddTeam";
import ImportTeam from "./modals/ImportTeam";
import { getAccessToken } from "@/shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { changeStaffers } from "../../model/index.store";

const IndexNavigation = ({ selectedStafferId }: { selectedStafferId: number | null }) => {

    const dispatch = useDispatch()

    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')
    const activeFilter = useSelector((state: RootState) => state.employees.activeFilter);
    const StafferInformation = useSelector((state: RootState) => state.employees.StaffersInformations).find(item => item.EmployeeId === selectedStafferId);
    const access = useSelector((state: RootState) => state.employees.StaffersAccess).find(item => item.EmployeeId === selectedStafferId);
    const Periods = useSelector((state: RootState) => state.employees.Periods);
    const Documents = useSelector((state: RootState) => state.employees.StaffersDocuments).find(item => item.EmployeeId === selectedStafferId);

    const safeEmployee = async () => {

        if (activeFilter === 'user') {

            safePersonalInformations()
        }

        if (activeFilter === 'access') {

            safeAccessInformations()
        }

        if (activeFilter === 'period') {
            safePeriods()
        }

        if (activeFilter === 'document') {
            safeDocuments()
        }
    }

    const safeDocuments = () => {


        const Documents_new = Documents?.Documents.filter(item => item.New)
        const Documents_edit = Documents?.Documents.filter(item => item.Edit)

        if (Documents_new && Documents_new.length > 0) {
            Documents_new.forEach(async (el) => {
                
                const formdata = new FormData()

                formdata.append('EmployeeId', EmployeeId || '')
                formdata.append('DocumentType', el.DocumentType)
                formdata.append('Number', el.Number)
                formdata.append('DateOfIssue', el.DateOfIssue || '')
                formdata.append('MiddleName', el.MiddleName)
                formdata.append('Nationality', el.Nationality)
                formdata.append('ValidityDeadline', el.ValidityDeadline || '')
                formdata.append('Name', el.Name)
                formdata.append('Surname', el.Surname)       
                formdata.append('Species', el.Species)
                


                try {
                    const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/create_employees_profile_documents', {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${AccessToken}`,
                        },
                        body: formdata
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
            })
        }

        if (Documents_edit && Documents_edit.length > 0) {
            Documents_edit.forEach(async (el) => {
                
                const formdata = new FormData()

                formdata.append('EmployeeId', EmployeeId || '')
                formdata.append('DocumentType', el.DocumentType)
                formdata.append('DocumentId', el.id?.toString() || '')
                formdata.append('Type', el.Type)
                formdata.append('Number', el.Number)
                formdata.append('DateOfIssue', el.DateOfIssue || '')
                formdata.append('MiddleName', el.MiddleName)
                formdata.append('Nationality', el.Nationality)
                formdata.append('ValidityDeadline', el.ValidityDeadline || '')
                formdata.append('Name', el.Name)
                formdata.append('Surname', el.Surname)       
                formdata.append('Species', el.Species)                
                


                try {
                    const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/edit_employees_profile_document', {
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${AccessToken}`,
                        },
                        body: formdata
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
            })
        }

    }

    const safePeriods = () => {


        const Periods_new = Periods.filter(item => item.new)

        if (Periods_new.length > 0) {
            Periods_new.forEach(async (el) => {
                const formdata = new FormData();

                const DateFrom = el.DateFrom ? el.DateFrom.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' }).split('.').reverse().join('-') : null;
                const DateTo = el.DateTo ? el.DateTo.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' }).split('.').reverse().join('-') : null;
                formdata.append('EmployeeId', selectedStafferId?.toString() ?? '')
                formdata.append('DeputyId', el.DeputyId?.toString() ?? '')
                formdata.append('DateFrom', DateFrom ?? '')
                formdata.append('DateTo', DateTo ?? '')


                try {
                    const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/create_employee_profile_period_of_absence', {
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

                    }

                } catch (error) {

                    console.log(error);

                }
            })
        }

    }

    const safePersonalInformations = async () => {
        const formdata = new FormData();

        formdata.append('EmployeeId', EmployeeId ?? '')

        const url = StafferInformation?.Type === 'Update' ? 'edit_employees_profile_personal_information' : 'create_employees_profile_personal_information'
        const method = StafferInformation?.Type === 'Update' ? 'PATCH' : 'POST'

        if (StafferInformation?.Type === 'Update') {
            formdata.append('Surname', StafferInformation?.Surname ?? '')
            formdata.append('MiddleName', StafferInformation?.MiddleName ?? '')
            formdata.append('Name', StafferInformation?.Name ?? '')
            formdata.append('PersonalInfoSurname', StafferInformation?.PersonalInfoSurname ?? '')
            formdata.append('PersonalInfoName', StafferInformation?.PersonalInfoName ?? '')
            formdata.append('PersonalInfoBirthDate', StafferInformation?.PersonalInfoBirthDate ? StafferInformation.PersonalInfoBirthDate.split('-').reverse().join('-') : '')
            formdata.append('PersonalInfoGender', StafferInformation?.PersonalInfoGender ?? 'male')
            formdata.append('PersonalInfoNationality', StafferInformation?.PersonalInfoNationality ?? '')
            formdata.append('Email', StafferInformation?.Email ?? '')
            formdata.append('PhoneNumber', StafferInformation?.PhoneNumber ?? '')
            formdata.append('Username', StafferInformation?.Username ?? '')
        }

        if (StafferInformation?.Type === 'Create') {
            formdata.append('Surname', StafferInformation?.PersonalInfoSurname ?? '')
            formdata.append('Name', StafferInformation?.PersonalInfoName ?? '')
            formdata.append('BirthDate', StafferInformation?.PersonalInfoBirthDate ? StafferInformation.PersonalInfoBirthDate.split('-').reverse().join('-') : '')
            formdata.append('Gender', StafferInformation?.PersonalInfoGender ?? 'male')
            formdata.append('Nationality', StafferInformation?.PersonalInfoNationality ?? '')
        }

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/' + url, {
                method: method,
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

            }

        } catch (error) {

            console.log(error);

        }
    }

    const safeAccessInformations = async () => {
        const formdata = {
            EmployeeId: EmployeeId ?? '',
            EditingEmployeeId: selectedStafferId?.toString() ?? '',
            PermissionsClassName: access?.PermissionsClassName,
            ValidityDeadline: access?.ValidityDeadline,
            IsUnlimited: access?.IsUnlimited,
        };

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/edit_employees_profile_access', {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                console.log(data);
                dispatch(changeStaffers({ id: selectedStafferId, field: 'PermissionsClassName', value: access?.PermissionsClassName }))
            }

        } catch (error) {

            console.log(error);

        }
    }

    const [importTeam, setImportTeam] = useState<boolean>(false)
    const [addTeam, setAddTeam] = useState<boolean>(false)

    const ExportTeam = async () => {

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/export_confirmed_company_employees?EmployeeId=' + EmployeeId, {
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
            {!selectedStafferId && <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px] pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:h-[1px] relative after:w-[50px] after:bg-[#C0C7D1]">
                    <button
                        onClick={() => setImportTeam(true)}
                        className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                    >Импорт</button>
                    <button
                        onClick={() => ExportTeam()}
                        className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                    >Экспорт</button>
                </div>
                <button
                    onClick={() => setAddTeam(true)}
                    className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                    <p className="text-[16px] text-primary">
                        Добавить сотрудника
                    </p>
                </button>

            </div>}

            {selectedStafferId && (activeFilter !== 'document' || selectedStafferId.toString() === EmployeeId) && <button
                onClick={() => { safeEmployee() }}
                className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                <p className="text-[16px] text-primary">
                    Сохранить
                </p>
            </button>}

            <ImportTeam
                active={importTeam}
                close={() => { setImportTeam(false) }}
            />

            <AddTeam
                active={addTeam}
                close={() => { setAddTeam(false) }}
            />
        </>
    );
};

export { IndexNavigation };