import { GiShoppingCart, GiShoppingBag } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <div>
          <a
            href="#collection-title"
            className="text-lg font-bold tracking-tight text-slate-900"
          >
            goodthings<span className="text-emerald-700">.</span>
          </a>
        </div>
        <div className="flex items-center justify-between">
          <a
            href="#collection-title"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-stone-100 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Shop collection
          </a>

          <a
            href="#collection-title"
            className="rounded-full px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-stone-100 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <FaShoppingCart className="w-5 h-5" />
          </a>
          
          <a
            href="#collection-title"
            className="rounded-full px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-stone-100 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <GiShoppingBag className="w-5 h-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}