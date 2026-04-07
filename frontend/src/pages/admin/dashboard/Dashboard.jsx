import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/AdminNavbar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE SIDEBAR OVERLAY */}
      <div className={`
        fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden
        ${sidebarOpen ? 'block' : 'hidden'}
      `}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <div className={`
        fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-lg
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition duration-300
      `}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col w-full">

        {/* NAVBAR */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* CONTENT */}
        <div className="p-4 md:p-8 flex-1">
          <div className="bg-white rounded-lg shadow-inner p-4 md:p-6 h-full">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;