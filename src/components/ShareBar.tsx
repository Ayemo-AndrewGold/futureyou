"use client";

import { useEffect, useState } from "react";

interface ShareBarProps {
  title: string;
  slug: string;
}

const ShareBar: React.FC<ShareBarProps> = ({ title, slug }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(`/blog/${slug}`);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/blog/${slug}`);
    }
  }, [slug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, no need to alarm the reader
    }
  };

  const shareLinks = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-current">
          <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.3l8.1-9.3L1 2h7l4.9 6.4L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
        </svg>
      ),
      buttonClassName:
        "bg-black text-white border-black hover:border-black hover:bg-black hover:text-white",
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${shareUrl}`)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-current">
          <path d="M17.6 6.3A8.9 8.9 0 0 0 12.1 4a8.9 8.9 0 0 0-7.7 13.4L3 21l3.7-1.3a8.9 8.9 0 0 0 4.4 1.1 8.9 8.9 0 0 0 8.9-8.9 8.8 8.8 0 0 0-2.4-5.6Zm-5.5 13.7a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.8 1 .9-2.7-.2-.3a7.4 7.4 0 1 1 13.7-4 7.4 7.4 0 0 1-7.5 7.2Zm4.1-5.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.4.1-.2.2-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.6-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4l.3-.3c.1-.1.2-.2.2-.3.1-.1 0-.2-.1-.3-.1-.1-.4-1-.6-1.4-.2-.4-.3-.4-.4-.4h-.4c-.1 0-.3.1-.4.2-.2.2-.7.7-.7 1.7s.7 2 0 2.3l.4.7c.3.4 1.5 2.3 3.5 3.1.5.2.9.3 1.2.3.5 0 .8-.1 1.1-.2.3-.1 1.1-.4 1.2-1 .1-.5.1-.9.1-1-.1-.1-.2-.1-.4-.2Z" />
        </svg>
      ),
      buttonClassName:
        "bg-[#25D366] text-white border-[#25D366] hover:border-[#25D366] hover:bg-[#25D366] hover:text-white",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-[#666] transition-colors duration-200 ${link.buttonClassName ?? "hover:border-[#293C97] hover:text-[#293C97]"}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="h-9 px-3.5 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white text-[#4b5563] text-xs font-semibold shadow-sm transition-all duration-200 hover:border-[#293C97] hover:text-[#293C97] hover:shadow-md"
      >
        {copied ? (
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] fill-none stroke-current" strokeWidth="2.2">
              <path d="M5 12.5 9.5 17 19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copied
          </span>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] fill-none stroke-current" strokeWidth="2">
              <rect x="9" y="4" width="10" height="13" rx="2" />
              <path d="M7 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" strokeLinecap="round" />
            </svg>
            Copy link
          </>
        )}
      </button>
    </div>
  );
};

export default ShareBar;