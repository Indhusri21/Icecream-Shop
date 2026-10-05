import React, { useState } from 'react';
import { CartItem, Flavor } from './types/icecream';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlavorMenu } from './components/FlavorMenu';
import { CustomSundaeBuilder } from './components/CustomSundaeBuilder';
import { TastingFlightBuilder } from './components/TastingFlightBuilder';
import { PintsSection } from './components/PintsSection';
import { OurStory } from './components/OurStory';
import { LocationsSection } from './components/LocationsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlavorDetailModal } from './components/FlavorDetailModal';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'initial-sample-pistachio',
      type: 'scoop',
      title: 'Bronte Roasted Pistachio (Single Scoop)',
      subtitle: 'Vessel: Fresh Brown Butter Waffle Cone',
      vessel: 'Fresh Brown Butter Waffle Cone',
      flavors: ['Bronte Roasted Pistachio'],
      price: 7.00,
      quantity: 1,
    }
  ]);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      // Check if identical item already exists
      const existingIdx = prev.findIndex(
        (i) => i.title === item.title && i.subtitle === item.subtitle
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        return next;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderSuccess = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241F1A]">
      {/* Top Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderModal={() => {
          if (cart.length > 0) {
            setIsCheckoutOpen(true);
          } else {
            scrollToSection('flavors');
          }
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreFlavors={() => scrollToSection('flavors')}
          onOpenSundaeBuilder={() => scrollToSection('sundae-builder')}
        />

        <FlavorMenu
          onSelectFlavor={(flavor) => setSelectedFlavor(flavor)}
          onAddToCart={handleAddToCart}
          onOpenFlightBuilder={() => scrollToSection('tasting-flight')}
        />

        <CustomSundaeBuilder onAddToCart={handleAddToCart} />

        <TastingFlightBuilder onAddToCart={handleAddToCart} />

        <PintsSection onAddToCart={handleAddToCart} />

        <OurStory />

        <LocationsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Pickup Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Flavor Detail Modal */}
      <FlavorDetailModal
        flavor={selectedFlavor}
        onClose={() => setSelectedFlavor(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Bottom Bar on Mobile for quick cart access (≤15% height rule) */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#241F1A] text-white py-3 px-5 rounded-2xl shadow-xl flex items-center justify-between text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B85D36]"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#B85D36]" />
              <span>{totalCartCount} item{totalCartCount > 1 ? 's' : ''} in bag</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="tabular-nums font-bold">${totalCartPrice.toFixed(2)}</span>
              <span className="text-[#DCD5CB]">· View Bag →</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
