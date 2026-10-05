import React, { useState } from 'react';
import { X, Plus, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Flavor, CartItem, VesselOption } from '../types/icecream';
import { VESSELS } from '../data/icecreamData';

interface FlavorDetailModalProps {
  flavor: Flavor | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const FlavorDetailModal: React.FC<FlavorDetailModalProps> = ({
  flavor,
  onClose,
  onAddToCart,
}) => {
  if (!flavor) return null;

  const [portion, setPortion] = useState<'single' | 'double' | 'pint'>('single');
  const [selectedVessel, setSelectedVessel] = useState<string>('waffle-cone');
  const [added, setAdded] = useState(false);

  const getBasePrice = () => {
    if (portion === 'single') return flavor.priceSingle;
    if (portion === 'double') return flavor.priceDouble;
    return flavor.pricePint;
  };

  const vesselObj = VESSELS.find(v => v.id === selectedVessel);
  const extraVesselPrice = portion === 'pint' ? 0 : (vesselObj?.extraPrice || 0);
  const totalPrice = getBasePrice() + extraVesselPrice;

  const handleAdd = () => {
    const vesselName = portion === 'pint' ? 'Hand-Packed Freezer Pint' : (vesselObj?.name || 'Compostable Cup');
    const titleText = portion === 'single' ? 'Single Scoop' : portion === 'double' ? 'Double Scoop' : 'Hand-Packed Pint';

    onAddToCart({
      id: `${flavor.id}-${portion}-${selectedVessel}-${Date.now()}`,
      type: portion === 'pint' ? 'pint' : 'scoop',
      title: `${flavor.name} (${titleText})`,
      subtitle: `Vessel: ${vesselName}`,
      vessel: vesselName,
      flavors: [flavor.name],
      price: totalPrice,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8DEC9] relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="flavor-detail-title"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E8DEC9] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
            <span>{flavor.kicker}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6E6259] hover:bg-[#EFE7D8] hover:text-[#241F1A] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Flavor Name & Swatch Header */}
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex-shrink-0 shadow-inner flex items-center justify-center border border-black/10"
              style={{ backgroundColor: flavor.colorHex }}
            >
              <div className="w-6 h-6 rounded-full bg-white/40 blur-[2px]" />
            </div>
            <div>
              <h2 id="flavor-detail-title" className="font-display text-2xl sm:text-3xl font-bold text-[#241F1A]">
                {flavor.name}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-xs text-[#6E6259]">
                <span>{flavor.intensity}</span>
                <span aria-hidden="true">·</span>
                <span>{flavor.dairyFree ? '100% Plant-Based' : 'Pasture-Raised Cream'}</span>
                {flavor.glutenFree && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Gluten-Free</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-[#5C5046] leading-relaxed">
            {flavor.description}
          </p>

          {/* Provenance & Sourcing */}
          <div className="p-4 bg-[#F2EBDE] rounded-2xl border border-[#E4D9C7] text-sm text-[#4A3F35]">
            <p className="font-semibold text-xs text-[#9C4724] uppercase tracking-wider mb-1">
              Farm Provenance & Churn Note
            </p>
            <p>{flavor.originNote}</p>
          </div>

          {/* Key Ingredients */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E6259] mb-2.5">
              Ingredients Sourced
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-[#4A3F35]">
              {flavor.ingredients.map((ing, idx) => (
                <span key={idx} className="bg-white border border-[#E3D9C9] px-3 py-1 rounded-lg">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Portion Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6259] mb-2">
              Select Serving Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPortion('single')}
                className={`py-3 px-3 rounded-xl border text-center transition-all ${
                  portion === 'single'
                    ? 'border-[#241F1A] bg-[#241F1A] text-white'
                    : 'border-[#E3D9C9] bg-white text-[#241F1A] hover:bg-[#FDFBF7]'
                }`}
              >
                <div className="text-xs font-medium">Single Scoop</div>
                <div className="text-sm font-bold tabular-nums mt-0.5">${flavor.priceSingle.toFixed(2)}</div>
              </button>

              <button
                type="button"
                onClick={() => setPortion('double')}
                className={`py-3 px-3 rounded-xl border text-center transition-all ${
                  portion === 'double'
                    ? 'border-[#241F1A] bg-[#241F1A] text-white'
                    : 'border-[#E3D9C9] bg-white text-[#241F1A] hover:bg-[#FDFBF7]'
                }`}
              >
                <div className="text-xs font-medium">Double Scoop</div>
                <div className="text-sm font-bold tabular-nums mt-0.5">${flavor.priceDouble.toFixed(2)}</div>
              </button>

              <button
                type="button"
                onClick={() => setPortion('pint')}
                className={`py-3 px-3 rounded-xl border text-center transition-all ${
                  portion === 'pint'
                    ? 'border-[#241F1A] bg-[#241F1A] text-white'
                    : 'border-[#E3D9C9] bg-white text-[#241F1A] hover:bg-[#FDFBF7]'
                }`}
              >
                <div className="text-xs font-medium">16oz Pint</div>
                <div className="text-sm font-bold tabular-nums mt-0.5">${flavor.pricePint.toFixed(2)}</div>
              </button>
            </div>
          </div>

          {/* Vessel Selection (if not pint) */}
          {portion !== 'pint' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6259] mb-2">
                Choose Cone or Vessel
              </label>
              <div className="space-y-2">
                {VESSELS.filter(v => v.id !== 'pint-container').map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVessel(v.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      selectedVessel === v.id
                        ? 'border-[#B85D36] bg-[#FAF3EC]'
                        : 'border-[#E8DEC9] bg-white hover:border-[#C4B7A4]'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-[#241F1A]">{v.name}</p>
                      <p className="text-xs text-[#6E6259]">{v.description}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#241F1A] tabular-nums">
                      {v.extraPrice === 0 ? 'Included' : `+$${v.extraPrice.toFixed(2)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Bar */}
          <div className="pt-4 border-t border-[#E8DEC9] flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6E6259]">Total Amount</p>
              <p className="text-2xl font-bold font-display text-[#241F1A] tabular-nums">
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all ${
                added 
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#B85D36] hover:bg-[#9E4C27] text-white shadow-sm'
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
                  <span>Add to Order Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
