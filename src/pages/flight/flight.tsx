import {FlightTickets} from "@/widgets/flight/flight-tickets";
import {FlightOperations, FlightNavigations} from "@/widgets/flight/flight-operations";
import Layout from "@/app/layouts/layout";
import { useState } from "react";
import { ActiveOperation } from "@/shared/types";

const Flight = () => {

    const [activeOperation, setActiveOperation] = useState<ActiveOperation>("route");

    return (
        <Layout
        component={
            <FlightTickets />            
        }
        information={
            <FlightOperations activeOperation={activeOperation} setActiveOperation={setActiveOperation}/>
        }
        navigation={
            <FlightNavigations activeOperation={activeOperation}/>
        }
        />
    )
};

export default Flight;