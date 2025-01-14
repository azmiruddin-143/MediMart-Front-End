import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/Signup/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement : <h1 className="text-red-700 text-4xl">Error page</h1>,
    children : [
      {
        path :'/',
        element : <h1>gbdfxb</h1>
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
]);

export default router