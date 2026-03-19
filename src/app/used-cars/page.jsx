// @ts-nocheck
"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CARS } from "@/data/cars";
import BudgetModal from "@/components/home/BudgetModal";
import CarCard from "@/components/home/CarCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import InventoryHeader from "@/components/used-cars/InventoryHeader";

// Year range
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1999 }, (_, i) => CURRENT_YEAR - i);

// Unique sorted makes
const ALL_MAKES = [...new Set(CARS.map((c) => c.make))].sort();

function UsedCarsContent() {
  const searchParams = useSearchParams();

  // Initialise from URL params (set by home page Search button)
  const [make,    setMake]    = useState(searchParams.get("make")    || "");
  const [model,   setModel]   = useState(searchParams.get("model")   || "");
  const [minYear, setMinYear] = useState(searchParams.get("minYear") || "");
  const [maxYear, setMaxYear] = useState(searchParams.get("maxYear") || "");
  const [budget,  setBudget]  = useState({ type: "HP", min: 0, max: 0 });
  const [sortBy,  setSortBy]  = useState("default");
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  // Models for selected make
  const availableModels = useMemo(() => {
    if (!make) return [];
    return [...new Set(CARS.filter((c) => c.make === make).map((c) => c.model))].sort();
  }, [make]);

  // --- LIVE FILTER ---
  const filtered = useMemo(() => {
    let result = CARS.filter((car) => {
      if (make    && car.make  !== make)           return false;
      if (model   && car.model !== model)          return false;
      if (minYear && car.year  < Number(minYear))  return false;
      if (maxYear && car.year  > Number(maxYear))  return false;
      if (budget.max > 0) {
        if (budget.type === "CASH") {
          const price = Number(car.price.replace(/[€,]/g, ""));
          if (price < budget.min || price > budget.max) return false;
        } else {
          const monthly = Number(car.monthly?.replace(/[€,]/g, "") || 0);
          if (monthly < budget.min || monthly > budget.max) return false;
        }
      }
      return true;
    });

    // Sort
    if (sortBy === "price_asc")  result = [...result].sort((a, b) => Number(a.price.replace(/[€,]/g, "")) - Number(b.price.replace(/[€,]/g, "")));
    if (sortBy === "price_desc") result = [...result].sort((a, b) => Number(b.price.replace(/[€,]/g, "")) - Number(a.price.replace(/[€,]/g, "")));
    if (sortBy === "year_desc")  result = [...result].sort((a, b) => b.year - a.year);
    if (sortBy === "make_asc")   result = [...result].sort((a, b) => a.make.localeCompare(b.make));

    return result;
  }, [make, model, minYear, maxYear, budget, sortBy]);

  function clearFilters() {
    setMake(""); setModel(""); setMinYear(""); setMaxYear("");
    setBudget({ type: "HP", min: 0, max: 0 });
  }

  const hasFilters = make || model || minYear || maxYear || budget.max > 0;
  const budgetLabel = budget.max > 0
    ? (budget.type === "HP" ? `€${budget.min}–€${budget.max}/mo` : `€${budget.min.toLocaleString()}–€${budget.max.toLocaleString()}`)
    : "Budget";

  const selectClass = "w-full appearance-none rounded-md border border-gray-200 bg-white px-4 py-3 text-xs font-bold text-gray-600 transition-all focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500";
  const chevron = (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-sky-700/50">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  return (
    <main className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900">
      <div className="bg-gray-50/50 pb-20">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Used Cars" }]} />

          {/* ── Filter Bar ── */}
          <div className="rounded-lg bg-white p-4 shadow-xl shadow-sky-900/5 lg:p-6 border border-gray-100 mb-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                {/* Make */}
                <div className="relative group">
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
                <div className="relative group">
                  <select value={model} onChange={(e) => setModel(e.target.value)} className={selectClass} disabled={!make}>
                    <option value="">All Models</option>
                    {availableModels.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {chevron}
                </div>

                {/* Min Year */}
                <div className="relative group">
                  <select value={minYear} onChange={(e) => setMinYear(e.target.value)} className={selectClass}>
                    <option value="">Min Year</option>
                    {YEARS.filter((y) => !maxYear || y <= Number(maxYear)).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  {chevron}
                </div>

                {/* Max Year */}
                <div className="relative group">
                  <select value={maxYear} onChange={(e) => setMaxYear(e.target.value)} className={selectClass}>
                    <option value="">Max Year</option>
                    {YEARS.filter((y) => !minYear || y >= Number(minYear)).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  {chevron}
                </div>

                {/* Budget */}
                <div className="relative group">
                  <button
                    onClick={() => setIsBudgetOpen(true)}
                    className={`w-full text-left rounded-md border px-4 py-3 text-xs font-bold transition-all focus:outline-none flex items-center justify-between ${
                      budget.max > 0
                        ? "border-sky-500 bg-sky-50 text-sky-700"
                        : "border-gray-200 bg-white text-gray-600"
                    }`}
                  >
                    <span>{budgetLabel}</span>
                    <svg className="h-3 w-3 text-sky-700/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {hasFilters && (
                  <button onClick={clearFilters}
                    className="rounded-md border border-gray-200 px-6 py-3 text-xs font-black tracking-widest text-gray-500 transition-all hover:bg-gray-50 uppercase">
                    CLEAR FILTERS
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="mt-8">
            <InventoryHeader
              totalCount={filtered.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-6 rounded-full bg-gray-100 p-8">
                  <svg className="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-3">No Cars Found</h2>
                <p className="text-gray-500 font-medium mb-6">No cars match your current filters. Try adjusting your search.</p>
                <button onClick={clearFilters}
                  className="rounded-lg bg-[#005a8d] px-8 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-[#004a75] transition-all">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((car) => (
                  <CarCard key={car.id} {...car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <BudgetModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        onApply={(b) => { setBudget(b); setIsBudgetOpen(false); }}
        currentBudget={budget}
        cars={CARS}
      />
    </main>
  );
}

export default function UsedCarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <UsedCarsContent />
    </Suspense>
  );
}
