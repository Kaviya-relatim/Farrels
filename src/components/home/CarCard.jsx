// @ts-nocheck
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CARS } from "@/data/cars";
import EnquiryModal from "@/components/common/EnquiryModal";
import { useSavedCars } from "@/contexts/SavedCarsContext";

export default function CarCard({ id, images, year, make, model, mileage, engine, price, weekly, monthly }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isCarSaved, toggleSaveCar } = useSavedCars();
  const detailUrl = `/cars/${id}`;
  const saved = isCarSaved(id);

  return (
    <>
      <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:shadow-2xl hover:shadow-gray-200">
        {/* Image Container */}
        <div className="relative block aspect-[4/3] w-full overflow-hidden bg-gray-50">
          <Link href={detailUrl}>
            <Image
              src={images?.[0] || ""}
              alt={`${year} ${make} ${model}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Heart Icon Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSaveCar(id);
            }}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-95 group-hover:bg-white"
          >
            <svg
              className={`h-5 w-5 transition-colors ${saved ? "fill-red-500 text-red-500" : "text-gray-400 fill-none"}`}
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              <span>{(images?.length ?? 0) > 1 ? images?.length : 25}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-2 flex items-start justify-between">
            <Link href={detailUrl}>
              <h3 className="text-2xl font-black tracking-tight text-gray-800 hover:text-sky-700 transition-colors">
                {year} {make} {model}
              </h3>
            </Link>
            <div className="relative h-6 w-16">
              <Image
                src="/assets/images/cartell.png"
                alt="Cartell.ie Checked"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {mileage} {mileage.includes("Mi") || mileage.includes("Kms") ? "" : "Kms."} {engine}
          </p>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-bold text-gray-700">
            <p>Our Price: <span className="text-xl font-black text-gray-900">{price}</span></p>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            <p>Weekly: <span className="text-gray-900">{weekly}</span></p>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            <p>Monthly: <span className="text-gray-900">{monthly}</span></p>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-md bg-[#005a8d] py-3 text-[10px] font-black tracking-widest text-white transition-colors hover:bg-[#004a75]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              ENQUIRY
            </button>
            <Link
              href={`/apply-for-finance/?id=${id}`}
              className="flex items-center justify-center gap-2 rounded-md bg-[#e53935] py-3 text-[10px] font-black tracking-widest text-white transition-colors hover:bg-[#d32f2f]"
            >
              <span className="text-lg leading-none">€</span>
              FINANCE
            </Link>
            <Link
              href="/cash-for-cars/"
              className="flex items-center justify-center gap-2 rounded-md bg-[#005a8d] py-3 text-[10px] font-black tracking-widest text-white transition-colors hover:bg-[#004a75]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              TRADE-IN
            </Link>
            <Link
              href={detailUrl}
              className="flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white py-3 text-[10px] font-black tracking-widest text-gray-800 transition-colors hover:bg-gray-50 uppercase text-center"
            >
              DETAILS
            </Link>
          </div>
        </div>
      </div>
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicleName={`${year} ${make} ${model}`}
      />
    </>
  );
}
