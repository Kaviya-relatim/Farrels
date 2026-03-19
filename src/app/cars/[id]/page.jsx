// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams} from "next/navigation";
import { CARS } from "@/data/cars";
import { useState } from "react";
import EnquiryModal from "@/components/common/EnquiryModal";
import { useSavedCars } from "@/contexts/SavedCarsContext";

export default function CarDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const car = CARS.find((c) => c.id === id);
  const { isCarSaved, toggleSaveCar } = useSavedCars();

  const [activeImage, setActiveImage] = useState(car?.images[0] || "");
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  if (!car) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black">Car Not Found</h1>
          <Link href="/" className="mt-4 inline-block text-sky-600 underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(s => s !== sectionId) 
        : [...prev, sectionId]
    );
  };

  const saved = isCarSaved(car.id);

  return (
    <main className="bg-white pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex text-[10px] font-medium uppercase tracking-widest text-gray-300">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/inventory" className="hover:text-black transition-colors">Used Cars</Link>
          <span className="mx-1.5">/</span>
          <span className="text-black italic">{car.year} {car.make} {car.model}</span>
        </nav>

        {/* Holistic Layout Structure for Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column (Gallery + Rest of Page) */}
          <div className="lg:col-span-8">
            {/* Gallery Section */}
            <div className="flex flex-col md:flex-row gap-4 h-[350px] md:h-[500px] mb-4">
              {/* Thumbnails Sidebar */}
              <div className="order-2 md:order-1 flex md:flex-col gap-2 relative h-16 md:h-full">
                <button 
                  onClick={() => {
                    const el = document.getElementById('thumb-scroll');
                    if (el) el.scrollTop -= 80;
                  }}
                  className="hidden md:flex absolute top-0 left-0 right-0 z-20 h-8 items-center justify-center bg-white/80 border border-gray-100 shadow-sm hover:bg-white"
                >
                  <svg className="h-4 w-4 text-[#005a8d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                  </svg>
                </button>

                <div 
                  id="thumb-scroll"
                  className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scroll-smooth no-scrollbar h-full md:py-8"
                >
                  {car.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-[4/3] w-16 md:w-20 flex-shrink-0 overflow-hidden border-2 transition-all ${activeImage === img ? 'border-[#005a8d]' : 'border-transparent hover:border-gray-200'}`}
                    >
                      <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    const el = document.getElementById('thumb-scroll');
                    if (el) el.scrollTop += 80;
                  }}
                  className="hidden md:flex absolute bottom-0 left-0 right-0 z-20 h-10 items-center justify-center bg-white/80 border border-gray-100 shadow-sm hover:bg-white"
                >
                  <svg className="h-5 w-5 text-[#005a8d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Main Image */}
              <div className="order-1 md:order-2 relative flex-1 h-full overflow-hidden bg-gray-50 border border-gray-100 group">
                <Image
                  src={activeImage}
                  alt={car.model}
                  fill
                  className="object-cover transition-transform duration-700 md:group-hover:scale-105"
                  priority
                />
                
                {/* Save Heart Icon */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleSaveCar(car.id); }}
                  className="absolute bottom-5 right-5 z-20 p-2 transition-transform hover:scale-125 active:scale-95 group/heart"
                >
                  <svg 
                    className={`h-6 w-6 transition-all drop-shadow-lg ${saved ? 'fill-red-500 text-red-500' : 'fill-none text-white'}`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Arrow Controls */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      const idx = car.images.indexOf(activeImage);
                      setActiveImage(car.images[(idx - 1 + car.images.length) % car.images.length]);
                    }}
                    className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded bg-white/90 shadow-xl text-sky-900 border border-gray-100 hover:bg-white transition-all transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      const idx = car.images.indexOf(activeImage);
                      setActiveImage(car.images[(idx + 1) % car.images.length]);
                    }}
                    className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded bg-white/90 shadow-xl text-sky-900 border border-gray-100 hover:bg-white transition-all transform translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 py-5 border border-gray-100 divide-x divide-gray-100 bg-white mb-12">
              {[
                { label: 'Odometer', value: car.details.overview.data['Odometer'], icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ) },
                { label: 'Engine', value: car.details.overview.data['Engine Size'] || '2L', icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" strokeWidth="2" /></svg>
                ) },
                { label: 'Fuel', value: car.details.overview.data['Fuel Type'], icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>
                ) },
                { label: 'Trans', value: car.details.overview.data['Transmission'], icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                ) },
                { label: 'Body', value: car.details.overview.data['Body'], icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11v-1a1 1 0 00-1-1H6a1 1 0 00-1 1v1a2 2 0 002 2h10a2 2 0 002-2zM5 11V9a2 2 0 012-2h10a2 2 0 012 2v2M7 11V9m10 2V9" /></svg>
                ) },
                { label: 'Colour', value: car.details.overview.data['Colour'], icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                ) },
                { label: 'Doors', value: car.details.overview.data['Doors'], icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                ) },
                { label: 'Owners', value: car.details.overview.data['Owners'], icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) },
                { label: 'NCT', value: car.details.overview.data['NCT'] || '07/2025', icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center px-1">
                  <div className="mb-1.5 text-[#005a8d] opacity-90">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 capitalize mb-0.5">{item.label}</span>
                  <span className="text-[13px] font-black text-[#1a2b3c] whitespace-normal leading-tight tracking-tighter">{item.value}</span>
                </div>
              ))}
            </div>

            {/* HP Finance Calculator Section */}
            <div className="pb-4">
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-6">
                <h2 className="text-[28px] font-black text-[#1a2b3c]">HP Finance Calculator</h2>
                <p className="text-base text-gray-400 font-medium">own from <span className="font-black text-[#1a2b3c]">{car.finance["5yr"].weekly}</span> per week</p>
              </div>

              <div className="overflow-hidden border border-gray-100 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-100">
                      <th className="py-3 px-5 font-medium text-gray-400 text-[10px] uppercase tracking-widest w-1/4">Term</th>
                      <th className="py-3 px-5 font-medium text-gray-700 text-sm">3 Years</th>
                      <th className="py-3 px-5 font-medium text-gray-700 text-sm">4 Years</th>
                      <th className="py-3 px-5 font-medium text-gray-700 text-sm">5 Years</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-5 px-5 font-medium text-gray-400 text-[10px] uppercase tracking-widest">Monthly</td>
                      <td className="py-5 px-5 font-black text-xl text-[#1a2b3c]">{car.finance["3yr"].monthly}</td>
                      <td className="py-5 px-5 font-black text-xl text-[#1a2b3c]">{car.finance["4yr"].monthly}</td>
                      <td className="py-5 px-5 font-black text-xl text-[#1a2b3c]">{car.finance["5yr"].monthly}</td>
                    </tr>
                    <tr>
                      <td className="py-5 px-5 font-medium text-gray-400 text-[10px] uppercase tracking-widest">Weekly</td>
                      <td className="py-5 px-5 font-black text-xl text-[#1a2b3c]">{car.finance["3yr"].weekly}</td>
                      <td className="py-5 px-5 font-black text-xl text-[#1a2b3c]">{car.finance["4yr"].weekly}</td>
                      <td className="py-5 px-5 font-black text-xl text-[#1a2b3c]">{car.finance["5yr"].weekly}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[10px] text-gray-400 italic font-medium">
                *Repayments quoted are for illustrative purposes only and are subject to change
              </p>

              <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[12px] font-medium text-gray-500">
                  Figures are based on minimum deposit required which is 10%
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 border border-[#005a8d] px-6 py-2.5 rounded text-[10px] font-extrabold text-[#005a8d] uppercase tracking-widest hover:bg-sky-50 transition-colors">
                    CUSTOMISE
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button className="flex items-center gap-2 bg-[#e33935] text-white px-6 py-2.5 rounded text-[10px] font-extrabold uppercase tracking-widest hover:bg-[#d32f2f] transition-colors">
                    <span className="text-base leading-none italic font-black">€</span> FINANCE
                  </button>
                </div>
              </div>
            </div>

            {/* Description List */}
            <div className="mt-14 space-y-3 border-t border-gray-100 pt-10">
              {car.description.bullet_points.map((point, idx) => (
                <div key={idx} className="text-[12px] font-black text-[#1a2b3c] uppercase tracking-widest">
                  {point}
                </div>
              ))}
              <div className="mt-10 text-[13px] text-gray-600 leading-relaxed font-medium">
                {car.description.features}
              </div>
            </div>

            {/* Accordions Section */}
            <div className="mt-20 border-t border-gray-100">
              {[
                { id: 'overview', detail: car.details.overview },
                { id: 'running-costs', detail: car.details.runningCosts },
                { id: 'performance', detail: car.details.performance },
                { id: 'dimensions', detail: car.details.dimensions },
                { id: 'safety', detail: car.details.safety },
                { id: 'review', detail: car.details.review },
              ].map((section) => (
                <div key={section.id} className="border-b border-gray-100">
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center py-6 text-left group transition-all"
                  >
                    <span className="mr-6 text-[#005a8d] font-bold text-lg w-4 text-center">
                      {openSections.includes(section.id) ? '−' : '+'}
                    </span>
                    <span className="text-lg font-bold text-[#005a8d] transition-colors uppercase tracking-tight">{section.id === 'review' ? 'Review' : section.detail.title}</span>
                  </button>
                  {openSections.includes(section.id) && (
                    <div className="pb-8 pl-10">
                      {section.id === 'review' ? (
                         <div className="space-y-4 text-gray-600 leading-relaxed font-medium text-[14px]">
                            {car.details.review.mainText.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                         </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                          {Object.entries(section.detail.data as Record<string, string>).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 md:last:border-b md:[&:nth-last-child(2)]:border-b">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{key}</span>
                              <span className="text-sm font-black text-[#1a2b3c]">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 self-start sticky top-24">
            <div className="space-y-4">
              {/* Badge */}
              <div className="relative h-6 w-16 mb-2">
                <Image src="/assets/images/cartell.png" alt="Cartell Checked" fill className="object-contain" />
              </div>

              {/* Title & Location */}
              <div className="space-y-1">
                <h1 className="text-[40px] font-black text-[#1a2b3c] leading-[1] tracking-tight">
                  {car.year} {car.make} {car.model}
                </h1>
                <p className="text-[12px] text-gray-400 font-medium tracking-tight">
                  {car.variant}
                </p>
                <div className="flex items-center gap-1.5 text-[#005a8d] font-bold text-[10px]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Farrell Motors.
                </div>
              </div>

              {/* Price Line */}
              <div className="flex items-baseline justify-between gap-2 py-6 border-t border-gray-100">
                <span className="text-[12px] text-gray-400 font-medium shrink-0">Our Price: <span className="text-[#1a2b3c] font-black text-2xl ml-1 tracking-tighter">{car.price}</span></span>
                <span className="text-[12px] text-gray-400 font-medium shrink-0">Weekly: <span className="text-[#1a2b3c] font-black text-2xl ml-1 tracking-tighter">{car.weekly}</span></span>
                <span className="text-[12px] text-gray-400 font-medium shrink-0">Monthly: <span className="text-[#1a2b3c] font-black text-2xl ml-1 tracking-tighter">{car.monthly}</span></span>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button 
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="flex items-center justify-center gap-2 rounded bg-[#005c8e] py-3.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#004a75] transition-colors shadow-sm"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  MAKE AN ENQUIRY
                </button>
                <Link 
                  href={`/apply-for-finance/?id=${car.id}`}
                  className="flex items-center justify-center gap-2 rounded bg-[#e33935] py-3.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#d32f2f] transition-colors shadow-sm"
                >
                  <span className="text-xl leading-none italic font-black">€</span>
                  APPLY FOR FINANCE
                </Link>
                <Link 
                  href="/cash-for-cars/"
                  className="flex items-center justify-center gap-2 rounded bg-[#005c8e] py-3.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#004a75] transition-colors shadow-sm"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  VALUE MY TRADE IN
                </Link>
                <button className="flex items-center justify-center gap-2 rounded bg-[#005c8e] py-3.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#004a75] transition-colors shadow-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  CALL NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
        vehicleName={`${car.year} ${car.make} ${car.model}`}
      />
    </main>
  );
}
