

import { createBrowserRouter, Navigate } from "react-router-dom";

import Main             from "../pages/Home/Main";

// ── Public ─────────────────────────────
import Home             from "../pages/Home/Home";
import Shop             from "../pages/Shop/Shop";
import Cart             from "../pages/Cart/Cart";

// ── Categories ─────────────────────────
import Categories       from "../pages/Categories/Indoors";
import SemiIndoor       from "../pages/Categories/SemiIndoors";

// ── Plants ─────────────────────────────
import Indoor           from "../pages/plants/Indoor";
import Bonsai           from "../pages/plants/Bonsai";
import Outdoor          from "../pages/plants/Outdoor";

// ── Checkout ───────────────────────────
import Checkout         from "../pages/Checkout/Checkout";
import OrderSummary     from "../pages/Checkout/OrderSummary";
import ThankYou         from "../pages/Checkout/ThankYou";

// ── Auth ───────────────────────────────
import LoginForm        from "../components/forms/LoginForm";
import SignUpForm       from "../components/forms/SignUpForm";

// ── Admin (FIXED CASE) ─────────────────
import Dashboard        from "../pages/admin/dashboard/Dashboard";
import AddProduct       from "../pages/admin/products/AddProduct";
import ManageProducts   from "../pages/admin/products/ManageProducts";
import ManageOrders     from "../pages/admin/orders/ManageOrders";
import OrderEdit        from "../pages/admin/orders/OrderEdit";
import AdminUser        from "../pages/admin/users/AdminUser";
import SalesStats       from "../pages/admin/sales/SalesStatistics";

// ── Private Route ──────────────────────
import PrivateRoute     from "../components/PrivateRoute";

const adminRoute = (el) => <PrivateRoute>{el}</PrivateRoute>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true,                element: <Home /> },
      { path: "shop",               element: <Shop /> },
      { path: "categories",         element: <Categories /> },
      { path: "indoor",             element: <Indoor /> },
      { path: "bonsai",             element: <Bonsai /> },
      { path: "outdoor",            element: <Outdoor /> },
      { path: "semi-indoor",        element: <SemiIndoor /> },
      { path: "cart",               element: <Cart /> },
      { path: "checkout",           element: <Checkout /> },
      { path: "order-summary",      element: <OrderSummary /> },
      { path: "thank-you/:orderId", element: <ThankYou /> },
      { path: "login",              element: <LoginForm /> },
      { path: "signup",             element: <SignUpForm /> },

      {
        path: "admin",
        element: adminRoute(<Dashboard />),
        children: [
          { index: true,                  element: <Navigate to="orders" replace /> },
          { path: "orders",               element: adminRoute(<ManageOrders />) },
          { path: "orders/:orderId/edit", element: adminRoute(<OrderEdit />) },
          { path: "products",             element: adminRoute(<ManageProducts />) },
          { path: "products/add",         element: adminRoute(<AddProduct />) },
          { path: "users",                element: adminRoute(<AdminUser />) },
          { path: "sales",                element: adminRoute(<SalesStats />) },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);