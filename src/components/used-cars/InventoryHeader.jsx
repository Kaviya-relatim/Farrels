// @ts-nocheck
"use client";

export default function InventoryHeader({ totalCount, sortBy = "default", onSortChange }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-black tracking-tight text-gray-800">
        {totalCount} Used Car{totalCount !== 1 ? "s" : ""}
      </h2>

      <div className="relative group min-w-[220px]">
        <select
          value={sortBy}
          onChange={(e) => onSortChange && onSortChange(e.target.value)}
          className="w-full appearance-none rounded-md border border-gray-200 bg-white px-4 py-3 text-xs font-bold text-gray-600 transition-all focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        >
          <option value="default">Default</option>
          <option value="make_asc">Make (A – Z)</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="year_desc">Year (Newest First)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-sky-700/50">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
