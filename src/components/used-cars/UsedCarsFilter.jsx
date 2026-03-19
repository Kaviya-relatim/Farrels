// @ts-nocheck
"use client";

import { useState } from "react";

export default function UsedCarsFilter() {
  const filterOptions = [
    { key: "make", label: "All Makes" },
    { key: "model", label: "Models" },
    { key: "minYear", label: "Min Year" },
    { key: "maxYear", label: "Max Year" },
    { key: "budget", label: "Budget" },
  ];

  return (
    <div className="rounded-lg bg-white p-4 shadow-xl shadow-sky-900/5 lg:p-6 border border-gray-100">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {filterOptions.map((option) => (
            <div key={option.key} className="relative group">
              <select
                className="w-full appearance-none rounded-md border border-gray-200 bg-white px-4 py-3 text-xs font-bold text-gray-600 transition-all focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                defaultValue={option.label}
              >
                <option disabled>{option.label}</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-sky-700/50">
                <svg className="h-3 w-3 transition-transform group-focus-within:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button className="rounded-md border border-gray-200 px-6 py-3 text-xs font-black tracking-widest text-gray-500 transition-all hover:bg-gray-50 uppercase">
            CLEAR FILTERS
          </button>
          <button className="rounded-md bg-[#005a8d] px-8 py-3 text-xs font-black tracking-widest text-white transition-all hover:bg-[#004a75] hover:shadow-lg active:scale-95 uppercase">
            ADVANCED SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
