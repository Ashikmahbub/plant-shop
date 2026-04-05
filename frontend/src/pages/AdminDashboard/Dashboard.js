// src/pages/Dashboard.js
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Admin/Navbar';
import { Outlet } from 'react-router-dom';  
import SalesStatistics from '../../components/Admin/SalesStatisctics';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar />
        <div className="p-8 bg-white flex-1 shadow-inner rounded-lg">
          <SalesStatistics></SalesStatistics>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
