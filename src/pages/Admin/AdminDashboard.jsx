import React from 'react';
import { NavLink, Outlet } from 'react-router';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'text-orange-400 font-semibold' : ''}>Admin Profile</NavLink>
          <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
          <NavLink to="/dashboard/add-meal">Add Meal</NavLink>
          <NavLink to="/dashboard/all-meals">All Meals</NavLink>
          <NavLink to="/dashboard/all-reviews">All Reviews</NavLink>
          <NavLink to="/dashboard/serve-meals">Serve Meals</NavLink>
          <NavLink to="/dashboard/upcoming-meals">Upcoming Meals</NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
