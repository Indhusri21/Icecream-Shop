import React, { useState } from 'react';
import { X, Check, MapPin, Clock, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/icecream';
import { LOCATIONS } from '../data/icecreamData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'confirmed'>('details');
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].id);
  const [pickupTime, setPickupTime] = useState('15-mins');
  const [paymentMethod, setPaymentMethod] = useState<'counter' | 'apple-pay' | 'card'>('counter');
  const [customer, setCustomer] = useState({
    name: 'Julian Thorne',
    phone: '(555) 728-9104',
    email: 'julian.thorne@example.com',
    specialNotes: '',
  });
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.0875;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `CR-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('confirmed');
    onOrderSuccess();
  };

  const handleFinish = () => {
    setStep('details');
    onClose();
  };

  const selectedLocObj = LOCATIONS.find((l) => l.id === selectedLocation) || LOCATIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8DEC9] relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E8DEC9] px-6 py-4 flex items-center justify-between">
          <h2 id="checkout-modal-title" className="font-display text-xl font-bold text-[#241F1A]">
            {step === 'details' ? 'Parlor Express Pickup' : 'Order Confirmed'}
          </h2>
          <button
            onClick={step === 'confirmed' ? handleFinish : onClose}
            className="p-1.5 rounded-full text-[#6E6259] hover:bg-[#EFE7D8] hover:text-[#241F1A] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Location selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6259] mb-2">
                1. Select Pickup Parlor
              </label>
              <div className="space-y-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                      selectedLocation === loc.id
                        ? 'border-[#B85D36] bg-[#FAF3EC]'
                        : 'border-[#E8DEC9] bg-white hover:border-[#D4C5AD]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[#241F1A]">{loc.name}</p>
                      <span className="text-xs text-emerald-700 font-semibold">{loc.status}</span>
                    </div>
                    <p className="text-xs text-[#6E6259] mt-0.5">{loc.address}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pickup Timing */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6259] mb-2">
                2. Ready Time
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: '15-mins', label: '15 Mins', note: 'Fastest' },
                  { id: '30-mins', label: '30 Mins', note: 'Relaxed' },
                  { id: '60-mins', label: '1 Hour', note: 'Pre-Order' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPickupTime(t.id)}
                    className={`py-3 px-3 rounded-xl border text-center transition-all ${
                      pickupTime === t.id
                        ? 'border-[#241F1A] bg-[#241F1A] text-white'
                        : 'border-[#E8DEC9] bg-white text-[#241F1A] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{t.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{t.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Customer Information */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6259]">
                3. Contact Information for Pickup SMS
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="px-3.5 py-2.5 text-xs bg-white border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36]"
                />
                <input
                  required
                  type="tel"
                  placeholder="Mobile Phone"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="px-3.5 py-2.5 text-xs bg-white border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36]"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email Address"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36]"
              />
              <input
                type="text"
                placeholder="Special notes (e.g. napkins, separate bag for pints, extra waffle crisp)"
                value={customer.specialNotes}
                onChange={(e) => setCustomer({ ...customer, specialNotes: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36]"
              />
            </div>

            {/* Step 4: Payment Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6259] mb-2">
                4. Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('counter')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                    paymentMethod === 'counter'
                      ? 'border-[#B85D36] bg-[#FAF3EC] text-[#241F1A]'
                      : 'border-[#E8DEC9] bg-white text-[#5C5046]'
                  }`}
                >
                  Pay at Counter
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                    paymentMethod === 'apple-pay'
                      ? 'border-[#B85D36] bg-[#FAF3EC] text-[#241F1A]'
                      : 'border-[#E8DEC9] bg-white text-[#5C5046]'
                  }`}
                >
                  Apple / Google Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#B85D36] bg-[#FAF3EC] text-[#241F1A]'
                      : 'border-[#E8DEC9] bg-white text-[#5C5046]'
                  }`}
                >
                  Credit Card
                </button>
              </div>
            </div>

            {/* Total Summary & Place Order */}
            <div className="pt-4 border-t border-[#E8DEC9] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6E6259]">Total Due ({cart.length} items)</p>
                <p className="text-2xl font-bold font-display text-[#241F1A] tabular-nums">
                  ${total.toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold text-white bg-[#B85D36] hover:bg-[#9E4C27] transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B85D36]"
              >
                <span>Confirm Pickup Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          /* Order Confirmed Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Order Received by Scoop Counter
              </div>
              <h3 className="font-display text-3xl font-bold text-[#241F1A] mt-1">
                Order #{orderNumber} Confirmed!
              </h3>
              <p className="text-sm text-[#5C5046] mt-2 max-w-sm mx-auto">
                Thank you, {customer.name}. Our morning crew is rolling your fresh waffle cone 
                and hand-packing your order right now.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DEC9] text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-[#F2EBDE]">
                <span className="text-[#6E6259]">Pickup Location:</span>
                <span className="font-bold text-[#241F1A]">{selectedLocObj.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F2EBDE]">
                <span className="text-[#6E6259]">Pickup Address:</span>
                <span className="text-[#241F1A]">{selectedLocObj.address}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F2EBDE]">
                <span className="text-[#6E6259]">Estimated Ready Window:</span>
                <span className="font-bold text-emerald-700">
                  {pickupTime === '15-mins' ? 'In 15 Minutes' : pickupTime === '30-mins' ? 'In 30 Minutes' : 'In 60 Minutes'}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#6E6259]">Amount Due at Pickup:</span>
                <span className="font-bold text-sm text-[#241F1A] tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Instruction Callout */}
            <div className="p-4 bg-[#F2EBDE] rounded-xl border border-[#E8DEC9] text-xs text-[#5C5046] text-left">
              <p className="font-semibold text-[#241F1A] mb-1">Pickup Instructions:</p>
              <p>
                Head to the express pickup register with your name or show code <span className="font-mono font-bold text-[#241F1A]">{orderNumber}</span>. 
                Pints will remain in the deep flash freezer until the moment you arrive.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 px-4 bg-[#241F1A] hover:bg-[#3D332B] text-white rounded-full text-xs font-semibold transition-colors"
            >
              Done & Return to Parlor Menu
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
