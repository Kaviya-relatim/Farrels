// @ts-nocheck
import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-2 py-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
      <Link href="/" className="hover:text-sky-700">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span>{">"}</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-sky-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-600">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
