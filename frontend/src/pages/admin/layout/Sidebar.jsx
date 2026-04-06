import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  isActive
    ? "bg-green-700 text-white py-3 px-6 rounded-lg"
    : "py-3 px-6 rounded-lg hover:bg-green-600 transition";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-green-800 text-white flex flex-col">
      <div className="p-6 text-3xl font-bold text-center">🌿 Plant Shop Admin</div>
      <nav className="mt-8 flex flex-col space-y-2">
        <NavLink to="/admin"                className={linkClass}>Dashboard</NavLink>
        <NavLink to="/admin/products"       className={linkClass}>Manage Products</NavLink>
        <NavLink to="/admin/products/add"   className={linkClass}>Add Product</NavLink>
        <NavLink to="/admin/orders"         className={linkClass}>Manage Orders</NavLink>
        <NavLink to="/admin/users"          className={linkClass}>Users</NavLink>
        <NavLink to="/admin/sales"          className={linkClass}>Sales Summary</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;