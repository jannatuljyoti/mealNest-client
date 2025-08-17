import React, { useState } from 'react';
import MealNestLogo from '../shared/mealnest/MealNestLogo';
import { NavLink, Outlet } from 'react-router';
import {
  IoMenu,
  IoPersonOutline,
  IoPeopleOutline,
  IoAddCircleOutline,
  IoListOutline,
  IoChatbubblesOutline,
  IoRestaurantOutline,
  IoTimerOutline,
} from 'react-icons/io5';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 flex flex-col transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        <MealNestLogo />
        <h2 className="text-xl font-bold mb-6 mt-4">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          {[
            { to: '/dashboard/profile', label: 'Admin Profile', icon: IoPersonOutline },
            { to: '/dashboard/manage-users', label: 'Manage Users', icon: IoPeopleOutline },
            { to: '/dashboard/add-meal', label: 'Add Meal', icon: IoAddCircleOutline },
            { to: '/dashboard/all-meals', label: 'All Meals', icon: IoListOutline },
            { to: '/dashboard/all-reviews', label: 'All Reviews', icon: IoChatbubblesOutline },
            { to: '/dashboard/serve-meals', label: 'Serve Meals', icon: IoRestaurantOutline },
            { to: '/dashboard/upcoming-meals', label: 'Upcoming Meals', icon: IoTimerOutline },
            { to: '/dashboard/admin-overview', label: 'AdminOverview', icon: IoTimerOutline },
          ].map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-400 font-semibold flex items-center gap-2'
                  : 'flex items-center gap-2'
              }
              onClick={() => setOpen(false)}
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden mb-4 text-gray-800"
          onClick={() => setOpen(!open)}
        >
          <IoMenu size={28} />
        </button>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
