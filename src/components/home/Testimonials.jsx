// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

function TestimonialCard({ name, time, text }) {
  return (
    <div className="flex shrink-0 w-full flex-col px-4">
      <div className="relative mb-6 rounded-[3px] border border-[#ededed] bg-[#fafafa] p-6 lg:p-8">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex gap-2">
            <span className="text-[32px] font-serif leading-none text-[#bbb] select-none">"</span>
            <div className="flex gap-1 pt-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-[18px] w-[18px] text-[#ff9242] fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="h-5 w-5 opacity-80">
            <svg viewBox="0 0 24 24" className="h-full w-full">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </div>
        </div>

        <div className="h-[120px] overflow-y-auto pr-2 custom-review-scrollbar">
          <p className="text-sm font-normal leading-relaxed text-[#777]">{text}</p>
        </div>

        <div className="absolute -bottom-[8px] left-[35px] h-4 w-4 rotate-45 border-b border-r border-[#ededed] bg-[#fafafa]" />
      </div>

      <div className="flex items-center gap-3 pl-2">
        <div className="relative h-14 w-14 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] overflow-hidden">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div>
          <h4 className="text-[17px] font-bold text-[#427fed] font-sans">{name}</h4>
          <p className="text-[13px] text-[#999]">{time}</p>
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Anita Metic", time: "2 months ago", text: "I recently had my car serviced at Farrell Motors, and I was extremely impressed with the quality of work. The staff were professional and clearly very skilled. The service was carried out with great efficiency, thoroughness, and completed to the highest standard." },
  { name: "Alan Hill", time: "3 months ago", text: "Eamon and his team are fantastic, and a special shoutout to the lovely lady at reception for her help too! The service is always friendly, professional, and you can really tell they care about their customers." },
  { name: "Krzysztof Sobolewski", time: "4 months ago", text: "Very good garage, professional staff, car done very fast. Quick and solid service, 5star!" },
  { name: "Jason Kavanagh", time: "6 months ago", text: "1st class experience at Farrell motors from reception, communication, service & aftercare, couldn't recommend highly enough. If you're looking for an honest, fair & reliable mechanics, look no further!" },
  { name: "Glen Carrigg", time: "6 months ago", text: "Unreal Amazing Service - I first contacted Farrell Motors a few months back to schedule a service. Unfortunately, the following day I needed an emergency tow from Dublin City. Eamon was very obliging and told me to go directly to him." },
  { name: "Stephanie O'Donnell", time: "1 year ago", text: "Looking after our company vehicles (Unipipe Ireland) for many years and have found them to be extremely professional, reliable, and easy to deal with. Staff are always friendly and go above and beyond." },
  { name: "Steven Apied", time: "1 year ago", text: "Eamonn and his team are fantastic. They have looked after a very old car for me and managed to bring it back to life! Highly recommend their professionalism and expertise." },
  { name: "Daragh Teevan", time: "1 year ago", text: "Sent the nicest mechanic over with a battery pack for a jumpstart. Done and dusted in no time. Highly recommend them. Thanks very much." },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="mb-20 text-center text-5xl font-black tracking-tighter text-[#333]">
          What Our Happy Customers Say
        </h2>

        <div className="relative mx-auto max-w-7xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * (100 / (typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3))}%)`,
            }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="w-full px-0 md:w-1/3 shrink-0">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-sky-500 scale-125" : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-review-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-review-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-review-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
        .custom-review-scrollbar::-webkit-scrollbar-thumb:hover { background: #bbb; }
      `}</style>
    </section>
  );
}
