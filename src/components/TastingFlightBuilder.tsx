import React, { useState } from 'react';
import { Check, Plus, Sparkles, RefreshCcw } from 'lucide-react';
import { CartItem } from '../types/icecream';
import { FLAVORS } from '../data/icecreamData';

interface TastingFlightBuilderProps {
  onAddToCart: (item: CartItem) => void;
}

export const TastingFlightBuilder: React.FC<TastingFlightBuilderProps> = ({ onAddToCart }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'roasted-pistachio',
    'salted-butter-caramel',
    'roasted-strawberry-balsamic',
    'valrhona-midnight-chocolate',
  ]);
  const [added, setAdded] = useState(false);

  const toggleSlot = (flavorId: string) => {
    if (selectedIds.includes(flavorId)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((id) => id !== flavorId));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, flavorId]);
      } else {
        // Replace last item
        setSelectedIds([...selectedIds.slice(0, 3), flavorId]);
      }
    }
  };

  const handleChefPreset = () => {
    setSelectedIds([
      'roasted-pistachio',
      'salted-butter-caramel',
      'roasted-strawberry-balsamic',
      'valrhona-midnight-chocolate',
    ]);
  };

  const handleDairyFreePreset = () => {
    setSelectedIds([
      'meyer-lemon-chamomile-sorbet',
      'alphonso-mango-passionfruit-sorbet',
      'coconut-roasted-coffee-chip',
      'roasted-strawberry-balsamic',
    ]);
  };

  const handleAddFlight = () => {
    const selectedNames = selectedIds.map(
      (id) => FLAVORS.find((f) => f.id === id)?.name || id
    );

    const flightItem: CartItem = {
      id: `tasting-flight-${Date.now()}`,
      type: 'flight',
      title: 'Artisan 4-Scoop Tasting Flight',
      subtitle: `Served on cedar paddle: ${selectedNames.join(', ')}`,
      vessel: 'Handcrafted Cedar Paddle & Waffle Crisps',
      flavors: selectedNames,
      price: 14.00,
      quantity: 1,
    };

    onAddToCart(flightItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section id="tasting-flight" className="py-16 sm:py-24 border-b border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
              <span>Tasting Room Experience</span>
              <span aria-hidden="true">·</span>
              <span>Cedar Board Flight</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241F1A] mt-2 text-balance">
              The 4-Scoop Tasting Flight.
            </h2>
            <p className="text-base text-[#5C5046] mt-3">
              Can’t choose just one? Explore four distinct flavor profiles side-by-side, 
              served on a carved cedar tasting paddle with fresh warm butter waffle crisps.
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleChefPreset}
              className="px-3.5 py-2 text-xs font-semibold rounded-full border border-[#DED4C5] bg-white hover:bg-[#FAF7F2] text-[#241F1A] transition-colors"
            >
              Chef’s Signature 4
            </button>
            <button
              onClick={handleDairyFreePreset}
              className="px-3.5 py-2 text-xs font-semibold rounded-full border border-[#DED4C5] bg-white hover:bg-[#FAF7F2] text-[#241F1A] transition-colors"
            >
              Plant-Based Trio + Berry
            </button>
          </div>
        </div>

        {/* The Cedar Paddle Visualization */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] mb-10 shadow-inner">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A7C70]">
              Your Tasting Paddle ({selectedIds.length} of 4 Selected)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((slotIdx) => {
              const flavorId = selectedIds[slotIdx];
              const flavor = FLAVORS.find((f) => f.id === flavorId);

              return (
                <div
                  key={slotIdx}
                  className={`bg-white rounded-2xl p-5 border text-center relative transition-all duration-200 ${
                    flavor
                      ? 'border-[#B85D36]/40 shadow-xs'
                      : 'border-dashed border-[#D4C5AD]'
                  }`}
                >
                  <span className="text-[11px] font-bold text-[#8A7C70] uppercase tracking-wider block mb-3">
                    Scoop 0{slotIdx + 1}
                  </span>

                  {flavor ? (
                    <div className="space-y-3">
                      <div
                        className="w-14 h-14 mx-auto rounded-full border border-black/15 shadow-sm flex items-center justify-center transform hover:scale-105 transition-transform"
                        style={{ backgroundColor: flavor.colorHex }}
                      >
                        <div className="w-5 h-5 rounded-full bg-white/40 blur-[2px]" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-[#241F1A] line-clamp-1">
                          {flavor.name}
                        </p>
                        <p className="text-xs text-[#6E6259] mt-0.5 line-clamp-1">
                          {flavor.intensity}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-xs text-[#8A7C70]">
                      Click any flavor below to fill this scoop slot
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Paddle Action Bar */}
          <div className="mt-8 pt-6 border-t border-[#E8DEC9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#5C5046]">
              <span className="font-semibold text-lg font-display text-[#241F1A] tabular-nums">$14.00</span>
              <span aria-hidden="true">·</span>
              <span>Includes 4 Handcrafted Mini Scoops + Fresh Waffle Crisps</span>
            </div>

            <button
              onClick={handleAddFlight}
              disabled={selectedIds.length < 4 || added}
              className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-semibold transition-all ${
                selectedIds.length < 4
                  ? 'bg-[#DCD5CB] text-[#8A7C70] cursor-not-allowed'
                  : added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#241F1A] hover:bg-[#3D332B] text-white shadow-sm'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Flight Added to Bag!</span>
                </>
              ) : selectedIds.length < 4 ? (
                <span>Pick {4 - selectedIds.length} More Flavor(s)</span>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Tasting Flight to Bag ($14.00)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Flavor Selector Matrix */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E6259] mb-4">
            Tap Flavors to Swap onto Your Flight
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {FLAVORS.map((f) => {
              const isSelected = selectedIds.includes(f.id);

              return (
                <button
                  key={f.id}
                  onClick={() => toggleSlot(f.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-[#B85D36] bg-[#FAF3EC] shadow-xs'
                      : 'border-[#E8DEC9] bg-white hover:border-[#D4C5AD]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-4 h-4 rounded-full border border-black/15"
                      style={{ backgroundColor: f.colorHex }}
                    />
                    {isSelected && (
                      <span className="text-[10px] font-bold text-[#B85D36]">Selected</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-[#241F1A] line-clamp-1">{f.name}</p>
                  <p className="text-[11px] text-[#6E6259] mt-0.5">{f.intensity}</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
