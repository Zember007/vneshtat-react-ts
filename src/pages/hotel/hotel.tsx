// import {HotelItems} from "@/widgets/hotel/hotel-items/UI/hotel-items";
import {HotelOperations} from "@/widgets/hotel/hotel-operations";
import {HotelMap} from "@/widgets/hotel/hotel-map/UI/hotel-map";

const Hotel = () => {
    return (
        <div className={"flex flex-row gap-4"}>
            {/*<HotelItems />*/}
            <HotelMap/>
            <HotelOperations/>
        </div>
    )
};

export default Hotel;