// @ts-nocheck
import Image from "next/image";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CarSourcingForm from "@/components/car-sourcing/CarSourcingForm";

export default function CarSourcingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50/50 pb-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Car Sourcing" }]} />
          
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-12">
                <h1 className="text-6xl font-black tracking-tight text-gray-900 mb-8">Car Sourcing</h1>
              </div>
              
              <div className="lg:col-span-5 space-y-8">
                <p className="text-lg font-medium leading-relaxed text-gray-600">
                  If the car you're looking for isn't currently in stock, let us know. We can source almost any make and model, at the best possible price. To start, please complete this form.
                </p>
                <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl shadow-sky-900/10">
                  <Image
                    src="/assets/images/car_sourcing.png"
                    alt="Consulting about car sourcing"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <CarSourcingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
