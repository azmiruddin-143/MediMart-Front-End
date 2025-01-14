import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/Signup/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminHomePage from "../pages/Dashboard/Admin/AdminHomePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement : <h1 className="text-red-700 text-4xl">Error page</h1>,
    children : [
      {
        path :'/',
        element : <h1></h1>
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
        path: "manageusers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "adminhomepage",
        element: <AdminHomePage></AdminHomePage>,
      },
    ]
  }

]);



export default router