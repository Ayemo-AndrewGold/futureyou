"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Download, Trash2, Mail, RefreshCw,
  ChevronLeft, ChevronRight, TrendingUp, Users,
} from "lucide-react";

/* ── Mock data (replace with real API calls) ──────────────── */
function genSubs() {
  const names = ["Fatima Yusuf","Uche Okafor","Daniel Adeyemi","Blessing Eze","Chidi Nwosu","Amara Obi","Tunde Bakare","Ngozi Ibe","Emeka Chukwu","Sade Johnson","Kemi Adeoye","Bola Adesanya","Yemi Ogundimu","Fola Martins","Seun Peters"];
  return names.map((name, i) => ({
    id: i + 1,
    email: `${name.split(" ")[0].toLowerCase()}@example.com`,
    name,
    subscribed_at: new Date(Date.now() - Math.random() * 90 * 86400000).toISOString(),
    is_active: Math.random() > 0.1,
  }));
}

const PAGE_SIZE = 10;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border ${className}`}
      style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
      {children}
    </div>
  );
}

export default function AdminNewsletterPage() {
  const [subs, setSubs]         = useState(genSubs());
  const [loading, setLoading]   = useState(false);
  const [query, setQuery]       = useState("");
  const [page, setPage]         = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [deleteId, setDeleteId] = useState<number | "bulk" | null>(null);

  const filtered = useMemo(() => {
    if (!query) return subs;
    const q = query.toLowerCase();
    return subs.filter(s => s.email.includes(q) || s.name.toLowerCase().includes(q));
  }, [subs, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSubs   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [query]);

  const toggleSelect = (id: number) => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleAll = () => setSelected(prev =>
    prev.size === pageSubs.length ? new Set() : new Set(pageSubs.map(s => s.id))
  );

  const exportCSV = () => {
    const rows = [["Name","Email","Subscribed","Active"],...subs.map(s => [s.name, s.email, new Date(s.subscribed_at).toLocaleDateString(), s.is_active ? "Yes" : "No"])];
    const csv  = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href = url; a.download = "subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const doDelete = () => {
    if (deleteId === "bulk") setSubs(prev => prev.filter(s => !selected.has(s.id)));
    else setSubs(prev => prev.filter(s => s.id !== deleteId));
    setSelected(new Set());
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-lato font-extrabold text-[1.5rem] tracking-tight" style={{ color: "var(--admin-text)" }}>Newsletter</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--admin-muted)" }}>{subs.length} subscribers · {subs.filter(s => s.is_active).length} active</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 800); }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium transition-colors"
            style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)", background: "var(--admin-card)" }}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-colors hover:shadow-sm"
            style={{ borderColor: "var(--admin-border)", color: "var(--admin-text)", background: "var(--admin-card)" }}>
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Subscribers", value: subs.length,                          icon: Users,      color: "#293C97" },
          { label: "Active",            value: subs.filter(s => s.is_active).length, icon: TrendingUp, color: "#10b981" },
          { label: "This Month",        value: subs.filter(s => new Date(s.subscribed_at) > new Date(Date.now() - 30*86400000)).length, icon: Mail, color: "#8b5cf6" },
        ].map(({ label, value, icon: Icon, color }) => (
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

      {/* Toolbar */}
      <Card className="p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--admin-muted)" }} />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search subscribers…"
            className="w-full h-10 pl-9 pr-4 rounded-xl border text-sm outline-none"
            style={{ background: "var(--admin-hover)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
        </div>
        {selected.size > 0 && (
          <button onClick={() => setDeleteId("bulk")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
            <Trash2 size={14} /> Delete {selected.size} selected
          </button>
        )}
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-[11px] font-bold tracking-widest uppercase"
                style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                <th className="px-5 py-3.5">
                  <input type="checkbox" className="rounded" checked={selected.size === pageSubs.length && pageSubs.length > 0} onChange={toggleAll} />
                </th>
                <th className="px-4 py-3.5">Subscriber</th>
                <th className="px-4 py-3.5 hidden sm:table-cell">Email</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Subscribed</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
              {pageSubs.map(sub => (
                <motion.tr key={sub.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="group hover:bg-[var(--admin-hover)] transition-colors">
                  <td className="px-5 py-4">
                    <input type="checkbox" className="rounded" checked={selected.has(sub.id)} onChange={() => toggleSelect(sub.id)} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#293C97] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {sub.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell text-sm" style={{ color: "var(--admin-muted)" }}>{sub.email}</td>
                  <td className="px-4 py-4 hidden md:table-cell text-sm" style={{ color: "var(--admin-muted)" }}>
                    {new Date(sub.subscribed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      sub.is_active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {sub.is_active ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end">
                      <button onClick={() => setDeleteId(sub.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500"
                        style={{ color: "var(--admin-muted)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: "var(--admin-border)" }}>
            <p className="text-xs" style={{ color: "var(--admin-muted)" }}>
              {((page-1)*PAGE_SIZE)+1}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 hover:bg-[var(--admin-hover)]"
                style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 hover:bg-[var(--admin-hover)]"
                style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                <ChevronRight size={14} />
              </button>
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
                <h3 className="font-lato font-bold text-lg mb-2" style={{ color: "var(--admin-text)" }}>
                  {deleteId === "bulk" ? `Delete ${selected.size} subscribers?` : "Remove subscriber?"}
                </h3>
                <p className="text-sm mb-5" style={{ color: "var(--admin-muted)" }}>This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border text-sm font-medium hover:bg-[var(--admin-hover)]"
                    style={{ borderColor: "var(--admin-border)", color: "var(--admin-text)" }}>Cancel</button>
                  <button onClick={doDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold">Delete</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
