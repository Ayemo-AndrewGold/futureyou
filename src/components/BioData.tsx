"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineGlobeAlt,
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
} from "react-icons/hi";

const WHATSAPP_NUMBER = "2348124106198";

const steps = [
  { number: 1, label: "Journey" },
  { number: 2, label: "About You" },
  { number: 3, label: "Confirmation" },
];

interface BioDataForm {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  street: string;
  city: string;
  gender: "" | "Male" | "Female";
}

type FormErrors = Partial<Record<keyof BioDataForm, string>>;

const initialBioData: BioDataForm = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  street: "",
  city: "",
  gender: "",
};

const BioData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const journey = searchParams.get("journey") || "Your Selected Journey";

  const [bioData, setBioData] = useState<BioDataForm>(initialBioData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const currentStep = sent ? 3 : 2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBioData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!bioData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!bioData.email.includes("@")) newErrors.email = "A valid email is required";
    if (!bioData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!bioData.country.trim()) newErrors.country = "Country is required";
    if (!bioData.street.trim()) newErrors.street = "Street address is required";
    if (!bioData.city.trim()) newErrors.city = "Town / city is required";
    if (!bioData.gender) newErrors.gender = "Please select a gender";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) toast.error("Please complete all required fields.");
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Fixed WhatsApp message — clean formatting, proper encodeURIComponent
const buildWhatsAppMessage = (): string => {
  const lines = [
    "Hi FutureYou! I'd like to begin my transformation journey.",
    "",
    "*Journey selected:* " + journey,
    "",
    "*My details:*",
    "*Name:* " + bioData.fullName,
    "*Email:* " + bioData.email,
    "*Phone:* " + bioData.phone,
    "*Gender:* " + bioData.gender,
    "*Country:* " + bioData.country,
    "*Address:* " + bioData.street + ", " + bioData.city,
    "",
    "Please guide me on the next steps.",
  ];
  return lines.join("\n");
};

  const handleContinue = () => {
    if (!validate()) return;
    setSubmitting(true);

    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    toast.success("Redirecting you to WhatsApp...");

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  const isFormComplete = () =>
    !!(
      bioData.fullName.trim() &&
      bioData.email.trim() &&
      bioData.phone.trim() &&
      bioData.country.trim() &&
      bioData.street.trim() &&
      bioData.city.trim() &&
      bioData.gender
    );

  const inputClasses = (hasError?: string) =>
    `w-full pl-11 pr-4 py-3 text-[0.95rem] text-[#0E0E1D] bg-white border rounded-xl shadow-sm placeholder:text-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-[#293C97]/20 focus:border-[#293C97] ${
      hasError ? "border-red-400 bg-red-50/30" : "border-gray-200 hover:border-gray-300"
    }`;

  // ── Step tracker ──
  const StepTracker = () => (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, i) => {
        const isActive = step.number === currentStep;
        const isDone = step.number < currentStep;
        return (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  isDone
                    ? "bg-[#293C97] text-white"
                    : isActive
                    ? "bg-[#293C97] text-white ring-4 ring-[#293C97]/15"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isDone ? "✓" : step.number}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:inline ${
                  isActive
                    ? "text-[#293C97]"
                    : isDone
                    ? "text-[#0E0E1D]"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 sm:w-14 h-[2px] mx-2 rounded-full transition-colors duration-300 ${
                  isDone ? "bg-[#293C97]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Success / confirmation screen ──
  if (sent) {
    return (
      <section className="min-h-screen bg-[#f8f9ff] flex items-center justify-center px-4 pt-5">
        <div className="max-w-md w-full mx-auto" data-aos="zoom-in">
          <StepTracker />
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-8 py-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#E9F9EF] flex items-center justify-center">
              <HiOutlineCheckCircle className="w-9 h-9 text-[#25D366]" />
            </div>
            <div>
              <h2 className="font-lato font-extrabold text-2xl text-[#0E0E1D] mb-2">
                You're all set! 
              </h2>
              <p className="font-montserrat text-sm text-[#666] leading-relaxed">
                We've opened WhatsApp with your details pre-filled. Just hit
                send and our team will guide you through{" "}
                <span className="text-[#293C97] font-semibold">{journey}</span>.
              </p>
            </div>

            {/* Summary card */}
            <div className="w-full bg-[#f8f9ff] border border-gray-100 rounded-xl p-4 text-left mt-2">
              <p className="text-[10px] font-bold text-[#293C97] uppercase tracking-widest mb-3">
                Your details
              </p>
              {[
                { label: "Name", value: bioData.fullName },
                { label: "Email", value: bioData.email },
                { label: "Phone", value: bioData.phone },
                { label: "Journey", value: journey },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-xs py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-[#999] font-medium">{label}</span>
                  <span className="text-[#0E0E1D] font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-full mt-2">
              <button
                type="button"
                onClick={() => {
                  const message = buildWhatsAppMessage();
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
                    "_blank"
                  );
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white text-sm font-bold py-3.5 rounded-xl transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.6 6.32A8.86 8.86 0 0 0 12.06 4a8.91 8.91 0 0 0-7.7 13.42L3 21l3.7-1.31a8.93 8.93 0 0 0 4.36 1.12 8.9 8.9 0 0 0 8.9-8.91 8.78 8.78 0 0 0-2.36-5.58Zm-5.54 13.68a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.79.97.91-2.71-.18-.28a7.4 7.4 0 1 1 13.69-3.98 7.4 7.4 0 0 1-7.59 7.19Zm4.06-5.54c-.22-.11-1.31-.65-1.51-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.06-.22-.11-1.27-.47-2.18-1.34-.85-.76-1.27-1.31-1.4-1.53-.13-.22 0-.34.13-.45.11-.1.24-.27.36-.4.12-.13.16-.22.24-.37.08-.15.04-.28-.02-.4-.06-.11-.55-1.33-.76-1.81-.2-.47-.4-.4-.55-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.65.31-.22.25-.86.85-.86 2.06 0 1.21.88 2.39 1 2.55.13.17 1.71 2.6 4.15 3.55 2.43.94 2.43.63 2.87.59.43-.04 1.31-.53 1.5-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z" />
                </svg>
                Open WhatsApp again
              </button>
              <button
                type="button"
                onClick={() => router.push("/startjourney")}
                className="w-full text-sm font-semibold text-[#293C97] border-[1.5px] border-[#293C97] hover:bg-[#293C97]/5 py-3.5 rounded-xl transition-colors duration-200"
              >
                Start a new journey
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Main form ──
  return (
    <section className="min-h-screen bg-[#f8f9ff] px-4 sm:px-6 pt-10 pb-16">
      <div className="max-w-2xl mx-auto">

        <div data-aos="fade-down">
          <StepTracker />
        </div>

        {/* Header */}
        <div className="mb-8" data-aos="fade-up">
          <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-2">
            Basic info for{" "}
            <span className="text-[#293C97]">{journey}</span>
          </p>
          <h1 className="font-lato font-extrabold text-2xl sm:text-3xl text-[#0E0E1D] leading-tight tracking-tight mb-2">
            Let's get to know you a little better
          </h1>
          <p className="font-montserrat text-sm text-[#666]">
            This helps our team prepare before your WhatsApp conversation.
          </p>
        </div>

        {/* Form card */}
        <div
          className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {/* Personal details section */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#293C97] mb-5">
            Personal details
          </p>

          <div className="flex flex-col gap-5">
            {/* Full name */}
            <div>
              <div className="relative">
                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={bioData.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClasses(errors.fullName)}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={bioData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={inputClasses(errors.email)}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>
              <div className="flex-1">
                <div className="relative">
                  <HiOutlinePhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={bioData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className={inputClasses(errors.phone)}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Gender */}
            <div>
              <p className="text-sm font-semibold text-[#0E0E1D] mb-3">Gender</p>
              <div className="flex gap-3">
                {(["Male", "Female"] as const).map((g) => {
                  const isSelected = bioData.gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        setBioData((prev) => ({ ...prev, gender: g }));
                        setErrors((prev) => ({ ...prev, gender: undefined }));
                      }}
                      className={`px-6 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                        isSelected
                          ? "bg-[#293C97] border-[#293C97] text-white shadow-sm shadow-[#293C97]/20"
                          : "bg-white border-gray-200 text-[#555] hover:border-[#293C97]/40"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-2">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* Address section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#293C97] mb-5">
              Address
            </p>

            <div className="flex flex-col gap-4">
              {/* Country */}
              <div>
                <div className="relative">
                  <HiOutlineGlobeAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="country"
                    value={bioData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className={inputClasses(errors.country)}
                  />
                </div>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.country}</p>
                )}
              </div>

              {/* Street + City */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <HiOutlineLocationMarker className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="street"
                      value={bioData.street}
                      onChange={handleChange}
                      placeholder="Street address"
                      className={inputClasses(errors.street)}
                    />
                  </div>
                  {errors.street && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.street}</p>
                  )}
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <HiOutlineOfficeBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="city"
                      value={bioData.city}
                      onChange={handleChange}
                      placeholder="Town / city"
                      className={inputClasses(errors.city)}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 mt-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:flex-1 text-sm font-semibold text-[#444] border-[1.5px] border-gray-200 hover:bg-gray-50 bg-white py-3.5 rounded-xl transition-colors duration-200"
          >
            ← Go back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={submitting || !isFormComplete()}
            className={`w-full sm:flex-1 flex items-center justify-center gap-2 text-sm font-bold py-3.5 rounded-xl transition-all duration-200 ${
              isFormComplete() && !submitting
                ? "bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-sm shadow-[#25D366]/25"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {submitting ? (
              "Redirecting..."
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                  <path d="M17.6 6.32A8.86 8.86 0 0 0 12.06 4a8.91 8.91 0 0 0-7.7 13.42L3 21l3.7-1.31a8.93 8.93 0 0 0 4.36 1.12 8.9 8.9 0 0 0 8.9-8.91 8.78 8.78 0 0 0-2.36-5.58Zm-5.54 13.68a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.79.97.91-2.71-.18-.28a7.4 7.4 0 1 1 13.69-3.98 7.4 7.4 0 0 1-7.59 7.19Zm4.06-5.54c-.22-.11-1.31-.65-1.51-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.06-.22-.11-1.27-.47-2.18-1.34-.85-.76-1.27-1.31-1.4-1.53-.13-.22 0-.34.13-.45.11-.1.24-.27.36-.4.12-.13.16-.22.24-.37.08-.15.04-.28-.02-.4-.06-.11-.55-1.33-.76-1.81-.2-.47-.4-.4-.55-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.65.31-.22.25-.86.85-.86 2.06 0 1.21.88 2.39 1 2.55.13.17 1.71 2.6 4.15 3.55 2.43.94 2.43.63 2.87.59.43-.04 1.31-.53 1.5-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z" />
                </svg>
                Continue on WhatsApp
              </>
            )}
          </button>
        </div>

        {/* Trust message */}
        <p className="text-center text-xs text-[#bbb] mt-5 flex items-center justify-center gap-1.5">
          <HiOutlineLockClosed className="w-3.5 h-3.5" />
          Your info is only used to personalise your WhatsApp conversation.
        </p>
      </div>
    </section>
  );
};

export default BioData;