import React from 'react';
import { Milk, Sparkles, Flame, Clock } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="craft" className="py-16 sm:py-24 border-b border-[#E8DEC9] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C4724]">
            <span>Farm Sourcing & Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Since 2018</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241F1A] mt-2 text-balance">
            The alchemy of exceptional pasture cream and slow copper heat.
          </h2>
          <p className="text-base sm:text-lg text-[#5C5046] mt-4 leading-relaxed">
            Most modern ice cream relies on powdered bases, carrageenan binders, and rapid freezing. 
            We do the exact opposite. We work directly with single-herd dairy farmers in Sonoma County 
            and slow-churn in small Italian batch freezers.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white rounded-3xl p-7 border border-[#E8DEC9] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EFEB] flex items-center justify-center text-[#B85D36]">
              <Milk className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#241F1A]">
              18.5% Pasture Butterfat
            </h3>
            <p className="text-sm text-[#5C5046] leading-relaxed">
              We source solely from pasture-raised Jersey cows grazing on coastal clover and rye grasses. 
              Their higher butterfat content yields an unmatched density and clean, velvety mouthfeel without 
              gum stabilizers.
            </p>
            <div className="pt-2 text-xs text-[#8A7C70] border-t border-[#F2EBDE]">
              Partner Dairy: Green Gulch Pastures, Sonoma, CA
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#E8DEC9] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EFEB] flex items-center justify-center text-[#B85D36]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#241F1A]">
              48-Hour Cold Aging
            </h3>
            <p className="text-sm text-[#5C5046] leading-relaxed">
              After pasteurization, our custard bases rest undisturbed for two days in refrigerated aging vats. 
              This permits whole botanical infusions — like Madagascar vanilla pods and roasted tea leaves — 
              to fully bloom into the fat molecules.
            </p>
            <div className="pt-2 text-xs text-[#8A7C70] border-t border-[#F2EBDE]">
              Precision temperature cure at 38°F
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#E8DEC9] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EFEB] flex items-center justify-center text-[#B85D36]">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#241F1A]">
              Open Copper Kettles
            </h3>
            <p className="text-sm text-[#5C5046] leading-relaxed">
              All caramels, fudges, fruit coulis, and honeycomb brittles are boiled from scratch in solid copper cauldrons. 
              Copper conducts even heat, giving our Brittany salted caramel its deep toasted nuance.
            </p>
            <div className="pt-2 text-xs text-[#8A7C70] border-t border-[#F2EBDE]">
              Boiled fresh every single morning
            </div>
          </div>

        </div>

        {/* Editorial Press Attributions */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DEC9]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E8DEC9]">
            <div className="space-y-3 pr-0 md:pr-8">
              <p className="font-display italic text-lg sm:text-xl text-[#241F1A] leading-relaxed">
                “The Bronte pistachio gelato is the purest translation of Sicilian terroir I’ve tasted outside of Catania. 
                Dense, mineral-sweet, and completely uncompromised.”
              </p>
              <div className="text-xs text-[#6E6259]">
                <span className="font-bold text-[#241F1A]">Elena Vance</span>
                <span aria-hidden="true"> · </span>
                <span>Culinary Critic, Pacific Dining Review</span>
              </div>
            </div>

            <div className="space-y-3 pt-6 md:pt-0 md:pl-8">
              <p className="font-display italic text-lg sm:text-xl text-[#241F1A] leading-relaxed">
                “Crema & Co. approaches ice cream like a fine pastry atelier. Their house-rolled brown butter waffle cones 
                deserve an architectural award of their own.”
              </p>
              <div className="text-xs text-[#6E6259]">
                <span className="font-bold text-[#241F1A]">Marcus Chen</span>
                <span aria-hidden="true"> · </span>
                <span>Editor, Bay Craft & Table</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
