// // Shared subscription-state helper.
// // Both the newsletter popup and the footer form read/write this same key,
// // so subscribing in either place stops the other from asking again.

// const NEWSLETTER_SUBSCRIBED_KEY = 'fy_newsletter_subscribed';

// export function hasSubscribedToNewsletter(): boolean {
//   if (typeof window === 'undefined') return false;
//   try {
//     return localStorage.getItem(NEWSLETTER_SUBSCRIBED_KEY) === 'true';
//   } catch {
//     return false;
//   }
// }

// export function markNewsletterSubscribed(): void {
//   if (typeof window === 'undefined') return;
//   try {
//     localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, 'true');
//   } catch {
//     // localStorage unavailable (private browsing, etc.) — fail silently.
//     // The subscribe request to MailerLite still succeeded either way.
//   }
// }