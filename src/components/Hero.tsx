import React from 'react';
import { ArrowRight, Sparkles, Clock, MapPin } from 'lucide-react';
import { IMAGES } from '../data/images';

interface HeroProps {
  onExploreFlavors: () => void;
  onOpenSundaeBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreFlavors, onOpenSundaeBuilder }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Clean unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9C4724]">
              <span>Small-Batch Creamery</span>
              <span aria-hidden="true">·</span>
              <span>San Francisco & Sonoma</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2018</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#241F1A] leading-[1.12] text-balance">
              Churned slow. <br />
              Crafted with pure pasture cream & wild botanicals.
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#5C5046] leading-relaxed max-w-xl">
              Every scoop begins with single-farm Jersey milk and whole heirloom ingredients. 
              From Bronte pistachios to copper-kettle salted caramels, churned fresh each morning 
              without emulsifiers or artificial extracts.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreFlavors}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-[#B85D36] hover:bg-[#9E4C27] rounded-full transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B85D36]"
              >
                <span>Explore Today’s Churn</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSundaeBuilder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#241F1A] bg-white border border-[#DED4C5] hover:border-[#241F1A] hover:bg-[#FDFBF7] rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#241F1A]"
              >
                <span>Build a Custom Sundae</span>
              </button>
            </div>

            {/* Trust Markers - clean unboxed typography */}
            <div className="pt-6 border-t border-[#E8DEC9] grid grid-cols-3 gap-4 text-xs text-[#6E6259]">
              <div>
                <p className="font-semibold text-sm text-[#241F1A] tabular-nums">100%</p>
                <p className="mt-0.5">Grass-Fed Jersey Cream</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#241F1A] tabular-nums">7:00 AM</p>
                <p className="mt-0.5">Daily Morning Churn</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#241F1A] tabular-nums">0 Gums</p>
                <p className="mt-0.5">Zero Artificial Binders</p>
              </div>
            </div>

          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-[#EBE3D7]">
              <img
                src={IMAGES.hero}
                alt="Artisanal scoops of gourmet pistachio and wild berry ice cream served in a handcrafted ceramic bowl with waffle crisps"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Quiet overlay label */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#FAF7F2]/90 backdrop-blur-md rounded-2xl border border-white/40 flex items-center justify-between text-xs">
                <div>
                  <p className="font-display font-bold text-sm text-[#241F1A]">Today's Feature: Bronte Pistachio & Salted Caramel</p>
                  <p className="text-[#6E6259] mt-0.5">Freshly rolled brown butter waffle crisps · Churned 3 hours ago</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[#9C4724] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#9C4724] animate-pulse"></span>
                  <span>Fresh Batch</span>
                </div>
              </div>
            </div>

            {/* Decorative subtle floating accent */}
            <div className="absolute -top-4 -right-4 -z-10 w-48 h-48 bg-[#EFE3CF] rounded-full filter blur-3xl opacity-70 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
