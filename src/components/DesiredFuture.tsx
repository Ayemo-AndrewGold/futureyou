// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import Button from './Button';
// import { useFormStore } from '../store/formstore';

// const DesiredFuture = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { title } = location.state || {};
//   const { setDesiredFuture } = useFormStore();

//   const [formData, setFormData] = useState({
//     desiredTransformation: '',
//     lifeAfter: '',
//     preferredSupport: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.desiredTransformation.trim()) newErrors.desiredTransformation = 'This field is required.';
//     if (!formData.lifeAfter.trim()) newErrors.lifeAfter = 'This field is required.';
//     if (!formData.preferredSupport.trim()) newErrors.preferredSupport = 'This field is required.';
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) toast.error('Please fill in all required fields.');
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!title) {
//       toast.error('Something went wrong. Please restart your journey.');
//       return;
//     }

//     if (validate()) {
//       setDesiredFuture(formData);
//       toast.success('Nice one! Final step ahead.');

//       const routeMap = {
//         'Career Change': '/path-up-close-career',
//         'Business Funding': '/path-up-close-business',
//         'Personal Growth': '/path-up-close-growth',
//         'Special Recovery': '/path-up-close-recovery',
//       };

//       const nextRoute = routeMap[title.trim()];
//       if (nextRoute) navigate(nextRoute, { state: { title } });
//       else toast.error('Invalid journey path. Please go back and choose again.');
//     }
//   };

//   return (
//     <section className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-12">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-3">
//           <div className="w-3 h-3 rounded-full bg-blue-600 animate-glowPulse" />
//           <p className="font-semibold text-sm uppercase animate-colorCycle">
//             Your Desired Future - <span className="text-blue-600">{title || 'Your Journey'}</span>
//           </p>
//         </div>
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E1D] mt-2 leading-tight">
//           Paint a picture of your dream outcome
//         </h1>
//       </div>

//       {/* Textareas */}
//       <div className="flex flex-col gap-6">
//         {[
//           { name: 'desiredTransformation', placeholder: 'What would life look like after this transformation?', rows: 3, maxLength: 300 },
//           { name: 'lifeAfter', placeholder: 'In 6–12 months, where would you like to be?', rows: 5, maxLength: 400 },
//           { name: 'preferredSupport', placeholder: 'What kind of help do you need most?', rows: 4, maxLength: 200 },
//         ].map((field) => (
//           <div key={field.name}>
//             <textarea
//               rows={field.rows}
//               name={field.name}
//               placeholder={field.placeholder}
//               value={formData[field.name]}
//               onChange={handleChange}
//               maxLength={field.maxLength}
//               className="w-full px-4 py-3 border border-gray-400 rounded-2xl text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder:text-[16px] transition-all resize-none"
//             />
//             {errors[field.name] && (
//               <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
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

// export default DesiredFuture;
