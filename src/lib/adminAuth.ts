/**
 * Admin authentication helpers.
 *
 * Strategy: stateless token stored in a httpOnly-like session cookie via
 * the middleware + a client-side localStorage echo for instant UI reads.
 *
 * For this project we use a simple environment-variable credential pair
 * (ADMIN_EMAIL + ADMIN_PASSWORD) verified on a Next.js API route, which
 * issues a signed session token stored in a cookie.  No external library
 * needed.  To harden for production: swap the API route for a proper JWT
 * library (e.g. jose) and move credentials to a database.
 */

export const ADMIN_SESSION_KEY = "fy_admin_session";

export interface AdminSession {
  email: string;
  name: string;
  role: "superadmin";
  issuedAt: number;
}

/** How long a session stays valid (ms) — 8 hours */
export const SESSION_TTL = 8 * 60 * 60 * 1000;

// ── Client helpers ────────────────────────────────────────────

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    if (Date.now() - session.issuedAt > SESSION_TTL) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function saveAdminSession(session: AdminSession): void {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
