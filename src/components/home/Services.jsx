// @ts-nocheck
import Image from "next/image";
import Link from "next/link";

function ServiceCard({ image, title, href, buttonLabel }) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#005c8e]/10">
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:from-black/90" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-2xl font-black text-white md:text-3xl tracking-tight leading-tight transition-transform duration-500 group-hover:-translate-y-1">
            {title}
          </h3>
          <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="rounded bg-[#005c8e] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-[#004a75]">
              {buttonLabel}
            </div>
          </div>
        </div>
      </div>
      <Link href={href} className="absolute inset-0" aria-label={title} />
    </div>
  );
}

const SERVICES = [
  { image: "/assets/cardbox-1.webp", title: "Used Cars", href: "/used-cars", buttonLabel: "View Our Stock" },
  { image: "/assets/cardbox-2.webp", title: "Service Centre", href: "/servicing", buttonLabel: "Book Online" },
  { image: "/assets/cardbox-3.webp", title: "Finance", href: "/apply-for-finance", buttonLabel: "Apply Online" },
  { image: "/assets/cardbox-4.webp", title: "Cash For Cars", href: "/cash-for-cars", buttonLabel: "Get A Valuation" },
];

export default function Services() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
