import { HotelOperations, HotelNavigations } from "@/widgets/hotel/hotel-operations";
import { HotelMap } from "@/widgets/hotel/hotel-map/UI/hotel-map";
import { useState } from "react";
import { HotelItems } from "@/widgets/hotel/hotel-items/UI/hotel-items";
import Layout from "@/app/layouts/layout";
import { ActiveOperation } from "@/shared/types";

const Hotel = () => {
    const [isSearched, setIsSearched] = useState(false);
    const [activeOperation, setActiveOperation] = useState<ActiveOperation>("route");
    return (
        <>

            <Layout
                component={
                    <div className={"flex flex-row gap-4 h-full"}>
                        {isSearched ? <HotelItems /> : null}
                        <HotelMap isSearched={isSearched} />
                        
                    </div>
                }

                information={<HotelOperations activeOperation={activeOperation} setActiveOperation={setActiveOperation}  />}

                navigation={<HotelNavigations activeOperation={activeOperation} isSearched={isSearched} setIsSearched={setIsSearched} />}
            />
        </>
    )
};

export default Hotel;