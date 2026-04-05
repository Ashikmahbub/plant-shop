// src/components/Sidebar.js
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-green-800 text-white flex flex-col">
      <div className="p-6 text-3xl font-bold text-center">🌿 Plant Shop Admin</div>
      <nav className="mt-8 flex flex-col space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-6 rounded-lg"
              : "py-3 px-6 rounded-lg hover:bg-green-600 transition"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-6 rounded-lg"
              : "py-3 px-6 rounded-lg hover:bg-green-600 transition"
          }
        >
          ManageProducts
        </NavLink>
        <NavLink
          to="/adminorders"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-6 rounded-lg"
              : "py-3 px-6 rounded-lg hover:bg-green-600 transition"
          }
        >
          ManageOrders
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-6 rounded-lg"
              : "py-3 px-6 rounded-lg hover:bg-green-600 transition"
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-6 rounded-lg"
              : "py-3 px-6 rounded-lg hover:bg-green-600 transition"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/sales-summary"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-6 rounded-lg"
              : "py-3 px-6 rounded-lg hover:bg-green-600 transition"
          }
        >
          Sales Summary
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
