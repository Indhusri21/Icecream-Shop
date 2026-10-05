import React, { useState } from 'react';
import { Package, Plus, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types/icecream';
import { PINTS_PRODUCTS, FLAVORS } from '../data/icecreamData';
import { IMAGES } from '../data/images';

interface PintsSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export const PintsSection: React.FC<PintsSectionProps> = ({ onAddToCart }) => {
  const [addedId, setAddedId] = useState<string | null>(null);
  const [customPintFlavor, setCustomPintFlavor] = useState<string>(FLAVORS[0].id);

  const handleAddPack = (pack: typeof PINTS_PRODUCTS[0]) => {
    onAddToCart({
      id: `${pack.id}-${Date.now()}`,
      type: 'pint',
      title: pack.name,
      subtitle: pack.volume,
      flavors: pack.flavors,
      price: pack.price,
      quantity: 1,
    });

    setAddedId(pack.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleAddSinglePint = () => {
    const flavor = FLAVORS.find((f) => f.id === customPintFlavor) || FLAVORS[0];

    onAddToCart({
      id: `single-pint-${flavor.id}-${Date.now()}`,
      type: 'pint',
      title: `${flavor.name} (16oz Pint)`,
      subtitle: 'Hand-Packed Fresh from Sunrise Churn',
      vessel: 'Insulated Double-Wall Freezer Pint',
      flavors: [flavor.name],
      price: flavor.pricePint,
      quantity: 1,
    });

    setAddedId(`single-${flavor.id}`);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="pints" className="py-16 sm:py-24 border-b border-[#E8DEC9] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
            <span>Take-Home Parlor Pints</span>
            <span aria-hidden="true">·</span>
            <span>Chilled Cold Storage</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241F1A] mt-2 text-balance">
            Hand-packed pints for your home freezer.
          </h2>
          <p className="text-base text-[#5C5046] mt-3">
            Packed by hand directly from our churning barrels to minimize air pockets. 
            Keep in your home freezer at -5°F for optimal scoop texture.
          </p>
        </div>

        {/* Feature Banner with Generated Product Photography */}
        <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm">
          <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-[#EBE3D7]">
            <img
              src={IMAGES.craftPints}
              alt="Three craft artisanal ice cream pints in paper tubs with elegant minimalist typography"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
              Pick Any Morning Churn
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#241F1A]">
              Single Hand-Packed Pint ($13.50)
            </h3>
            <p className="text-sm text-[#5C5046] leading-relaxed">
              Order any of today’s twelve signature or limited flavors packed fresh in a 16-ounce insulated tub. 
              Ready for immediate pickup or delivery packed with dry-ice insulation.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select
                value={customPintFlavor}
                onChange={(e) => setCustomPintFlavor(e.target.value)}
                className="py-3 px-4 text-xs bg-[#FAF7F2] border border-[#DED4C5] rounded-xl text-[#241F1A] focus:outline-none focus:border-[#B85D36] font-medium"
              >
                {FLAVORS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} — ${f.pricePint.toFixed(2)}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddSinglePint}
                disabled={addedId?.startsWith('single-')}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  addedId?.startsWith('single-')
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#B85D36] hover:bg-[#9E4C27] text-white'
                }`}
              >
                {addedId?.startsWith('single-') ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Pint Added!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Pack Fresh Pint ($13.50)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Curated Pint Bundles & Gift Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PINTS_PRODUCTS.map((pack) => {
            const isAdded = addedId === pack.id;

            return (
              <div
                key={pack.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DEC9] flex flex-col justify-between hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8A7C70] mb-3">
                    <span className="font-semibold text-[#9C4724]">{pack.volume}</span>
                    {pack.popular && (
                      <span className="text-[#241F1A] font-semibold">Parlor Favorite</span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#241F1A] mb-2">
                    {pack.name}
                  </h3>

                  <p className="text-xs text-[#5C5046] leading-relaxed mb-4">
                    {pack.description}
                  </p>

                  {/* Flavor breakdown */}
                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC9] text-xs text-[#5C5046] space-y-1 mb-6">
                    <p className="font-semibold text-[#241F1A] mb-1">Includes:</p>
                    {pack.flavors.map((flv, idx) => (
                      <p key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B85D36]" />
                        <span>{flv}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F2EBDE] flex items-center justify-between">
                  <div className="text-2xl font-bold font-display text-[#241F1A] tabular-nums">
                    ${pack.price.toFixed(2)}
                  </div>

                  <button
                    onClick={() => handleAddPack(pack)}
                    disabled={isAdded}
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#241F1A] hover:bg-[#3D332B] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Box to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
