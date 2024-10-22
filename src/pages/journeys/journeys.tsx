
import { JorneysAll } from "@/widgets/journeys/jorneys-all";
import { JorneyCreate } from "@/widgets/journeys/jorney-create";
import { JorneyItem } from "@/widgets/journeys/jorney-item";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const journeys = () => {

    const location = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        if(location === '/journeys/' || location === '/journeys') {
            navigate('/journeys/all')
        }
    }, [location])

    
    return (
        <>            
        {location.includes('/journeys/create') && <JorneyCreate />}
        {location.includes('/journeys/all') && <JorneysAll />}
        {location.includes('/journeys/item') && <JorneyItem />}
        </>
    );
};

export default journeys;