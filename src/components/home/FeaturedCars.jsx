// @ts-nocheck
import Link from "next/link";
import CarCard from "./CarCard";
import { CARS } from "@/data/cars";

export default function FeaturedCars() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black tracking-tighter text-gray-900">Featured Used Cars</h2>
          <Link 
            href="/inventory" 
            className="text-[10px] font-black tracking-[0.2em] text-gray-500 transition-colors hover:text-sky-700 uppercase"
          >
            See All Used Cars
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CARS.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </section>
  );
}

