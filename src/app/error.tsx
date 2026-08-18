"use client";

/**
 * App Router error boundary — catches errors thrown inside the root layout's
 * children subtree (pages, layouts, and server components below the root).
 * Must be a Client Component.
 */
import ErrorView from "@/components/ErrorView";

interface ErrorPageProps {
  error:  Error & { digest?: string };
  reset:  () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Log to console for developer visibility without exposing to the user
  console.error("[App Error Boundary]", error);

  // Classify the error type for the right messaging
  const isNetworkError =
    error.message?.toLowerCase().includes("fetch") ||
    error.message?.toLowerCase().includes("network") ||
    error.message?.toLowerCase().includes("failed to fetch");

  const isApiError =
    error.message?.toLowerCase().includes("api") ||
    error.message?.toLowerCase().includes("timeout") ||
    error.message?.toLowerCase().includes("abort");

  const kind = isNetworkError ? "network" : isApiError ? "api" : "server";

  return <ErrorView kind={kind} onRetry={reset} />;
}
