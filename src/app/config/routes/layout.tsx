import {Suspense, lazy} from "react";
import {Route, Routes} from "react-router-dom";

const Home = lazy(() => import("@/pages/home/home"));
const Journey = lazy(() => import("@/pages/journey/journey"));
const Flight = lazy(() => import("@/pages/flight/flight"));
const Bus = lazy(() => import("@/pages/bus/bus"));
const Promo = lazy(() => import("@/pages/promo/promo"));
const Registration = lazy(() => import("@/pages/registration/registration"));
const RegistrationConfirm = lazy(() => import("@/pages/registration-confirm/registration-confirm"));
const Login = lazy(() => import("@/pages/login/login"));
const Hotel = lazy(() => import("@/pages/hotel/hotel"));
const Aero = lazy(() => import("@/pages/aero/aero"));
const Transfer = lazy(() => import("@/pages/transfer/transfer"));
const Taxi = lazy(() => import("@/pages/taxi/taxi"));
const Admin = lazy(() => import("@/pages/admin/admin"));
const Finance = lazy(() => import("@/pages/finance/finance"));

const Layout = () => {
    return (
        <Suspense fallback={<div></div>}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/journey" element={<Journey/>}/>
                <Route path="/flight" element={<Flight/>}/>
                <Route path="/bus" element={<Bus/>}/>
                <Route path="/aero" element={<Aero/>}/>
                <Route path="/promo" element={<Promo/>} />
                <Route path="/try" element={<Promo/>} />
                <Route path="/taxi" element={<Taxi/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/hotel" element={<Hotel/>} />
                <Route path="/transfer" element={<Transfer/>} />
                <Route path="/sign-in" element={<Login/>} />
                <Route path="/sign-up" element={<Registration/>} />
                <Route path="/registration-confirm" element={<RegistrationConfirm/>} />
                <Route path="/jobs/finance" element={<Finance/>} />
                <Route path="/jobs/finance/banks" element={<Finance/>} />
                <Route path="/jobs/finance/report" element={<Finance/>} />
                <Route path="/jobs/finance/documents" element={<Finance/>} />
                <Route path="/jobs/finance/accounts" element={<Finance/>} />
                
            </Routes>
        </Suspense>
    );
};

export {Layout};