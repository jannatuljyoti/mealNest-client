import React from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  IoPersonOutline,
  IoFastFoodOutline,
  IoChatbubbleEllipsesOutline,
  IoCardOutline,
  IoGridOutline
} from 'react-icons/io5';
import MealNestLogo from '../shared/mealnest/MealNestLogo';

const UserDashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white p-6 shadow-md">

     <div className='mb-7'>
        <MealNestLogo/>
    </div>

        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
  <IoGridOutline size={24} />
  User Dashboard
</h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <NavLink
  to="/user-dashboard"
  end
  className={({ isActive }) =>
    isActive
      ? "flex items-center gap-2 text-orange-400 font-semibold"
      : "flex items-center gap-2 text-white hover:text-orange-300"
  }
>
  <IoPersonOutline size={20} />
  My Profile
</NavLink>

            </li>

            <li>
              <NavLink
                to="/user-dashboard/request-meals"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-orange-400 font-semibold"
                    : "flex items-center gap-2 text-white hover:text-orange-300"
                }
              >
                <IoFastFoodOutline size={20} />
                Requested Meals
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/user-dashboard/my-reviews"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-orange-400 font-semibold"
                    : "flex items-center gap-2 text-white hover:text-orange-300"
                }
              >
                <IoChatbubbleEllipsesOutline size={20} />
                My Reviews
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/user-dashboard/payment-history"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-orange-400 font-semibold"
                    : "flex items-center gap-2 text-white hover:text-orange-300"
                }
              >
                <IoCardOutline size={20} />
                Payment History
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
