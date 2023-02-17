import React from 'react';
import { AiOutlineHome, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const AdminDashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <label
        htmlFor="dashboardDawer"
        tabIndex={2}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>

      <div className="drawer drawer-mobile">
        <input id="dashboardDawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-screen ">

          <Outlet></Outlet>
        </div>
        <div className="drawer-side shadow-md">
          <label htmlFor="dashboardDawer" className="drawer-overlay"></label>
          <ul className="p-4 w-80 menu bg-base-100">
            {" "}
            <li className="mb-1">
              <Link to="/dashboard" className="font-semibold">
                {" "}
                <AiOutlineHome />
                Home
              </Link>
            </li>
            <li className="mb-1">
              <Link to="/dashboard/user" className="font-semibold">
                {" "}
                <AiOutlineUser />
                User
              </Link>
            </li>


          </ul>
        </div>
      </div>


    </div>
  );
};

export default AdminDashboard;