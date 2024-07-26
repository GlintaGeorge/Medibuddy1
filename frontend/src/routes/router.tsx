import { Routes, Route } from "react-router-dom";
import ProtectedRoute, { AdminProtectedRoute, DoctorProtectedRoute } from "./ProtectedRoute";
import { DoctorPublicRoute, PublicRoute } from "./PublicRoutes";
import Loader from "../components/Shimmers/Loader";
import {Suspense, lazy} from "react";




//User
const Register = lazy(()=>import("../pages/user/Register"));
const VerifyOtp = lazy(()=>import("../pages/user/VerifyOTP"));
const NotFoundPage = lazy(() => import("../pages/Error404"));
const Login = lazy(()=>import("../pages/user/Login"));
const Home = lazy(() => import("../pages/user/Home"));
const ForgotPassword = lazy(() => import("../pages/user/forgotPassword"));
const ResetPassword = lazy(()=>import("../pages/user/resetPassword"));
const ProfileUser = lazy(()=>import("../pages/user/profile"));
const DoctorDetailsUser = lazy(()=>import("../pages/user/singleDoctorDetails"));
const DoctorList = lazy(()=>import("../pages/user/DoctorPage"));
const AppoinmentBookingPage = lazy(()=>import("../pages/user/Appointment"));
const AppoinmentOnlineBookingPage = lazy(()=>import("../pages/user/OnlineAppointment"));
const CheckoutPage = lazy(()=>import('../pages/user/CheckOutPage'))
const PaymentCompleted = lazy(() => import("../pages/user/paymentCompleted"));
const AppoinmentDetails = lazy(()=>import("../pages/user/appoinmentDetails"));
const AppoinmentListPage = lazy(()=>import("../pages/user/getAppointmentsAll"));
const WalletPage = lazy(()=>import("../pages/user/wallet"));
const Transaction = lazy(()=>import("../pages/user/walletTransation"));
const Chat = lazy(()=>import("../pages/user/chat"));
const PatientRights = lazy(()=>import("../pages/user/PatientRights"));
const AboutPage = lazy (()=> import('../pages/user/aboutUs'))
const ContactPage = lazy (()=> import('../pages/user/contactPage'))

//Doctor
const DoctorSignup = lazy(()=>import("../pages/doctor/doctorSignup"))
const EmailVerificationPage = lazy(() => import("../pages/doctor/emailVerification")); 
const DoctorLogin = lazy(()=>import("../pages/doctor/doctorLogin"))
const DoctorhomePage = lazy(()=>import("../pages/doctor/doctordashbord"))
const ProfileDoctor = lazy(()=>import("../pages/doctor/profile"));
const DoctorSlotPage = lazy(()=>import("../pages/doctor/slotPage"));
const DoctorStatus = lazy(()=>import("../pages/doctor/doctorStatus"));
const PatientListPage = lazy(()=>import("../pages/doctor/patientListPages"));
const SinglePagePatient =lazy(()=>import("../pages/doctor/singlePatientList"));
const DoctorChat=lazy(()=>import("../pages/doctor/chat"));

//admin
const AdminLogin = lazy(()=>import("../pages/admin/AdminLogin"));
const AdminDashboard = lazy(()=>import ("../pages/admin/AdminDashboard"));
const AdminUserList = lazy(()=>import ("../pages/admin/userList"));
const AdminDoctorList = lazy(()=>import ("../pages/admin/doctorList"));
const AdminDoctorDetails = lazy(()=>import ("../pages/admin/doctorDetails"));
const VerificationDoctor = lazy(()=>import("../pages/admin/verificationDoctor"));
const RequestedDoctors = lazy(()=>import("../pages/admin/requestedDoctors"))
const AdminDepartmentList = lazy(()=>import ("../pages/admin/departmentList"));
const AddDepartmentList = lazy(()=>import ("../pages/admin/AddDepartmentPage"));
const EditDepartment = lazy(()=>import("../pages/admin/editDepartment"))
export const MainRouter = () => {
    return (
        <>
            <Suspense fallback={<Loader />}> 
                <Routes>
                    
                    
                    {/* public userRoutes */}
                    
                    <Route path="/" element={<Home />} />
                    <Route path="/patientRights" element={<PatientRights />} />
                    <Route path="/aboutus" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="" element={<PublicRoute />}>
                    <Route path="/register" element={<Register />} />
                    <Route path ="/verify_otp" element={<VerifyOtp/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element ={<ForgotPassword/>} />
                    <Route path="/reset_password/:id" element ={<ResetPassword/>}/>
                    </Route>

                     {/* Protected user  route */}

                    <Route path="" element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<ProfileUser />} />
                    <Route path="/doctors/:id" element={<DoctorDetailsUser />} />
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/appoinmentOffline/:id" element={<AppoinmentBookingPage />} />
                    <Route path="/appoinmentOnline/:id" element={<AppoinmentOnlineBookingPage />} />
                    <Route path="/user/checkout/:id" element={<CheckoutPage />} />
                    <Route path="/payment_status/:id" element={<PaymentCompleted />} />
                    <Route path="/appoinmentDetails/:id" element={<AppoinmentDetails/>} />
                    <Route path ="/appoinmentlist" element={<AppoinmentListPage/>}/>
                    <Route path="/wallet" element={<WalletPage/>}/>
                     <Route path="/walletHistory" element={<Transaction/>}/>
                     <Route path="/chat" element={<Chat />} />
                    </Route>
                   
                    {/*Doctor Routes*/ }

                <Route path="/doctor" element={<DoctorhomePage/>}/>
                


                {/*Doctor Routes - public*/ }
                 <Route  element={<DoctorPublicRoute />}>
                 <Route path="/doctor/login" element={<DoctorLogin/>}/>
                {/* <Route path="/doctor" element={<DoctorhomePage/>}/> */}
                <Route path="/doctor/signup" element={<DoctorSignup/>}/>
                <Route path="/doctor/verify_token/:token" element ={<EmailVerificationPage/>}/>
                <Route path="/doctor/login" element={<DoctorLogin/>}/>
                 </Route>

                     {/*Doctor Routes - private*/ }
                    <Route path="" element={<DoctorProtectedRoute />}>
                    {/* <Route path="/doctor" element={<DoctorhomePage/>}/> */}
                    <Route path="/doctor/profile" element ={<ProfileDoctor/>}/>
                    <Route path="/doctor/slot" element ={<DoctorSlotPage/>}/>
                    <Route path="/doctor/status/:doctorId" element={<DoctorStatus/>}/>
                    <Route path="/doctor/patientList" element={<PatientListPage/>}/>
                    <Route path="/patient-details/:id" element={<SinglePagePatient/>} />
                    <Route path="/doctor/chat" element={<DoctorChat/>}/>
                    </Route>

                    {/*Admin Routes*/}

                    <Route path="" element={<PublicRoute />}>
                    <Route path="/admin/login" element={<AdminLogin/>}/>
                    </Route>

                    {/* admin protected Route  */}
                    <Route path="" element={<AdminProtectedRoute />}>
                    <Route path="/admin" element={<AdminDashboard/>}/>
                    <Route path="/admin/users" element={<AdminUserList/>}/>
                    <Route path="/admin/doctors" element={<AdminDoctorList/>}/>
                    <Route path="/admin/requesteddoctors" element={<RequestedDoctors/>}/>
                    <Route path="/admin/doctors/:id" element={<AdminDoctorDetails/>}/>
                    <Route path="/admin/doctors/:id/verification" element={<VerificationDoctor/>}/>
                    <Route path="/admin/department" element ={<AdminDepartmentList/>}/>
                    <Route path="/admin/addDepartment" element ={<AddDepartmentList/>}/>
                    <Route path="/admin/department/:id" element={<EditDepartment/>} />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />


                    </Routes>
            </Suspense> 
        </>
    );
};