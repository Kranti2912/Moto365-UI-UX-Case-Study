import React from 'react';

/**
 * Geometric Faceted Spark / Star Emblem matching the official Moto365 brand system.
 */
export const MotoSparkEmblem: React.FC<{
  className?: string;
  fillColor?: string;
  isOutlined?: boolean;
}> = ({ className = 'w-9 h-7', fillColor = 'currentColor', isOutlined = false }) => {
  if (isOutlined) {
    return (
      <svg
        viewBox="0 0 100 80"
        className={className}
        fill="none"
        stroke={fillColor}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M50 4 L64 26 L94 28 L72 48 L78 76 L50 60 L22 76 L28 48 L6 28 L36 26 Z" />
        <path d="M50 16 L59 32 L78 34 L64 48 L68 66 L50 54 L32 66 L36 48 L22 34 L41 32 Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dynamic Faceted Angled Star Polygon */}
      <path
        d="M50 2 L63 25 L92 27 L70 48 L76 77 L50 61 L24 77 L30 48 L8 27 L37 25 Z"
        fill={fillColor}
      />
      {/* Inner facet cut */}
      <path
        d="M50 15 L58 32 L78 34 L63 48 L67 67 L50 55 L33 67 L37 48 L22 34 L42 32 Z"
        fill="#FFFFFF"
        opacity="0.22"
      />
    </svg>
  );
};

export const Moto365Wordmark: React.FC<{
  className?: string;
  textColor?: string;
  emblemColor?: string;
}> = ({
  className = 'flex items-center gap-2.5',
  textColor = 'text-zinc-950',
  emblemColor = '#000000',
}) => {
  return (
    <div className={className}>
      <MotoSparkEmblem className="w-8 h-6" fillColor={emblemColor} />
      <span className={`text-2xl font-extrabold tracking-tight ${textColor} font-sans`}>
        moto<span className="font-bold">365</span>
      </span>
    </div>
  );
};

export const SubBrandLockup: React.FC<{
  brand: 'club' | 'inspektai' | 'motodoc' | 'akademie';
  className?: string;
  dark?: boolean;
}> = ({ brand, className = '', dark = false }) => {
  const textColor = dark ? 'text-white' : 'text-zinc-950';
  const subtextColor = dark ? 'text-zinc-400' : 'text-zinc-500';
  const emblemColor = dark ? '#FFFFFF' : '#000000';

  if (brand === 'club') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <MotoSparkEmblem className="w-8 h-6" fillColor={emblemColor} />
        <span className={`text-xl sm:text-2xl font-bold tracking-tight ${textColor}`}>
          moto365<span className="font-normal text-zinc-400">.club</span>
        </span>
      </div>
    );
  }

  const brandNames = {
    inspektai: 'InspektAI',
    motodoc: 'Motodoc',
    akademie: 'Akademie',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <MotoSparkEmblem className="w-8 h-6 shrink-0" fillColor={emblemColor} />
      <div className="flex flex-col">
        <span className={`text-xl sm:text-2xl font-bold tracking-tight leading-none ${textColor}`}>
          {brandNames[brand]}
        </span>
        <span className={`text-[10px] uppercase tracking-wider font-semibold ${subtextColor} mt-1`}>
          by moto 365
        </span>
      </div>
    </div>
  );
};

/**
 * Giant Outlined Moto365 Watermark spanning across the footer bottom
 */
export const FooterWatermarkLogo: React.FC = () => {
  return (
    <div className="w-full overflow-hidden opacity-10 pointer-events-none select-none py-4">
      <div className="flex items-center gap-6 whitespace-nowrap">
        <MotoSparkEmblem
          className="w-48 h-36 shrink-0"
          fillColor="#FFFFFF"
          isOutlined={true}
        />
        <span
          className="text-[120px] sm:text-[180px] font-extrabold tracking-tighter text-transparent stroke-white"
          style={{
            WebkitTextStroke: '2px rgba(255,255,255,0.7)',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
        >
          moto 365
        </span>
      </div>
    </div>
  );
};
