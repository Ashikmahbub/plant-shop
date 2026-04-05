import { createBrowserRouter } from "react-router-dom";

import Home from '../pages/Home/Home';
import Main from "../layout/Main";
import User from '../pages/AdminDashboard/User';
import Categories from "../pages/Categories/Indoors";
import Dashboard from "../pages/AdminDashboard/Dashboard";

import Shop from "../pages/Shop/Shop";
import Indoor from "../pages/Indoor/Indoor";
import AddProduct from "../pages/AdminDashboard/AddProduct";
import ManageProducts from "../pages/AdminDashboard/ManageProducts";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import ThankYou from "../pages/Thankyou/ThankYou";
import OrderSummary from "../pages/OrderSummary/OrderSummary";

import OrderEdit from "../pages/AdminDashboard/OrderEdit";
import ManageOrders from "../pages/AdminDashboard/MangeOrders";

import SemiIndoorPlants from "../pages/Semi-Indoor/Semi-Indoor";
import Bonsai from "../pages/Bonsai/Bonsai";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

import PrivateRoute from '../components/PrivateRoute';  

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "categories",
          element: <Categories></Categories>,
        },
        {
          path: "shop",
          element: <Shop></Shop>,
        },
        {
          path: "indoor",
          element: <Indoor></Indoor>,
        },
        {
          path: "cart",
          element: <Cart></Cart>,
        },
        {
          path: "checkout",
          element: <Checkout></Checkout>,
        },
        {
          path: "thank-you/:orderId",
          element: <ThankYou />,
        },
        {
          path: "order-summary",
          element: <OrderSummary></OrderSummary>,
        },
        {
          path: "semi-indoor",
          element: <SemiIndoorPlants></SemiIndoorPlants>,
        },
        {
          path: "bonsai",
          element: <Bonsai></Bonsai>,
        },
        {
          path: "login",
          element: <LoginForm></LoginForm>,
        },
        {
          path: "signup",
          element: <SignUpForm></SignUpForm>,
        },

        // Admin routes wrapped in PrivateRoute
        {
          path: "admin",
          element: (
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          ),
        },
        {
          path: "addproducts",
          element: (
            <PrivateRoute>
              <AddProduct></AddProduct>
            </PrivateRoute>
          ),
        },
        {
          path: "users",
          element: (
            <PrivateRoute>
              <User></User>
            </PrivateRoute>
          ),
        },
        {
          path: "products",
          element: (
            <PrivateRoute>
              <ManageProducts></ManageProducts>
            </PrivateRoute>
          ),
        },
        {
          path: "adminorders",
          element: (
            <PrivateRoute>
              <ManageOrders></ManageOrders>
            </PrivateRoute>
          ),
        },
        {
          path: "/admin/orders/:orderId/edit",
          element: (
            <PrivateRoute>
              <OrderEdit></OrderEdit>
            </PrivateRoute>
          ),
        },
      ],
    },
  ]
);
