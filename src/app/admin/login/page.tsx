"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { saveAdminSession, getAdminSession } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  /* Already logged in → redirect */
  useEffect(() => {
    if (getAdminSession()) router.replace(from);
  }, [from, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed."); return; }

      saveAdminSession({
        email,
        name: data.name ?? "Administrator",
        role: "superadmin",
        issuedAt: Date.now(),
      });
      router.replace(from);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel — branding ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-[#06091e] flex-col justify-between p-12">
        {/* Glows */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#293C97]/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-[#4a5fd4]/15 blur-[100px]" />
        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10">
          <Image src="/images/headerLogo.svg" width={130} height={40} alt="FutureYou" className="object-contain invert brightness-100" />
        </div>

        <div className="relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#818cf8]/70 mb-4">Admin Portal</p>
            <h1 className="font-lato font-extrabold text-[2.6rem] text-white leading-[1.08] tracking-tight">
              Manage Everything<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] to-[#c7d2fe]">From One Place</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="font-montserrat text-white/50 text-[15px] leading-relaxed max-w-sm">
            Blog posts, newsletter subscribers, contact messages, event registrations all in one secure, premium dashboard.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}
            className="flex flex-wrap gap-2 pt-2">
            {["Blog Management", "Newsletter", "Contacts", "Events", "Analytics"].map(tag => (
              <span key={tag} className="text-[11px] font-semibold text-white/60 bg-white/6 border border-white/10 px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10">
          <p className="text-white/20 text-xs">© 2026 Future You Limited. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right panel — form ────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F7F8FC]">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-[400px] space-y-8"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center">
            <Image src="/images/headerLogo.svg" width={130} height={40} alt="FutureYou Admin" className="object-contain" />
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-lato font-extrabold text-[1.75rem] text-[#0E0E1D] tracking-tight">Welcome back</h2>
            <p className="font-montserrat text-sm text-[#666] mt-1.5">Sign in to your admin account to continue.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#333]" htmlFor="email">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa]" />
                <input
                  id="email" type="email" autoComplete="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@futureyoulimited.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E5E7F2] bg-white text-[14px] text-[#0E0E1D] placeholder:text-[#bbb] outline-none focus:border-[#293C97] focus:ring-2 focus:ring-[#293C97]/15 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#333]" htmlFor="password">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa]" />
                <input
                  id="password" type={showPw ? "text" : "password"} autoComplete="current-password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-11 rounded-xl border border-[#E5E7F2] bg-white text-[14px] text-[#0E0E1D] placeholder:text-[#bbb] outline-none focus:border-[#293C97] focus:ring-2 focus:ring-[#293C97]/15 transition-all"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555] transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="text-red-500 shrink-0" />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="group relative overflow-hidden w-full h-11 bg-[#293C97] hover:bg-[#1e2d85] disabled:opacity-60 text-white font-bold text-[14px] rounded-xl transition-all duration-200 shadow-md shadow-[#293C97]/25 hover:shadow-lg hover:shadow-[#293C97]/35 hover:-translate-y-px mt-2"
            >
              <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-[#aaa]">
            Secure admin access · FutureYou Limited
          </p>
        </motion.div>
      </div>
    </div>
  );
}
