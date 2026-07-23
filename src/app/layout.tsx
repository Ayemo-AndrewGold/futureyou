import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Lato, Montserrat } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import AOSInit from "@/components/AosInit";
import ScrollToTop from "@/components/ScrollToTop";
import AnnouncementBar from "@/components/AnnouncementBar";
import EventPopup from "@/components/EventPopup";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",      // creates a CSS variable
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://futureyoulimited.com"),

  title: {
    default: "Future You Limited",
    template: "%s | Future You Limited",
  },

  description:
    "Future You Limited empowers individuals and businesses through expert coaching, strategic consulting, and growth capital—helping you unlock your potential and achieve lasting transformation.",

  keywords: [
    "Future You Limited",
    "Coaching",
    "Business Consulting",
    "Growth Capital",
    "Leadership Development",
    "Business Growth",
    "Personal Development",
    "Career Development",
    "Entrepreneurship",
    "Business Funding",
    "Soft Loans",
    "Mentorship",
    "Transformation",
    "Nigeria",
  ],

  authors: [
    {
      name: "Future You",
    },
  ],

  creator: "Future You Limited",

  publisher: "Future You Limited",

  category: "Business",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Future You",
    description:
      "Helping individuals and businesses become the future version of themselves through Coaching, Consulting & Growth Capital.",
    url: "https://futureyoulimited.com",
    siteName: "Future You Limited",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/images/futureyouimage.png",
        width: 1200,
        height: 630,
        alt: "Future You Limited",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Future You",
    description:
      "Helping individuals and businesses achieve lasting transformation.",
    images: ["/images/futureyouimage.png"],
  },

  alternates: {
    canonical: "https://futureyoulimited.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <AnnouncementBar />
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <AOSInit />
        <ScrollToTop />
        <ChatWidget />
        <EventPopup />
      </body>
    </html>
  );
}