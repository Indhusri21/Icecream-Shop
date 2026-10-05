import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Sparkles, Filter, Check } from 'lucide-react';
import { Flavor, FlavorCategory, CartItem } from '../types/icecream';
import { FLAVORS, VESSELS } from '../data/icecreamData';
import { IMAGES } from '../data/images';

interface FlavorMenuProps {
  onSelectFlavor: (flavor: Flavor) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenFlightBuilder: () => void;
}

export const FlavorMenu: React.FC<FlavorMenuProps> = ({
  onSelectFlavor,
  onAddToCart,
  onOpenFlightBuilder,
}) => {
  const [activeCategory, setActiveCategory] = useState<FlavorCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dairyFreeOnly, setDairyFreeOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredFlavors = useMemo(() => {
    return FLAVORS.filter((flavor) => {
      // Category filter
      if (activeCategory !== 'all' && flavor.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (dairyFreeOnly && !flavor.dairyFree) {
        return false;
      }
      if (glutenFreeOnly && !flavor.glutenFree) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = flavor.name.toLowerCase().includes(query);
        const matchesDesc = flavor.description.toLowerCase().includes(query);
        const matchesIng = flavor.ingredients.some((i) => i.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesIng;
      }
      return true;
    });
  }, [activeCategory, dairyFreeOnly, glutenFreeOnly, searchQuery]);

  const handleQuickAdd = (flavor: Flavor) => {
    onAddToCart({
      id: `${flavor.id}-single-waffle-${Date.now()}`,
      type: 'scoop',
      title: `${flavor.name} (Single Scoop)`,
      subtitle: 'Vessel: Fresh Brown Butter Waffle Cone',
      vessel: 'Fresh Brown Butter Waffle Cone',
      flavors: [flavor.name],
      price: flavor.priceSingle + 1.25,
      quantity: 1,
    });

    setQuickAddedId(flavor.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1200);
  };

  return (
    <section id="flavors" className="py-16 sm:py-24 border-b border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
              <span>Daily Churn Board</span>
              <span aria-hidden="true">·</span>
              <span>Available for Dine-In & Pickup</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241F1A] mt-2 text-balance">
              Twelve handcrafted recipes churned at sunrise.
            </h2>
            <p className="text-base text-[#5C5046] mt-3">
              We never use pre-made base mixes or artificial food colorings. 
              Every batch is cured for 48 hours for rich body and delicate melt.
            </p>
          </div>

          {/* Quick link to Tasting Flight */}
          <div className="flex-shrink-0">
            <button
              onClick={onOpenFlightBuilder}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#241F1A] bg-[#EFE7D8] hover:bg-[#E5DBC8] transition-colors"
            >
              <span>Build a 4-Scoop Tasting Flight ($14)</span>
              <span className="text-[#9C4724]">→</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EFE7D8] rounded-xl overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-white text-[#241F1A] shadow-sm font-semibold'
                    : 'text-[#5C5046] hover:text-[#241F1A]'
                }`}
              >
                All Flavors (12)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('signature')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'signature'
                    ? 'bg-white text-[#241F1A] shadow-sm font-semibold'
                    : 'text-[#5C5046] hover:text-[#241F1A]'
                }`}
              >
                Signature Classics
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('seasonal')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'seasonal'
                    ? 'bg-white text-[#241F1A] shadow-sm font-semibold'
                    : 'text-[#5C5046] hover:text-[#241F1A]'
                }`}
              >
                Seasonal Micro-Churn
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('dairy-free')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'dairy-free'
                    ? 'bg-white text-[#241F1A] shadow-sm font-semibold'
                    : 'text-[#5C5046] hover:text-[#241F1A]'
                }`}
              >
                Dairy-Free & Sorbets
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('collab')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'collab'
                    ? 'bg-white text-[#241F1A] shadow-sm font-semibold'
                    : 'text-[#5C5046] hover:text-[#241F1A]'
                }`}
              >
                Atelier Collabs
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#8A7C70] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search flavors, pistachios, tea..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#DED4C5] rounded-xl text-[#241F1A] placeholder-[#8A7C70] focus:outline-none focus:border-[#B85D36]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7C70] hover:text-[#241F1A]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Dietary Checkbox Toggles */}
          <div className="flex items-center gap-6 text-xs text-[#5C5046]">
            <span className="font-semibold text-[#241F1A]">Dietary Preferences:</span>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dairyFreeOnly}
                onChange={(e) => setDairyFreeOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#B85D36] focus:ring-[#B85D36] border-[#DED4C5]"
              />
              <span>100% Plant-Based / Dairy-Free Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={glutenFreeOnly}
                onChange={(e) => setGlutenFreeOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#B85D36] focus:ring-[#B85D36] border-[#DED4C5]"
              />
              <span>Gluten-Free Recipes Only</span>
            </label>
          </div>
        </div>

        {/* Spotlighting Waffle Cone Bakery Card */}
        <div className="mb-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm">
          <div className="md:col-span-4 rounded-2xl overflow-hidden aspect-[4/3] bg-[#F5EFEB]">
            <img
              src={IMAGES.waffleCone}
              alt="Hand holding fresh golden waffle cone with double scoop of artisan ice cream"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
              <span>House Bakery Note</span>
              <span aria-hidden="true">·</span>
              <span>Rolled Every 20 Minutes</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#241F1A]">
              Baked with browned Normandy butter, cane sugar & sea salt.
            </h3>
            <p className="text-sm text-[#5C5046] leading-relaxed">
              We bake our cones on cast iron presses right behind the scoop counter. 
              The buttery caramel aroma fills the shop throughout the day. Select any scoop below 
              with our Fresh Brown Butter Waffle Cone for the quintessential parlor experience.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-[#6E6259]">
              <span>Hand-Rolled Freshness</span>
              <span aria-hidden="true">·</span>
              <span>+$1.25 with any scoop</span>
              <span aria-hidden="true">·</span>
              <span>Gluten-Free Rice Waffle Available Upon Request</span>
            </div>
          </div>
        </div>

        {/* Flavors Grid */}
        {filteredFlavors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DEC9] p-8">
            <p className="font-display text-xl font-bold text-[#241F1A]">No flavors match your criteria</p>
            <p className="text-sm text-[#6E6259] mt-2">Try adjusting your search terms or dietary filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDairyFreeOnly(false);
                setGlutenFreeOnly(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#B85D36] bg-[#FAF3EC] hover:bg-[#F3E7DC] rounded-full transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredFlavors.map((flavor) => {
              const isAdded = quickAddedId === flavor.id;

              return (
                <div
                  key={flavor.id}
                  className="bg-white rounded-3xl p-6 border border-[#E8DEC9] hover:border-[#D4C5AD] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Kicker & Visual Swatch */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-semibold text-[#9C4724]">
                        {flavor.kicker}
                      </div>

                      {/* Scoop Color Swatch */}
                      <div
                        className="w-7 h-7 rounded-full border border-black/15 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: flavor.colorHex }}
                        title={`Color profile: ${flavor.name}`}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-white/50 blur-[1px]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-[#241F1A] group-hover:text-[#B85D36] transition-colors">
                      {flavor.name}
                    </h3>

                    {/* Clean unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#6E6259] mt-1.5 mb-3">
                      <span>{flavor.intensity}</span>
                      <span aria-hidden="true">·</span>
                      <span>{flavor.dairyFree ? 'Plant-Based' : 'Pasture Milk'}</span>
                      {flavor.glutenFree && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>GF</span>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#5C5046] leading-relaxed line-clamp-3 mb-4">
                      {flavor.description}
                    </p>

                    {/* Ingredients list as clean inline text */}
                    <div className="text-xs text-[#8A7C70] mb-4">
                      <span className="font-medium text-[#5C5046]">Notes: </span>
                      {flavor.ingredients.join(' · ')}
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-4 border-t border-[#F2EBDE] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#8A7C70]">Single Scoop</div>
                      <div className="text-base font-bold font-display text-[#241F1A] tabular-nums">
                        ${flavor.priceSingle.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectFlavor(flavor)}
                        className="px-3.5 py-2 text-xs font-semibold text-[#5C5046] hover:text-[#241F1A] hover:bg-[#FAF3EC] rounded-xl transition-colors border border-[#E8DEC9]"
                        aria-label={`View flavor details for ${flavor.name}`}
                      >
                        Details
                      </button>

                      <button
                        onClick={() => handleQuickAdd(flavor)}
                        disabled={isAdded}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all shadow-sm ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#241F1A] hover:bg-[#3D332B] text-white'
                        }`}
                        aria-label={`Quick add single scoop of ${flavor.name} in waffle cone`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Cone</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
