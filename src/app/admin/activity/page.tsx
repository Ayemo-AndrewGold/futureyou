"use client";
import { Activity, Mail, MessageSquare, FileText, CalendarDays, CheckCircle } from "lucide-react";

const LOG = [
  { icon: Mail,          color: "#293C97", text: "New newsletter subscriber — fatima@gmail.com",        time: "Today, 10:32 AM" },
  { icon: MessageSquare, color: "#10b981", text: "New contact message received from Uche Okafor",        time: "Today, 09:15 AM" },
  { icon: FileText,      color: "#f59e0b", text: "Blog post 'How Uche Went from Hustler…' updated",     time: "Yesterday, 4:45 PM" },
  { icon: CalendarDays,  color: "#8b5cf6", text: "Event registration: Fatima Yusuf (Enterprise Boost)", time: "Yesterday, 2:10 PM" },
  { icon: CheckCircle,   color: "#10b981", text: "Blog post 'Stuck in a Job You Hate?' published",      time: "2 days ago" },
  { icon: Mail,          color: "#293C97", text: "New newsletter subscriber — uche@example.com",         time: "2 days ago" },
  { icon: MessageSquare, color: "#10b981", text: "Contact message from Blessing Eze marked as replied",  time: "3 days ago" },
  { icon: CalendarDays,  color: "#8b5cf6", text: "Event registration: Chidi Nwosu (Enterprise Boost)",  time: "3 days ago" },
];

export default function AdminActivityPage() {
  return (
    <div className="space-y-6 max-w-[860px]">
      <div>
        <h1 className="font-lato font-extrabold text-[1.5rem] tracking-tight" style={{ color: "var(--admin-text)" }}>Activity Log</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--admin-muted)" }}>Recent actions and events across the site.</p>
      </div>
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
        <div className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
          {LOG.map(({ icon: Icon, color, text, time }, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--admin-hover)] transition-colors">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <p className="flex-1 text-sm font-medium" style={{ color: "var(--admin-text)" }}>{text}</p>
              <p className="text-xs shrink-0" style={{ color: "var(--admin-muted)" }}>{time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
