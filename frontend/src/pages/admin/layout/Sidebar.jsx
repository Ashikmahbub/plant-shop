import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  isActive
    ? "bg-green-700 text-white py-3 px-6 rounded-lg"
    : "py-3 px-6 rounded-lg hover:bg-green-600 transition";

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className="w-64 h-full md:h-screen bg-green-800 text-white flex flex-col">

      {/* HEADER */}
      <div className="p-6 text-2xl font-bold text-center border-b border-green-700">
        🌿 Admin
      </div>

      {/* MENU */}
      <nav className="mt-6 flex flex-col space-y-2 px-2">

        <NavLink to="/admin" className={linkClass} onClick={closeSidebar}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass} onClick={closeSidebar}>
          Manage Products
        </NavLink>

        <NavLink to="/admin/products/add" className={linkClass} onClick={closeSidebar}>
          Add Product
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass} onClick={closeSidebar}>
          Manage Orders
        </NavLink>

        <NavLink to="/admin/users" className={linkClass} onClick={closeSidebar}>
          Users
        </NavLink>

        <NavLink to="/admin/sales" className={linkClass} onClick={closeSidebar}>
          Sales Summary
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;