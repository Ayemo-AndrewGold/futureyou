"use client";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-[#EEF0FA] flex items-center justify-center">
        <Users size={26} className="text-[#293C97]" />
      </div>
      <h1 className="font-lato font-bold text-xl" style={{ color: "var(--admin-text)" }}>Users</h1>
      <p className="text-sm max-w-xs" style={{ color: "var(--admin-muted)" }}>
        User management will be available here once integrated with your backend API.
      </p>
    </div>
  );
}
