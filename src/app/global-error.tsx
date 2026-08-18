"use client";

/**
 * Global error boundary — catches errors thrown in the root layout itself
 * (e.g. font loading, metadata, top-level providers).
 * Must include <html> and <body> because it replaces the entire document.
 */
import ErrorView from "@/components/ErrorView";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  console.error("[Global Error Boundary]", error);

  return (
    <html lang="en">
      <body>
        <ErrorView kind="generic" onRetry={reset} showLogo={true} />
      </body>
    </html>
  );
}
