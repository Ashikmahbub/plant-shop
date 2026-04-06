import { createBrowserRouter, Navigate } from "react-router-dom";

import Main from "../layout/Main";

// Public pages
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Indoor from "../pages/Indoor/Indoor";
import SemiIndoorPlants from "../pages/Semi-Indoor/Semi-Indoor";
import Bonsai from "../pages/Bonsai/Bonsai";
import Categories from "../pages/Categories/Indoors";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import ThankYou from "../pages/Thankyou/ThankYou";
import OrderSummary from "../pages/OrderSummary/OrderSummary";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

// Admin pages
import Dashboard from "../pages/AdminDashboard/Dashboard";
import AddProduct from "../pages/AdminDashboard/AddProduct";
import ManageProducts from "../pages/AdminDashboard/ManageProducts";
import ManageOrders from "../pages/AdminDashboard/MangeOrders";
import OrderEdit from "../pages/AdminDashboard/OrderEdit";
import User from "../pages/AdminDashboard/User";

import PrivateRoute from "../components/PrivateRoute";

const adminRoute = (element) => <PrivateRoute>{element}</PrivateRoute>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      // ── Public routes ──────────────────────────────────────────
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "shop",       element: <Shop /> },
      { path: "indoor",     element: <Indoor /> },
      { path: "semi-indoor", element: <SemiIndoorPlants /> },
      { path: "bonsai",     element: <Bonsai /> },
      { path: "cart",       element: <Cart /> },
      { path: "checkout",   element: <Checkout /> },
      { path: "order-summary", element: <OrderSummary /> },
      { path: "thank-you/:orderId", element: <ThankYou /> },
      { path: "login",      element: <LoginForm /> },
      { path: "signup",     element: <SignUpForm /> },

      // ── Admin routes (/admin/*) ────────────────────────────────
      {
        path: "admin",
        element: adminRoute(<Dashboard />),
        children: [
          { index: true,                        element: <Navigate to="orders" replace /> },
          { path: "add-product",                element: adminRoute(<AddProduct />) },
          { path: "users",                      element: adminRoute(<User />) },
          { path: "products",                   element: adminRoute(<ManageProducts />) },
          { path: "orders",                     element: adminRoute(<ManageOrders />) },
          { path: "orders/:orderId/edit",       element: adminRoute(<OrderEdit />) },
        ],
      },

      // ── Catch-all 404 ─────────────────────────────────────────
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);