// @ts-nocheck
"use client";

import { useState, useRef } from "react";
import { sendFormEmail } from "@/lib/emailjs";

const INITIAL_STEP1 = { firstName: "", lastName: "", phone: "", email: "" };
const INITIAL_STEP2 = { regNumber: "", mileage: "", engineSize: "" };
const INITIAL_STEP3 = {
  model: "", variant: "", condition: "Good", serviceHistory: "Yes",
  vehicleInterest: "", message: "", consent: false,
};

export default function CashForCarsForm() {
  const [step, setStep]     = useState(1);
  const [step1, setStep1]   = useState({ ...INITIAL_STEP1 });
  const [step2, setStep2]   = useState({ ...INITIAL_STEP2 });
  const [step3, setStep3]   = useState({ ...INITIAL_STEP3 });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const fileRefs            = useRef({});

  const steps = [
    { number: 1, label: "Personal Information" },
    { number: 2, label: "Car Info" },
    { number: 3, label: "Submit Enquiry" },
  ];

  function validateStep1() {
    const e = {};
    if (!step1.firstName.trim()) e.firstName = "Required";
    if (!step1.lastName.trim())  e.lastName  = "Required";
    if (!step1.phone.trim())     e.phone     = "Required";
    if (!step1.email.trim())     e.email     = "Required";
    else if (!/\S+@\S+\.\S+/.test(step1.email)) e.email = "Invalid email";
    return e;
  }

  function validateStep2() {
    const e = {};
    if (!step2.regNumber.trim())  e.regNumber  = "Required";
    if (!step2.mileage.trim())    e.mileage    = "Required";
    if (!step2.engineSize.trim()) e.engineSize = "Required";
    return e;
  }

  function validateStep3() {
    const e = {};
    if (!step3.model.trim())   e.model   = "Required";
    if (!step3.variant.trim()) e.variant = "Required";
    if (!step3.consent)        e.consent = "Consent is required";
    return e;
  }

  function handleNext() {
    let errs = {};
    if (step === 1) errs = validateStep1();
    if (step === 2) errs = validateStep2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validateStep3();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    try {
      await sendFormEmail("Cash for Cars / Trade-In", {
        customer_first_name: step1.firstName,
        customer_last_name:  step1.lastName,
        customer_phone:      step1.phone,
        customer_email:      step1.email,
        reg_number:          step2.regNumber,
        mileage_km:          step2.mileage,
        engine_size:         step2.engineSize,
        car_model:           step3.model,
        car_variant:         step3.variant,
        condition:           step3.condition,
        service_history:     step3.serviceHistory,
        vehicle_interest:    step3.vehicleInterest,
        message:             step3.message,
        gdpr_consent:        step3.consent ? "Yes" : "No",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function s1Field(key) {
    return {
      value: step1[key],
      onChange: (e) => {
        setStep1((f) => ({ ...f, [key]: e.target.value }));
        setErrors((err) => { const n = { ...err }; delete n[key]; return n; });
      },
    };
  }

  function s2Field(key) {
    return {
      value: step2[key],
      onChange: (e) => {
        setStep2((f) => ({ ...f, [key]: e.target.value }));
        setErrors((err) => { const n = { ...err }; delete n[key]; return n; });
      },
    };
  }

  function inputClass(key) {
    return `w-full rounded-lg border px-4 py-3 text-sm font-bold text-gray-800 focus:outline-none transition-all bg-gray-50/50 focus:bg-white ${
      errors[key]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-100 focus:border-[#015581]"
    }`;
  }

  // ── Success screen ──
  if (status === "success") {
    return (
      <div className="rounded-xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-gray-100 max-w-xl mx-auto lg:mx-0 p-16 flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-gray-900">Enquiry Submitted!</h3>
        <p className="text-sm text-gray-500 font-medium max-w-xs">
          Thanks, <strong>{step1.firstName}</strong>! We'll value your car and get back to you as soon as possible.
        </p>
        <button
          onClick={() => { setStatus("idle"); setStep(1); setStep1({ ...INITIAL_STEP1 }); setStep2({ ...INITIAL_STEP2 }); setStep3({ ...INITIAL_STEP3 }); }}
          className="rounded-lg bg-[#015581] px-10 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-[#004468] transition-all"
        >
          Start New Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-gray-100 max-w-xl mx-auto lg:mx-0">
      {/* Step Header */}
      <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          {steps.map((s) => (
            <div key={s.number} className={`flex items-center gap-2 transition-opacity duration-300 ${step === s.number ? "opacity-100" : "opacity-40"}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded border-2 text-[10px] font-black transition-colors ${
                step > s.number   ? "border-green-500 bg-green-500 text-white"  :
                step === s.number ? "border-[#015581] bg-[#015581] text-white"  :
                "border-gray-300 text-gray-500"
              }`}>
                {step > s.number ? "✓" : s.number}
              </span>
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${step === s.number ? "text-[#015581]" : "text-gray-500"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 md:p-8">

          {/* ── Step 1 ── */}
          {step === 1 && (
            <div className="grid grid-cols-1 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {["firstName", "lastName"].map((key) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                    {key === "firstName" ? "First Name" : "Last Name"} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" placeholder={key === "firstName" ? "First Name *" : "Last Name *"} {...s1Field(key)} className={inputClass(key)} />
                  {errors[key] && <p className="text-[10px] text-red-500 font-bold">{errors[key]}</p>}
                </div>
              ))}
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Phone <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="Phone *" {...s1Field("phone")} className={inputClass("phone")} />
                {errors.phone && <p className="text-[10px] text-red-500 font-bold">{errors.phone}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="Email *" {...s1Field("email")} className={inputClass("email")} />
                {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email}</p>}
              </div>
            </div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <div className="grid grid-cols-1 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Reg. Number <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Reg. Number *" {...s2Field("regNumber")} className={inputClass("regNumber") + " uppercase"} />
                {errors.regNumber && <p className="text-[10px] text-red-500 font-bold">{errors.regNumber}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Mileage in Kms <span className="text-red-500">*</span></label>
                  <input type="number" placeholder="Mileage in Kms *" {...s2Field("mileage")} className={inputClass("mileage")} />
                  {errors.mileage && <p className="text-[10px] text-red-500 font-bold">{errors.mileage}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Engine Size <span className="text-red-500">*</span></label>
                  <input type="number" step="0.1" placeholder="Engine Size *" {...s2Field("engineSize")} className={inputClass("engineSize")} />
                  {errors.engineSize && <p className="text-[10px] text-red-500 font-bold">{errors.engineSize}</p>}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Photo Uploads</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Vehicle Front", "Driver Side", "Vehicle Rear", "Passenger Side", "Odometer", "Interior"].map((label) => (
                    <div key={label} className="group relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-100 bg-gray-50/30 p-2.5 transition-all hover:border-[#015581] hover:bg-white cursor-pointer">
                      <svg className="mb-1.5 h-5 w-5 text-gray-300 group-hover:text-[#015581] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-center group-hover:text-[#015581]">{label}</span>
                      <input type="file" accept="image/*" className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={(e) => { fileRefs.current[label] = e.target.files?.[0] || null; }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <div className="grid grid-cols-1 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Model <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Model *" value={step3.model}
                    onChange={(e) => { setStep3((f) => ({ ...f, model: e.target.value })); setErrors((err) => { const n = { ...err }; delete n.model; return n; }); }}
                    className={inputClass("model")} />
                  {errors.model && <p className="text-[10px] text-red-500 font-bold">{errors.model}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Variant <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Variant *" value={step3.variant}
                    onChange={(e) => { setStep3((f) => ({ ...f, variant: e.target.value })); setErrors((err) => { const n = { ...err }; delete n.variant; return n; }); }}
                    className={inputClass("variant")} />
                  {errors.variant && <p className="text-[10px] text-red-500 font-bold">{errors.variant}</p>}
                </div>
              </div>

              {/* Condition */}
              <div className="space-y-2.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Condition <span className="text-red-500">*</span></label>
                <div className="flex gap-3">
                  {["Fair", "Good", "Excellent"].map((c) => (
                    <label key={c} className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 py-3 transition-all ${step3.condition === c ? "border-[#015581] bg-white" : "border-gray-100 bg-gray-50/30"}`}>
                      <input type="radio" name="condition" value={c} className="sr-only" checked={step3.condition === c}
                        onChange={() => setStep3((f) => ({ ...f, condition: c }))} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${step3.condition === c ? "text-[#015581]" : "text-gray-500"}`}>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Service History */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Full Service History? <span className="text-red-500">*</span></label>
                <div className="flex gap-3">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 py-3 transition-all ${step3.serviceHistory === v ? "border-[#015581] bg-white" : "border-gray-100 bg-gray-50/30"}`}>
                      <input type="radio" name="history" value={v} className="sr-only" checked={step3.serviceHistory === v}
                        onChange={() => setStep3((f) => ({ ...f, serviceHistory: v }))} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${step3.serviceHistory === v ? "text-[#015581]" : "text-gray-500"}`}>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Which vehicle in stock would you like your trade-in value against?</label>
                <textarea value={step3.vehicleInterest} onChange={(e) => setStep3((f) => ({ ...f, vehicleInterest: e.target.value }))}
                  className="w-full rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold text-gray-800 focus:border-[#015581] focus:bg-white focus:outline-none transition-all h-20 resize-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Message/Notes</label>
                <textarea value={step3.message} onChange={(e) => setStep3((f) => ({ ...f, message: e.target.value }))}
                  className="w-full rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold text-gray-800 focus:border-[#015581] focus:bg-white focus:outline-none transition-all h-24 resize-none" />
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <div className={`relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 mt-0.5 transition-all ${
                  step3.consent ? "border-[#015581] bg-[#015581]" : errors.consent ? "border-red-400" : "border-gray-200 bg-gray-50"
                }`}>
                  <input type="checkbox" className="sr-only" checked={step3.consent}
                    onChange={(e) => { setStep3((f) => ({ ...f, consent: e.target.checked })); setErrors((err) => { const n = { ...err }; delete n.consent; return n; }); }} />
                  <svg className={`h-3 w-3 text-white transition-opacity ${step3.consent ? "opacity-100" : "opacity-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-gray-500 leading-tight">
                  I consent to having this website store my submitted information so they can respond to my enquiry. *
                </span>
              </label>
              {errors.consent && <p className="text-[10px] text-red-500 font-bold">{errors.consent}</p>}

              {status === "error" && (
                <p className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  Something went wrong. Please try again or call us directly.
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {step > 1 && (
              <button type="button" onClick={() => { setStep((s) => s - 1); setErrors({}); }}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#015581] py-3.5 text-[9px] font-black uppercase tracking-widest text-[#015581] hover:bg-sky-50 transition-all sm:px-8 order-2 sm:order-1">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                BACK
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={handleNext}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#015581] py-3.5 text-[9px] font-black uppercase tracking-widest text-white hover:bg-[#004468] sm:px-8 shadow-sm order-1 sm:order-2 transition-all">
                NEXT
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <button type="submit" disabled={status === "sending"}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#015581] py-3.5 text-[9px] font-black uppercase tracking-widest text-white hover:bg-[#004468] sm:px-8 shadow-sm order-1 sm:order-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                {status === "sending" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    SUBMITTING...
                  </>
                ) : (
                  <>
                    SUBMIT ENQUIRY
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
