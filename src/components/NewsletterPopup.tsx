// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { subscribeToNewsletter } from "@/lib/api";
// import {
//   hasSubscribedToNewsletter,
//   markNewsletterSubscribed,
// } from "@/lib/newsletter";

// const SHOW_DELAY_MS = 30_000; // show 7 s after the page loads

// type State = "idle" | "loading" | "success" | "error";

// export default function NewsletterPopup() {
//   const [shouldRender, setShouldRender] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [state, setState] = useState<State>("idle");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Never show to visitors who already subscribed
//     if (hasSubscribedToNewsletter()) return;

//     const timer = setTimeout(() => {
//       setShouldRender(true);
//       // One extra tick so the mount and the transition class don't collide
//       requestAnimationFrame(() => setIsVisible(true));
//     }, SHOW_DELAY_MS);

//     return () => clearTimeout(timer);
//   }, []);

//   const closePopup = useCallback(() => {
//     setIsVisible(false);
//     // Wait for the CSS exit transition before unmounting
//     setTimeout(() => setShouldRender(false), 300);
//   }, []);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const trimmed = email.trim();
//     if (!trimmed) return;

//     setState("loading");
//     setMessage("");

//     try {
//       const res = await subscribeToNewsletter({ email: trimmed });
//       setMessage(res.message || "You're subscribed!");
//       setState("success");
//       setEmail("");
//       markNewsletterSubscribed();
//       // Auto-close after showing the success message
//       setTimeout(() => closePopup(), 2_500);
//     } catch (err: unknown) {
//       setMessage(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong. Please try again."
//       );
//       setState("error");
//     }
//   }

//   if (!shouldRender) return null;

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-label="Newsletter subscription"
//       className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out ${
//         isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       {/* Backdrop */}
//       <div
//         onClick={closePopup}
//         aria-hidden="true"
//         className="absolute inset-0 bg-[#080b1f]/60 backdrop-blur-sm"
//       />

//       {/* Card */}
//       <div
//         className={`relative w-full max-w-[400px] rounded-[28px] p-6 sm:p-7 overflow-hidden
//           border border-white/[0.08] shadow-[0_24px_70px_-12px_rgba(10,15,60,0.55)]
//           transition-all duration-300 ease-out
//           ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-3"}`}
//         style={{
//           background:
//             "linear-gradient(155deg, #2c3fa0 0%, #1f2c78 55%, #161f5c 100%)",
//         }}
//       >
//         {/* Texture blobs */}
//         <svg
//           className="absolute inset-0 w-full h-full opacity-[0.16] pointer-events-none"
//           viewBox="0 0 400 460"
//           fill="none"
//           preserveAspectRatio="xMidYMid slice"
//           aria-hidden="true"
//         >
//           <circle cx="40" cy="30" r="150" fill="#7C8BFF" />
//           <circle cx="380" cy="90" r="110" fill="#FBBF24" />
//           <circle cx="360" cy="420" r="170" fill="#4C5FD6" />
//         </svg>

//         {/* Top glass highlight */}
//         <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

//         {/* Close button */}
//         <button
//           onClick={closePopup}
//           aria-label="Close newsletter popup"
//           className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/[0.1] transition-colors"
//         >
//           <svg
//             className="w-4 h-4"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             aria-hidden="true"
//           >
//             <line x1="18" y1="6" x2="6" y2="18" />
//             <line x1="6" y1="6" x2="18" y2="18" />
//           </svg>
//         </button>

//         {/* Badge */}
//         <div className="relative inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] text-white text-[0.68rem] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4">
//           <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
//           Newsletter
//         </div>

//         {/* Heading */}
//         <h2 className="relative text-[1.3rem] font-extrabold text-white leading-snug mb-2 pr-4">
//           Stay updated with FutureYou
//         </h2>

//         <p className="relative text-white/55 text-[0.85rem] leading-relaxed mb-5">
//           Strategies, stories, and resources for people building their next
//           chapter straight to your inbox.
//         </p>

//         {/* Form */}
//         {state === "success" ? (
//           <div className="relative flex items-center gap-2 text-green-400 text-[0.85rem] font-semibold py-2">
//             <svg
//               className="w-4 h-4 shrink-0"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               aria-hidden="true"
//             >
//               <polyline points="20 6 9 17 4 12" />
//             </svg>
//             {message}
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 if (state === "error") { setState("idle"); setMessage(""); }
//               }}
//               placeholder="Enter your email address"
//               disabled={state === "loading"}
//               aria-label="Email address"
//               required
//               className="w-full h-11 px-3.5 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder:text-white/30 text-[0.85rem] focus:outline-none focus:border-yellow-400/50 focus:bg-white/[0.10] transition-all disabled:opacity-60"
//             />
//             <button
//               type="submit"
//               disabled={state === "loading"}
//               className="h-11 px-5 bg-yellow-400 text-[#071a0f] font-bold text-[0.85rem] rounded-xl hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(251,191,36,0.35)]"
//             >
//               {state === "loading" ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg
//                     className="animate-spin w-4 h-4"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     aria-hidden="true"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
//                     />
//                   </svg>
//                   Subscribing…
//                 </span>
//               ) : (
//                 "Subscribe"
//               )}
//             </button>

//             {state === "error" && message && (
//               <p className="flex items-center gap-1.5 text-red-400 text-[0.8rem] mt-1">
//                 <svg
//                   className="w-4 h-4 shrink-0"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   aria-hidden="true"
//                 >
//                   <circle cx="12" cy="12" r="10" />
//                   <line x1="12" y1="8" x2="12" y2="12" />
//                   <line x1="12" y1="16" x2="12.01" y2="16" />
//                 </svg>
//                 {message}
//               </p>
//             )}
//           </form>
//         )}

//         {/* Privacy note */}
//         <p className="relative text-white/25 text-[0.7rem] mt-4">
//           No spam. Unsubscribe anytime. Your data is protected.
//         </p>
//       </div>
//     </div>
//   );
// }
