import { Input, ModalRight } from "@/shared/UI";
import { getAccessToken } from "@/shared/utils";
import { ChangeEvent, FormEvent, useState } from "react";

interface body {
    EmployeeId: string;
    Email: string;
    Name: string;
    Surname: string;
    Middlename: string;
    BirthDate: string;
}


const AddTeam = ({ active, close }: { active: boolean; close: Function }) => {

    const formatDisplayDate = (value: string): string => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 2) {
            return cleaned;
        } else if (cleaned.length <= 4) {
            return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
        } else if (cleaned.length <= 8) {
            return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4)}`;
        } else {
            return value;
        }
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBodyStaffer({
            EmployeeId: bodyStaffer.EmployeeId,
            Email: bodyStaffer.Email,
            Name: bodyStaffer.Name,
            Surname: bodyStaffer.Surname,
            Middlename: bodyStaffer.Middlename,
            BirthDate: formatDisplayDate(value)
        })
    };

    const EmployeeId = localStorage.getItem('EmployeeId')

    const [bodyStaffer, setBodyStaffer] = useState<body>({
        EmployeeId: EmployeeId ?? '',
        Email: '',
        Name: '',
        Surname: '',
        Middlename: '',
        BirthDate: ''
    })

    const AccessToken = getAccessToken()

    const AddTeamFetch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formdata = new FormData()

        formdata.append('EmployeeId', bodyStaffer.EmployeeId)
        formdata.append('Email', bodyStaffer.Email)
        formdata.append('Name', bodyStaffer.Name)
        formdata.append('Surname', bodyStaffer.Surname)
        formdata.append('Middlename', bodyStaffer.Middlename)
        formdata.append('BirthDate', bodyStaffer.BirthDate.split('-').reverse().join('-'))

        console.log(bodyStaffer.BirthDate);


        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/import_new_company_employee', {
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
                close()

                setBodyStaffer({
                    EmployeeId: EmployeeId ?? '',
                    Email: '',
                    Name: '',
                    Surname: '',
                    Middlename: '',
                    BirthDate: ''
                })
            }
        } catch (error) {

            console.log(error);

        }

    }

    return (
        <ModalRight
            action={(e: FormEvent<HTMLFormElement>) => { AddTeamFetch(e) }}
            active={active}
            button="Добавить"
            close={() => { close() }}
            description="Сотрудник получит письмо с персональной ссылкой на подключение. На этом этапе личные данные нужны для того, чтобы он мог убедиться, что ему пришла корректная ссылка."
            title="Добавить сотрудника">
            <div className="flex flex-col grow gap-[15px] ">
                <span className="text-[18px] font-medium">Личные данные</span>
                <div className="flex flex-col gap-[8px]">

                    <Input
                        extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                        placeholder={"Фамилия"}
                        value={bodyStaffer.Surname}
                        onChange={(e) => {
                            const element = e.target
                            const value = element.value
                            setBodyStaffer({
                                EmployeeId: bodyStaffer.EmployeeId,
                                Email: bodyStaffer.Email,
                                Name: bodyStaffer.Name,
                                Surname: value,
                                Middlename: bodyStaffer.Middlename,
                                BirthDate: bodyStaffer.BirthDate
                            })
                        }}
                    />

                    <Input
                        extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                        placeholder={"Имя"}
                        value={bodyStaffer.Name}
                        onChange={(e) => {
                            const element = e.target
                            const value = element.value
                            setBodyStaffer({
                                EmployeeId: bodyStaffer.EmployeeId,
                                Email: bodyStaffer.Email,
                                Name: value,
                                Surname: bodyStaffer.Surname,
                                Middlename: bodyStaffer.Middlename,
                                BirthDate: bodyStaffer.BirthDate
                            })
                        }}
                    />

                    <Input
                        extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                        placeholder={"Отчество"}
                        value={bodyStaffer.Middlename}
                        onChange={(e) => {
                            const element = e.target
                            const value = element.value
                            setBodyStaffer({
                                EmployeeId: bodyStaffer.EmployeeId,
                                Email: bodyStaffer.Email,
                                Name: bodyStaffer.Name,
                                Surname: bodyStaffer.Surname,
                                Middlename: value,
                                BirthDate: bodyStaffer.BirthDate
                            })
                        }}
                    />

                    <Input
                        extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                        placeholder={"Дата рождения"}
                        value={bodyStaffer.BirthDate}
                        onChange={handleDateChange}
                        maxLength={10}
                    />

                    <Input
                        extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                        placeholder={"Email"}
                        value={bodyStaffer.Email}
                        onChange={(e) => {
                            const element = e.target
                            const value = element.value
                            setBodyStaffer({
                                EmployeeId: bodyStaffer.EmployeeId,
                                Email: value,
                                Name: bodyStaffer.Name,
                                Surname: bodyStaffer.Surname,
                                Middlename: bodyStaffer.Middlename,
                                BirthDate: bodyStaffer.BirthDate
                            })
                        }}
                    />
                </div>
            </div>
        </ModalRight>
    );
};

export default AddTeam;