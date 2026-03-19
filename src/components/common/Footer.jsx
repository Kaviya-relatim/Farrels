// @ts-nocheck
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#323d45] font-sans text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-black tracking-tight text-gray-400">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-[10.5px] font-black tracking-wider">
              {[
                { label: 'HOME', href: '/' },
                { label: 'USED CARS', href: '/used-cars' },
                { label: 'APPLY FOR FINANCE', href: '/apply-for-finance' },
                { label: 'SERVICE CENTRE', href: '/servicing' },
                { label: 'CASH FOR CARS', href: '/cash-for-cars' },
                { label: 'CAR SOURCING', href: '/car-sourcing' },
                { label: 'CONTACT', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-sky-400 uppercase">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="mb-5 text-base font-black tracking-tight text-gray-400">Opening Hours</h3>
            <ul className="flex flex-col text-[13px] font-black border-l border-gray-600/50 pl-6">
              {[
                { label: 'Mon: 9.00am - 6.00pm' },
                { label: 'Tue: 9.00am - 6.00pm' },
                { label: 'Wed: 9.00am - 6.00pm' },
                { label: 'Thu: 9.00am - 6.00pm' },
                { label: 'Fri: 9.00am - 6.00pm' },
                { label: 'Sat: CLOSED' },
                { label: 'Sun: CLOSED' },
              ].map((item, idx) => (
                <li key={idx} className="border-b border-gray-700/30 py-2.5 transition-colors hover:text-sky-400">
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-8">
            <h3 className="mb-5 text-base font-black tracking-tight text-gray-400">Contact Information</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Phone:</p>
                <p className="text-sm font-black text-white leading-tight">01-2869520 &nbsp; 01-2761657</p>
              </div>
              <div>
                <p className="mb-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Address:</p>
                <p className="text-[12px] font-bold text-white leading-relaxed opacity-90 font-sans">
                  Killarney Road, Bray, Wicklow, A98 X3T
                </p>
              </div>
              <div>
                <p className="mb-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Email:</p>
                <p className="text-[12px] font-black text-sky-400 transition-colors hover:text-sky-300 underline underline-offset-4">
                  farrell040@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1e242a] py-5 border-t border-gray-700/30">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex flex-col items-center gap-1.5 md:items-start">
            <Link href="/" className="relative h-10 w-40 bg-white rounded-md p-1.5 opacity-90 transition-opacity hover:opacity-100 flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                alt="Farrell Motors Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </Link>
            <p className="text-[9px] font-bold text-gray-500 tracking-tight">
              © {currentYear} All Rights Reserved.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[8.5px] uppercase tracking-widest text-gray-500 font-black">Powered by</span>
              {/* ── REPLATIM LOGO ──────────────────────────────────────────
                  Replace src below with your Replatim logo file once ready.
                  e.g. src="/assets/replatim-logo.png"
                  Current placeholder: logo copy.png
              ─────────────────────────────────────────────────────────── */}
              <div className="relative h-8 w-28 bg-white rounded p-1 opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Image
                  src="/assets/logo copy.png"
                  alt="Replatim"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
            </div>
            <span className="text-[8.5px] text-gray-600 font-black">© {currentYear} Replatim. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
