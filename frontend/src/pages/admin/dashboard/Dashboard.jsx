import { Outlet, useMatch } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/AdminNavbar';
import SalesStatistics from '../sales/SalesStatistics';

const Dashboard = () => {
  const isIndex = useMatch('/admin');  // only show stats on /admin exactly

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar />
        <div className="p-8 bg-white flex-1 shadow-inner rounded-lg">
          {isIndex && <SalesStatistics />}  {/* only on /admin */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;