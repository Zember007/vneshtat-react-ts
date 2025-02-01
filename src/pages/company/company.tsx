import { useLocation } from "react-router-dom";
import { Preview } from "@/widgets/company/preview";
import { Edit } from "@/widgets/company/edit";
import { Tariffs } from "@/widgets/company/tariffs";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/shared/utils";

interface company {
    LegalName: string;
    Inn: string;
    ContractId: number;
}

interface tariff {
    TariffName: string;
    id: number;
}

const company = () => {

    const location = useLocation().pathname

    const [companyInformation, setCompanyInformation] = useState<company | boolean>(true)
    const [tariffActive, setTariffActive] = useState<tariff | boolean>(true)

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_active_company');
        url.searchParams.append('EmployeeId', EmployeeId || '');

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
                setCompanyInformation(false)
            }

            if (data.status === "success" && data.data) {
                console.log(data.data);

                setCompanyInformation(data.data)
            }
        } catch (error) {

            console.log(error);
            setCompanyInformation(false)

        }

    }

    const getTariff = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_active_company_tariff');
        url.searchParams.append('EmployeeId', EmployeeId || '');

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
                setTariffActive(false)
            }

            if (data.status === "success" && data.data) {
                console.log(data.data);

                setTariffActive(data.data)
            }
        } catch (error) {

            console.log(error);
            setTariffActive(false)

        }

    }


    useEffect(() => {
        getInformation()
        getTariff()
    }, [])
    


    return (
        <>

            {(location === '/jobs/company' || location === '/jobs/company/') && (

                <Preview companyInformation={companyInformation} tariffInformation={tariffActive}/>

            )}



            {(location == '/jobs/company/edit' || location == '/jobs/company/edit/') && (

                <Edit activeCompany={companyInformation}/>

            )}

            {(location == '/jobs/company/tariffs' || location == '/jobs/company/tariffs/') && (

                <Tariffs tariffActive={tariffActive} />

            )}


        </>
    );
};

export default company;