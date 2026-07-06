// import { CalendarIcon } from "lucide-react";
// import React, { useState } from "react";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Bar,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { moneybagIcon2, teacherIcon2 } from "../assets/icons";

// // Sample data (replace with API later)
// const chartData = [
//   { date: "Aug 1", newLoans: 12, newLogins: 30 },
//   { date: "Aug 2", newLoans: 18, newLogins: 42 },
//   { date: "Aug 3", newLoans: 9, newLogins: 38 },
//   { date: "Aug 4", newLoans: 25, newLogins: 55 },
//   { date: "Aug 5", newLoans: 15, newLogins: 28 },
//   { date: "Aug 6", newLoans: 22, newLogins: 60 },
//   { date: "Aug 7", newLoans: 19, newLogins: 40 },
// ];

// const Adminchart = () => {
//   const [activeRange, setActiveRange] = useState("7 Days");

//   return (
//     <main className="bg-white rounded-xl shadow-lg p-6 w-full border border-gray-100">
//       {/* Title */}
//       <h1 className="text-lg font-semibold mb-4 text-gray-900">
//         User Engagement Over Time
//       </h1>

//       {/* Top Row: Stat + Filter */}
//       <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//         {/* Stat */}
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">175 Loans</h2>
//           <p className="text-sm text-gray-500">
//             — New Loans vs. New Logins —
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="flex items-center gap-3 mt-3 sm:mt-0">
//           {["7 Days", "14 Days", "30 Days"].map((range) => (
//             <button
//               key={range}
//               onClick={() => setActiveRange(range)}
//               className={`px-3 py-1 text-sm rounded-lg transition ${
//                 activeRange === range
//                   ? "bg-blue-600 text-white shadow"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {range}
//             </button>
//           ))}
//           <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
//             <CalendarIcon className="w-4 h-4 text-gray-600" />
//           </button>
//         </div>
//       </section>

//       {/* Chart */}
//       <div className="w-full h-80">
//         <ResponsiveContainer>
//           <ComposedChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//             <XAxis dataKey="date" stroke="#6b7280" />
//             <YAxis stroke="#6b7280" />
//             <Tooltip
//               contentStyle={{
//                 borderRadius: "8px",
//                 backgroundColor: "#fff",
//                 border: "1px solid #e5e7eb",
//               }}
//             />
//             <Legend />
//             <Bar
//               dataKey="newLoans"
//               barSize={20}
//               fill="#2563eb"
//               radius={[6, 6, 0, 0]}
//               name="New Loans"
//             />
//             <Line
//               type="monotone"
//               dataKey="newLogins"
//               stroke="#10b981"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//               name="New Logins"
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Recent Activity */}
//       <section className="mt-8">
//         <h1 className="text-lg font-semibold text-gray-900 mb-4">
//           Recent Activity
//         </h1>

//         <div className="space-y-4">
//           {/* Activity Item */}
//           <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition border border-gray-100">
//             <img src={teacherIcon2} alt="" className="w-8 h-8" />
//             <div className="flex-1">
//               <p className="text-sm text-[#454545]">
//                 <span className="font-medium">Fatima Yusuf</span> booked a
//                 coaching session with Coach Amina.
//               </p>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>3:25 PM</span>
//                 <button className="text-blue-600 hover:underline">View</button>
//               </div>
//             </div>
//           </div>

//           {/* Activity Item */}
//           <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition border border-gray-100">
//             <img src={moneybagIcon2} alt="" className="w-8 h-8" />
//             <div className="flex-1">
//               <p className="text-sm text-[#454545]">
//                 <span className="font-medium">Jane Afolabi</span> applied for a
//                 ₦150,000 Business Loan.
//               </p>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>3:30 PM</span>
//                 <button className="text-blue-600 hover:underline">View</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Adminchart;
