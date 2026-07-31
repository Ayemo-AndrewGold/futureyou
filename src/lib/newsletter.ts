/**
 * Shared subscription-state helper.
 *
 * Both the NewsletterPopup and NewsletterSignup read/write the same key so
 * subscribing in either place prevents the popup from appearing again.
 */

const KEY = "fy_newsletter_subscribed";

export function hasSubscribedToNewsletter(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(KEY) === "true";
  } catch {
    return false;
  }
}

export function markNewsletterSubscribed(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, "true");
  } catch {
    // localStorage unavailable (private browsing, storage quota) — fail silently.
    // The subscribe request to the backend already succeeded.
  }
}
