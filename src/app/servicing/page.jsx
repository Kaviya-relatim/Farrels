// @ts-nocheck
import Image from "next/image";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ServicingForm from "@/components/servicing/ServicingForm";

const SERVICES_LIST = [
  "Car servicing",
  "Car repairs",
  "Car valeting",
  "Oil changes",
  "Timing belt changes",
  "Battery Replacement",
  "Emissions Test Failures, Diagnostics and Repairs",
  "Steering and Suspension Systems",
  "Engine Performance and Repair",
  "Brake Systems, including ABS",
  "Safety Systems, including Airbags",
  "Heating and Air Conditioning",
  "Automatic and Manual Transmissions/Trans axles",
  "Pre NCT work",
  "Factory Recommended Maintenance",
  "Advanced Engine Diagnostics",
  "Electrical/Electronic Systems",
];

export default function ServicingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumbs Section */}
      <div className="bg-[#f4f6f8] py-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Servicing" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Content */}
          <div className="lg:w-2/3">
            <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-8">
              Servicing
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              We offer a full service on all car models and light commercials. Each service is carried out according to manufacturer&apos;s specifications and all work is guaranteed.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {SERVICES_LIST.map((service, index) => (
                <li key={index} className="flex items-start gap-4 text-gray-700">
                  <div className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-600" />
                  <span className="text-sm md:text-base font-bold tracking-tight">{service}</span>
                </li>
              ))}
            </ul>

            <div className="mt-16 relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-2xl shadow-gray-200">
              <Image 
                src="https://www.farrellmotors.ie/app/uploads/2026/02/guy-fixing-car.webp"
                alt="Mechanic working on car"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Right Column: Request Service Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <ServicingForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
