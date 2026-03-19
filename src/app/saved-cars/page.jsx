// @ts-nocheck
"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useSavedCars } from "@/contexts/SavedCarsContext";
import { CARS } from "@/data/cars";
import CarCard from "@/components/home/CarCard";
import Link from "next/link";

export default function SavedCarsPage() {
  const { savedCarIds, toggleSaveCar } = useSavedCars();
  const savedCars = CARS.filter(car => savedCarIds.includes(car.id));

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50/50 pb-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Saved Cars" }]} />
          
          <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-4">Saved Cars</h1>
              <p className="text-lg font-medium text-gray-500">
                {savedCars.length === 0 
                  ? "You haven't saved any cars yet." 
                  : `You have ${savedCars.length} car${savedCars.length === 1 ? '' : 's'} saved.`}
              </p>
            </div>
            
            {savedCars.length > 0 && (
              <Link 
                href="/used-cars"
                className="rounded-lg bg-[#015581] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#004468] hover:shadow-sky-200"
              >
                Browse More Cars
              </Link>
            )}
          </div>

          <div className="mt-12">
            {savedCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 rounded-full bg-gray-100 p-8">
                  <svg className="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Favorites Yet</h2>
                <p className="max-w-md text-gray-500 mb-8 font-medium">
                  Tap the heart on any car to save it here for later. You can easily compare them and make enquiries when you're ready.
                </p>
                <Link 
                  href="/used-cars" 
                  className="inline-flex items-center gap-2 font-black text-sky-600 hover:text-sky-700 transition-colors uppercase tracking-widest text-xs"
                >
                  Go to Used Cars
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {savedCars.map((car) => (
                  <CarCard key={car.id} {...car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
