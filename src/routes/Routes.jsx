import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/Signup/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminHomePage from "../pages/Dashboard/Admin/AdminHomePage";
import PaymentManagement from "../pages/Dashboard/Admin/PaymentManagement";
import SalesReport from "../pages/Dashboard/Admin/SalesReport";
import ManageBanner from "../pages/Dashboard/Admin/ManageBanner";
import ManageCategory from "../pages/Dashboard/Admin/ManageCategory";
import AskForAdvertisement from "../pages/Dashboard/Seller/askForAdvertisement";
import ManageMedicines from "../pages/Dashboard/Seller/ManageMedicines";
import Home from "../components/Home/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement : <h1 className="text-red-700 text-4xl">Error page</h1>,
    children : [
      {
        path :'/',
        element : <Home></Home>
      },
      {
        path:"/signup",
        element: <SignUp></SignUp>
      },
      {
        path:"/signin",
        element: <SignIn></SignIn>
      },
      {
        path:"/updateprofile",
        element: <UpdateProfile></UpdateProfile>
      }
    ]
  },
  
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "adminhomepage",
        element: <AdminHomePage></AdminHomePage>,
      },
      
      {
        path: "manageusers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "managecategory",
        element: <ManageCategory></ManageCategory>,
      },
      {
        path: "paymentmanagement",
        element: <PaymentManagement></PaymentManagement>,
      },
      {
        path: "salesreport",
        element: <SalesReport></SalesReport>,
      },
      {
        path: "managebanner",
        element: <ManageBanner></ManageBanner>,
      },
      {
        path: "askforadvertisement",
        element: <AskForAdvertisement></AskForAdvertisement>
      },
      {
        path: "managemedicines",
        element: <ManageMedicines></ManageMedicines>
      },
    ]
  }

]);



export default router