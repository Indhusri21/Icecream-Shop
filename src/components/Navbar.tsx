import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/icecream';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onOpenCart, onOpenOrderModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#241F1A] hover:text-[#B85D36] transition-colors">
          Crema & Co.
        </a>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C5046]">
          <a href="#flavors" className="hover:text-[#241F1A] hover:underline underline-offset-8 transition-colors">
            Flavors
          </a>
          <a href="#sundae-builder" className="hover:text-[#241F1A] hover:underline underline-offset-8 transition-colors">
            Custom Sundae
          </a>
          <a href="#tasting-flight" className="hover:text-[#241F1A] hover:underline underline-offset-8 transition-colors">
            Tasting Flights
          </a>
          <a href="#pints" className="hover:text-[#241F1A] hover:underline underline-offset-8 transition-colors">
            Pints & Boxes
          </a>
          <a href="#locations" className="hover:text-[#241F1A] hover:underline underline-offset-8 transition-colors">
            Locations
          </a>
          <a href="#craft" className="hover:text-[#241F1A] hover:underline underline-offset-8 transition-colors">
            Our Craft
          </a>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label={`Shopping cart with ${totalCartCount} items`}
            className="relative p-2.5 text-[#241F1A] hover:bg-[#EFE7D8] rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B85D36]"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B85D36] text-white text-xs font-semibold rounded-full flex items-center justify-center tabular-nums">
                {totalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenOrderModal}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#241F1A] hover:bg-[#3D332B] rounded-full transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B85D36]"
          >
            <span>Order Pickup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#241F1A] hover:bg-[#EFE7D8] rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DEC9] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#5C5046]">
            <a
              href="#flavors"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241F1A] transition-colors"
            >
              Flavors
            </a>
            <a
              href="#sundae-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241F1A] transition-colors"
            >
              Custom Sundae
            </a>
            <a
              href="#tasting-flight"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241F1A] transition-colors"
            >
              Tasting Flights
            </a>
            <a
              href="#pints"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241F1A] transition-colors"
            >
              Pints & Boxes
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241F1A] transition-colors"
            >
              Locations
            </a>
            <a
              href="#craft"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241F1A] transition-colors"
            >
              Our Craft
            </a>
          </nav>
          <div className="pt-2 border-t border-[#E8DEC9]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#241F1A] hover:bg-[#3D332B] rounded-full transition-colors"
            >
              <span>Order Online for Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
