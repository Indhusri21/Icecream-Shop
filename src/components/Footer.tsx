import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-[#241F1A] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3D332B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3D332B]">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Crema & Co.
            </span>
            <p className="text-xs text-[#B8AFA6] leading-relaxed max-w-sm">
              Artisanal small-batch creamery rooted in slow European churn traditions. 
              Single-farm pasture cream, stone-ground botanicals, and hand-rolled waffle cones 
              baked all day long.
            </p>
            <div className="text-xs text-[#8A7C70] space-y-1">
              <p>Downtown Flagship: 428 Heritage Blvd, Suite 100</p>
              <p>Riverfront Parlor: 12 Pierpoint Promenade, Pavilion 3</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#DCD5CB]">
              Menu & Parlor
            </p>
            <ul className="space-y-2 text-xs text-[#B8AFA6]">
              <li>
                <a href="#flavors" className="hover:text-white transition-colors">Daily Churn Board</a>
              </li>
              <li>
                <a href="#sundae-builder" className="hover:text-white transition-colors">Custom Sundaes</a>
              </li>
              <li>
                <a href="#tasting-flight" className="hover:text-white transition-colors">4-Scoop Flight</a>
              </li>
              <li>
                <a href="#pints" className="hover:text-white transition-colors">Freezer Pints & Boxes</a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">Parlor Hours</a>
              </li>
            </ul>
          </div>

          {/* Farm & Craft */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#DCD5CB]">
              Sourcing & Craft
            </p>
            <ul className="space-y-2 text-xs text-[#B8AFA6]">
              <li>
                <a href="#craft" className="hover:text-white transition-colors">Pasture Dairy Partners</a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">Bronte Pistachio Trade</a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">Copper Cauldron Cooking</a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">Catering & Mobile Cart</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Scoop Alert */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#DCD5CB]">
              The Secret Scoop Dispatch
            </p>
            <p className="text-xs text-[#B8AFA6] leading-relaxed">
              Receive early invitations when limited seasonal drops release (such as our Black Truffle Honey or Marionberry Cobbler).
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#382E26] rounded-xl text-xs text-emerald-400 border border-emerald-900">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>You’re on the Secret Scoop list! Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs bg-[#2E2822] border border-[#4A3F35] rounded-xl text-white placeholder-[#8A7C70] focus:outline-none focus:border-[#B85D36]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#B85D36] hover:bg-[#9E4C27] rounded-xl transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7C70] gap-4">
          <p>© {new Date().getFullYear()} Crema & Co. Artisanal Creamery. Handcrafted with pride.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Allergen Notice: Nut & Dairy Shared Facility</span>
            <span aria-hidden="true">·</span>
            <span>Compostable Packaging Only</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
