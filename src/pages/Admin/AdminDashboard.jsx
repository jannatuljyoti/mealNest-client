import React from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  IoPersonOutline,
  IoPeopleOutline,
  IoAddCircleOutline,
  IoListOutline,
  IoChatbubblesOutline,
  IoRestaurantOutline,
  IoTimeOutline,
  IoTimerOutline,
} from 'react-icons/io5';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ? 'text-orange-400 font-semibold flex items-center gap-2' : 'flex items-center gap-2'
            }
          >
            <IoPersonOutline size={20} />
            Admin Profile
          </NavLink>

          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              isActive ? 'text-orange-400 font-semibold flex items-center gap-2' : 'flex items-center gap-2'
            }
          >
            <IoPeopleOutline size={20} />
            Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/add-meal"
            className={({ isActive }) =>
              isActive ? 'text-orange-400 font-semibold flex items-center gap-2' : 'flex items-center gap-2'
            }
          >
            <IoAddCircleOutline size={20} />
            Add Meal
          </NavLink>

          <NavLink
            to="/dashboard/all-meals"
            className={({ isActive }) =>
              isActive ? 'text-orange-400 font-semibold flex items-center gap-2' : 'flex items-center gap-2'
            }
          >
            <IoListOutline size={20} />
            All Meals
          </NavLink>

          <NavLink
            to="/dashboard/all-reviews"
            className={({ isActive }) =>
              isActive ? 'text-orange-400 font-semibold flex items-center gap-2' : 'flex items-center gap-2'
            }
          >
            <IoChatbubblesOutline size={20} />
            All Reviews
          </NavLink>

          <NavLink
            to="/dashboard/serve-meals"
            className={({ isActive }) =>
              isActive ? 'text-orange-400 font-semibold flex items-center gap-2' : 'flex items-center gap-2'
            }
          >
            <IoRestaurantOutline size={20} />
            Serve Meals
          </NavLink>

          <NavLink
            to="/dashboard/upcoming-meals"
            className={({ isActive }) =>
              isActive ? 'text-orange-400 font-semibold flex items-center gap-2' : 'flex items-center gap-2'
            }
          >
            <IoTimerOutline size={20} />
            Upcoming Meals
          </NavLink>
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
