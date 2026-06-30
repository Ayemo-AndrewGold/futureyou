import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { futureyouLogo } from "../assets/images";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import {
  homeIcon,
  moneybagIcon,
  notificationIcon,
  teacherIcon,
  userlistIcon,
} from "../assets/icons";
import NotificationPopup from "./AdminNotificationPopup";
import { adminNotifications } from "../constants";

const AdminHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const links = [
    { to: "/admin-dashboard", icon: <img src={homeIcon} className="w-5 h-5" alt="Home" />, label: "Home" },
    { to: "/admin-users", icon: <img src={userlistIcon} className="w-5 h-5" alt="Users" />, label: "Users" },
    { to: "/admin-coach", icon: <img src={teacherIcon} className="w-5 h-5" alt="Coaches" />, label: "Coaches" },
    { to: "/admin-loan", icon: <img src={moneybagIcon} className="w-5 h-5" alt="Loans" />, label: "Loans" },
    { to: "/admin-setting", icon: <Cog6ToothIcon className="w-5 h-5" />, label: "Settings" },
  ];

  return (
    <header className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-3 bg-[#0F1636] text-white flex items-center">
      {/* LEFT - Logo */}
      <div className="flex items-center z-20">
        <img src={futureyouLogo} alt="Future You Logo" className="w-32 h-auto" />
      </div>

      {/* CENTER - Nav */}
      <nav
        className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex items-center gap-4"
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive ? "bg-[#293C97] text-white" : "hover:bg-white/10 text-gray-300"
                }`}
              >
                {link.icon}
                {isActive && (
                  <span className="text-sm font-medium select-none">{link.label}</span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* RIGHT - Notification + Avatar */}
      <div className="ml-auto flex items-center gap-4 z-20 relative">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-white/10 transition"
          aria-label="Notifications"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          <img src={notificationIcon} alt="Notification" className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#0F1636]" />
        </button>

        {showNotifications && (
          <NotificationPopup
            notifications={adminNotifications}
            onClose={() => setShowNotifications(false)}
          />
        )}

        {/* Avatar */}
        <button
          className="p-0 rounded-full hover:scale-105 transition"
          aria-label="User menu"
        >
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-white"
          />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
