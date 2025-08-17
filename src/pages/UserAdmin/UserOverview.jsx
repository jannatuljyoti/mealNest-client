import React from "react";
import { Card, CardContent } from "../../components/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const UserOverview = () => {
  
  const requestedMeals = 12;
  const pendingRequests = 3;
  const deliveredRequests = 9;
  const reviewsCount = 5;
  const totalPayments = 4;

  const chartData = [
    { name: "Requested Meals", value: requestedMeals },
    { name: "Pending Requests", value: pendingRequests },
    { name: "Delivered Requests", value: deliveredRequests },
    { name: "Reviews", value: reviewsCount },
    { name: "Payments", value: totalPayments },
  ];

  return (
    <div className="p-6 bg-base-100">
      <h2 className="text-2xl text-center font-bold mb-6">User Overview</h2>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Requested Meals</p>
            <p className="text-2xl font-bold">{requestedMeals}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Pending Requests</p>
            <p className="text-2xl font-bold">{pendingRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Delivered Requests</p>
            <p className="text-2xl font-bold">{deliveredRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Reviews</p>
            <p className="text-2xl font-bold">{reviewsCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold">Payments</p>
            <p className="text-2xl font-bold">{totalPayments}</p>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Bar Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserOverview;
