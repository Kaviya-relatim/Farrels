// @ts-nocheck
"use client";

import { useState } from "react";
import { sendFormEmail } from "@/lib/emailjs";

export default function ServicingForm() {
  const [regNumber, setRegNumber]   = useState("");
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [email, setEmail]           = useState("");
  const [serviceType, setServiceType] = useState("");
  const [errors, setErrors]         = useState({});
  const [status, setStatus]         = useState("idle"); // idle | sending | success | error
  const [expanded, setExpanded]     = useState(false);

  function validate() {
    const e = {};
    if (!regNumber.trim()) e.regNumber = "Registration number is required";
    if (expanded) {
      if (!name.trim())  e.name  = "Name is required";
      if (!phone.trim()) e.phone = "Phone is required";
      if (!email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email";
    }
    return e;
  }

  function handleSearch() {
    if (!regNumber.trim()) { setErrors({ regNumber: "Please enter a registration number" }); return; }
    setErrors({});
    setExpanded(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    try {
      await sendFormEmail("Servicing Request", {
        reg_number:     regNumber,
        customer_name:  name,
        customer_phone: phone,
        customer_email: email,
        service_type:   serviceType || "Not specified",
      });
      setStatus("success");
      setRegNumber(""); setName(""); setPhone(""); setEmail(""); setServiceType("");
      setExpanded(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border border-gray-100 max-w-sm mx-auto lg:mx-0 flex flex-col items-center gap-5 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-gray-900">Request Sent!</h3>
        <p className="text-xs text-gray-500 font-medium">We'll be in touch to confirm your service booking soon.</p>
        <button onClick={() => setStatus("idle")}
          className="rounded-xl bg-[#015581] px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#004468] transition-all">
          New Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border border-gray-100 max-w-sm mx-auto lg:mx-0">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-gray-900 mb-1.5">To Request a Service</h2>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Please Enter Your Reg</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Reg Number */}
        <div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400 group-focus-within:text-sky-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => { setRegNumber(e.target.value.toUpperCase()); setErrors((err) => { const n = { ...err }; delete n.regNumber; return n; }); }}
              placeholder="Reg. Number *"
              className={`w-full bg-gray-50 border-2 rounded-xl py-3.5 pl-11 pr-4 text-xs font-black focus:outline-none focus:bg-white transition-all uppercase placeholder:normal-case shadow-inner ${
                errors.regNumber ? "border-red-400" : "border-transparent focus:border-sky-500"
              }`}
            />
          </div>
          {errors.regNumber && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.regNumber}</p>}
        </div>

        {!expanded && (
          <button type="button" onClick={handleSearch}
            className="w-full bg-[#015581] hover:bg-[#004468] text-white font-black py-3.5 rounded-xl tracking-[0.2em] text-[10px] transition-all active:scale-[0.98] shadow-md shadow-sky-900/10 uppercase">
            SEARCH VEHICLE
          </button>
        )}

        {expanded && (
          <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-300">
            <div>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors((err) => { const n = { ...err }; delete n.name; return n; }); }}
                placeholder="Your Name *"
                className={`w-full bg-gray-50 border-2 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:bg-white transition-all ${errors.name ? "border-red-400" : "border-transparent focus:border-sky-500"}`} />
              {errors.name && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.name}</p>}
            </div>
            <div>
              <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((err) => { const n = { ...err }; delete n.phone; return n; }); }}
                placeholder="Phone Number *"
                className={`w-full bg-gray-50 border-2 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:bg-white transition-all ${errors.phone ? "border-red-400" : "border-transparent focus:border-sky-500"}`} />
              {errors.phone && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.phone}</p>}
            </div>
            <div>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((err) => { const n = { ...err }; delete n.email; return n; }); }}
                placeholder="Email Address *"
                className={`w-full bg-gray-50 border-2 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:bg-white transition-all ${errors.email ? "border-red-400" : "border-transparent focus:border-sky-500"}`} />
              {errors.email && <p className="mt-1 text-[10px] text-red-500 font-bold">{errors.email}</p>}
            </div>
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-sky-500 focus:bg-white transition-all appearance-none">
              <option value="">Select Service Type</option>
              <option>Full Service</option>
              <option>Oil Change</option>
              <option>NCT Pre-Check</option>
              <option>Brake Service</option>
              <option>Timing Belt</option>
              <option>Diagnostics</option>
              <option>Other</option>
            </select>

            {status === "error" && (
              <p className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                Something went wrong. Please try again.
              </p>
            )}

            <button type="submit" disabled={status === "sending"}
              className="w-full bg-[#015581] hover:bg-[#004468] text-white font-black py-3.5 rounded-xl tracking-[0.2em] text-[10px] transition-all active:scale-[0.98] shadow-md uppercase flex items-center justify-center gap-2 disabled:opacity-60">
              {status === "sending" ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  SUBMITTING...
                </>
              ) : "REQUEST SERVICE BOOKING"}
            </button>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.25em]">powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/cartell.png" alt="Cartell.ie" className="h-6 w-32 object-contain" />
          </div>
        </div>
      </form>
    </div>
  );
}
