import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Preview } from "@/widgets/company/preview";
import { Edit } from "@/widgets/company/edit";
import { Tariffs } from "@/widgets/company/tariffs";

const company = () => {

    const location = useLocation().pathname


    return (
        <>

            {(location === '/jobs/company' || location === '/jobs/company/') && (

                <Preview />

            )}



            {(location == '/jobs/company/edit' || location == '/jobs/company/edit/') && (

                <Edit />

            )}

            {(location == '/jobs/company/tariffs' || location == '/jobs/company/tariffs/') && (

                <Tariffs />

            )}


        </>
    );
};

export default company;