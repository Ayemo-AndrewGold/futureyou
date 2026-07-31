"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Plus, Edit2, Trash2, Eye, CheckCircle,
  Clock, ChevronLeft, ChevronRight, ExternalLink, RefreshCw,
  FileText,
} from "lucide-react";
import { getPosts } from "@/lib/api";
import type { PostListItem } from "@/lib/types";

/* ── Shared admin card ────────────────────────────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border ${className}`}
      style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
      {children}
    </div>
  );
}

/* ── Status badge ─────────────────────────────────────────── */
function StatusBadge({ published }: { published: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
      published
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
        : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
    }`}>
      {published ? <CheckCircle size={10} /> : <Clock size={10} />}
      {published ? "Published" : "Draft"}
    </span>
  );
}

const PAGE_SIZE = 10;

export default function AdminBlogPage() {
  const [posts, setPosts]       = useState<PostListItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [query, setQuery]       = useState("");
  const [filter, setFilter]     = useState<"all" | "published" | "draft">("all");
  const [page, setPage]         = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = async () => { setLoading(true); setPosts(await getPosts()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let list = posts;
    if (filter === "published") list = list.filter(p => p.is_published);
    if (filter === "draft")     list = list.filter(p => !p.is_published);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.author_name.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [posts, filter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pagePosts  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* Reset to page 1 when filter/query changes */
  useEffect(() => setPage(1), [query, filter]);

  const confirmDelete = (id: number) => setDeleteId(id);
  const executeDelete = () => {
    // In production call DELETE /api/blog/posts/<id>/
    setPosts(prev => prev.filter(p => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 max-w-[1400px]">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-lato font-extrabold text-[1.5rem] tracking-tight" style={{ color: "var(--admin-text)" }}>Blog Posts</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--admin-muted)" }}>
            {loading ? "Loading…" : `${posts.length} total · ${posts.filter(p => p.is_published).length} published · ${posts.filter(p => !p.is_published).length} drafts`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium transition-colors hover:shadow-sm"
            style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)", background: "var(--admin-card)" }}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold transition-colors shadow-md shadow-[#293C97]/25">
            <Plus size={15} /> New Post
          </button>
        </div>
      </div>

      {/* Filters row */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--admin-muted)" }} />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search posts, authors, categories…"
              className="w-full h-10 pl-9 pr-4 rounded-xl border text-sm outline-none transition-colors"
              style={{ background: "var(--admin-hover)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}
            />
          </div>
          {/* Status filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl border" style={{ borderColor: "var(--admin-border)", background: "var(--admin-hover)" }}>
            {(["all", "published", "draft"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                  filter === f ? "bg-[#293C97] text-white shadow-sm" : ""
                }`}
                style={filter !== f ? { color: "var(--admin-muted)" } : {}}>
                {f}
              </button>
            ))}
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
                <th className="px-6 py-3.5">Title</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Category</th>
                <th className="px-4 py-3.5 hidden lg:table-cell">Author</th>
                <th className="px-4 py-3.5 hidden lg:table-cell">Views</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 rounded-md animate-pulse" style={{ background: "var(--admin-hover)", width: j === 0 ? "80%" : "60%" }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : pagePosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <FileText size={32} className="mx-auto mb-3 opacity-30" style={{ color: "var(--admin-muted)" }} />
                    <p className="text-sm font-medium" style={{ color: "var(--admin-muted)" }}>No posts found</p>
                  </td>
                </tr>
              ) : (
                pagePosts.map(post => (
                  <motion.tr key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="group hover:bg-[var(--admin-hover)] transition-colors">
                    <td className="px-6 py-4 max-w-[260px]">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--admin-text)" }}>{post.title}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "var(--admin-muted)" }}>{post.excerpt?.slice(0, 60)}…</p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: "var(--admin-hover)", color: "var(--admin-muted)" }}>
                        {post.category?.name ?? "Uncategorised"}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm" style={{ color: "var(--admin-muted)" }}>
                      {post.author_name}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm tabular-nums" style={{ color: "var(--admin-muted)" }}>
                      {(post.view_count ?? 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-xs" style={{ color: "var(--admin-muted)" }}>
                      {post.published_at ? new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-4 py-4"><StatusBadge published={post.is_published} /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/blog/${post.slug}`} target="_blank"
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--admin-border)]"
                          style={{ color: "var(--admin-muted)" }} title="View live">
                          <ExternalLink size={14} />
                        </Link>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--admin-border)]"
                          style={{ color: "var(--admin-muted)" }} title="Edit">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => confirmDelete(post.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-red-50 hover:text-red-500"
                          style={{ color: "var(--admin-muted)" }} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: "var(--admin-border)" }}>
            <p className="text-xs" style={{ color: "var(--admin-muted)" }}>
              Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 transition-colors hover:bg-[var(--admin-hover)]"
                style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).filter(n => Math.abs(n - page) <= 2).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold border transition-all ${
                    n === page ? "bg-[#293C97] text-white border-[#293C97] shadow-sm" : "hover:bg-[var(--admin-hover)]"
                  }`}
                  style={n !== page ? { borderColor: "var(--admin-border)", color: "var(--admin-muted)" } : {}}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 transition-colors hover:bg-[var(--admin-hover)]"
                style={{ borderColor: "var(--admin-border)", color: "var(--admin-muted)" }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl pointer-events-auto"
                style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
                <h3 className="font-lato font-bold text-lg mb-2" style={{ color: "var(--admin-text)" }}>Delete post?</h3>
                <p className="text-sm mb-5" style={{ color: "var(--admin-muted)" }}>This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)}
                    className="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors hover:bg-[var(--admin-hover)]"
                    style={{ borderColor: "var(--admin-border)", color: "var(--admin-text)" }}>Cancel</button>
                  <button onClick={executeDelete}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors shadow-md">
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
