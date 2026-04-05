import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = 'https://plants-shop-server-rho.vercel.app/api/admin/sales-statistics';

const initialData = {
  daily: [
    { date: '2024-08-01', amount: 0 },
    { date: '2024-08-02', amount: 0 }
  ],
  weekly: [
    { week: 'Week 1', amount: 0 },
    { week: 'Week 2', amount: 0 }
  ],
  monthly: [
    { month: 'January', amount: 0 },
    { month: 'February', amount: 0 }
  ],
  summary: {
    totalRevenue: 0,
    totalOrders: 0
  }
};

const SalesStatistics = () => {
  const [salesData, setSalesData] = useState(initialData);

  useEffect(() => {
    fetchSalesStatistics();
  }, []);

  const fetchSalesStatistics = async () => {
    try {
      const response = await axios.get(API_URL);
      setSalesData(response.data);
    } catch (error) {
      toast.error('Failed to fetch sales statistics');
    }
  };

  const renderChart = (data, xAxisKey, title) => (
    <div className="bg-white shadow p-4 rounded mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Display Sales Summary */}
      <div className="bg-white shadow p-4 rounded mb-8">
        <h2 className="text-2xl font-bold mb-4">Sales Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-lg font-semibold">Total Revenue</h4>
            <p className="text-xl">${salesData.summary.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-lg font-semibold">Total Orders</h4>
            <p className="text-xl">{salesData.summary.totalOrders}</p>
          </div>
        </div>
      </div>

      {/* Render Charts */}
      {renderChart(salesData.daily, 'date', 'Daily Sales')}
      {renderChart(salesData.weekly, 'week', 'Weekly Sales')}
      {renderChart(salesData.monthly, 'month', 'Monthly Sales')}
    </div>
  );
};

export default SalesStatistics;
