// @ts-nocheck
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50/50 pb-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              {/* Left Column: Info & Map */}
              <div className="lg:col-span-12">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between mb-16">
                  <h1 className="text-6xl font-black tracking-tight text-gray-900 leading-none">Contact Us</h1>
                  
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 flex-1 lg:max-w-2xl">
                    <div className="text-center sm:text-left space-y-2 border-l border-gray-200 pl-6">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-sky-700">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Address</span>
                      </div>
                      <p className="text-sm font-bold text-gray-700 leading-relaxed">
                        Killarney Road, Bray,<br />Wicklow, A98 X3T
                      </p>
                    </div>

                    <div className="text-center sm:text-left space-y-2 border-l border-gray-200 pl-6">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-sky-700">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</span>
                      </div>
                      <p className="text-sm font-bold text-gray-700 leading-relaxed">
                        01-2869520<br />01-2761657
                      </p>
                    </div>

                    <div className="text-center sm:text-left space-y-2 border-l border-gray-200 pl-6">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-sky-700">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email</span>
                      </div>
                      <p className="text-sm font-bold text-sky-700 hover:underline cursor-pointer">
                        farrell040@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Map and Form */}
              <div className="lg:col-span-5">
                <div className="relative aspect-square w-full rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden group">
                  <div className="absolute inset-0 bg-[#f8f9fa] flex flex-col items-center justify-center text-center p-8">
                    <svg className="h-16 w-16 text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-xs font-medium text-gray-400 max-w-[200px] leading-relaxed mb-6">
                      This map content cannot be displayed due to your selected cookie preferences. To view this content please
                    </p>
                    <button className="rounded-md border border-gray-300 bg-white px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-700 transition-all hover:bg-gray-50 active:scale-95 shadow-sm">
                      ACCEPT FUNCTIONAL COOKIES
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="mb-6">
                  <h2 className="text-3xl font-black tracking-tight text-gray-800">Contact Form</h2>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
