import React from 'react';
import { Card, CardContent } from '../../components/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminOverview = () => {
  
  const overview = {
    totalUsers: 120,
    totalMeals: 80,
    totalRequests: 200,
    totalReviews: 50,
    totalPayments: 150,
  };

  const chartData = [
    { name: 'Users', value: overview.totalUsers },
    { name: 'Meals', value: overview.totalMeals },
    { name: 'Requests', value: overview.totalRequests },
    { name: 'Reviews', value: overview.totalReviews },
    { name: 'Payments', value: overview.totalPayments },
  ];

  return (
    <div className="p-6 bg-base-100">
      <h2 className="text-2xl text-center font-bold mb-6">Admin Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Total Users</p>
            <p className="text-2xl font-bold">{overview.totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Total Meals</p>
            <p className="text-2xl font-bold">{overview.totalMeals}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Total Requests</p>
            <p className="text-2xl font-bold">{overview.totalRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Total Reviews</p>
            <p className="text-2xl font-bold">{overview.totalReviews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Total Payments</p>
            <p className="text-2xl font-bold">${overview.totalPayments}</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminOverview;
