import { PostDetail, PostListItem } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPosts(): Promise<PostListItem[]> {
  const res = await fetch(`${API_URL}/api/blog/posts/`, {
    next: { revalidate: 60 }, // ISR: refetch at most once a minute
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  const res = await fetch(`${API_URL}/api/blog/posts/${slug}/`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
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