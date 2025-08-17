import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { IoIosNotificationsOutline } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import MealNestLogo from "../mealnest/MealNestLogo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ✅ Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ✅ Apply DaisyUI theme
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };

  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-[#ec644b] font-semibold" : "")}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/meals" className={({ isActive }) => (isActive ? "text-[#ec644b] font-semibold" : "")}>
          Meals
        </NavLink>
      </li>
      <li>
        <NavLink to="/upcoming-meal" className={({ isActive }) => (isActive ? "text-[#ec644b] font-semibold" : "")}>
          Upcoming Meals
        </NavLink>
      </li>
    </>
  );

  const loggedInItems = (
    <>
      <li>
        <NavLink to="/faqs" className={({ isActive }) => (isActive ? "text-[#ec644b] font-semibold" : "")}>
          FAQs
        </NavLink>
      </li>
      <li>
        <NavLink to="/offer" className={({ isActive }) => (isActive ? "text-[#ec644b] font-semibold" : "")}>
          Offer
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full shadow-md">
      <div className="navbar bg-base-100 text-base-content px-4">
        {/* Left side */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
            </div>
            <ul tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10">
              {navItems}
              {user && loggedInItems}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost text-xl">
            <MealNestLogo />
          </Link>
        </div>

        {/* Middle - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
            {user && loggedInItems}
          </ul>
        </div>

        {/* Right side */}
        <div className="navbar-end flex items-center gap-3">
          {/* Theme Toggle */}
          <label className="swap swap-rotate cursor-pointer">
            <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
            {/* Sun icon */}
            <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <path
                d="M5.64 17.657l-1.414-1.414M12 5.5a6.5 6.5 0 110 13 6.5 6.5 0 010-13zm6.364 12.157l1.414-1.414M12 3V1m0 22v-2m9.657-9.657h2M1 12h2m13.95-4.95l1.414-1.414M7.05 16.95l-1.414 1.414"/>
            </svg>
            {/* Moon icon */}
            <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <path
                d="M21.752 15.002A9.718 9.718 0 0112.001 22 9.752 9.752 0 012.249 12.248 9.718 9.718 0 018.065 3.182a7.5 7.5 0 1013.687 11.82z"/>
            </svg>
          </label>

          <IoIosNotificationsOutline className="w-7 h-7 text-[#ec644b]" />

          {user ? (
            <div className="relative">
              <img
                src={user?.photoURL || "/user.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleUserMenu}
              />
              {showUserMenu && (
                <ul
                  className="absolute right-0 mt-2 w-48 bg-base-100 text-base-content shadow-lg rounded-lg p-2 z-50"
                >
                  <li className="px-2 py-1 font-semibold">
                    {user.displayName || "User"}
                  </li>
                  <li>
                    {isAdminLoading ? (
                      <span className="text-sm opacity-70">Checking Role...</span>
                    ) : (
                      <Link
                        to={isAdmin ? "/dashboard/profile" : "/user-dashboard"}
                        className="block px-2 py-1 text-sm hover:bg-base-200 rounded"
                      >
                        Dashboard
                      </Link>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left px-2 py-1 text-sm hover:bg-base-200 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/join-us" className="btn btn-primary text-xl">
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
