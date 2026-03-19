// @ts-nocheck
import Image from "next/image";
import SearchFilter from "./SearchFilter";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Hero Image Container */}
      <div className="relative h-[300px] w-full lg:h-[550px]">
        <Image
          src="/assets/hero-1.webp"
          alt="Farrell Motors Hero"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Floating Search Filter */}
      <div className="relative z-50 -mt-10 container mx-auto px-4 lg:-mt-16">
        <div className="mx-auto max-w-7xl rounded-md bg-[#F4F6F8] p-1.5 shadow-xl lg:p-2 border border-white/50 backdrop-blur-sm">
          <SearchFilter />
        </div>
      </div>
    </section>
  );
}
