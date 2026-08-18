import ErrorView from "@/components/ErrorView";

/**
 * App Router 404 — rendered whenever notFound() is called or a route
 * doesn't match. This is a Server Component so it can't use hooks,
 * but ErrorView itself is "use client" and handles all interactivity.
 */
export default function NotFound() {
  return <ErrorView kind="not-found" />;
}
