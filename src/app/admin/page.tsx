"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  FileText, Mail, MessageSquare, CalendarDays, TrendingUp,
  Eye, ArrowUpRight, Clock, CheckCircle, RefreshCw,
} from "lucide-react";
import { getPosts } from "@/lib/api";
import type { PostListItem } from "@/lib/types";
import { useAdmin } from "./layout";

/* ─── Shared card wrapper ─────────────────────────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-md ${className}`}
      style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}
    >
      {children}
    </div>
  );
}

/* ─── KPI card ────────────────────────────────────────────── */
function KpiCard({
  label, value, delta, icon: Icon, color, href, loading,
}: {
  label: string; value: string | number; delta?: string;
  icon: React.ElementType; color: string; href: string; loading?: boolean;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border p-5 cursor-pointer transition-all duration-200 hover:shadow-lg group"
        style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${color}18` }}
          >
            <Icon size={18} style={{ color }} />
          </div>
          <ArrowUpRight
            size={15}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color }}
          />
        </div>
        {loading ? (
          <div className="space-y-2">
            <div className="h-7 w-16 rounded-lg animate-pulse" style={{ background: "var(--admin-hover)" }} />
            <div className="h-3.5 w-24 rounded animate-pulse" style={{ background: "var(--admin-hover)" }} />
          </div>
        ) : (
          <>
            <p className="font-lato font-extrabold text-2xl" style={{ color: "var(--admin-text)" }}>
              {value}
            </p>
            <p className="text-[13px] font-medium mt-0.5" style={{ color: "var(--admin-muted)" }}>
              {label}
            </p>
            {delta && (
              <p className="text-[11px] font-semibold mt-2 flex items-center gap-1" style={{ color }}>
                <TrendingUp size={11} /> {delta}
              </p>
            )}
          </>
        )}
      </motion.div>
    </Link>
  );
}

/* ─── Recharts custom tooltip ─────────────────────────────── */
function ChartTooltip({ active, payload, label }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border px-4 py-3 shadow-xl text-sm"
      style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}>
      <p className="font-semibold mb-2" style={{ color: "var(--admin-muted)" }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

/* ─── Subscription chart data (mock — replace with API) ───── */
const subData = [
  { month: "Jan", subscribers: 12, messages: 5 },
  { month: "Feb", subscribers: 19, messages: 8 },
  { month: "Mar", subscribers: 28, messages: 11 },
  { month: "Apr", subscribers: 35, messages: 14 },
  { month: "May", subscribers: 47, messages: 9 },
  { month: "Jun", subscribers: 61, messages: 18 },
  { month: "Jul", subscribers: 74, messages: 22 },
];

const postData = [
  { month: "Jan", published: 2, drafts: 1 },
  { month: "Feb", published: 3, drafts: 2 },
  { month: "Mar", published: 1, drafts: 3 },
  { month: "Apr", published: 4, drafts: 1 },
  { month: "May", published: 2, drafts: 2 },
  { month: "Jun", published: 5, drafts: 0 },
  { month: "Jul", published: 3, drafts: 2 },
];

/* ─── Activity item ───────────────────────────────────────── */
const ACTIVITY = [
  { icon: Mail,          color: "#293C97", text: "New newsletter subscriber",     time: "2 min ago" },
  { icon: MessageSquare, color: "#10b981", text: "New contact message received",  time: "18 min ago" },
  { icon: FileText,      color: "#f59e0b", text: "Blog post 'How Uche…' updated", time: "1 hr ago" },
  { icon: CalendarDays,  color: "#8b5cf6", text: "Event registration: Fatima Y.", time: "2 hr ago" },
  { icon: CheckCircle,   color: "#10b981", text: "Blog post published successfully", time: "3 hr ago" },
  { icon: Mail,          color: "#293C97", text: "New newsletter subscriber",     time: "4 hr ago" },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const { session, theme } = useAdmin();
  const [posts, setPosts]     = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const load = async () => {
    setLoading(true);
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
    setLastRefresh(new Date());
  };

  useEffect(() => { load(); }, []);

  const published = posts.filter(p => p.is_published).length;
  const drafts    = posts.filter(p => !p.is_published).length;

  const gridAnim = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
  const cardAnim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

  const axisStyle = { fill: theme === "dark" ? "#8b8fa8" : "#9ca3af", fontSize: 11 };

  return (
    <div className="space-y-8 max-w-[1400px]">

      {/* ── Page header ─────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-lato font-extrabold text-[1.6rem] tracking-tight" style={{ color: "var(--admin-text)" }}>
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"},{" "}
            {session?.name?.split(" ")[0] ?? "Admin"} 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--admin-muted)" }}>
            Here's what's happening with your website today.
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 hover:shadow-sm"
          style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)", background: "var(--admin-card)" }}
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ── KPI cards ───────────────────────────────────── */}
      <motion.div
        variants={gridAnim} initial="hidden" animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Posts",      value: loading ? "—" : posts.length,      icon: FileText,      color: "#293C97", href: "/admin/blog",       delta: "+3 this month" },
          { label: "Published",        value: loading ? "—" : published,          icon: CheckCircle,   color: "#10b981", href: "/admin/blog",       delta: undefined },
          { label: "Drafts",           value: loading ? "—" : drafts,             icon: Clock,         color: "#f59e0b", href: "/admin/blog",       delta: undefined },
          { label: "Subscribers",      value: "74",                               icon: Mail,          color: "#8b5cf6", href: "/admin/newsletter", delta: "+12 this month" },
          { label: "Contact Messages", value: "18",                               icon: MessageSquare, color: "#ef4444", href: "/admin/contacts",   delta: "3 unread" },
          { label: "Event Registrations", value: "41",                            icon: CalendarDays,  color: "#f59e0b", href: "/admin/events",     delta: undefined },
          { label: "Total Views",      value: loading ? "—" : posts.reduce((s, p) => s + (p.view_count ?? 0), 0).toLocaleString(),
            icon: Eye, color: "#06b6d4", href: "/admin/blog", delta: undefined },
          { label: "Active Now",       value: "3",                                icon: TrendingUp,    color: "#10b981", href: "/admin",            delta: undefined },
        ].map(k => (
          <motion.div key={k.label} variants={cardAnim}>
            <KpiCard {...k} loading={loading && ["Total Posts","Published","Drafts","Total Views"].includes(k.label)} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Charts row ──────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Subscribers + Messages area chart */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-lato font-bold text-[0.95rem]" style={{ color: "var(--admin-text)" }}>Newsletter Growth</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--admin-muted)" }}>Subscribers & contact messages over time</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={subData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gSub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#293C97" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#293C97" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gMsg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#2a2d3d" : "#f0f0f5"} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--admin-muted)" }} />
              <Area type="monotone" dataKey="subscribers" name="Subscribers" stroke="#293C97" strokeWidth={2} fill="url(#gSub)" dot={false} activeDot={{ r: 4 }} />
              <Area type="monotone" dataKey="messages"    name="Messages"    stroke="#10b981" strokeWidth={2} fill="url(#gMsg)" dot={false} activeDot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Blog posts bar chart */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-lato font-bold text-[0.95rem]" style={{ color: "var(--admin-text)" }}>Blog Activity</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--admin-muted)" }}>Published vs draft posts per month</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={postData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#2a2d3d" : "#f0f0f5"} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--admin-muted)" }} />
              <Bar dataKey="published" name="Published" fill="#293C97" radius={[6, 6, 0, 0]} />
              <Bar dataKey="drafts"    name="Drafts"    fill={theme === "dark" ? "#2a2d3d" : "#E5E7F2"} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Recent activity + quick links ───────────────── */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">

        {/* Activity feed */}
        <Card>
          <h3 className="font-lato font-bold text-[0.95rem] mb-5" style={{ color: "var(--admin-text)" }}>Recent Activity</h3>
          <div className="space-y-0 divide-y" style={{ borderColor: "var(--admin-border)" }}>
            {ACTIVITY.map(({ icon: Icon, color, text, time }, i) => (
              <div key={i} className="flex items-center gap-4 py-3.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--admin-text)" }}>{text}</p>
                </div>
                <p className="text-[11px] shrink-0" style={{ color: "var(--admin-muted)" }}>{time}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] mt-4 pt-3 border-t" style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
            Last updated {lastRefresh.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </Card>

        {/* Quick links */}
        <div className="space-y-3">
          <h3 className="font-lato font-bold text-[0.95rem]" style={{ color: "var(--admin-text)" }}>Quick Actions</h3>
          {[
            { label: "View all blog posts",        href: "/admin/blog",       color: "#293C97", icon: FileText },
            { label: "Newsletter subscribers",     href: "/admin/newsletter", color: "#8b5cf6", icon: Mail },
            { label: "Unread messages",            href: "/admin/contacts",   color: "#ef4444", icon: MessageSquare },
            { label: "Event registrations",        href: "/admin/events",     color: "#f59e0b", icon: CalendarDays },
            { label: "Settings",                   href: "/admin/settings",   color: "#6b7280", icon: TrendingUp },
          ].map(({ label, href, color, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className="flex items-center gap-3 rounded-xl border px-4 py-3 hover:shadow-sm transition-all duration-150 group"
                style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <span className="text-sm font-medium flex-1" style={{ color: "var(--admin-text)" }}>{label}</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
