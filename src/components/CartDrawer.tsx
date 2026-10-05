import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types/icecream';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeCrispThreshold = 25.00;
  const progressToFreeCrisps = Math.min(100, (subtotal / freeCrispThreshold) * 100);
  const remainingForCrisps = Math.max(0, freeCrispThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DEC9] animate-in slide-in-from-right duration-250"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-heading"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8DEC9] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#241F1A]" />
            <h2 id="cart-drawer-heading" className="font-display text-xl font-bold text-[#241F1A]">
              Your Parlor Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6E6259] hover:bg-[#EFE7D8] hover:text-[#241F1A] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free gift progress bar */}
        <div className="px-6 py-3 bg-[#F2EBDE] border-b border-[#E4D9C7] text-xs text-[#5C5046]">
          <div className="flex justify-between font-medium mb-1">
            <span>
              {remainingForCrisps === 0
                ? '🎉 Complimentary House Waffle Crisps Unlocked!'
                : `Add $${remainingForCrisps.toFixed(2)} more for free waffle crisps`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#DED4C5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B85D36] transition-all duration-300"
              style={{ width: `${progressToFreeCrisps}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#B8AFA6] mx-auto stroke-1" />
              <p className="font-display text-lg font-bold text-[#241F1A]">Your bag is currently empty</p>
              <p className="text-xs text-[#6E6259] max-w-xs mx-auto">
                Explore our morning churn, build a bespoke sundae, or order a 4-scoop flight.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#241F1A] hover:bg-[#3D332B] rounded-full transition-colors"
              >
                Browse Flavors
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-[#E8DEC9] shadow-xs flex flex-col justify-between"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#241F1A]">{item.title}</h3>
                    <p className="text-xs text-[#6E6259] mt-0.5">{item.subtitle}</p>
                    {item.toppings && item.toppings.length > 0 && (
                      <p className="text-[11px] text-[#8A7C70] mt-1">
                        Toppings: {item.toppings.join(', ')}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#8A7C70] hover:text-red-700 p-1 transition-colors"
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F2EBDE] flex items-center justify-between">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 border border-[#E8DEC9] rounded-lg p-0.5 bg-[#FAF7F2]">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 hover:bg-[#EAE1D1] rounded text-[#241F1A] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-semibold text-[#241F1A] px-2 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 hover:bg-[#EAE1D1] rounded text-[#241F1A] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-sm font-bold text-[#241F1A] font-display tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8DEC9] space-y-4">
            <div className="space-y-1.5 text-xs text-[#6E6259]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#241F1A] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Local Tax (8.75%)</span>
                <span className="font-semibold text-[#241F1A] tabular-nums">
                  ${(subtotal * 0.0875).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#241F1A] pt-2 border-t border-[#F2EBDE]">
                <span className="font-display">Total Amount</span>
                <span className="font-display tabular-nums">
                  ${(subtotal * 1.0875).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-[#B85D36] hover:bg-[#9E4C27] text-white rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B85D36]"
            >
              <span>Proceed to Express Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
