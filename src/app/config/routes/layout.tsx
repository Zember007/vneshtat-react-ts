import {Suspense, lazy} from "react";
import {Route, Routes} from "react-router-dom";

const Home = lazy(() => import("@/pages/home/home"));
const Journeys = lazy(() => import("@/pages/journeys/journeys"));
const Messages = lazy(() => import("@/pages/messages/Messages"));
const Train = lazy(() => import("@/pages/train/train"));
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
const Reports = lazy(() => import("@/pages/reports/reports"));
const Employees = lazy(() => import("@/pages/employees/employees"));
const Company = lazy(() => import("@/pages/company/company"));
const Templates = lazy(() => import("@/pages/templates/templates"));

const Layout = () => {
    return (
        <Suspense fallback={<div></div>}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/journeys" element={<Journeys/>}/>
                <Route path="/journeys/all" element={<Journeys/>}/>
                <Route path="/journeys/create" element={<Journeys/>}/>
                <Route path="/journeys/item" element={<Journeys/>}/>
                <Route path="/journeys/item/information" element={<Journeys/>}/>
                <Route path="/journeys/train" element={<Train/>}/>
                <Route path="/journeys/flight" element={<Flight/>}/>
                <Route path="/journeys/bus" element={<Bus/>}/>
                <Route path="/journeys/aero" element={<Aero/>}/>
                <Route path="/journeys/taxi" element={<Taxi/>} />
                <Route path="/journeys/hotel" element={<Hotel/>} />
                <Route path="/journeys/transfer" element={<Transfer/>} />
                <Route path="/templates/train" element={<Templates/>}/>
                <Route path="/templates/flight" element={<Templates/>}/>
                <Route path="/templates/bus" element={<Templates/>}/>
                <Route path="/templates/aero" element={<Templates/>}/>
                <Route path="/templates/taxi" element={<Templates/>} />
                <Route path="/templates/hotel" element={<Templates/>} />
                <Route path="/templates/transfer" element={<Templates/>} />
                <Route path="/messages/notifications" element={<Messages/>}/>
                <Route path="/messages/chats" element={<Messages/>}/>
                <Route path="/messages/jorneys" element={<Messages/>}/>
                <Route path="/messages/all" element={<Messages/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/promo" element={<Promo/>} />
                <Route path="/try" element={<Promo/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/sign-in" element={<Login/>} />
                <Route path="/sign-up" element={<Registration/>} />
                <Route path="/registration-confirm" element={<RegistrationConfirm/>} />
                <Route path="/connect" element={<RegistrationConfirm/>} />
                <Route path="/jobs/finance" element={<Finance/>} />
                <Route path="/jobs/finance/banks" element={<Finance/>} />
                <Route path="/jobs/finance/report" element={<Finance/>} />
                <Route path="/jobs/finance/documents" element={<Finance/>} />
                <Route path="/jobs/finance/accounts" element={<Finance/>} />
                <Route path="/jobs/reports" element={<Reports/>} />
                <Route path="/jobs/reports/services" element={<Reports/>} />
                <Route path="/jobs/reports/business" element={<Reports/>} />
                <Route path="/jobs/employees" element={<Employees/>} />                
                <Route path="/jobs/employees/structure" element={<Employees/>} />                
                <Route path="/jobs/employees/sections" element={<Employees/>} />                
                <Route path="/jobs/employees/passengers" element={<Employees/>} />                
                <Route path="/jobs/employees/groups" element={<Employees/>} />
                <Route path="/jobs/company" element={<Company/>} />                
                <Route path="/jobs/company/edit" element={<Company/>} />                
                <Route path="/jobs/company/tariffs" element={<Company/>} />                
                <Route path="/templates" element={<Templates/>} />               
                <Route path="/templates/all" element={<Templates/>} />               
                <Route path="/templates/create" element={<Templates/>} />               
                <Route path="/templates/create/add" element={<Templates/>} />               
                <Route path="/templates/view" element={<Templates/>} />               
            </Routes>
        </Suspense>
    );
};

export {Layout};