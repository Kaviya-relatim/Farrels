// @ts-nocheck
import { CARS } from "@/data/cars";
import CarCard from "@/components/home/CarCard";

export default function InventoryPage() {
  return (
    <main className="bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="text-6xl font-black tracking-tighter text-gray-900 mb-4">Our Inventory</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Quality used cars in Bray, Co. Wicklow</p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CARS.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </main>
  );
}
