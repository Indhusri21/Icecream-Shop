import React, { useState } from 'react';
import { Sparkles, Plus, Check, RefreshCw } from 'lucide-react';
import { CartItem, Flavor } from '../types/icecream';
import { FLAVORS, VESSELS, TOPPINGS } from '../data/icecreamData';
import { IMAGES } from '../data/images';

interface CustomSundaeBuilderProps {
  onAddToCart: (item: CartItem) => void;
}

export const CustomSundaeBuilder: React.FC<CustomSundaeBuilderProps> = ({ onAddToCart }) => {
  const [selectedVessel, setSelectedVessel] = useState(VESSELS[1].id); // default Waffle Bowl
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([
    'roasted-pistachio',
    'salted-butter-caramel',
  ]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    'warm-fudge',
    'honeycomb-brittle',
    'chantilly-cream',
  ]);
  const [added, setAdded] = useState(false);

  const toggleFlavor = (flavorId: string) => {
    if (selectedFlavors.includes(flavorId)) {
      if (selectedFlavors.length > 1) {
        setSelectedFlavors(selectedFlavors.filter((id) => id !== flavorId));
      }
    } else {
      if (selectedFlavors.length < 3) {
        setSelectedFlavors([...selectedFlavors, flavorId]);
      }
    }
  };

  const toggleTopping = (toppingId: string) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const currentVessel = VESSELS.find((v) => v.id === selectedVessel) || VESSELS[1];

  // Price math
  // Base price: $7.50 for 1st scoop, +$2.75 for 2nd scoop, +$2.50 for 3rd scoop
  const scoopBase = selectedFlavors.length === 1 ? 6.50 : selectedFlavors.length === 2 ? 9.50 : 12.00;
  const vesselExtra = currentVessel.extraPrice;
  const toppingsTotal = selectedToppings.reduce((acc, tId) => {
    const t = TOPPINGS.find((top) => top.id === tId);
    return acc + (t ? t.price : 0);
  }, 0);

  const totalSundaePrice = scoopBase + vesselExtra + toppingsTotal;

  const handleAddSundae = () => {
    const flavorNames = selectedFlavors.map(
      (id) => FLAVORS.find((f) => f.id === id)?.name || id
    );
    const toppingNames = selectedToppings.map(
      (id) => TOPPINGS.find((t) => t.id === id)?.name || id
    );

    const sundaeItem: CartItem = {
      id: `custom-sundae-${Date.now()}`,
      type: 'sundae',
      title: 'Bespoke Parlor Sundae',
      subtitle: `${currentVessel.name} · ${flavorNames.join(', ')}`,
      vessel: currentVessel.name,
      flavors: flavorNames,
      toppings: toppingNames,
      price: totalSundaePrice,
      quantity: 1,
    };

    onAddToCart(sundaeItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleReset = () => {
    setSelectedVessel(VESSELS[1].id);
    setSelectedFlavors(['roasted-pistachio', 'salted-butter-caramel']);
    setSelectedToppings(['warm-fudge', 'honeycomb-brittle', 'chantilly-cream']);
  };

  return (
    <section id="sundae-builder" className="py-16 sm:py-24 bg-[#F5EFEB] border-b border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
            <span>Interactive Parlor Atelier</span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Creations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241F1A] mt-2 text-balance">
            Design your signature parlor sundae.
          </h2>
          <p className="text-base text-[#5C5046] mt-3">
            Pair fresh hot-pressed waffle bases with up to three morning churns, warm cauldrons of butter caramel, 
            and hand-torched vanilla fluff.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DEC9] shadow-sm">
            
            {/* Step 1: Vessel */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6E6259]">
                  Step 01. Select Your Vessel
                </span>
                <span className="text-xs text-[#8A7C70]">{currentVessel.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VESSELS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVessel(v.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedVessel === v.id
                        ? 'border-[#B85D36] bg-[#FAF3EC] shadow-xs'
                        : 'border-[#E8DEC9] bg-[#FAF7F2] hover:border-[#D4C5AD]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#241F1A]">{v.name}</span>
                      <span className="text-xs font-semibold text-[#9C4724] tabular-nums">
                        {v.extraPrice === 0 ? 'Standard' : `+$${v.extraPrice.toFixed(2)}`}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6259] mt-1">{v.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavors (Pick 1 to 3) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6E6259]">
                  Step 02. Choose 1 to 3 Scoops
                </span>
                <span className="text-xs font-semibold text-[#9C4724]">
                  {selectedFlavors.length} of 3 Selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FLAVORS.slice(0, 9).map((f) => {
                  const isSelected = selectedFlavors.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFlavor(f.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#241F1A] bg-[#241F1A] text-white shadow-xs'
                          : 'border-[#E8DEC9] bg-[#FAF7F2] text-[#241F1A] hover:bg-[#F2EBDE]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/20 flex-shrink-0"
                          style={{ backgroundColor: f.colorHex }}
                        />
                        <span className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-[#241F1A]'}`}>
                          {f.name}
                        </span>
                      </div>
                      <span className={`text-[11px] ${isSelected ? 'text-[#DCD5CB]' : 'text-[#6E6259]'}`}>
                        {f.intensity}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Artisanal Drizzles & Crunches */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6E6259]">
                  Step 03. Sauces, Crunches & Garnishes
                </span>
                <span className="text-xs text-[#8A7C70]">Select as many as you like</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {TOPPINGS.map((t) => {
                  const isSelected = selectedToppings.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTopping(t.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#B85D36] bg-[#FAF3EC]'
                          : 'border-[#E8DEC9] bg-[#FAF7F2] hover:bg-[#F2EBDE]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#241F1A]">{t.name}</span>
                        <span className="text-xs font-semibold text-[#9C4724] tabular-nums">
                          +${t.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6E6259] mt-0.5 truncate">{t.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#6E6259] hover:text-[#241F1A] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Classic Pairing</span>
              </button>
            </div>

          </div>

          {/* Right Column: Live Sundae Summary & Visual Deck */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Photo Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DEC9] shadow-sm">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#EBE3D7] mb-5">
                <img
                  src={IMAGES.artisanSundae}
                  alt="Decadent artisanal ice cream sundae in ribbed glassware with salted caramel drizzle and roasted pecans"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
                    Your Bespoke Assembly
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#241F1A] mt-1">
                    The Parlor Creation
                  </h3>
                </div>

                {/* Breakdown list */}
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC9] text-xs space-y-2">
                  <div className="flex justify-between text-[#5C5046]">
                    <span className="font-medium">Vessel:</span>
                    <span className="text-[#241F1A] font-semibold">{currentVessel.name}</span>
                  </div>
                  <div className="flex justify-between text-[#5C5046]">
                    <span className="font-medium">Scoop Stack ({selectedFlavors.length}):</span>
                    <span className="text-[#241F1A] font-semibold text-right max-w-[200px] truncate">
                      {selectedFlavors.map((id) => FLAVORS.find((f) => f.id === id)?.name).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5C5046]">
                    <span className="font-medium">Garnishes ({selectedToppings.length}):</span>
                    <span className="text-[#241F1A] font-semibold text-right max-w-[200px] truncate">
                      {selectedToppings.length === 0
                        ? 'None'
                        : selectedToppings.map((id) => TOPPINGS.find((t) => t.id === id)?.name).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Total and Add to Bag */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#6E6259]">Calculated Price</span>
                    <div className="text-3xl font-display font-bold text-[#241F1A] tabular-nums">
                      ${totalSundaePrice.toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={handleAddSundae}
                    disabled={added}
                    className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                      added
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#B85D36] hover:bg-[#9E4C27] text-white'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Sundae to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Parlor Quality Guarantee */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DEC9] text-xs text-[#5C5046]">
              <p className="font-semibold text-[#241F1A] mb-1">Freshly Rolled Guarantee</p>
              <p className="leading-relaxed">
                If you choose our Fresh Waffle Bowl or Cone, your vessel is pressed within 15 minutes of your pickup window 
                to preserve crispness against the melting cream.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
