// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Button from './Button';
// import { toast } from 'react-hot-toast';
// import { useFormStore } from '../store/formstore';

// const CurrentState = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { title } = location.state || { title: 'Your Selected Journey' };
//   const { setCurrentState } = useFormStore();

//   const [formData, setFormData] = useState({
//     situation: '',
//     currentState: '',
//     holdingBack: '',
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.situation.trim()) newErrors.situation = 'This field is required.';
//     if (!formData.currentState.trim()) newErrors.currentState = 'This field is required.';
//     if (!formData.holdingBack.trim()) newErrors.holdingBack = 'This field is required.';
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) {
//       toast.error('Please fill in all required fields.');
//     }

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' });
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       setCurrentState(formData);
//       toast.success('Looks good! Moving to next step...');
//       navigate('/desired-future', { state: { title } });
//     }
//   };

//   return (
//     <section className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-12 overflow-x-hidden">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-3">
//           <div className="w-3 h-3 rounded-full bg-blue-600 animate-glowPulse" />
//           <p className="font-semibold text-sm uppercase animate-colorCycle">
//             Your Current Situation - <span className="text-blue-600">{title}</span>
//           </p>
//         </div>
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E1D] mt-2 leading-tight">
//           Tell us a bit about where you are right now
//         </h1>
//       </div>

//       {/* Textareas */}
//       <div className="flex flex-col gap-6">
//         {[
//           { name: 'situation', placeholder: 'What best describes your current situation?', rows: 3 },
//           { name: 'currentState', placeholder: 'Describe your current state', rows: 6 },
//           { name: 'holdingBack', placeholder: 'What’s holding you back?', rows: 5 },
//         ].map((field) => (
//           <div key={field.name}>
//             <textarea
//               rows={field.rows}
//               name={field.name}
//               placeholder={field.placeholder}
//               value={formData[field.name]}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-400 rounded-2xl text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder:text-[16px] transition-all resize-none"
//             />
//             {errors[field.name] && (
//               <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-wrap justify-between items-stretch gap-4 mt-10 w-full">
//         <Button
//           label="Go Back"
//           bgcolor="bg-[#0E0E1D]"
//           color="text-white"
//           className="flex-1 min-w-[45%] py-3.5 px-4"
//           onClick={() => navigate(-1)}
//         />
//         <Button
//           label="Continue"
//           bgcolor="bg-[#293C97]"
//           color="text-white"
//           className="flex-1 min-w-[45%] py-3.5 px-4"
//           onClick={handleSubmit}
//         />
//       </div>
//     </section>
//   );
// };

// export default CurrentState;
