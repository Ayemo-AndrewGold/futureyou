
// import Image from "next/image";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import Blog from "@/components/Blog";
// import Header from "@/components/Header";

// export const dynamic = 'force-dynamic';

// /* ── Types ── */
// interface Testimonial {
//   img:  | string;
//   label: string;
//   title: string;
//   text: string;
// }

// interface StudentCardProps {
//   student: Testimonial;
//   highlighted?: boolean;
// }

// /* ── Testimonial data ── */
// const CoachedStudentCard: Testimonial[] = [
//   {
//     img: "/images/fatimaImg.webp",
//     label: "Sarah Adeyemi",
//     title: "Life coaching client",
//     text: "FutureYou completely changed how I see myself. I went from feeling stuck to launching my business in 90 days. The coaching was genuinely transformative.",
//   },
//   {
//     img: "/images/danielImg.webp",
//     label: "James Okafor",
//     title: "Business coaching client",
//     text: "The mentorship I received helped me scale from solo freelancer to a team of 5 in under a year. I couldn't have done it without this community.",
//   },
//   {
//     img: "/images/ucheImg.webp",
//     label: "Amara Nwosu",
//     title: "Career transition client",
//     text: "I was terrified of switching careers at 35. FutureYou gave me the clarity and confidence to take the leap and I landed my dream role within 4 months.",
//   },
//   {
//     img: "/images/chrisImg.webp",
//     label: "David Eze",
//     title: "Personal growth client",
//     text: "The accountability and direction I got here is unlike anything I've experienced. I finally feel like I'm building a life I'm proud of.",
//   },
// ];

// /* ── Student Card ── */
// const StudentCard: React.FC<StudentCardProps> = ({ student, highlighted }) => (
//   <div
//     className={`flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex-1 min-w-[280px] ${
//       highlighted
//         ? "bg-[#EEF0FA] border-[#c7cef0]"
//         : "bg-white border-gray-100"
//     }`}
//   >
//     {/* Avatar + name */}
//     <div className="flex items-center gap-3">
//       <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#EEF0FA] shrink-0">
//         <Image
//           src={student.img}
//           alt={student.label}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <div>
//         <p className="font-lato font-bold text-sm text-[#0E0E1D] leading-none">
//           {student.label}
//         </p>
//         <p className="text-xs text-[#888] mt-0.5">{student.title}</p>
//         <p className="text-yellow-400 text-xs mt-0.5">★★★★★</p>
//       </div>
//     </div>

//     {/* Quote mark */}
//     <span className="font-serif text-4xl text-[#293C97]/20 leading-none -mb-2">
//       "
//     </span>

//     {/* Text */}
//     <p className="font-montserrat text-sm text-[#555] leading-relaxed">
//       {student.text}
//     </p>
//   </div>
// );

// /* ── Coaching Page ── */
// const CoachingPage: React.FC = () => {
//   return (
//     <>
//       <Header />

//       {/* ── Hero ── */}
//       <section
//         className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 flex flex-col xl:flex-row items-center gap-12"
//         data-aos="fade-up"
//       >
//         {/* Left */}
//         <div
//           className="w-full xl:w-1/2 flex flex-col gap-6"
//           data-aos="fade-right"
//           data-aos-delay="100"
//         >
//           {/* Social proof pill */}
//           <div className="inline-flex items-center gap-3 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full w-fit">
//             <div className="flex">
//               {["/images/fatimaImg.webp", "/images/danielImg.webp", "/images/ucheImg.webp"].map(
//                 (src, i) => (
//                   <div
//                     key={i}
//                     className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white"
//                     style={{ marginLeft: i > 0 ? "-8px" : "0" }}
//                   >
//                     <Image src={src} alt="member" fill className="object-cover" />
//                   </div>
//                 )
//               )}
//             </div>
//             <span className="text-xs font-semibold text-[#0E0E1D]">
//               5,000+ members
//             </span>
//           </div>

//           {/* Eyebrow */}
//           <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide w-fit">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
//             Coaching & Mentorship
//           </div>

//           <div>
//             <h1 className="font-lato font-extrabold text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem] text-[#0E0E1D] leading-[1.08] tracking-tight mb-4">
//               Grow, Reflect, and{" "}
//               <span className="text-[#293C97]">Transform</span>
//             </h1>
//             <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-lg">
//               Everything you need to keep growing all in one place. Real
//               stories from people who've walked the path before you, and daily
//               encouragement to keep going when it's hard.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <Link
//               href="/startjourney"
//               className="inline-flex items-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-sm shadow-[#293C97]/20"
//             >
//               Start your journey <span>→</span>
//             </Link>
//             <Link
//               href="/startjourney"
//               className="inline-flex items-center gap-2 text-[#293C97] border-[1.5px] border-[#293C97] hover:bg-[#293C97] hover:text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-all duration-200"
//             >
//               Meet the coaches
//             </Link>
//           </div>
//         </div>

//         {/* Right image */}
//         <div
//           className="w-full xl:w-1/2 flex justify-center"
//           data-aos="zoom-in"
//           data-aos-delay="200"
//         >
//           <div className="relative w-full max-w-[520px]">
//             <Image
//               src="/images/coachingPic.webp"
//               alt="Coaching at FutureYou"
//               width={600}
//               height={500}
//               className="w-full h-auto rounded-2xl object-cover shadow-sm"
//               priority
//             />
//             <div className="absolute bottom-5 left-5 bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
//               <div className="w-9 h-9 rounded-lg bg-[#EEF0FA] flex items-center justify-center shrink-0">
//                 <span className="text-base">⭐</span>
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-[#0E0E1D] leading-none">Top rated coaches</p>
//                 <p className="text-[11px] text-[#888] mt-0.5">★★★★★ 5.0</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Success Stories ── */}
//       <section
//         className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-13 sm:py-18"
//         data-aos="fade-up"
//       >
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
//             Success stories
//           </div>
//           <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] text-[#0E0E1D] leading-tight tracking-tight mb-3">
//             Real People.{" "}
//             <span className="text-[#293C97]">Real Change.</span>
//           </h2>
//           <p className="font-montserrat text-base sm:text-lg text-[#555] max-w-xl mx-auto leading-relaxed">
//             Read how others moved from stuck to stable and beyond.
//           </p>
//         </div>

//         {/* Top row — second card highlighted ✅ */}
//         <div
//           className="flex flex-col sm:flex-row gap-5 mb-5"
//           data-aos="fade-up"
//           data-aos-delay="100"
//         >
//           {CoachedStudentCard.slice(0, 2).map((student, i) => (
//             <StudentCard
//               key={i}
//               student={student}
//               highlighted={i === 1}   // ✅ i is 0 or 1 — correctly highlights second
//             />
//           ))}
//         </div>

//         {/* Bottom row — first card highlighted ✅ */}
//         <div
//           className="flex flex-col sm:flex-row gap-5"
//           data-aos="fade-up"
//           data-aos-delay="150"
//         >
//           {CoachedStudentCard.slice(2, 4).map((student, i) => (
//             <StudentCard
//               key={i}
//               student={student}
//               highlighted={i === 0}   // ✅ was i === 3, which is always false — fixed to i === 0
//             />
//           ))}
//         </div>

//         {/* CTA */}
//         {/* <div className="flex justify-center mt-12">
//           <Link
//             href="/start-journey"
//             className="inline-flex items-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-sm shadow-[#293C97]/20"
//           >
//             Begin your transformation <span>→</span>
//           </Link>
//         </div> */}
//       </section>

//       {/* ── Blog ── */}
//       <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 mb-16">
//         <Blog />
//       </div>

//       {/* ── Footer ── */}
//       <div className="relative w-full min-h-[420px] overflow-hidden">
//         <Image
//           src="/images/footer.webp"
//           alt="Footer background"
//           fill
//           className="object-cover"
//         />
//         <div className="relative z-10">
//           <Footer />
//         </div>
//       </div>
//     </>   // ✅ Proper fragment close — was </div> before
//   );
// };

// export default CoachingPage;