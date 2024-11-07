 import { useState } from "react";
import ImportTeam from "./modals/ImportTeam";
import { getAccessToken } from "@/shared/utils";
import { useDispatch } from "react-redux";
import { addPassengers } from "../../model/index.store";
import { useSelector } from "react-redux";
import { RootState } from "@/app/config/store";

const PassengersNavigation = ({ selectedPassengerId, select }: { selectedPassengerId: number | null; select: Function }) => {

    const dispatch = useDispatch();
    const Passengers = useSelector((state: RootState) => state.employees.Passengers);
    // const EmployeesPersonalInformations = {Type:'Create'};

    const [importTeam, setImportTeam] = useState<boolean>(false)
    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')
    const ExportTeam = async () => {

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/export_confirmed_company_passengers?EmployeeId=' + EmployeeId, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            if (res.ok) {
                // Получаем бинарный контент
                const blob = await res.blob();

                // Создаем URL для Blob-данных
                const url = window.URL.createObjectURL(blob);

                // Создаем временный элемент <a>, чтобы вызвать скачивание файла
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ExportData.xlsx';  // Имя файла
                document.body.appendChild(a);
                a.click();

                // Удаляем временный элемент <a>
                a.remove();

                // Освобождаем URL
                window.URL.revokeObjectURL(url);
            } else {
                alert('Failed to export employees.');
            }

        } catch (error) {

            console.log(error);

        }
    }


    // const Create = async () => {
    //     const formdata = new FormData();



    //     formdata.append('EmployeeId', EmployeeId ?? '')
    //     formdata.append('Surname', EmployeesPersonalInformations?.Surname ?? '')
    //     formdata.append('Name', EmployeesPersonalInformations?.Name ?? '')
    //     formdata.append('MiddleName', EmployeesPersonalInformations?.MiddleName ?? '')

    //     try {
    //         const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/create_passenger', {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${AccessToken}`
    //             },
    //             body: formdata
    //         });
    //         const data = await res.json();
    //         if (data.status === "error") {
    //             console.log("error", data);
    //         }

    //         if (data.status === "success") {
    //             console.log(data);

    //         }

    //     } catch (error) {

    //         console.log(error);

    //     }
    // }

    // const safePersonalInformations = async () => {
    //     const formdata = new FormData();

    //     let url = 'create_passenger_personal_information'
    //     let method = "POST"


    //     formdata.append('EmployeeId', EmployeeId ?? '')
    //     formdata.append('PassengerId', selectedPassengerId?.toString() ?? '')


    //     if (EmployeesPersonalInformations.Type === 'Update') {
    //         url = 'edit_passengers_personal_information'
    //         method = "PATCH"
    //         formdata.append('Surname', EmployeesPersonalInformations?.Surname ?? '')
    //         formdata.append('Name', EmployeesPersonalInformations?.Name ?? '')
    //         formdata.append('MiddleName', EmployeesPersonalInformations?.MiddleName ?? '')
    //         formdata.append('PersonalInfoBirthDate', EmployeesPersonalInformations?.PersonalInfoBirthDate ? EmployeesPersonalInformations.PersonalInfoBirthDate.split('-').reverse().join('-') : '')
    //         formdata.append('PersonalInfoSurname', EmployeesPersonalInformations?.PersonalInfoSurname ?? '')
    //         formdata.append('PersonalInfoName', EmployeesPersonalInformations?.PersonalInfoName ?? '')
    //         formdata.append('PersonalInfoGender', EmployeesPersonalInformations?.PersonalInfoGender ?? 'male')
    //         formdata.append('PersonalInfoNationality', EmployeesPersonalInformations?.PersonalInfoNationality ?? '')
    //     } else {
    //         formdata.append('Surname', EmployeesPersonalInformations?.PersonalInfoSurname ?? '')
    //         formdata.append('Name', EmployeesPersonalInformations?.PersonalInfoName ?? '')
    //         formdata.append('BirthDate', EmployeesPersonalInformations?.PersonalInfoBirthDate ? EmployeesPersonalInformations.PersonalInfoBirthDate.split('-').reverse().join('-') : '')
    //         formdata.append('Gender', EmployeesPersonalInformations?.PersonalInfoGender ?? 'male')
    //         formdata.append('Nationality', EmployeesPersonalInformations?.PersonalInfoNationality ?? '')
    //     }

    //     try {
    //         const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/' + url, {
    //             method: method,
    //             headers: {
    //                 Authorization: `Bearer ${AccessToken}`
    //             },
    //             body: formdata
    //         });
    //         const data = await res.json();
    //         if (data.status === "error") {
    //             console.log("error", data);
    //         }

    //         if (data.status === "success") {
    //             console.log(data);

    //         }

    //     } catch (error) {

    //         console.log(error);

    //     }
    // }


    // const safePassenger = () => {
    //     if (EmployeesPersonalInformations.Type === 'Create') {
    //         Create()
    //     } else {
    //         safePersonalInformations()
    //     }

    // }

    return (
        <>
            {!selectedPassengerId && <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px] pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:h-[1px] relative after:w-[50px] after:bg-[#C0C7D1]">
                    <button
                        onClick={() => setImportTeam(true)}
                        className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                    >Импорт</button>
                    <button
                        onClick={() => { ExportTeam() }}
                        className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                    >Экспорт</button>
                </div>
                <button
                    onClick={() => { const id = Passengers.length + 1; select(id); dispatch(addPassengers(id)) }}
                    className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                    <p className="text-[16px] text-primary">
                        Добавить пассажира
                    </p>
                </button>
            </div>}

            {selectedPassengerId && <button
                onClick={() => { }}
                className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                <p className="text-[16px] text-primary">
                    Сохранить
                </p>
            </button>}

            <ImportTeam
                active={importTeam}
                close={() => { setImportTeam(false) }}
            />

        </>
    );
};

export { PassengersNavigation };