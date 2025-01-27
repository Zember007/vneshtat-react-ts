import TrainCupe from "@/assets/icons/schemas/TrainCupe";
/* import ChairVioletImg from "@/assets/icons/chairs/chair-violet.svg?react";
import ChairBlueImg from "@/assets/icons/chairs/chair-blue.svg?react";
import ChairOrangeImg from "@/assets/icons/chairs/chair-orange.svg?react";
import ChairCheapImg from "@/assets/icons/chairs/chair-cheap.svg?react"; */
/* import {Seat} from "@/shared/types";
import {useState} from "react";
import {seatsMock} from "@/shared/utils"; */
import "./weign.css";

const Weign = () => {
 /*    const [seats] = useState<Seat[][]>(seatsMock); */

    return (
        <div className={"relative flex flex-col justify-center w-full"}>
            <TrainCupe />
           {/*  <div className={"grid-weign absolute"}>
                {seats.map((couple, i) => (
                    <DoubleSeats seats={couple} key={i}/>
                ))}
            </div> */}
        </div>
    )
};



/* const DoubleSeats = ({seats}: { seats: Seat[] }) => {
    const getSeatByState = (seat: Seat) => {
        switch (seat.state) {
            case "cheap":
                return ChairCheapImg
            case "selected":
                return ChairOrangeImg
            case "free":
                return ChairVioletImg
            case "irrevocable":
                return ChairBlueImg
            default:
                return null;
        }
    }

    return (
        <div className={"flex flex-col items-center justify-center"}>
            {seats.map((seat, i )=> {
                const SeatComponent = getSeatByState(seat);
                if (!SeatComponent) return null;
                return (
                    <div className={"flex justify-center items-center relative"} key={i}>
                        <SeatComponent className={seat.isBooked ? "opacity-40" : ""} />
                        <p className={"absolute text-[6px] text-sm text-primary"}>{seat.order}</p>
                    </div>
                )
            })}
        </div>
    )
} */

export {Weign};