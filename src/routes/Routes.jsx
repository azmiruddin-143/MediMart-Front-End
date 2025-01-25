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
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import CategoryDetails from "../components/Home/CategoryDetails";
import PrivateRoute from "./PrivateRoute";
import SellerHomepage from "../pages/Dashboard/Seller/SellerHomepage";
import PaymentHistory from "../pages/Dashboard/Seller/PaymentHistory";
import UserPaymentHistory from "../pages/Dashboard/User/UserPaymentHistory";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import Checkout from "../pages/Checkout/Checkout";
import ChekOut from "../pages/Checkout/Checkout";
import Invoice from "../pages/Invoice/Invoice";
import RoleBasedRedirect from "../components/Shared/RoleBasedRedirect";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h1 className="text-red-700 text-4xl">Error page</h1>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: "/updateprofile",
        element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      },
      {
        path: "/shop",
        element: <Shop></Shop>
      },
      {
        path: "/cart",
        element: <Cart></Cart>
      },
      {
        path: "/chekout",
        element: <ChekOut></ChekOut>
      },
      
      {
        path: "/category/:categoryName",
        element: <CategoryDetails></CategoryDetails>
      }
    ]
  },

  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: '',
        element: <RoleBasedRedirect />,
      },
      {
        path: "adminhomepage",
        element: <PrivateRoute>
          <AdminRoute>
            <AdminHomePage></AdminHomePage>
          </AdminRoute>
        </PrivateRoute>,
      },

      {
        path: "manageusers",
        element:
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
      },
      {
        path: "managecategory",
        element: <ManageCategory></ManageCategory>,
      },
      {
        path: "paymentmanagement",
        element:
          <PrivateRoute>
            <AdminRoute>
              <PaymentManagement></PaymentManagement>
            </AdminRoute>
          </PrivateRoute>

        ,
      },
      {
        path: "salesreport",
        element:
          <PrivateRoute>
            <AdminRoute>
              <SalesReport></SalesReport>
            </AdminRoute>
          </PrivateRoute>
      },
      {
        path: "managebanner",
        element:
          <PrivateRoute>
            <AdminRoute>
              <ManageBanner></ManageBanner>
            </AdminRoute>
          </PrivateRoute>
        ,
      },

      // seller//

      {
        path: "askforadvertisement",
        element:
          <PrivateRoute>
            <SellerRoute>
              <AskForAdvertisement></AskForAdvertisement>
            </SellerRoute>
          </PrivateRoute>
      },
      {
        path: "managemedicines",
        element:
          <PrivateRoute>
            <SellerRoute>
              <ManageMedicines></ManageMedicines>
            </SellerRoute>
          </PrivateRoute>


      },
      {
        path: "sellerhomepage",
        element:
          <PrivateRoute>
            <SellerRoute>
              <SellerHomepage></SellerHomepage>
            </SellerRoute>
          </PrivateRoute>

      },
      {
        path: "paymenthistory",
        element:
          <PrivateRoute>
            <SellerRoute>
              <PaymentHistory></PaymentHistory>
            </SellerRoute>
          </PrivateRoute>

      },
      // user//
      {
        path: "userpaymenthistory",
        element: <UserPaymentHistory></UserPaymentHistory>
      },
    ]
  },

  {
    path: "/invoice/:transactionId",
    element: <Invoice></Invoice>
  },

]);



export default router