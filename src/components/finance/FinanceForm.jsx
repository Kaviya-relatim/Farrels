// @ts-nocheck
"use client";

import { useState } from "react";
import { CARS } from "@/data/cars";
import { sendFormEmail } from "@/lib/emailjs";

const INITIAL = {
  title: "",
  firstName: "",
  surname: "",
  mobile: "",
  email: "",
  vehicleId: "",
  consent: false,
};

export default function FinanceForm() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState({ ...INITIAL });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const selectedCar = CARS.find((c) => c.id === form.vehicleId);

  const steps = [
    { number: 1, label: "Contact Details" },
    { number: 2, label: "Vehicle Selection" },
    { number: 3, label: "Review & Submit" },
  ];

  function validateStep1() {
    const e = {};
    if (!form.title)           e.title     = "Title is required";
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.surname.trim())   e.surname   = "Surname is required";
    if (!form.mobile.trim())    e.mobile    = "Mobile number is required";
    if (!form.email.trim())     e.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    return e;
  }

  function validateStep2() {
    const e = {};
    if (!form.vehicleId) e.vehicleId = "Please select a vehicle";
    return e;
  }

  function validateStep3() {
    const e = {};
    if (!form.consent) e.consent = "You must agree to share your details";
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
      await sendFormEmail("Finance Application", {
        customer_title:      form.title,
        customer_first_name: form.firstName,
        customer_surname:    form.surname,
        customer_mobile:     form.mobile,
        customer_email:      form.email,
        vehicle: selectedCar
          ? `${selectedCar.year} ${selectedCar.make} ${selectedCar.model} — ${selectedCar.price}`
          : "Not specified",
        gdpr_consent: form.consent ? "Yes" : "No",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((err) => { const n = { ...err }; delete n[key]; return n; });
  }

  function inputClass(key) {
    return `w-full rounded-md border px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:ring-1 transition-all ${
      errors[key]
        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
        : "border-gray-200 focus:border-sky-500 focus:ring-sky-500"
    }`;
  }

  // ── Success screen ──
  if (status === "success") {
    return (
      <div className="rounded-xl bg-white shadow-2xl shadow-sky-900/10 border border-gray-100 p-16 flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-gray-900">Application Received!</h3>
        <p className="text-sm text-gray-500 font-medium max-w-sm">
          Thank you, <strong>{form.firstName}</strong>! Our finance team will review your application and contact you shortly.
        </p>
        <button
          onClick={() => { setStatus("idle"); setStep(1); setForm({ ...INITIAL }); }}
          className="mt-2 rounded-md bg-[#015581] px-10 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-[#004468] transition-all"
        >
          Start New Application
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow-2xl shadow-sky-900/10 border border-gray-100">
      {/* Step Header */}
      <div className="bg-[#b7d3e6]/30 px-8 py-4 flex items-center justify-between border-b border-[#b7d3e6]/50">
        <div className="flex gap-6">
          {steps.map((s) => (
            <div key={s.number} className={`flex items-center gap-2 transition-opacity duration-300 ${step === s.number ? "opacity-100" : "opacity-40"}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded border-2 text-[10px] font-black transition-colors ${
                step > s.number  ? "border-green-500 bg-green-500 text-white"  :
                step === s.number ? "border-[#015581] bg-[#015581] text-white" :
                "border-gray-300 text-gray-500"
              }`}>
                {step > s.number ? "✓" : s.number}
              </span>
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] hidden sm:block ${step === s.number ? "text-[#015581]" : "text-gray-500"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <span className="text-sm font-black text-sky-800 uppercase tracking-widest">Step {step} of 3</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-8">

          {/* ── Step 1: Contact Details ── */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">* Indicates required field</p>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Title <span className="text-red-500">*</span></label>
                  <select value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass("title")}>
                    <option value="">Please select</option>
                    <option>Mr</option><option>Mrs</option><option>Ms</option><option>Miss</option>
                  </select>
                  {errors.title && <p className="text-[10px] text-red-500 font-bold">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">First Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass("firstName")} />
                  {errors.firstName && <p className="text-[10px] text-red-500 font-bold">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Surname <span className="text-red-500">*</span></label>
                  <input type="text" value={form.surname} onChange={(e) => set("surname", e.target.value)} className={inputClass("surname")} />
                  {errors.surname && <p className="text-[10px] text-red-500 font-bold">{errors.surname}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Mobile Number <span className="text-red-500">*</span></label>
                  <input type="tel" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} className={inputClass("mobile")} />
                  {errors.mobile && <p className="text-[10px] text-red-500 font-bold">{errors.mobile}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email <span className="text-red-500">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
                  {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email}</p>}
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center text-center gap-4 bg-sky-50/40 rounded-xl p-8 border border-sky-100">
                <svg className="h-12 w-12 text-[#015581] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" />
                </svg>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Quick &amp; Easy Finance</p>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">Fill in your details to get a personalised finance plan for your next car from Farrell Motors.</p>
              </div>
            </div>
          )}

          {/* ── Step 2: Vehicle Selection ── */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Choose a Vehicle <span className="text-red-500">*</span></label>
                <select value={form.vehicleId} onChange={(e) => set("vehicleId", e.target.value)} className={inputClass("vehicleId")}>
                  <option value="">Please select a vehicle</option>
                  {CARS.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.year} {car.make} {car.model} — {car.price}
                    </option>
                  ))}
                </select>
                {errors.vehicleId && <p className="text-[10px] text-red-500 font-bold">{errors.vehicleId}</p>}
              </div>

              {selectedCar ? (
                <div className="rounded-lg bg-sky-50 p-6 border border-sky-100 space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-sky-700 mb-4">Selected Vehicle</p>
                  {[
                    ["Make",    selectedCar.make],
                    ["Model",   selectedCar.model],
                    ["Year",    String(selectedCar.year)],
                    ["Mileage", selectedCar.details.overview.data["Odometer"] || "—"],
                    ["Fuel",    selectedCar.details.overview.data["Fuel Type"] || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-sky-100 pb-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{k}:</span>
                      <span className="text-[10px] font-black text-gray-700">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2">
                    <span className="text-xs font-bold text-gray-400 uppercase">Retail Price:</span>
                    <span className="text-lg font-black text-[#015581]">{selectedCar.price}</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-6 border border-dashed border-gray-200 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">Please Select a Car Above</p>
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Review & Submit ── */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h3 className="text-lg font-black text-gray-900">Review Your Application</h3>
              <div className="rounded-lg bg-gray-50 border border-gray-100 divide-y divide-gray-100">
                {[
                  ["Full Name", `${form.title} ${form.firstName} ${form.surname}`],
                  ["Mobile",    form.mobile],
                  ["Email",     form.email],
                  ["Vehicle",   selectedCar ? `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}` : "—"],
                  ["Price",     selectedCar?.price || "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between px-5 py-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{k}</span>
                    <span className="text-[11px] font-black text-gray-700">{v}</span>
                  </div>
                ))}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className={`relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 mt-0.5 transition-all ${
                  form.consent ? "border-[#015581] bg-[#015581]" : errors.consent ? "border-red-400" : "border-gray-300"
                }`}>
                  <input type="checkbox" className="sr-only" checked={form.consent}
                    onChange={(e) => { set("consent", e.target.checked); setErrors(err => { const n = { ...err }; delete n.consent; return n; }); }} />
                  <svg className={`h-2.5 w-2.5 text-white transition-opacity ${form.consent ? "opacity-100" : "opacity-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-gray-500 leading-tight">
                  I agree to share my contact details with Farrell Motors and consent to being contacted regarding finance options.
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
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-100">
            {step > 1 && (
              <button type="button" onClick={() => { setStep((s) => s - 1); setErrors({}); }}
                className="flex items-center gap-2 rounded-md border-2 border-[#015581] px-8 py-3 text-[9px] font-black uppercase tracking-widest text-[#015581] hover:bg-sky-50 transition-all">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                BACK
              </button>
            )}

            {step < 3 ? (
              <button type="button" onClick={handleNext}
                className="flex items-center justify-center gap-2 rounded-md bg-[#6cc3df] px-12 py-3 text-sm font-black tracking-widest text-white hover:bg-[#5bb2ce] transition-all uppercase ml-auto">
                NEXT
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <button type="submit" disabled={status === "sending"}
                className="flex items-center justify-center gap-2 rounded-md bg-[#015581] px-12 py-3 text-sm font-black tracking-widest text-white hover:bg-[#004468] transition-all uppercase ml-auto disabled:opacity-60 disabled:cursor-not-allowed shadow-lg">
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
                    SUBMIT APPLICATION
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
