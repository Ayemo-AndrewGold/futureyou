import { PostDetail, PostListItem, NewsletterSubscriber, NewsletterResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
const hasApiUrl = Boolean(API_URL);

if (!hasApiUrl) {
  console.warn(
    "WARNING: NEXT_PUBLIC_API_URL is not defined. API fetches will return fallback values."
  );
}

const DEFAULT_FETCH_TIMEOUT_MS = 65000; // 65 seconds — Render free tier cold start can take 30-60s

async function fetchWithTimeout(input: RequestInfo, init?: RequestInit) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_FETCH_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getPosts(): Promise<PostListItem[]> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/blog/posts/`, {
      next: { revalidate: 60 }, // ISR: refetch at most once a minute
    } as RequestInit);

    if (!res.ok) {
      console.error("getPosts() returned non-OK status:", res.status, res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("getPosts() failed:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/blog/posts/${slug}/`, {
      next: { revalidate: 60 },
    } as RequestInit);

    if (res.status === 404) return null;
    if (!res.ok) {
      console.error("getPost() returned non-OK status:", res.status, res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("getPost() failed:", error);
    return null;
  }
}

export async function postComment(
  slug: string,
  data: { author_name: string; author_email: string; content: string }
) {
  const res = await fetch(`${API_URL}/api/blog/posts/${slug}/comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || "Failed to post comment");
  }
  return res.json();
}

export async function reactToPost(slug: string, emoji: string) {
  const res = await fetch(`${API_URL}/api/blog/posts/${slug}/react/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emoji }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || "Failed to react");
  }
  return res.json();
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function subscribeToNewsletter(
  data: NewsletterSubscriber
): Promise<NewsletterResponse> {
  const res = await fetch(`${API_URL}/api/newsletter/subscribe/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: data.email.trim().toLowerCase() }),
  });

  const response = await res.json();

  if (!res.ok) {
    throw new Error(response.message || 'Subscription failed');
  }

  return response;
}

export async function unsubscribeFromNewsletter(
  email: string
): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/api/newsletter/unsubscribe/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });

  const response = await res.json();

  if (!res.ok) {
    throw new Error(response.message || 'Unsubscribe failed');
  }

  return response;
}