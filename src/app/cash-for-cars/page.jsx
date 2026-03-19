// @ts-nocheck
import Image from "next/image";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CashForCarsForm from "@/components/cash-for-cars/CashForCarsForm";

export default function CashForCarsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50/50 pb-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Cash For Cars" }]} />
          
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mt-12">
              <div className="lg:col-span-5 space-y-8">
                <h1 className="text-5xl font-black tracking-tight text-gray-900 leading-none">Cash For Cars</h1>
                <p className="text-lg font-medium leading-relaxed text-gray-600">
                  Farrell Motors want to buy your car. We offer great rates, and make the whole process as easy and hassle free a possible. To get a quote, simply complete our handy valuation tool now.
                </p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl shadow-sky-900/10 border border-gray-100">
                  <Image
                    src="/assets/images/cash_cars.png"
                    alt="Car Inspection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <CashForCarsForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
