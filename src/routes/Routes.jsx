import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement : <h1 className="text-red-700 text-4xl">Error page</h1>,
    children : [
      {
        path :'/',
        element : <h1>gbdfxb</h1>
      }
    ]
  },
]);

export default router