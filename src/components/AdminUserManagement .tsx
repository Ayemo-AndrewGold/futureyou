// import React from "react";
// import { CalendarIcon, UsersIcon, FilterIcon } from "lucide-react";
// import { USER_MANAGEMENT_TEXT } from "@/constants";


// const AdminUserManagement = () => {
//   return (
//     <main className="bg-white rounded-2xl p-6 shadow-sm">
//       <h1 className="text-2xl font-semibold mb-4">{USER_MANAGEMENT_TEXT.title}</h1>
//       <div className="mb-6">
//         <p className="text-4xl font-bold">{AdminCustomers.length}</p>
//         <p className="text-gray-500 text-sm">{USER_MANAGEMENT_TEXT.totalUsersLabel}</p>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-blue-500 text-white text-left">
//               {USER_MANAGEMENT_TEXT.tableHeaders.map((header, idx) => (
//                 <th
//                   key={idx}
//                   className={`px-4 py-3 ${
//                     idx === 0
//                       ? "rounded-tl-lg"
//                       : idx === USER_MANAGEMENT_TEXT.tableHeaders.length - 1
//                       ? "rounded-tr-lg"
//                       : ""
//                   }`}
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {AdminCustomers.map((user, idx) => (
//               <tr key={idx} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-3">{user.name}</td>
//                 <td className="px-4 py-3 text-blue-500">{user.email}</td>
//                 <td className="px-4 py-3">{user.path}</td>
//                 <td className="px-4 py-3 italic text-gray-600">{user.loan}</td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`flex items-center gap-1 ${
//                       user.status === "Active" ? "text-green-500" : "text-red-500"
//                     }`}
//                   >
//                     <span className="w-2 h-2 rounded-full bg-current"></span>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-blue-500 cursor-pointer">View</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// };

// export default AdminUserManagement;
