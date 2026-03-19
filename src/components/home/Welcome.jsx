// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Sharp-edged, Left-Aligned Hero Container */}
        <div className="relative w-full h-[500px] lg:h-[550px] overflow-hidden shadow-2xl">
          {/* Immersive Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/welcome-bg.webp"
              alt="Farrell Motors Welcome"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Gradient overlay to help card pop on the LEFT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          </div>

          {/* Content Layer - Justified to the Left */}
          <div className="relative z-10 h-full w-full">
            <div className="h-full px-8 lg:px-20 flex items-center justify-start">
              {/* Wider, Short Height Glass Card with Scrollable Content */}
              <div className="w-full max-w-[580px] max-h-[420px] border border-white/30 bg-white/10 p-6 lg:p-8 backdrop-blur-md flex flex-col shadow-2xl overflow-hidden">
                
                {/* Header Section on Top */}
                <div className="mb-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                    Welcome to FARRELL MOTORS
                  </h2>
                </div>
                
                {/* Scrollable Content Section */}
                <div className="flex-1 overflow-y-auto pr-4 mb-6 custom-scrollbar">
                  <div className="space-y-4 text-white">
                    <p className="text-[15px] font-semibold leading-relaxed">
                      Located on the Killarney Road, Bray, Co. Wicklow
                    </p>
                    
                    <div className="space-y-4 text-[14px] font-normal leading-relaxed opacity-100">
                      <p>
                        We stock a good selection of used cars and our workshop is ideally located for the car servicing needs of motorists in the Bray area.
                      </p>
                      <p>
                        With over 26 years' experience and an emphasis on customer care, our reputation is our guarantee.
                      </p>
                      <p>
                        Our team of experts is dedicated to ensuring you find the right vehicle at the right price, with full transparency and support throughout the process.
                      </p>
                      <p>
                        Whether you need a routine service or a major repair, our workshop is equipped to handle all your automotive needs with precision.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Button Action - Fixed at Bottom */}
                <div className="flex justify-start">
                  <Link 
                    href="https://www.carsireland.ie/car-dealers/county/wicklow" 
                    target="_blank"
                    className="inline-block bg-[#005a8d] hover:bg-[#004a75] text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-none transition-all duration-300 shadow-xl text-center"
                  >
                    Find Out More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
      `}</style>
    </section>
  );
}










