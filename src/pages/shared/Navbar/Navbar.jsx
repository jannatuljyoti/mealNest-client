import React from 'react';
import { Link, NavLink } from 'react-router';
import MealNestLogo from '../mealnest/MealNestLogo';
import { IoIosNotificationsOutline } from 'react-icons/io';

const Navbar = () => {
    const navItems= <>
      <li><NavLink to="/" 
      className={({isActive})=>
      isActive? "text-[#ec644b] text-xl font-semibold": ""}>Home</NavLink></li>
      <li><NavLink to="/meals" className={({isActive})=>
      isActive? "text-[#ec644b] text-xl font-semibold": ""}>Meals</NavLink></li>
      <li><NavLink to="/upcoming-meals" className={({isActive})=>
      isActive? "text-[#ec644b] text-xl font-semibold": ""}>Upcoming Meals</NavLink></li>
        
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {navItems}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">
      <MealNestLogo></MealNestLogo>
    </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navItems}
    </ul>
  </div>
  <div className="navbar-end gap-2">
      <p><IoIosNotificationsOutline className='w-8 h-8 text-[#ec644b]'/></p>
    <Link to="/login" className="btn bg-[#ec644b] text-xl text-white">Join Us</Link>
  </div>
</div>
    );
};

export default Navbar;