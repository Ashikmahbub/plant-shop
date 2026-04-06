import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = 'http://plants-shop.duckdns.org/api/admin/sales-statistics';

const SalesStatistics = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchSalesStatistics();
  }, []);

  const fetchSalesStatistics = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;

      // data is array of { _id: { month: N }, totalSales, orderCount }
      const formatted = data.map((item) => ({
        month: getMonthName(item._id.month),
        amount: item.totalSales,
        orders: item.orderCount,
      }));

      const revenue = data.reduce((sum, item) => sum + item.totalSales, 0);
      const orders  = data.reduce((sum, item) => sum + item.orderCount, 0);

      setSalesData(formatted);
      setTotalRevenue(revenue);
      setTotalOrders(orders);
    } catch (error) {
      toast.error('Failed to fetch sales statistics');
    }
  };

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1] || 'Unknown';
  };

  return (
    <div className="space-y-8">

      {/* Summary Cards */}
      <div className="bg-white shadow p-4 rounded mb-8">
        <h2 className="text-2xl font-bold mb-4">Sales Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-lg font-semibold">Total Revenue</h4>
            <p className="text-xl">৳ {totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-lg font-semibold">Total Orders</h4>
            <p className="text-xl">{totalOrders}</p>
          </div>
        </div>
      </div>

      {/* Monthly Sales Chart */}
      {salesData.length > 0 ? (
        <div className="bg-white shadow p-4 rounded mb-8">
          <h3 className="text-xl font-bold mb-4">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" name="Revenue (৳)" fill="#16a34a" />
              <Bar dataKey="orders" name="Orders" fill="#86efac" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-white shadow p-4 rounded text-center text-gray-500">
          No sales data available yet.
        </div>
      )}
    </div>
  );
};

export default SalesStatistics;