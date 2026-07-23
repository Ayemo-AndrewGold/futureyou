/**
 * Central site configuration.
 * Update values here — they propagate everywhere automatically.
 */
export const SITE_CONFIG = {
  /** WhatsApp number in international format (no +, no spaces) */
  whatsappNumber: "2348000000000",

  /** Pre-filled WhatsApp greeting message */
  whatsappMessage:
    "Hello PIN Consultancy! I was chatting with your website assistant and would like to continue our conversation with your team.",

  /** Derived WhatsApp deep-link */
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  },

  /** Portal/auth paths where floating widgets are hidden */
  hiddenWidgetPaths: ["/portal", "/login", "/signup", "/register"],
};
export const MENU_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];