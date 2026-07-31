"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Trash2, MessageSquare, Mail, Phone,
  ChevronLeft, ChevronRight, Circle, CheckCircle2, Reply,
} from "lucide-react";

type Status = "unread" | "read" | "replied";

interface ContactMsg {
  id: number; name: string; email: string; phone?: string;
  subject: string; message: string; date: string; status: Status;
}

const MOCK: ContactMsg[] = [
  { id:1,  name:"Fatima Yusuf",    email:"fatima@gmail.com",  phone:"08012345678", subject:"Coaching enquiry",        message:"Hi, I'm interested in your coaching programme. Could you tell me more about the one-on-one sessions and pricing?", date:"2026-07-20T10:30:00Z", status:"unread" },
  { id:2,  name:"Uche Okafor",     email:"uche@example.com",  phone:"07098765432", subject:"Business consulting",     message:"We're looking for a strategic partner to help us restructure our operations. Are you available for a consultation?", date:"2026-07-19T14:15:00Z", status:"read" },
  { id:3,  name:"Daniel Adeyemi",  email:"daniel@email.com",  subject:"Loan services enquiry",       message:"Please send me details about the loan services you offer for small businesses in Lagos.", date:"2026-07-18T09:00:00Z", status:"replied" },
  { id:4,  name:"Blessing Eze",    email:"blessing@mail.com", phone:"08167894321", subject:"Enterprise Boost Programme", message:"I would like to register for the Enterprise Boost Programme. Is it still open?", date:"2026-07-17T16:45:00Z", status:"unread" },
  { id:5,  name:"Chidi Nwosu",     email:"chidi@ng.com",      subject:"Partnership opportunity", message:"Our NGO works with young entrepreneurs in Lagos. I believe there's potential for a partnership.", date:"2026-07-16T11:20:00Z", status:"read" },
  { id:6,  name:"Amara Obi",       email:"amara@business.com",phone:"08123456789", subject:"Mentorship request",      message:"I run a fashion label and I'm looking for a mentor who understands the Nigerian creative industry.", date:"2026-07-15T08:10:00Z", status:"unread" },
];

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  unread:  { label: "Unread",  color: "#ef4444", bg: "bg-red-50 text-red-600",     icon: Circle },
  read:    { label: "Read",    color: "#6b7280", bg: "bg-gray-100 text-gray-600",  icon: CheckCircle2 },
  replied: { label: "Replied", color: "#10b981", bg: "bg-emerald-50 text-emerald-700", icon: Reply },
};

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl border ${className}`}
      style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)", ...style }}>
      {children}
    </div>
  );
}

const PAGE_SIZE = 8;

export default function AdminContactsPage() {
  const [msgs, setMsgs]       = useState<ContactMsg[]>(MOCK);
  const [query, setQuery]     = useState("");
  const [filter, setFilter]   = useState<Status | "all">("all");
  const [page, setPage]       = useState(1);
  const [active, setActive]   = useState<ContactMsg | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = msgs;
    if (filter !== "all") list = list.filter(m => m.status === filter);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(m => m.name.toLowerCase().includes(q) || m.email.includes(q) || m.subject.toLowerCase().includes(q));
    }
    return list;
  }, [msgs, filter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageMsgs   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  useEffect(() => setPage(1), [query, filter]);

  const setStatus = (id: number, status: Status) =>
    setMsgs(prev => prev.map(m => m.id === id ? { ...m, status } : m));

  const openMsg = (msg: ContactMsg) => {
    setActive(msg);
    if (msg.status === "unread") setStatus(msg.id, "read");
  };

  const counts = {
    all: msgs.length,
    unread: msgs.filter(m => m.status === "unread").length,
    read: msgs.filter(m => m.status === "read").length,
    replied: msgs.filter(m => m.status === "replied").length,
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-lato font-extrabold text-[1.5rem] tracking-tight" style={{ color: "var(--admin-text)" }}>Contact Messages</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--admin-muted)" }}>
            {counts.unread > 0 && <span className="text-red-500 font-semibold">{counts.unread} unread · </span>}
            {msgs.length} total messages
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", "unread", "read", "replied"] as const).map(f => (
          <button key={f} onClick={() => { setFilter(f); setPage(1); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              filter === f ? "bg-[#293C97] text-white border-[#293C97] shadow-sm" : "hover:bg-[var(--admin-hover)]"
            }`}
            style={filter !== f ? { borderColor: "var(--admin-border)", color: "var(--admin-muted)", background: "var(--admin-card)" } : {}}>
            <span className="capitalize">{f}</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${filter === f ? "bg-white/20 text-white" : ""}`}
              style={filter !== f ? { background: "var(--admin-hover)", color: "var(--admin-muted)" } : {}}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-5">
        {/* List */}
        <div className="space-y-3">
          {/* Search */}
          <Card className="p-3">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--admin-muted)" }} />
              <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search name, email, subject…"
                className="w-full h-10 pl-9 pr-4 rounded-xl border text-sm outline-none"
                style={{ background: "var(--admin-hover)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
            </div>
          </Card>

          <Card className="overflow-hidden divide-y" style={{ borderColor: "var(--admin-border)" }}>
            {pageMsgs.length === 0 ? (
              <div className="py-16 text-center">
                <MessageSquare size={32} className="mx-auto mb-3 opacity-25" style={{ color: "var(--admin-muted)" }} />
                <p className="text-sm" style={{ color: "var(--admin-muted)" }}>No messages found</p>
              </div>
            ) : pageMsgs.map(msg => {
              const cfg = STATUS_CONFIG[msg.status];
              const Icon = cfg.icon;
              return (
                <button key={msg.id} onClick={() => openMsg(msg)}
                  className={`w-full text-left px-5 py-4 flex items-start gap-4 transition-colors hover:bg-[var(--admin-hover)] ${active?.id === msg.id ? "bg-[var(--admin-hover)]" : ""}`}>
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: msg.status === "unread" ? "#293C97" : "var(--admin-border)" }}>
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${msg.status === "unread" ? "font-bold" : "font-medium"}`}
                        style={{ color: "var(--admin-text)" }}>{msg.name}</p>
                      <p className="text-[11px] shrink-0" style={{ color: "var(--admin-muted)" }}>
                        {new Date(msg.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${msg.status === "unread" ? "font-semibold" : ""}`}
                      style={{ color: "var(--admin-text)" }}>{msg.subject}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "var(--admin-muted)" }}>{msg.message}</p>
                  </div>
                  {msg.status === "unread" && (
                    <span className="w-2 h-2 rounded-full bg-[#293C97] shrink-0 mt-2" />
                  )}
                </button>
              );
            })}

            {/* Pagination */}
            {filtered.length > PAGE_SIZE && (
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-xs" style={{ color: "var(--admin-muted)" }}>{((page-1)*PAGE_SIZE)+1}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</p>
                <div className="flex gap-1">
                  <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 hover:bg-[var(--admin-hover)]"
                    style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                    <ChevronLeft size={14} />
                  </button>
                  <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 hover:bg-[var(--admin-hover)]"
                    style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Detail pane */}
        <div>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div key={active.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22 }}>
                <Card className="p-6 space-y-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#293C97] flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {active.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-lato font-bold text-sm" style={{ color: "var(--admin-text)" }}>{active.name}</p>
                        <p className="text-xs" style={{ color: "var(--admin-muted)" }}>
                          {new Date(active.date).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setDeleteId(active.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                      style={{ color: "var(--admin-muted)" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--admin-muted)" }}>
                      <Mail size={13} />
                      <a href={`mailto:${active.email}`} className="hover:underline">{active.email}</a>
                    </div>
                    {active.phone && (
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--admin-muted)" }}>
                        <Phone size={13} />
                        <span>{active.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="border-t pt-4" style={{ borderColor: "var(--admin-border)" }}>
                    <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--admin-muted)" }}>Subject</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>{active.subject}</p>
                  </div>

                  {/* Message */}
                  <div className="border-t pt-4" style={{ borderColor: "var(--admin-border)" }}>
                    <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--admin-muted)" }}>Message</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--admin-text)" }}>{active.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="border-t pt-4 flex flex-col gap-2" style={{ borderColor: "var(--admin-border)" }}>
                    <a href={`mailto:${active.email}?subject=Re: ${encodeURIComponent(active.subject)}`}
                      onClick={() => setStatus(active.id, "replied")}
                      className="flex items-center justify-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-md shadow-[#293C97]/25">
                      <Reply size={14} /> Reply via Email
                    </a>
                    {active.status !== "replied" && (
                      <button onClick={() => setStatus(active.id, "replied")}
                        className="flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl border transition-colors hover:bg-[var(--admin-hover)]"
                        style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                        <CheckCircle2 size={14} /> Mark as Replied
                      </button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card className="p-10 flex flex-col items-center justify-center text-center">
                <MessageSquare size={32} className="mb-3 opacity-25" style={{ color: "var(--admin-muted)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--admin-muted)" }}>Select a message to view details</p>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl pointer-events-auto" style={{ background: "var(--admin-card)" }}>
                <h3 className="font-lato font-bold text-lg mb-2" style={{ color: "var(--admin-text)" }}>Delete message?</h3>
                <p className="text-sm mb-5" style={{ color: "var(--admin-muted)" }}>This cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border text-sm font-medium hover:bg-[var(--admin-hover)]"
                    style={{ borderColor: "var(--admin-border)", color: "var(--admin-text)" }}>Cancel</button>
                  <button onClick={() => { setMsgs(prev => prev.filter(m => m.id !== deleteId)); setActive(null); setDeleteId(null); }}
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
