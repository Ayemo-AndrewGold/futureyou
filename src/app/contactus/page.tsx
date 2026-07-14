"use client";


import { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineChatAlt2,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import Header from "@/components/Header";
import Image from "next/image";

import  Footer from "@/components/Footer";

const WHATSAPP_NUMBER = "2348124106198";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const initialForm: ContactForm = { name: "", email: "", message: "" };

const ContactUsPage = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormComplete = () =>
    !!(form.name.trim() && form.email.trim() && form.message.trim());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormComplete()) return;

    setSubmitting(true);

    const whatsappMessage = `Hi FutureYou! 👋 I have a message via the Contact Us page.\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n\n💬 Message:\n${form.message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setSubmitting(false);
      setSent(true);
      setForm(initialForm);
      setTimeout(() => setSent(false), 4000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* ── Hero band ── */}
      <section className="relative w-full overflow-hidden px-3 sm:px-10 lg:px-16 pt-25 pb-20">    {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/yaovkmpi/image/upload/v1784040845/future_r4ss4x.jpg"
            alt="Future You Background"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/80 to-[#293C97]/20" />
        </div>

          {/* Decorative Blur Accent */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#293C97]/10 rounded-full blur-3xl z-0" />        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 w-[280px] h-[280px] rounded-full border border-white/10"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase mb-6"
            data-aos="fade-up"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
            Get in touch
          </div>

          {/* Headline */}
          <h1
            className="font-lato font-extrabold text-4xl sm:text-5xl lg:text-[3.25rem] text-white leading-[1.1] tracking-tight max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="60"
          >
            We&apos;re here to help
            <br />
            <span className="relative inline-block">
              you move forward.
            </span>
          </h1>

          <p
            className="mt-6 text-white/65 text-base sm:text-lg font-montserrat leading-relaxed max-w-xl"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            Have a question or ready to start your journey? Send us a message
            and our team will respond on WhatsApp right away.
          </p>
        </div>
      </section>

      {/* ── Form + contact info ── */}
      <section className="w-full px-2 sm:px-10 lg:px-16  bg-[#F6F8FF]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-14 -mt-16 relative z-10">

            {/* ── Form card ── */}
            <div
              className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(41,60,151,0.10)] py-4 px-2 sm:p-10"
              data-aos="fade-up"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#293C97] mb-1">
                Send a message
              </p>
              <h2 className="font-lato font-extrabold text-xl text-[#0E0E1D] mb-7">
                Fill in the form below
              </h2>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Name + Email row */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 group relative">
                    <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-1.5">
                      Full name
                    </label>
                    <div className="relative">
                      <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#293C97] transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Chioma Okafor"
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm text-[#0E0E1D] bg-[#F9FAFE] border border-gray-200 rounded-xl placeholder:text-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-[#293C97]/20 focus:border-[#293C97] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex-1 group relative">
                    <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-1.5">
                      Email address
                    </label>
                    <div className="relative">
                      <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#293C97] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm text-[#0E0E1D] bg-[#F9FAFE] border border-gray-200 rounded-xl placeholder:text-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-[#293C97]/20 focus:border-[#293C97] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-1.5">
                    Your message
                  </label>
                  <div className="relative">
                    <HiOutlineChatAlt2 className="absolute left-3.5 top-4 w-4 h-4 text-gray-400 group-focus-within:text-[#293C97] transition-colors" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you…"
                      rows={5}
                      required
                      className="w-full pl-10 pr-4 py-3 text-sm text-[#0E0E1D] bg-[#F9FAFE] border border-gray-200 rounded-xl placeholder:text-gray-400 outline-none resize-none transition-all duration-150 focus:ring-2 focus:ring-[#293C97]/20 focus:border-[#293C97] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={!isFormComplete() || submitting}
                    className={`flex items-center justify-center gap-2.5 text-sm font-bold py-3.5 px-8 rounded-xl transition-all duration-200 ${
                      isFormComplete() && !submitting
                        ? "bg-[#25D366] hover:bg-[#1ebe5b] active:scale-[0.98] text-white cursor-pointer shadow-[0_4px_16px_rgba(37,211,102,0.35)]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        Opening WhatsApp…
                      </span>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                          <path d="M17.6 6.32A8.86 8.86 0 0 0 12.06 4a8.91 8.91 0 0 0-7.7 13.42L3 21l3.7-1.31a8.93 8.93 0 0 0 4.36 1.12 8.9 8.9 0 0 0 8.9-8.91 8.78 8.78 0 0 0-2.36-5.58Zm-5.54 13.68a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.79.97.91-2.71-.18-.28a7.4 7.4 0 1 1 13.69-3.98 7.4 7.4 0 0 1-7.59 7.19Zm4.06-5.54c-.22-.11-1.31-.65-1.51-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.06-.22-.11-1.27-.47-2.18-1.34-.85-.76-1.27-1.31-1.4-1.53-.13-.22 0-.34.13-.45.11-.1.24-.27.36-.4.12-.13.16-.22.24-.37.08-.15.04-.28-.02-.4-.06-.11-.55-1.33-.76-1.81-.2-.47-.4-.4-.55-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.65.31-.22.25-.86.85-.86 2.06 0 1.21.88 2.39 1 2.55.13.17 1.71 2.6 4.15 3.55 2.43.94 2.43.63 2.87.59.43-.04 1.31-.53 1.5-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z" />
                        </svg>
                        Send via WhatsApp
                      </>
                    )}
                  </button>

                  {/* Success nudge */}
                  {sent && (
                    <span className="flex items-center gap-1.5 text-sm text-[#1ebe5b] font-semibold animate-pulse">
                      <HiOutlineCheckCircle className="w-5 h-5" />
                      WhatsApp opened!
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* ── Contact info column ── */}
            <div
              className="flex flex-col gap-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#293C97] mb-1">
                Contact details
              </p>
              <h2 className="font-lato font-extrabold text-xl text-[#0E0E1D] mb-2">
                Reach us directly
              </h2> */}

              {/* Email */}
              <a
                href="mailto:info@futureyoulimited.com"
                className="group  flex items-center gap-4 bg-white rounded-2xl border border-gray-100 py-5 px-2 hover:border-[#293C97]/40 hover:shadow-[0_4px_20px_rgba(41,60,151,0.08)] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EEF0FA] flex items-center justify-center shrink-0 group-hover:bg-[#293C97] transition-colors duration-200">
                  <HiOutlineMail className="w-5 h-5 text-[#293C97] group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#aaa] mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-[#0E0E1D] truncate">
                    info@futureyoulimited.com
                  </p>
                </div>
                <HiOutlineArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#293C97] ml-auto shrink-0 transition-colors" />
              </a>

              {/* Phone */}
              <a
                href="tel:08169159291"
                className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 py-5 px-2 hover:border-[#293C97]/40 hover:shadow-[0_4px_20px_rgba(41,60,151,0.08)] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EEF0FA] flex items-center justify-center shrink-0 group-hover:bg-[#293C97] transition-colors duration-200">
                  <HiOutlinePhone className="w-5 h-5 text-[#293C97] group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#aaa] mb-0.5">Phone</p>
                  <p className="text-sm font-semibold text-[#0E0E1D]">0816 915 9291</p>
                </div>
                <HiOutlineArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#293C97] ml-auto shrink-0 transition-colors" />
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 py-5 px-2">
                <div className="w-11 h-11 rounded-xl bg-[#EEF0FA] flex items-center justify-center shrink-0">
                  <HiOutlineLocationMarker className="w-5 h-5 text-[#293C97]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#aaa] mb-0.5">Office</p>
                  <p className="text-sm font-semibold text-[#0E0E1D] leading-snug">
                    Blk F3 Suite 256 Eastline HFP Complex,
                    <br />Lekki-Epe Expressway, Lagos.
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              {/* <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-[#293C97] rounded-2xl p-5 text-white hover:bg-[#1e2d85] active:scale-[0.99] transition-all duration-200 shadow-[0_4px_20px_rgba(41,60,151,0.25)] mt-1"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.6 6.32A8.86 8.86 0 0 0 12.06 4a8.91 8.91 0 0 0-7.7 13.42L3 21l3.7-1.31a8.93 8.93 0 0 0 4.36 1.12 8.9 8.9 0 0 0 8.9-8.91 8.78 8.78 0 0 0-2.36-5.58Zm-5.54 13.68a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.79.97.91-2.71-.18-.28a7.4 7.4 0 1 1 13.69-3.98 7.4 7.4 0 0 1-7.59 7.19Zm4.06-5.54c-.22-.11-1.31-.65-1.51-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.06-.22-.11-1.27-.47-2.18-1.34-.85-.76-1.27-1.31-1.4-1.53-.13-.22 0-.34.13-.45.11-.1.24-.27.36-.4.12-.13.16-.22.24-.37.08-.15.04-.28-.02-.4-.06-.11-.55-1.33-.76-1.81-.2-.47-.4-.4-.55-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.65.31-.22.25-.86.85-.86 2.06 0 1.21.88 2.39 1 2.55.13.17 1.71 2.6 4.15 3.55 2.43.94 2.43.63 2.87.59.43-.04 1.31-.53 1.5-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 font-medium mb-0.5">Fastest response</p>
                    <p className="text-sm font-bold">Chat with us on WhatsApp</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <HiOutlineArrowRight className="w-4 h-4" />
                </div>
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {/* ── Map section ── */}
      <section className="w-full px-2 sm:px-10 lg:px-16 pt-18 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8" data-aos="fade-up">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#293C97] mb-2">
                Our location
              </p>
              <h2 className="font-lato font-extrabold text-2xl text-[#0E0E1D]">
                Find us on the map
              </h2>
            </div>
            <p className="text-sm text-[#666] font-montserrat max-w-sm leading-relaxed sm:text-right">
              Blk F3 Suite 256 Eastline HFP Complex,
              Lekki-Epe Expressway, Lagos.
            </p>
          </div>

          <div
            className="relative w-full aspect-[16/7] rounded-[2px] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.08)] ring-1 ring-gray-200"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <iframe
              title="Company location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.2482845357127!2d3.5327718159199635!3d6.457019725372295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf83d09e1c7f5%3A0x5c97b4fef6b93dc4!2sEastline%20Shopping%20Complex!5e0!3m2!1sen!2sng!4v1721726209805!5m2!1sen!2sng"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
            {/* Footer */}
      <div className="relative w-full overflow-hidden pb-3">
        <Image 
          src="/images/footer.webp" 
          alt="footer background"
          fill
          className="object-cover object-top pointer-events-none select-none"
          loading="lazy"
          decoding="async"
          priority={false}
          fetchPriority="low"
        />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;