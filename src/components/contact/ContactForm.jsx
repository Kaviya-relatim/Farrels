// @ts-nocheck
"use client";

import { useState } from "react";
import { sendFormEmail } from "@/lib/emailjs";

const INITIAL = {
  name: "",
  phone: "",
  email: "",
  message: "",
  contactMethod: "",
  consent: false,
};

export default function ContactForm() {
  const [form, setForm]     = useState({ ...INITIAL });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function validate() {
    const e = {};
    if (!form.name.trim())   e.name   = "Name is required";
    if (!form.phone.trim())  e.phone  = "Phone is required";
    if (!form.email.trim())  e.email  = "Email is required";
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
      await sendFormEmail("Contact Form", {
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
    return `w-full rounded border px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:ring-1 bg-gray-50/30 transition-all ${
      errors[key]
        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
        : "border-gray-200 focus:border-sky-500 focus:ring-sky-500"
    }`;
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-white shadow-2xl shadow-sky-900/10 border border-gray-100 p-8 flex flex-col items-center justify-center gap-5 text-center min-h-[340px]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-gray-900">Message Sent!</h3>
        <p className="text-sm text-gray-500 font-medium max-w-xs">
          Thank you for getting in touch. We'll respond to your enquiry as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 rounded bg-[#005a8d] px-8 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-[#004a75] transition-all"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white shadow-2xl shadow-sky-900/10 border border-gray-100 p-8 space-y-6">
      <div className="space-y-4">
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
          <textarea rows={4} placeholder="How can we help you? *" {...field("message")}
            className={inputClass("message") + " resize-none"} />
          {errors.message && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.message}</p>}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <p className="text-[10px] font-medium leading-relaxed text-gray-500">
          We would like to stay in touch with you to keep up to date with our latest product news, marketing services and offers.
        </p>

        <div className="relative">
          <select {...field("contactMethod")} className={inputClass("contactMethod") + " appearance-none"}>
            <option value="">Select contact method *</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-sky-700/50">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {errors.contactMethod && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.contactMethod}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
            checked={form.consent}
            onChange={(e) => {
              setForm(f => ({ ...f, consent: e.target.checked }));
              setErrors(err => { const n = { ...err }; delete n.consent; return n; });
            }} />
          <span className="text-[10px] font-bold text-gray-500">
            I consent to having this website store my submitted information so they can respond to my Enquiry.
          </span>
        </div>
        {errors.consent && <p className="text-[10px] text-red-500 font-bold">{errors.consent}</p>}

        {status === "error" && (
          <p className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            Something went wrong. Please try again or call us directly.
          </p>
        )}

        <button type="submit" disabled={status === "sending"}
          className="flex items-center justify-center gap-2 w-full rounded bg-[#005a8d] py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-[#004a75] transition-all sm:w-auto sm:px-12 disabled:opacity-60 disabled:cursor-not-allowed">
          {status === "sending" ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              SENDING...
            </>
          ) : "SUBMIT"}
        </button>
      </div>
    </form>
  );
}
