// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSavedCars } from "@/contexts/SavedCarsContext";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "USED CARS", href: "/used-cars", hasDropdown: true },
  { label: "APPLY FOR FINANCE", href: "/apply-for-finance" },
  { label: "SERVICE CENTRE", href: "/servicing" },
  { label: "CASH FOR CARS", href: "/cash-for-cars" },
  { label: "CAR SOURCING", href: "/car-sourcing" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { savedCarIds } = useSavedCars();
  const savedCount = savedCarIds.length;

  return (
    <header className="w-full bg-white font-sans border-b border-gray-100">
      {/* Top Bar */}
      <div className="hidden bg-[#2D3136] py-2 lg:block">
        <div className="container mx-auto flex items-center justify-end gap-6 px-4 text-[11px] font-bold text-white tracking-wider">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Farrell+Motors+Killarney+Road+Bray+Wicklow+A98+X3T"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
          >
            <svg className="h-3.5 w-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            FIND US
          </a>
          <div className="flex items-center gap-1.5 border-l border-gray-600 pl-6">
            <svg className="h-3.5 w-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            01-2869520
          </div>
          <div className="flex items-center gap-1.5 border-l border-gray-600 pl-6">
            <svg className="h-3.5 w-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            01-2761657
          </div>
          <Link
            href="/saved-cars"
            className="flex items-center gap-1.5 border-l border-r border-gray-600 px-6 hover:text-sky-400 transition-colors"
          >
            <svg className={`h-3.5 w-3.5 ${savedCount > 0 ? "text-red-500 fill-red-500" : "text-sky-400 fill-none"}`} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            SAVED CARS({savedCount})
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-1 lg:py-1.5">
        <Link href="/" className="relative h-10 w-40 sm:h-14 sm:w-52">
          <Image
            src="/assets/logo.png"
            alt="Farrell Motors Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1 text-[13px] font-bold tracking-tight transition-colors hover:text-sky-700 ${
                  isActive ? "text-sky-700 font-extrabold" : "text-gray-800"
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg className="h-3 w-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <Link href="/saved-cars" className="relative group p-1">
            <svg className={`h-6 w-6 transition-colors ${savedCount > 0 ? "text-red-500 fill-red-500" : "text-gray-800 fill-none"}`} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-600 text-[9px] font-bold text-white shadow-sm">
                {savedCount}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            <svg className="h-8 w-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-xl">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-lg font-black transition-colors hover:text-sky-700 ${
                    isActive ? "text-sky-700" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
