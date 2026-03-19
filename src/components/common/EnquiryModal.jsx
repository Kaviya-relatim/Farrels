// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { sendFormEmail } from "@/lib/emailjs";

const INITIAL = {
  name: "",
  phone: "",
  email: "",
  message: "",
  contactMethod: "",
  consent: false,
};

export default function EnquiryModal({ isOpen, onClose, vehicleName }) {
  const [form, setForm] = useState({ ...INITIAL });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.phone.trim())   e.phone   = "Phone is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    if (!form.contactMethod)  e.contactMethod = "Please select a contact method";
    if (!form.consent)        e.consent = "Consent is required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    try {
      await sendFormEmail("Used Car Enquiry", {
        vehicle:        vehicleName || "Not specified",
        customer_name:  form.name,
        customer_phone: form.phone,
        customer_email: form.email,
        message:        form.message,
        contact_method: form.contactMethod,
        gdpr_consent:   form.consent ? "Yes" : "No",
      });
      setStatus("success");
      setForm({ ...INITIAL });
    } catch {
      setStatus("error");
    }
  }

  function field(key) {
    return {
      value: form[key],
      onChange: (e) => {
        setForm(f => ({ ...f, [key]: e.target.value }));
        setErrors(err => { const n = { ...err }; delete n[key]; return n; });
      },
    };
  }

  function inputClass(key) {
    return `w-full rounded-lg border px-4 py-3.5 text-sm font-bold text-gray-700 outline-none transition-all focus:ring-1 placeholder:text-gray-300 bg-white ${
      errors[key]
        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
        : "border-gray-200 focus:border-sky-500 focus:ring-sky-500"
    }`;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-hidden rounded-[24px] bg-white shadow-2xl flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-900 z-10 p-1 transition-colors">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── Success screen ── */}
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900">Enquiry Sent!</h2>
            <p className="text-sm text-gray-500 font-medium">We've received your enquiry and will be in touch shortly.</p>
            <button onClick={onClose} className="mt-4 rounded-lg bg-[#015581] px-8 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-[#004468] transition-all">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              <h2 className="mb-6 text-2xl md:text-3xl font-black tracking-tight text-[#333d46] pr-8">
                Make a Used Car Enquiry
              </h2>
              {vehicleName && (
                <p className="mb-4 text-xs font-black uppercase tracking-widest text-[#015581] bg-sky-50 rounded-lg px-4 py-2">
                  Vehicle: {vehicleName}
                </p>
              )}

              <div className="space-y-3.5">
                <div>
                  <input type="text" placeholder="Your Name *" {...field("name")} className={inputClass("name")} />
                  {errors.name && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.name}</p>}
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number *" {...field("phone")} className={inputClass("phone")} />
                  {errors.phone && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.phone}</p>}
                </div>
                <div>
                  <input type="email" placeholder="Email *" {...field("email")} className={inputClass("email")} />
                  {errors.email && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.email}</p>}
                </div>
                <div>
                  <textarea placeholder="How can we help you? *" {...field("message")}
                    className={`h-28 resize-none ${inputClass("message")}`} />
                  {errors.message && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] leading-relaxed text-gray-400 font-bold mb-5">
                  We would like to stay in touch with you to keep up to date with our latest product news, marketing services and offers.
                </p>

                <div className="relative mb-5">
                  <select {...field("contactMethod")} className={inputClass("contactMethod") + " appearance-none h-12"}>
                    <option value="">Select contact method *</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {errors.contactMethod && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.contactMethod}</p>}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <div className={`relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border mt-0.5 transition-all ${form.consent ? "border-sky-500 bg-sky-500" : errors.consent ? "border-red-400" : "border-gray-300 bg-white"}`}>
                    <input type="checkbox" className="sr-only" checked={form.consent}
                      onChange={(e) => {
                        setForm(f => ({ ...f, consent: e.target.checked }));
                        setErrors(err => { const n = { ...err }; delete n.consent; return n; });
                      }} />
                    <svg className={`h-3 w-3 text-white transition-opacity ${form.consent ? "opacity-100" : "opacity-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 leading-tight">
                    I consent to having this website store my submitted information so they can respond to my Enquiry.
                  </span>
                </label>
                {errors.consent && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.consent}</p>}
              </div>
            </div>

            {status === "error" && (
              <div className="mx-6 md:mx-10 mb-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-[11px] font-bold text-red-600">
                Something went wrong. Please try again or call us directly.
              </div>
            )}

            <div className="bg-[#f8faff] px-6 py-6 md:px-10 flex justify-end border-t border-gray-100">
              <button type="submit" disabled={status === "sending"}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#015581] px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#004468] active:scale-95 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                {status === "sending" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    SENDING...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    MAKE AN ENQUIRY
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
