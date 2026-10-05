import React, { useState } from 'react';
import { MapPin, Clock, Phone, Copy, Check, Navigation, Calendar } from 'lucide-react';
import { LOCATIONS } from '../data/icecreamData';

export const LocationsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cateringSent, setCateringSent] = useState(false);
  const [cateringForm, setCateringForm] = useState({
    name: '',
    email: '',
    date: '',
    guests: '25-50 guests',
    location: 'downtown-flagship',
  });

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard?.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCateringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCateringSent(true);
    setTimeout(() => {
      setCateringSent(false);
      setCateringForm({
        name: '',
        email: '',
        date: '',
        guests: '25-50 guests',
        location: 'downtown-flagship',
      });
    }, 3500);
  };

  return (
    <section id="locations" className="py-16 sm:py-24 border-b border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
            <span>Parlors & Tasting Rooms</span>
            <span aria-hidden="true">·</span>
            <span>Visit Us in Person</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241F1A] mt-2 text-balance">
            Two welcoming neighborhood parlors.
          </h2>
          <p className="text-base text-[#5C5046] mt-3">
            Come watch our pastry team roll warm waffle cones, pull espresso shots over affogatos, 
            or sit out on our sunlit courtyards.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {LOCATIONS.map((loc) => {
            const isCopied = copiedId === loc.id;

            return (
              <div
                key={loc.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Status header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#9C4724]">
                      {loc.neighborhood}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>{loc.status}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#241F1A]">
                      {loc.name}
                    </h3>
                    <p className="text-sm text-[#5C5046] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#8A7C70] flex-shrink-0" />
                      <span>{loc.address}</span>
                    </p>
                  </div>

                  {/* Hours & Contact */}
                  <div className="space-y-2.5 text-xs text-[#5C5046] bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DEC9]">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#8A7C70] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#241F1A]">Scoop Hours</p>
                        <p>{loc.hours}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-[#E8DEC9]">
                      <Phone className="w-4 h-4 text-[#8A7C70] flex-shrink-0" />
                      <span>Direct Parlor Line: {loc.phone}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#6E6259] mb-2">
                      Parlor Features
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-[#4A3F35]">
                      {loc.features.map((feat, idx) => (
                        <span key={idx} className="bg-[#FAF7F2] border border-[#E8DEC9] px-3 py-1 rounded-lg">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-[#F2EBDE] flex items-center gap-3">
                  <button
                    onClick={() => handleCopy(loc.address, loc.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#DED4C5] bg-[#FAF7F2] hover:bg-[#F2EBDE] text-xs font-semibold text-[#241F1A] transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8A7C70]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#241F1A] hover:bg-[#3D332B] text-xs font-semibold text-white transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Private Events & Mobile Ice Cream Cart Inquiries */}
        <div className="bg-[#F5EFEB] rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
              <span>Weddings · Celebrations · Corporate</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#241F1A]">
              Book our vintage mobile ice cream cart.
            </h3>
            <p className="text-sm text-[#5C5046] leading-relaxed">
              We bring our copper churns, fresh waffle press, and 4 custom flavors of your choice 
              to your gathering. Served by our smiling scoop team in vintage linen aprons.
            </p>
            <div className="pt-2 text-xs text-[#6E6259]">
              Packages starting from 30 guests · Includes fresh waffle cones & sundae station
            </div>
          </div>

          <div className="lg:col-span-6">
            {cateringSent ? (
              <div className="bg-white p-6 rounded-2xl border border-emerald-300 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-display font-bold text-lg text-[#241F1A]">Inquiry Received!</p>
                <p className="text-xs text-[#5C5046]">
                  Our catering director will reply within 24 hours with package details and custom flavor menus.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCateringSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DEC9] space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6259] mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Claire Sterling"
                      value={cateringForm.name}
                      onChange={(e) => setCateringForm({ ...cateringForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6259] mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="claire@example.com"
                      value={cateringForm.email}
                      onChange={(e) => setCateringForm({ ...cateringForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6259] mb-1">
                      Event Date
                    </label>
                    <input
                      required
                      type="date"
                      value={cateringForm.date}
                      onChange={(e) => setCateringForm({ ...cateringForm, date: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6259] mb-1">
                      Guest Count
                    </label>
                    <select
                      value={cateringForm.guests}
                      onChange={(e) => setCateringForm({ ...cateringForm, guests: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36]"
                    >
                      <option value="25-50 guests">25 – 50 guests</option>
                      <option value="50-100 guests">50 – 100 guests</option>
                      <option value="100-200 guests">100 – 200 guests</option>
                      <option value="200+ guests">200+ guests (Grand Event)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#B85D36] hover:bg-[#9E4C27] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Request Cart Catering Quote
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
