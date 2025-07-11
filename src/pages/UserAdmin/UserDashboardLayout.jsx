import React from 'react';
import { NavLink, Outlet } from 'react-router';



const UserDashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-100 p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Dashboard</h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/user-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-600 px-4 py-2 rounded block"
                    : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded block"
                }
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user-dashboard/requested-meals"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-600 px-4 py-2 rounded block"
                    : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded block"
                }
              >
                Requested Meals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user-dashboard/my-reviews"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-600 px-4 py-2 rounded block"
                    : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded block"
                }
              >
                My Reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user-dashboard/payment-history"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-600 px-4 py-2 rounded block"
                    : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded block"
                }
              >
                Payment History
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;