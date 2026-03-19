// @ts-nocheck
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CARS } from "@/data/cars";
import BudgetModal from "./BudgetModal";

// Derive unique sorted makes from inventory
const ALL_MAKES = [...new Set(CARS.map((c) => c.make))].sort();

// Year range from 2000 → current year
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1999 }, (_, i) => CURRENT_YEAR - i);

export default function SearchFilter() {
  const router = useRouter();
  const [make, setMake]       = useState("");
  const [model, setModel]     = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [budget, setBudget]   = useState({ min: 0, max: 0 });
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  // Models available for selected make
  const availableModels = useMemo(() => {
    if (!make) return [];
    return [...new Set(CARS.filter((c) => c.make === make).map((c) => c.model))].sort();
  }, [make]);

  // Count matching cars for the search button
  const matchCount = useMemo(() => {
    return CARS.filter((c) => {
      if (make    && c.make  !== make)               return false;
      if (model   && c.model !== model)              return false;
      if (minYear && c.year  <  Number(minYear))     return false;
      if (maxYear && c.year  >  Number(maxYear))     return false;
      return true;
    }).length;
  }, [make, model, minYear, maxYear]);

  // Budget label shown on the button
  const budgetLabel = budget.max > 0
    ? `€${budget.min.toLocaleString()} – €${budget.max.toLocaleString()}`
    : "Budget";

  function handleSearch() {
    const params = new URLSearchParams();
    if (make)    params.set("make",    make);
    if (model)   params.set("model",   model);
    if (minYear) params.set("minYear", minYear);
    if (maxYear) params.set("maxYear", maxYear);
    if (budget.min > 0) params.set("minPrice", String(budget.min));
    if (budget.max > 0) params.set("maxPrice", String(budget.max));
    router.push(`/used-cars?${params.toString()}`);
  }

  const selectClass = "w-full h-full appearance-none bg-transparent py-4 px-6 text-[14px] font-bold text-[#2d3e50] focus:outline-none cursor-pointer hover:bg-gray-50/50 transition-colors";
  const chevron = (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
      <svg className="h-4 w-4 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  return (
    <>
      <div className="flex flex-col bg-white lg:flex-row lg:items-stretch lg:justify-between shadow-lg rounded-sm overflow-hidden border border-gray-100">
        <div className="grid flex-1 grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 lg:grid-cols-5 lg:divide-y-0 lg:divide-x">

          {/* Make */}
          <div className="relative group bg-white">
            <select value={make} onChange={(e) => { setMake(e.target.value); setModel(""); }} className={selectClass}>
              <option value="">All Makes</option>
              {ALL_MAKES.map((m) => {
                const count = CARS.filter((c) => c.make === m).length;
                return <option key={m} value={m}>{m} ({count})</option>;
              })}
            </select>
            {chevron}
          </div>

          {/* Model */}
          <div className="relative group bg-white">
            <select value={model} onChange={(e) => setModel(e.target.value)} className={selectClass} disabled={!make}>
              <option value="">All Models</option>
              {availableModels.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {chevron}
          </div>

          {/* Min Year */}
          <div className="relative group bg-white">
            <select value={minYear} onChange={(e) => setMinYear(e.target.value)} className={selectClass}>
              <option value="">Min Year</option>
              {YEARS.filter((y) => !maxYear || y <= Number(maxYear)).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            {chevron}
          </div>

          {/* Max Year */}
          <div className="relative group bg-white">
            <select value={maxYear} onChange={(e) => setMaxYear(e.target.value)} className={selectClass}>
              <option value="">Max Year</option>
              {YEARS.filter((y) => !minYear || y >= Number(minYear)).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            {chevron}
          </div>

          {/* Budget trigger */}
          <div className="relative group bg-white">
            <button
              onClick={() => setIsBudgetOpen(true)}
              className="flex w-full h-full items-center justify-between py-4 px-6 text-[14px] font-bold text-[#2d3e50] focus:outline-none hover:bg-gray-50/50 transition-colors"
            >
              <span className={budget.max > 0 ? "text-sky-700" : ""}>{budgetLabel}</span>
              <svg className="h-4 w-4 text-gray-400 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-[#005a8d] px-10 py-4 text-[15px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#004a75] active:brightness-90 sm:w-full lg:w-auto"
        >
          SEARCH {matchCount} CAR{matchCount !== 1 ? "S" : ""}
        </button>
      </div>

      <BudgetModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        onApply={(b) => { setBudget(b); setIsBudgetOpen(false); }}
        currentBudget={budget}
        cars={CARS}
      />
    </>
  );
}
