import {HotelOperations} from "@/widgets/hotel/hotel-operations";
import {HotelMap} from "@/widgets/hotel/hotel-map/UI/hotel-map";
import {useState} from "react";
import {HotelItems} from "@/widgets/hotel/hotel-items/UI/hotel-items";

const Hotel = () => {
    const [isSearched, setIsSearched] = useState(false);

    return (
        <div className={"flex flex-row gap-4"}>
            {isSearched ? <HotelItems/> : null}
            <HotelMap isSearched={isSearched}/>
            <HotelOperations isSearched={isSearched} setIsSearched={setIsSearched}/>
        </div>
    )
};

export default Hotel;