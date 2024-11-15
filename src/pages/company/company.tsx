import { useLocation } from "react-router-dom";
import { Preview } from "@/widgets/company/preview";
import { Edit } from "@/widgets/company/edit";
import { Tariffs } from "@/widgets/company/tariffs";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/shared/utils";

const company = () => {

    const location = useLocation().pathname


    const [companyInformation, setCompanyInformation] = useState()
    const [bills, setBills] = useState()
    const [contractStatus, setContractStatus] = useState<string>()

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_information');
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
            }

            if (data.status === "success" && data.data) {
                console.log(data.data);
                
                setCompanyInformation(data.data)
            }
        } catch (error) {

            console.log(error);

        }

    }

    const getInformationBills = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_bank_accounts');
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
            }

            if (data.status === "success" && data.data) {

                console.log(data.data);

                if (data.data.length) {
                    setBills(data.data)
                }

            }
        } catch (error) {

            console.log(error);

        }

    }


    const getStatusContract = async() => {
        
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_treaty_status');
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
            }

            if (data.status === "success" && data.data) {

                console.log(data.data);
                setContractStatus(data.data.Status)

            }
        } catch (error) {

            console.log(error);

        }
    }
    useEffect(() => {
        getInformation()
        getInformationBills()
        getStatusContract()
    },[])


    return (
        <>

            {(location === '/jobs/company' || location === '/jobs/company/') && (

                <Preview information={companyInformation && bills && contractStatus === 'accepted' ? companyInformation : null}/>

            )}



            {(location == '/jobs/company/edit' || location == '/jobs/company/edit/') && (

                <Edit companyInformation={companyInformation} bills={bills} contractStatus={contractStatus} setBills={setBills} setCompanyInformation={setCompanyInformation}  setContractStatus={setContractStatus} />

            )}

            {(location == '/jobs/company/tariffs' || location == '/jobs/company/tariffs/') && (

                <Tariffs />

            )}


        </>
    );
};

export default company;