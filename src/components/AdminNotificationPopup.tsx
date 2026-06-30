import React from "react";

const AdminNotificationPopup = ({ notifications, onClose }) => {
  return (
    <div className="absolute right-4 top-14 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {notifications.map((item, index) => (
          <div key={index} className="px-4 py-3 hover:bg-gray-50">
            <p className="text-sm text-gray-800">{item.message}</p>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{item.date}</span>
              <span>{item.timeAgo}</span>
            </div>
            <a
              href={item.link}
              className="text-blue-600 text-sm mt-1 inline-block hover:underline"
            >
              {item.actionText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotificationPopup;
