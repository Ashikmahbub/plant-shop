import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/AdminNavbar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar />
        <div className="p-8 bg-white flex-1 shadow-inner rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;