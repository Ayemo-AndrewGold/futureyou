"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Download, Trash2, CalendarDays, Users,
  ChevronLeft, ChevronRight, CheckCircle, Clock, XCircle,
} from "lucide-react";

type RegStatus = "confirmed" | "pending" | "cancelled";

interface EventReg {
  id: number; name: string; email: string; phone: string;
  business: string; industry: string; registeredAt: string; status: RegStatus;
}

const MOCK_REGS: EventReg[] = [
  { id:1,  name:"Fatima Yusuf",    email:"fatima@gmail.com",  phone:"08012345678", business:"Fatima Couture",        industry:"Fashion",          registeredAt:"2026-07-15T10:00:00Z", status:"confirmed" },
  { id:2,  name:"Uche Okafor",     email:"uche@example.com",  phone:"07098765432", business:"Uche Foods",            industry:"Food",             registeredAt:"2026-07-16T11:30:00Z", status:"confirmed" },
  { id:3,  name:"Amara Obi",       email:"amara@business.com",phone:"08123456789", business:"Glam by Amara",         industry:"Beauty",           registeredAt:"2026-07-16T14:00:00Z", status:"pending"   },
  { id:4,  name:"Daniel Adeyemi",  email:"daniel@email.com",  phone:"08169159291", business:"Daniel Prints",         industry:"Printing & Branding", registeredAt:"2026-07-17T09:00:00Z", status:"confirmed" },
  { id:5,  name:"Blessing Eze",    email:"blessing@mail.com", phone:"08167894321", business:"Blessing Leatherworks", industry:"Leather Works",    registeredAt:"2026-07-17T16:00:00Z", status:"confirmed" },
  { id:6,  name:"Chidi Nwosu",     email:"chidi@ng.com",      phone:"07031234567", business:"Chidi Furniture",       industry:"Furniture",        registeredAt:"2026-07-18T08:30:00Z", status:"pending"   },
  { id:7,  name:"Ngozi Ibe",       email:"ngozi@craft.com",   phone:"08054321987", business:"Ngozi Arts",            industry:"Arts & Crafts",    registeredAt:"2026-07-18T12:00:00Z", status:"confirmed" },
  { id:8,  name:"Tunde Bakare",    email:"tunde@hair.com",    phone:"09012345678", business:"Tunde Hair Studio",     industry:"Haircare",         registeredAt:"2026-07-19T10:00:00Z", status:"cancelled" },
  { id:9,  name:"Sade Johnson",    email:"sade@gems.com",     phone:"08011223344", business:"Sade Jewels",           industry:"Jewellery",        registeredAt:"2026-07-19T14:00:00Z", status:"confirmed" },
  { id:10, name:"Emeka Chukwu",    email:"emeka@beauty.com",  phone:"07055443322", business:"Emeka Beauty Bar",      industry:"Beauty",           registeredAt:"2026-07-20T09:00:00Z", status:"pending"   },
];

const STATUS_CFG: Record<RegStatus, { label: string; cls: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", cls: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
  pending:   { label: "Pending",   cls: "bg-amber-50  text-amber-700",    icon: Clock },
  cancelled: { label: "Cancelled", cls: "bg-red-50    text-red-600",      icon: XCircle },
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border ${className}`}
      style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
      {children}
    </div>
  );
}

const PAGE_SIZE = 8;

export default function AdminEventsPage() {
  const [regs, setRegs]       = useState<EventReg[]>(MOCK_REGS);
  const [query, setQuery]     = useState("");
  const [filter, setFilter]   = useState<RegStatus | "all">("all");
  const [page, setPage]       = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = regs;
    if (filter !== "all") list = list.filter(r => r.status === filter);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) || r.email.includes(q) ||
        r.business.toLowerCase().includes(q) || r.industry.toLowerCase().includes(q)
      );
    }
    return list;
  }, [regs, filter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRegs   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const exportCSV = () => {
    const rows = [["Name","Email","Phone","Business","Industry","Date","Status"],
      ...regs.map(r => [r.name, r.email, r.phone, r.business, r.industry,
        new Date(r.registeredAt).toLocaleDateString(), r.status])];
    const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href = url; a.download = "event-registrations.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const counts = {
    all: regs.length, confirmed: regs.filter(r=>r.status==="confirmed").length,
    pending: regs.filter(r=>r.status==="pending").length, cancelled: regs.filter(r=>r.status==="cancelled").length,
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-lato font-extrabold text-[1.5rem] tracking-tight" style={{ color: "var(--admin-text)" }}>Event Registrations</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--admin-muted)" }}>
            Enterprise Boost Programme · 10–11 August 2026 · Lagos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold hover:shadow-sm transition-all"
            style={{ borderColor: "var(--admin-border)", color: "var(--admin-text)", background: "var(--admin-card)" }}>
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label:"Total",     value:counts.all,       color:"#293C97", icon:Users },
          { label:"Confirmed", value:counts.confirmed, color:"#10b981", icon:CheckCircle },
          { label:"Pending",   value:counts.pending,   color:"#f59e0b", icon:Clock },
          { label:"Cancelled", value:counts.cancelled, color:"#ef4444", icon:XCircle },
        ].map(({ label, value, color, icon: Icon }) => (
          <Card key={label} className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="font-lato font-extrabold text-2xl" style={{ color: "var(--admin-text)" }}>{value}</p>
              <p className="text-xs font-medium" style={{ color: "var(--admin-muted)" }}>{label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filter tabs + search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-1 p-1 rounded-xl border" style={{ borderColor: "var(--admin-border)", background: "var(--admin-hover)" }}>
            {(["all","confirmed","pending","cancelled"] as const).map(f => (
              <button key={f} onClick={() => { setFilter(f); setPage(1); }}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                  filter === f ? "bg-[#293C97] text-white shadow-sm" : ""
                }`}
                style={filter !== f ? { color: "var(--admin-muted)" } : {}}>
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--admin-muted)" }} />
            <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search registrations…"
              className="w-full h-10 pl-9 pr-4 rounded-xl border text-sm outline-none"
              style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-[11px] font-bold tracking-widest uppercase"
                style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-4 py-3.5 hidden sm:table-cell">Email</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Business</th>
                <th className="px-4 py-3.5 hidden lg:table-cell">Industry</th>
                <th className="px-4 py-3.5 hidden lg:table-cell">Registered</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
              {pageRegs.length === 0 ? (
                <tr><td colSpan={7} className="py-16 text-center">
                  <CalendarDays size={32} className="mx-auto mb-3 opacity-25" style={{ color: "var(--admin-muted)" }} />
                  <p className="text-sm" style={{ color: "var(--admin-muted)" }}>No registrations found</p>
                </td></tr>
              ) : pageRegs.map(reg => {
                const cfg = STATUS_CFG[reg.status];
                const Icon = cfg.icon;
                return (
                  <motion.tr key={reg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="group hover:bg-[var(--admin-hover)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#293C97] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {reg.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>{reg.name}</p>
                          <p className="text-xs sm:hidden" style={{ color: "var(--admin-muted)" }}>{reg.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell text-sm" style={{ color: "var(--admin-muted)" }}>{reg.email}</td>
                    <td className="px-4 py-4 hidden md:table-cell text-sm" style={{ color: "var(--admin-text)" }}>{reg.business}</td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: "var(--admin-hover)", color: "var(--admin-muted)" }}>{reg.industry}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm" style={{ color: "var(--admin-muted)" }}>
                      {new Date(reg.registeredAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${cfg.cls}`}>
                        <Icon size={10} /> {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setDeleteId(reg.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                          style={{ color: "var(--admin-muted)" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: "var(--admin-border)" }}>
            <p className="text-xs" style={{ color: "var(--admin-muted)" }}>{((page-1)*PAGE_SIZE)+1}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 hover:bg-[var(--admin-hover)]"
                style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}><ChevronLeft size={14} /></button>
              <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 hover:bg-[var(--admin-hover)]"
                style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl pointer-events-auto" style={{ background: "var(--admin-card)" }}>
                <h3 className="font-lato font-bold text-lg mb-2" style={{ color: "var(--admin-text)" }}>Delete registration?</h3>
                <p className="text-sm mb-5" style={{ color: "var(--admin-muted)" }}>This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border text-sm font-medium hover:bg-[var(--admin-hover)]"
                    style={{ borderColor: "var(--admin-border)", color: "var(--admin-text)" }}>Cancel</button>
                  <button onClick={() => { setRegs(prev => prev.filter(r => r.id !== deleteId)); setDeleteId(null); }}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold">Delete</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
