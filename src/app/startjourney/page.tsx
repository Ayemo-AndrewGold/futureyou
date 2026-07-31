"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const E = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const BASE_STEPS = [{ label: "Service" }, { label: "About You" }, { label: "Confirm" }];
const LOAN_STEPS = [
  { label: "Service" }, { label: "Loan Type" },
  { label: "About You" }, { label: "Confirm" },
];

const TOP_SERVICES = [
  {
    id: "loans", label: "Loan Services"as string | null,
    desc: "Flexible financing solutions tailored to support individuals and businesses at every stage of growth.",
    hasSubStep: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="14" x2="8" y2="14" />
        <line x1="11" y1="14" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    id: "coaching", label: "Coaching", badge: null as string | null,
    desc: "Personalized coaching to help individuals, professionals, and business owners unlock their full potential.",
    hasSubStep: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: "consulting", label: "Consulting", badge: null as string | null,
    desc: "Strategic business consulting to help organizations improve performance and achieve sustainable growth.",
    hasSubStep: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const LOAN_PRODUCTS = [
  {
    id: "SME Term Loan", label: "SME Term Loan",
    desc: "Flexible term financing structured for small and medium enterprises at every stage of growth.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
  },
  {
    id: "Asset Financing", label: "Asset Financing",
    desc: "Acquire equipment, machinery, or vehicles your business needs without straining cash flow.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" /><rect x="9" y="11" width="14" height="10" rx="2" /></svg>,
  },
  {
    id: "Payday Loan", label: "Payday Loan",
    desc: "Short-term financial support to bridge income gaps and meet urgent obligations quickly.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    id: "LPO Financing", label: "LPO Financing",
    desc: "Fund local purchase orders so you can deliver on contracts and build a stronger track record.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /></svg>,
  },
];

/* ─── StepTracker ────────────────────────────────────────────── */
function StepTracker({ steps, current }: { steps: { label: string }[]; current: number }) {
  return (
    <div className="flex items-start justify-center gap-0 mb-12">
      {steps.map((step, i) => {
        const done = i + 1 < current;
        const active = i + 1 === current;
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300 ${done ? "bg-[#293C97] text-white" : active ? "bg-[#293C97] text-white ring-[5px] ring-[#293C97]/15" : "bg-white border-2 border-gray-200 text-gray-400"}`}>
                {done ? <svg viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="2 7 5.5 10.5 12 4" /></svg> : i + 1}
              </div>
              <span className={`text-[11px] font-semibold hidden sm:block whitespace-nowrap ${active ? "text-[#293C97]" : done ? "text-[#0E0E1D]" : "text-gray-400"}`}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-10 sm:w-16 h-[2px] mx-1.5 mb-4 rounded-full transition-colors duration-300 ${done ? "bg-[#293C97]" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── ServiceCard ────────────────────────────────────────────── */
function ServiceCard({ svc, selected, onClick }: { svc: typeof TOP_SERVICES[0]; selected: boolean; onClick: () => void }) {
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ y: -3 }} whileTap={{ scale: 0.985 }} transition={{ duration: 0.18 }} aria-pressed={selected}
      className={`relative w-full text-left rounded-2xl p-6 flex flex-col gap-5 border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/40 ${selected ? "bg-white border-[#293C97] shadow-[0_4px_24px_rgba(41,60,151,0.14)]" : "bg-white border-gray-100 shadow-sm hover:border-[#293C97]/30 hover:shadow-md"}`}>
      {svc.badge && <span className="absolute top-4 left-6 text-[10px] font-bold tracking-widest uppercase text-[#293C97] bg-[#EEF0FA] px-2.5 py-1 rounded-full">{svc.badge}</span>}
      <span className={`absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${selected ? "bg-[#293C97] scale-100" : "bg-gray-100 scale-90"}`}>
        <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="1.5 5 4 7.5 8.5 2.5" /></svg>
      </span>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${svc.badge ? "mt-5" : ""} ${selected ? "bg-[#293C97] text-white" : "bg-[#F3F4FA] text-[#293C97]"}`}>{svc.icon}</div>
      <div>
        <h3 className="font-lato font-bold text-[1.0625rem] text-[#0E0E1D] leading-snug mb-2">{svc.label}</h3>
        <p className="font-montserrat text-[13.5px] text-[#666] leading-relaxed">{svc.desc}</p>
      </div>
      {svc.hasSubStep && (
        <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#293C97]/60 mt-auto">
          <span>Choose a loan product</span>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M2 6h8M6 2l4 4-4 4" /></svg>
        </div>
      )}
    </motion.button>
  );
}

/* ─── LoanCard ───────────────────────────────────────────────── */
function LoanCard({ product, selected, onClick }: { product: typeof LOAN_PRODUCTS[0]; selected: boolean; onClick: () => void }) {
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }} transition={{ duration: 0.16 }} aria-pressed={selected}
      className={`relative w-full text-left rounded-2xl p-5 flex items-start gap-4 border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/40 ${selected ? "bg-white border-[#293C97] shadow-[0_4px_20px_rgba(41,60,151,0.12)]" : "bg-white border-gray-100 shadow-sm hover:border-[#293C97]/30 hover:shadow-md"}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${selected ? "bg-[#293C97] text-white" : "bg-[#F3F4FA] text-[#293C97]"}`}>{product.icon}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-lato font-bold text-[0.9375rem] text-[#0E0E1D] leading-snug mb-1">{product.label}</h3>
        <p className="font-montserrat text-[12.5px] text-[#777] leading-relaxed">{product.desc}</p>
      </div>
      <span className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${selected ? "border-[#293C97] bg-[#293C97]" : "border-gray-300"}`}>
        {selected && <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="1.5 5 4 7.5 8.5 2.5" /></svg>}
      </span>
    </motion.button>
  );
}

/* ─── PrimaryBtn ─────────────────────────────────────────────── */
function PrimaryBtn({ enabled, onClick, label = "Continue" }: { enabled: boolean; onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} disabled={!enabled}
      className={`group relative overflow-hidden inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm font-bold px-10 py-4 rounded-xl transition-all duration-200 ${enabled ? "bg-[#293C97] hover:bg-[#1e2d85] text-white shadow-lg shadow-[#293C97]/25 hover:shadow-[#293C97]/35 hover:-translate-y-px cursor-pointer" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
      {enabled && <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />}
      {label}
      {enabled && <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"><path d="M1 7h12M8 2l5 5-5 5" /></svg>}
    </button>
  );
}

/* ─── BackBtn ────────────────────────────────────────────────── */
function BackBtn({ onClick, label = "Go Back" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm font-semibold text-[#555] border-[1.5px] border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 px-8 py-4 rounded-xl transition-all duration-200">
      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M13 7H1M6 2L1 7l5 5" /></svg>
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
type View = "service" | "loan-product";

const StartJourneyPage: React.FC = () => {
  const router = useRouter();
  const [view, setView]               = useState<View>("service");
  const [selectedSvc, setSelectedSvc]   = useState<string | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  const steps   = view === "loan-product" ? LOAN_STEPS : BASE_STEPS;
  const current = view === "loan-product" ? 2 : 1;

  const handleServiceContinue = () => {
    if (!selectedSvc) return;
    if (selectedSvc === "loans") { setView("loan-product"); return; }
    const label = TOP_SERVICES.find(s => s.id === selectedSvc)?.label ?? selectedSvc;
    router.push(`/biodata?journey=${encodeURIComponent(label)}`);
  };

  const handleLoanContinue = () => {
    if (!selectedLoan) return;
    router.push(`/biodata?journey=${encodeURIComponent(selectedLoan)}`);
  };

  const handleLoanBack = () => { setView("service"); setSelectedLoan(null); };

  const selectedSvcLabel = TOP_SERVICES.find(s => s.id === selectedSvc)?.label;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F7F8FC] pt-[72px]">
        <div className="pointer-events-none absolute top-[72px] left-0 right-0 h-48 bg-gradient-to-b from-[#EEF0FA]/70 to-transparent" />
        <div className="relative max-w-screen-lg mx-auto px-4 sm:px-8 lg:px-12 pt-14 pb-24">

          {/* Step tracker */}
          <motion.div key={`tracker-${view}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <StepTracker steps={steps} current={current} />
          </motion.div>

          <AnimatePresence mode="wait">

            {/* ── SERVICE VIEW ── */}
            {view === "service" && (
              <motion.div key="service" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -32 }} transition={{ duration: 0.38, ease: E }}>
                {/* Hero text */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4, ease: E }}
                    className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#293C97]/70 mb-4">
                    Step 1 — Choose Your Service
                  </motion.p>
                  <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5, ease: E }}
                    className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.08] tracking-tight mb-4">
                    Choose the Right Service<br className="hidden sm:block" />
                    <span className="text-[#293C97]"> for Your Journey</span>
                  </motion.h1>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5, ease: E }}
                    className="font-montserrat text-base sm:text-[17px] text-[#666] leading-relaxed max-w-xl mx-auto">
                    Whether you need funding, strategic consulting, or professional coaching, we're here to help you take the next step with confidence.
                  </motion.p>
                </div>

                {/* Service cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
                  {TOP_SERVICES.map((svc, i) => (
                    <motion.div key={svc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.08, duration: 0.45, ease: E }}>
                      <ServiceCard svc={svc} selected={selectedSvc === svc.id} onClick={() => setSelectedSvc(svc.id)} />
                    </motion.div>
                  ))}
                </div>

                {/* Selection pill */}
                <div className="h-9 flex items-center justify-center mb-6">
                  <AnimatePresence mode="wait">
                    {selectedSvc ? (
                      <motion.span key="sel" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#293C97] bg-[#EEF0FA] border border-[#c7cef0] px-4 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#293C97]" />
                        {selectedSvcLabel}
                      </motion.span>
                    ) : (
                      <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-[#bbb]">
                        Select a service above to continue
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <BackBtn onClick={() => router.push("/")} />
                  <PrimaryBtn enabled={!!selectedSvc} onClick={handleServiceContinue} />
                </div>
              </motion.div>
            )}

            {/* ── LOAN PRODUCT VIEW ── */}
            {view === "loan-product" && (
              <motion.div key="loan" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }} transition={{ duration: 0.38, ease: E }}>
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4, ease: E }}
                    className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#293C97]/70 mb-4">
                    Step 2 — Select a Loan Product
                  </motion.p>
                  <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5, ease: E }}
                    className="font-lato font-extrabold text-[1.75rem] sm:text-[2.2rem] lg:text-[2.6rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-4">
                    Which Loan Product<br className="hidden sm:block" /> are you looking for?
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5, ease: E }}
                    className="font-montserrat text-base text-[#666] leading-relaxed max-w-lg mx-auto">
                    Choose the financing option that best matches your current needs. Our team will guide you through the process.
                  </motion.p>
                </div>

                {/* Loan product cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
                  {LOAN_PRODUCTS.map((product, i) => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.42, ease: E }}>
                      <LoanCard product={product} selected={selectedLoan === product.id} onClick={() => setSelectedLoan(product.id)} />
                    </motion.div>
                  ))}
                </div>

                {/* Selection pill */}
                <div className="h-9 flex items-center justify-center mb-6">
                  <AnimatePresence mode="wait">
                    {selectedLoan ? (
                      <motion.span key="loansel" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#293C97] bg-[#EEF0FA] border border-[#c7cef0] px-4 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#293C97]" />
                        {selectedLoan}
                      </motion.span>
                    ) : (
                      <motion.p key="loanhint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-[#bbb]">
                        Select a loan product above to continue
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <BackBtn onClick={handleLoanBack} />
                  <PrimaryBtn enabled={!!selectedLoan} onClick={handleLoanContinue} label="Continue to Application" />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default StartJourneyPage;
