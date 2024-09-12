import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Testimonials from "../pages/Testimonials";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminPanel from "../pages/AdminPanel";
import AdminProduct from "../layout/AdminProduct";
import UserAccouts from "../layout/UserAccouts";
import AdminRoutes from "../protect/AdminRoutes";
import ProductDetails from "../pages/ProductDetails";
import ViewCart from "../pages/ViewCart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Page404 from "../pages/Page404";
import AdminDashboard from "../pages/AdminDashboard";
import UserProfile from "../pages/UserProfile";
import UserInformation from "../layout/UserInformation";
import UserOrders from "../layout/UserOrders";
import AdminOrderPage from "../layout/adminOrderPage";
import UserRoutes from "../protect/UserRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "testimonials",
        element: <Testimonials />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "connect",
        element: <Contact />,
      },
      {
        path:"product-details",
        element : <ProductDetails/>
      },
      {
        path : 'cart',
        element : <ViewCart/>
      },
      {
        path : 'checkout',
        element : <Checkout/>
      },
      {
        path:'success-order',
        element : <OrderSuccess/>
      },
      {
        path: "admin-panel",
        element:<AdminRoutes> <AdminPanel /></AdminRoutes> ,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "all-products",
            element: <AdminProduct />,
          },
          {
            path: "users",
            element: <UserAccouts />,
          },
          {
            path : "orders",
            element : <AdminOrderPage/>
          },
          {
            path : "analytics",
            element:<AdminDashboard/>
          }
        ],
      },
      {
        path :'user-profile',
        element :<UserRoutes><UserProfile/></UserRoutes> ,
        children : [
        {
          path:'',
          element : <UserInformation/>
         },
        {
          path:'user-information',
          element : <UserInformation/>
         },
         {
          path : "user-orders",
          element:<UserOrders/>
         }
      ]},
      {
        path : "*",
        element:<Page404/>
      }
    ],
  },
]);

export default router;
