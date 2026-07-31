"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Lock, Bell, Globe, Save, Eye, EyeOff,
  CheckCircle, AlertCircle, Moon, Sun, Palette,
} from "lucide-react";
import { useAdmin } from "../layout";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border p-6 ${className}`}
      style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-[#EEF0FA] flex items-center justify-center">
        <Icon size={17} className="text-[#293C97]" />
      </div>
      <div>
        <h2 className="font-lato font-bold text-[0.95rem]" style={{ color: "var(--admin-text)" }}>{title}</h2>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: "var(--admin-muted)" }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-semibold" style={{ color: "var(--admin-text)" }}>{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full h-10 px-4 rounded-xl border text-sm outline-none transition-colors focus:border-[#293C97] focus:ring-2 focus:ring-[#293C97]/15";

export default function AdminSettingsPage() {
  const { theme, toggleTheme, session } = useAdmin();

  const [name,        setName]        = useState(session?.name ?? "Administrator");
  const [email,       setEmail]       = useState(session?.email ?? "admin@futureyoulimited.com");
  const [currentPw,   setCurrentPw]   = useState("");
  const [newPw,       setNewPw]       = useState("");
  const [confirmPw,   setConfirmPw]   = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastMsg,    setToastMsg]    = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [notifs,      setNotifs]      = useState({ newSubscriber: true, newMessage: true, newRegistration: true, published: false });

  const toast = (type: "ok" | "err", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast("ok", "Profile updated successfully.");
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPw) { toast("err", "Please enter your current password."); return; }
    if (newPw.length < 8) { toast("err", "New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { toast("err", "Passwords do not match."); return; }
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    toast("ok", "Password changed successfully.");
  };

  return (
    <div className="space-y-6 max-w-[860px]">
      {/* Header */}
      <div>
        <h1 className="font-lato font-extrabold text-[1.5rem] tracking-tight" style={{ color: "var(--admin-text)" }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--admin-muted)" }}>Manage your account preferences and security.</p>
      </div>

      {/* Toast */}
      {toastMsg && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-md ${
            toastMsg.type === "ok" ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"
          }`}>
          {toastMsg.type === "ok"
            ? <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            : <AlertCircle size={16} className="text-red-500 shrink-0" />}
          <p className={`text-sm font-medium ${toastMsg.type === "ok" ? "text-emerald-700" : "text-red-600"}`}>{toastMsg.text}</p>
        </motion.div>
      )}

      {/* Profile */}
      <Card>
        <SectionTitle icon={User} title="Profile" subtitle="Update your display name and email." />
        <form onSubmit={saveProfile} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Display Name">
              <input value={name} onChange={e => setName(e.target.value)} className={inputCls}
                style={{ background: "var(--admin-hover)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
            </Field>
            <Field label="Email Address">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputCls}
                style={{ background: "var(--admin-hover)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
            </Field>
          </div>
          <Field label="Role">
            <div className="flex items-center h-10 px-4 rounded-xl border text-sm"
              style={{ background: "var(--admin-hover)", borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
              Super Administrator
            </div>
          </Field>
          <div className="pt-1">
            <button type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold transition-colors shadow-md shadow-[#293C97]/25">
              <Save size={14} /> Save Profile
            </button>
          </div>
        </form>
      </Card>

      {/* Password */}
      <Card>
        <SectionTitle icon={Lock} title="Change Password" subtitle="Use a strong password of at least 8 characters." />
        <form onSubmit={savePassword} className="space-y-4">
          {[
            { label: "Current Password", value: currentPw, set: setCurrentPw, show: showCurrent, toggle: () => setShowCurrent(v => !v) },
            { label: "New Password",     value: newPw,     set: setNewPw,     show: showNew,     toggle: () => setShowNew(v => !v) },
            { label: "Confirm Password", value: confirmPw, set: setConfirmPw, show: showConfirm, toggle: () => setShowConfirm(v => !v) },
          ].map(({ label, value, set, show, toggle }) => (
            <Field key={label} label={label}>
              <div className="relative">
                <input type={show ? "text" : "password"} value={value} onChange={e => set(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputCls} pr-10`}
                  style={{ background: "var(--admin-hover)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
                <button type="button" onClick={toggle}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--admin-muted)" }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>
          ))}
          {newPw && newPw.length < 8 && (
            <p className="text-xs text-amber-600">Password must be at least 8 characters.</p>
          )}
          {confirmPw && newPw !== confirmPw && (
            <p className="text-xs text-red-500">Passwords do not match.</p>
          )}
          <div className="pt-1">
            <button type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold transition-colors shadow-md shadow-[#293C97]/25">
              <Lock size={14} /> Update Password
            </button>
          </div>
        </form>
      </Card>

      {/* Notifications */}
      <Card>
        <SectionTitle icon={Bell} title="Notifications" subtitle="Choose when you receive alerts." />
        <div className="space-y-4">
          {[
            { key: "newSubscriber",    label: "New newsletter subscriber" },
            { key: "newMessage",       label: "New contact message" },
            { key: "newRegistration",  label: "New event registration" },
            { key: "published",        label: "Blog post published" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>{label}</p>
              <button
                onClick={() => setNotifs(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifs] }))}
                className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 ${
                  notifs[key as keyof typeof notifs] ? "bg-[#293C97]" : ""
                }`}
                style={!notifs[key as keyof typeof notifs] ? { background: "var(--admin-border)" } : {}}
                aria-checked={notifs[key as keyof typeof notifs]} role="switch" aria-label={label}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  notifs[key as keyof typeof notifs] ? "translate-x-[22px]" : "translate-x-0.5"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <SectionTitle icon={Palette} title="Appearance" subtitle="Customize how the dashboard looks." />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>Theme</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--admin-muted)" }}>
              Currently: <span className="font-semibold capitalize">{theme}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-xl border" style={{ borderColor: "var(--admin-border)", background: "var(--admin-hover)" }}>
            {(["light", "dark"] as const).map(t => (
              <button key={t} onClick={() => t !== theme && toggleTheme()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  theme === t ? "bg-[#293C97] text-white shadow-sm" : ""
                }`}
                style={theme !== t ? { color: "var(--admin-muted)" } : {}}>
                {t === "light" ? <Sun size={13} /> : <Moon size={13} />} {t}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Site info */}
      <Card>
        <SectionTitle icon={Globe} title="Site Information" />
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Site Name",    value: "Future You Limited" },
            { label: "Site URL",     value: "futureyoulimited.com" },
            { label: "Admin Email",  value: "admin@futureyoulimited.com" },
            { label: "Time Zone",    value: "Africa/Lagos (WAT, UTC+1)" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--admin-muted)" }}>{label}</p>
              <p className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
