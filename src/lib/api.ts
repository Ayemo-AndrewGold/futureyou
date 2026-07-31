import {
  PostDetail,
  PostListItem,
  NewsletterSubscriber,
  NewsletterResponse,
} from "./types";

// ---------------------------------------------------------------------------
// Base URL
// ---------------------------------------------------------------------------
// NEXT_PUBLIC_API_URL  → available in both browser and Node (SSR/ISR)
// Fallback to empty string so relative URLs work when both apps are served
// from the same origin (unlikely for this project but safe).
export const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, ""); // strip trailing slash

if (!API_BASE && typeof window === "undefined") {
  // Only warn at build / SSR time so the browser console stays clean.
  console.warn(
    "[api] NEXT_PUBLIC_API_URL is not set. " +
      "All API calls will fail. Add it to .env.local (dev) " +
      "or the Render environment variables (production)."
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const DEFAULT_TIMEOUT_MS = 65_000; // Render free-tier cold start can take ~50 s

/** fetch() wrapper that aborts after a timeout. */
async function fetchWithTimeout(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Parse DRF error responses into a human-readable string.
 *
 * DRF can return errors in several shapes:
 *   { "detail": "Not found." }                       ← authentication / 404
 *   { "email": ["Enter a valid email address."] }    ← field-level validation
 *   { "non_field_errors": ["..."] }                  ← non-field validation
 *   "plain string"                                   ← rare
 */
export function parseDRFError(body: unknown, fallback = "Something went wrong."): string {
  if (!body || typeof body !== "object") return fallback;

  const obj = body as Record<string, unknown>;

  // Top-level detail message
  if (typeof obj.detail === "string") return obj.detail;

  // Collect all field errors into one readable message
  const messages: string[] = [];
  for (const [field, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      const label = field === "non_field_errors" ? "" : `${field}: `;
      messages.push(`${label}${value.join(" ")}`);
    } else if (typeof value === "string") {
      messages.push(`${field}: ${value}`);
    }
  }

  return messages.length > 0 ? messages.join(" · ") : fallback;
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

/** Fetch all published posts. Returns [] on any failure so pages don't crash. */
export async function getPosts(): Promise<PostListItem[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/blog/posts/`, {
      next: { revalidate: 60 }, // ISR: re-fetch at most once per minute
    } as RequestInit);

    if (!res.ok) {
      console.error(`[getPosts] ${res.status} ${res.statusText}`);
      return [];
    }

    return (await res.json()) as PostListItem[];
  } catch (err) {
    console.error("[getPosts] fetch failed:", err);
    return [];
  }
}

/** Fetch a single post by slug. Returns null for 404 or any failure. */
export async function getPost(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/blog/posts/${slug}/`, {
      next: { revalidate: 60 },
    } as RequestInit);

    if (res.status === 404) return null;

    if (!res.ok) {
      console.error(`[getPost] ${res.status} ${res.statusText}`);
      return null;
    }

    return (await res.json()) as PostDetail;
  } catch (err) {
    console.error("[getPost] fetch failed:", err);
    return null;
  }
}

/**
 * Post a comment on a published post.
 *
 * The backend endpoint is POST /api/blog/posts/<slug>/comments/
 * The view already attaches the post from the URL, so the body only needs:
 *   author_name, author_email, content
 *
 * Throws a descriptive Error on validation failures so the form can display it.
 */
export async function postComment(
  slug: string,
  data: { author_name: string; author_email: string; content: string }
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/blog/posts/${slug}/comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(parseDRFError(body, "Failed to post comment."));
  }
}

/** Toggle / change a reaction on a post. Throws on failure. */
export async function reactToPost(
  slug: string,
  emoji: string
): Promise<{ emoji: string; emoji_label: string; created_at: string }> {
  const res = await fetch(`${API_BASE}/api/blog/posts/${slug}/react/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emoji }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(parseDRFError(body, "Failed to save reaction."));
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------

/** Subscribe an email address to the newsletter. Throws on failure. */
export async function subscribeToNewsletter(
  data: NewsletterSubscriber
): Promise<NewsletterResponse> {
  const res = await fetch(`${API_BASE}/api/newsletter/subscribe/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: data.email.trim().toLowerCase() }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(parseDRFError(body, "Subscription failed. Please try again."));
  }

  return body as NewsletterResponse;
}

/** Unsubscribe an email address from the newsletter. Throws on failure. */
export async function unsubscribeFromNewsletter(
  email: string
): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/newsletter/unsubscribe/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(parseDRFError(body, "Unsubscribe failed. Please try again."));
  }

  return body as { message: string };
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/** Format an ISO date string to a human-readable date (e.g. "July 23, 2026"). */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
