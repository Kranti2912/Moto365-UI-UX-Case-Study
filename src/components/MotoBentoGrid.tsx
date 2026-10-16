import React from 'react';
import { motion } from 'motion/react';
import { LIVE_PRODUCTS } from '../data/caseStudyData';

export const MotoBentoGrid: React.FC<{
  onSelectProduct?: (productId: string) => void;
  activeProductId?: string;
}> = ({ onSelectProduct, activeProductId }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {LIVE_PRODUCTS.map((prod, idx) => {
        const isActive = activeProductId === prod.id;
        return (
          <motion.button
            key={prod.id}
            type="button"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (onSelectProduct) onSelectProduct(prod.id);
              const target = document.getElementById(prod.id);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`bento-card-dark rounded-[26px] p-6 text-left flex flex-col justify-between h-[360px] relative overflow-hidden group cursor-pointer ${
              isActive ? 'ring-2 ring-white/40' : ''
            }`}
          >
            {/* Top Text Hierarchy */}
            <div className="z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {prod.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {prod.tagline}
              </p>
            </div>

            {/* Bottom Fluid Wave / Geometric Ribbon Graphic in signature product color */}
            <div className="w-full h-40 relative flex items-end justify-center overflow-hidden rounded-b-2xl mt-4">
              {prod.brandKey === 'club' && (
                /* Electric Neon Yellow Waves */
                <svg
                  viewBox="0 0 200 160"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                >
                  <path
                    d="M20 150 C 20 60, 60 40, 60 90 C 60 140, 100 140, 100 70 C 100 20, 140 20, 140 80 C 140 140, 180 140, 180 50"
                    stroke="#E6FF00"
                    strokeWidth="34"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35 150 C 35 75, 75 55, 75 105 C 75 155, 115 155, 115 85 C 115 35, 155 35, 155 95"
                    stroke="#111111"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {prod.brandKey === 'inspektai' && (
                /* Fiery Lava Orange Organic Cellular Waves */
                <svg
                  viewBox="0 0 200 160"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                >
                  <path
                    d="M10 80 Q 50 10, 100 80 T 190 80"
                    stroke="#FF4D15"
                    strokeWidth="32"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 140 C 40 90, 80 160, 120 110 C 160 60, 180 120, 190 150"
                    stroke="#FF4D15"
                    strokeWidth="28"
                    strokeLinecap="round"
                  />
                  <circle cx="65" cy="55" r="14" fill="#FF4D15" />
                  <circle cx="145" cy="115" r="16" fill="#FF4D15" />
                </svg>
              )}

              {prod.brandKey === 'motodoc' && (
                /* Hot Crimson / Magenta Concentric Swirls */
                <svg
                  viewBox="0 0 200 160"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                >
                  <path
                    d="M180 150 A 70 70 0 0 0 40 150"
                    stroke="#FF0055"
                    strokeWidth="32"
                    strokeLinecap="round"
                  />
                  <path
                    d="M150 150 A 45 45 0 0 0 80 150"
                    stroke="#FF0055"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="50" r="28" fill="#FF0055" />
                </svg>
              )}

              {prod.brandKey === 'akademie' && (
                /* Electric Royal Purple Arched Waves */
                <svg
                  viewBox="0 0 200 160"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                >
                  <path
                    d="M30 150 L 30 60 C 30 20, 90 20, 90 70 L 90 150"
                    stroke="#5B45FF"
                    strokeWidth="30"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M110 150 L 110 70 C 110 30, 170 30, 170 80 L 170 150"
                    stroke="#5B45FF"
                    strokeWidth="30"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* Subtle Hover Action Footer */}
            <div className="z-10 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400 font-mono-tabular">
              <span>EXPLORE PILLAR</span>
              <span className="text-white group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
