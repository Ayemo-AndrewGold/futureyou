"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, Mail, MessageSquare, CalendarDays,
  Settings, LogOut, ChevronLeft, ChevronRight, Menu, X,
  Bell, Search, Sun, Moon, Users, Activity,
} from "lucide-react";
import { getAdminSession, clearAdminSession, type AdminSession } from "@/lib/adminAuth";

/* ─── Types ─────────────────────────────────────────────────── */
interface AdminCtx {
  session: AdminSession | null;
  theme: "light" | "dark";
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

/* ─── Context ────────────────────────────────────────────────── */
const AdminContext = createContext<AdminCtx>({
  session: null,
  theme: "light",
  toggleTheme: () => {},
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});
export const useAdmin = () => useContext(AdminContext);

/* ─── Nav items ─────────────────────────────────────────────── */
const NAV = [
  { href: "/admin",           label: "Dashboard",     icon: LayoutDashboard },
  { href: "/admin/blog",      label: "Blog Posts",    icon: FileText },
  { href: "/admin/newsletter",label: "Newsletter",    icon: Mail },
  { href: "/admin/contacts",  label: "Contacts",      icon: MessageSquare },
  { href: "/admin/events",    label: "Events",        icon: CalendarDays },
  { href: "/admin/users",     label: "Users",         icon: Users },
  { href: "/admin/activity",  label: "Activity Log",  icon: Activity },
  { href: "/admin/settings",  label: "Settings",      icon: Settings },
];

/* ─── Nav item ───────────────────────────────────────────────── */
function NavItem({
  item, collapsed, active, onClick,
}: {
  item: typeof NAV[0];
  collapsed: boolean;
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative ${
        active
          ? "bg-[#293C97] text-white shadow-md shadow-[#293C97]/25"
          : "text-[var(--admin-muted)] hover:bg-[var(--admin-hover)] hover:text-[var(--admin-text)]"
      }`}
    >
      <Icon size={18} className="shrink-0" />
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {/* Tooltip when collapsed */}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg text-[var(--admin-text)] text-xs font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
          {item.label}
        </span>
      )}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADMIN LAYOUT
═══════════════════════════════════════════════════════════════ */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* Auth check */
  useEffect(() => {
    if (pathname === "/admin/login") { setChecking(false); return; }
    const s = getAdminSession();
    if (!s) { router.replace("/admin/login"); return; }
    setSession(s);
    setChecking(false);
  }, [pathname, router]);

  /* Theme persistence */
  useEffect(() => {
    const saved = localStorage.getItem("fy_admin_theme") as "light" | "dark" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(saved ?? preferred);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-admin-theme", theme);
    localStorage.setItem("fy_admin_theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(t => t === "light" ? "dark" : "light"), []);

  /* Logout */
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    clearAdminSession();
    router.replace("/admin/login");
  };

  /* Close mobile nav on route change */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* Login page renders without shell */
  if (pathname === "/admin/login") return <>{children}</>;
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FC]">
        <div className="w-8 h-8 border-4 border-[#293C97]/20 border-t-[#293C97] rounded-full animate-spin" />
      </div>
    );
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <AdminContext.Provider value={{ session, theme, toggleTheme, sidebarCollapsed, setSidebarCollapsed }}>
      {/* CSS variables for theming */}
      <style>{`
        [data-admin-theme="light"] {
          --admin-bg:     #F7F8FC;
          --admin-card:   #FFFFFF;
          --admin-border: #E5E7F2;
          --admin-text:   #0E0E1D;
          --admin-muted:  #6B7280;
          --admin-hover:  #EEF0FA;
          --admin-sidebar:#FFFFFF;
        }
        [data-admin-theme="dark"] {
          --admin-bg:     #0f1117;
          --admin-card:   #1a1d27;
          --admin-border: #2a2d3d;
          --admin-text:   #e8eaf6;
          --admin-muted:  #8b8fa8;
          --admin-hover:  #252839;
          --admin-sidebar:#14161f;
        }
      `}</style>

      <div
        className="min-h-screen flex"
        style={{ background: "var(--admin-bg)", color: "var(--admin-text)" }}
      >
        {/* ── Mobile overlay ────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* ── Sidebar ───────────────────────────────────────── */}
        <motion.aside
          animate={{ width: sidebarCollapsed ? 72 : 240 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`hidden lg:flex flex-col h-screen sticky top-0 border-r z-30 overflow-hidden shrink-0`}
          style={{ borderColor: "var(--admin-border)", background: "var(--admin-sidebar)" }}
        >
          {/* Logo area */}
          <div className="flex items-center justify-between h-16 px-4 border-b shrink-0" style={{ borderColor: "var(--admin-border)" }}>
            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.div key="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Image src="/images/headerLogo.svg" width={110} height={34} alt="FutureYou Admin" className="object-contain" />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--admin-hover)] transition-colors shrink-0"
              style={{ color: "var(--admin-muted)" }}
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {NAV.map(item => (
              <NavItem key={item.href} item={item} collapsed={sidebarCollapsed} active={isActive(item.href)} />
            ))}
          </nav>

          {/* Logout */}
          <div className="px-3 py-4 border-t shrink-0" style={{ borderColor: "var(--admin-border)" }}>
            <button
              onClick={handleLogout}
              className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut size={18} className="shrink-0" />
              <AnimatePresence initial={false}>
                {!sidebarCollapsed && (
                  <motion.span key="logout" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden whitespace-nowrap">
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.aside>

        {/* ── Mobile sidebar ────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 h-full w-64 z-50 flex flex-col border-r lg:hidden"
              style={{ background: "var(--admin-sidebar)", borderColor: "var(--admin-border)" }}
            >
              <div className="flex items-center justify-between h-16 px-4 border-b shrink-0" style={{ borderColor: "var(--admin-border)" }}>
                <Image src="/images/headerLogo.svg" width={110} height={34} alt="FutureYou Admin" className="object-contain" />
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--admin-hover)]" style={{ color: "var(--admin-muted)" }}>
                  <X size={16} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {NAV.map(item => (
                  <NavItem key={item.href} item={item} collapsed={false} active={isActive(item.href)} onClick={() => setMobileOpen(false)} />
                ))}
              </nav>
              <div className="px-3 py-4 border-t" style={{ borderColor: "var(--admin-border)" }}>
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">
                  <LogOut size={18} /><span>Logout</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Main content area ────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Top bar */}
          <header
            className="h-16 flex items-center justify-between px-4 sm:px-6 border-b shrink-0 sticky top-0 z-20 backdrop-blur-md"
            style={{ borderColor: "var(--admin-border)", background: "color-mix(in srgb, var(--admin-sidebar) 90%, transparent)" }}
          >
            {/* Left: hamburger + breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--admin-hover)] transition-colors"
                style={{ color: "var(--admin-muted)" }}
              >
                <Menu size={18} />
              </button>
              <div className="hidden sm:block">
                <p className="text-xs font-medium" style={{ color: "var(--admin-muted)" }}>FutureYou</p>
                <p className="text-sm font-semibold capitalize" style={{ color: "var(--admin-text)" }}>
                  {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
                </p>
              </div>
            </div>

            {/* Right: search + theme + notifications + avatar */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative hidden sm:block">
                <AnimatePresence initial={false}>
                  {searchOpen ? (
                    <motion.input
                      key="search"
                      initial={{ width: 40, opacity: 0 }}
                      animate={{ width: 220, opacity: 1 }}
                      exit={{ width: 40, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      autoFocus
                      placeholder="Search…"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                      className="h-9 rounded-xl border px-4 pr-10 text-sm outline-none transition-colors"
                      style={{ background: "var(--admin-hover)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}
                    />
                  ) : null}
                </AnimatePresence>
                <button
                  onClick={() => setSearchOpen(o => !o)}
                  className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center rounded-xl hover:bg-[var(--admin-hover)] transition-colors"
                  style={{ color: "var(--admin-muted)" }}
                >
                  <Search size={16} />
                </button>
              </div>

              {/* Theme */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--admin-hover)] transition-colors"
                style={{ color: "var(--admin-muted)" }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              {/* Notifications */}
              <button
                className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--admin-hover)] transition-colors"
                style={{ color: "var(--admin-muted)" }}
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#293C97]" />
              </button>

              {/* Avatar */}
              <div className="flex items-center gap-2.5 ml-1 pl-3 border-l" style={{ borderColor: "var(--admin-border)" }}>
                <div className="w-8 h-8 rounded-full bg-[#293C97] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {session?.name?.charAt(0) ?? "A"}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold leading-tight" style={{ color: "var(--admin-text)" }}>{session?.name ?? "Admin"}</p>
                  <p className="text-[10px] capitalize" style={{ color: "var(--admin-muted)" }}>{session?.role}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
