// @ts-nocheck
"use client";

import { useState, useEffect, useMemo } from "react";

// Price bounds
const CASH_MIN = 0;
const CASH_MAX = 100000;
const HP_MIN   = 0;
const HP_MAX   = 2000; // monthly payment max €2000

function formatCash(v) {
  return `€${v.toLocaleString("en-IE")}`;
}
function formatHP(v) {
  return `€${v}/mo`;
}

export default function BudgetModal({ isOpen, onClose, onApply, currentBudget, cars = [] }) {
  const [type, setType]     = useState("HP");
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(type === "HP" ? HP_MAX : CASH_MAX);

  const rangeMin = type === "HP" ? HP_MIN   : CASH_MIN;
  const rangeMax = type === "HP" ? HP_MAX   : CASH_MAX;
  const step     = type === "HP" ? 50       : 500;

  // Reset sliders when type changes
  useEffect(() => {
    setMinVal(0);
    setMaxVal(type === "HP" ? HP_MAX : CASH_MAX);
  }, [type]);

  // Count matching cars
  const matchCount = useMemo(() => {
    if (!cars.length) return 0;
    return cars.filter((car) => {
      if (type === "CASH") {
        // Strip "€" and commas from price string
        const price = Number(car.price.replace(/[€,]/g, ""));
        return price >= minVal && price <= maxVal;
      } else {
        // Monthly HP payment
        const monthly = Number(car.monthly?.replace(/[€,]/g, "") || 0);
        return monthly >= minVal && monthly <= maxVal;
      }
    }).length;
  }, [cars, type, minVal, maxVal]);

  function handleApply() {
    if (onApply) {
      onApply({
        type,
        min: minVal,
        max: maxVal === rangeMax ? 0 : maxVal, // 0 means "no upper limit"
      });
    }
  }

  // Percentage positions for the colored track bar
  const leftPct  = ((minVal - rangeMin) / (rangeMax - rangeMin)) * 100;
  const rightPct = ((maxVal - rangeMin) / (rangeMax - rangeMin)) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-8 pb-4">
          <h2 className="text-4xl font-bold tracking-tight text-[#2d3e50]">Budget</h2>
          <button onClick={onClose} className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
          {/* Type Toggle */}
          <div className="mb-8 flex gap-4">
            {["HP", "CASH"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 rounded-md py-4 text-[14px] font-bold uppercase tracking-widest transition-all ${
                  type === t
                    ? t === "HP" ? "bg-gray-100 text-[#2d3e50]" : "border-2 border-[#005a8d] bg-white text-[#005a8d]"
                    : "border-2 border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                }`}
              >
                {t === "HP" ? "HP" : "CASH PRICE"}
              </button>
            ))}
          </div>

          <p className="mb-10 text-[16px] leading-relaxed text-gray-600">
            Know how much you have to spend? Select your minimum and maximum spend below and we will customise our results to your specific budget.
          </p>

          {/* Dual Range Slider */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold uppercase tracking-wider text-[#2d3e50]">Your Budget</p>
              <p className="text-sm font-black text-[#005a8d]">
                {type === "HP" ? formatHP(minVal) : formatCash(minVal)}
                {" – "}
                {maxVal >= rangeMax
                  ? "No Limit"
                  : type === "HP" ? formatHP(maxVal) : formatCash(maxVal)}
              </p>
            </div>

            <div className="relative h-8 flex items-center">
              {/* Track background */}
              <div className="absolute left-0 right-0 h-2 rounded-full bg-gray-100" />
              {/* Active track */}
              <div
                className="absolute h-2 rounded-full bg-[#f39200]"
                style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
              />

              {/* Min thumb */}
              <input
                type="range"
                min={rangeMin}
                max={rangeMax}
                step={step}
                value={minVal}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v <= maxVal - step) setMinVal(v);
                }}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#f39200] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#f39200] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
              />

              {/* Max thumb */}
              <input
                type="range"
                min={rangeMin}
                max={rangeMax}
                step={step}
                value={maxVal}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v >= minVal + step) setMaxVal(v);
                }}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#f39200] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#f39200] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>

            {/* Min / Max labels */}
            <div className="flex justify-between mt-2">
              <span className="text-xs font-bold text-gray-400">{type === "HP" ? formatHP(rangeMin) : formatCash(rangeMin)}</span>
              <span className="text-xs font-bold text-gray-400">{type === "HP" ? formatHP(rangeMax) : formatCash(rangeMax)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-gray-50 p-8">
          <p className="text-lg font-bold text-[#2d3e50]">
            {matchCount} matching vehicle{matchCount !== 1 ? "s" : ""}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setMinVal(0); setMaxVal(type === "HP" ? HP_MAX : CASH_MAX); }}
              className="rounded-lg border border-gray-200 px-6 py-4 text-[13px] font-black uppercase tracking-widest text-gray-500 transition-all hover:bg-gray-100"
            >
              RESET
            </button>
            <button
              onClick={handleApply}
              className="rounded-lg bg-[#005a8d] px-10 py-4 text-[15px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#004a75] active:scale-95"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
