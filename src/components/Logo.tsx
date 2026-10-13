import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  imageSrc?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  imageSrc = '/assets/icons/icon-512.png',
}) => {
  const [imageError, setImageError] = useState(false);

  const containerSizes = {
    sm: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl',
    md: 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl',
    lg: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl',
  };

  const textSizes = {
    sm: 'text-lg sm:text-xl tracking-tight',
    md: 'text-xl sm:text-2xl tracking-tight',
    lg: 'text-2xl sm:text-3xl tracking-tight',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Square slightly-curved container with exact brand theme background & full-zoom image */}
      <div
        className={`relative flex items-center justify-center ${containerSizes[size]} bg-[#0494f4] shadow-sm shadow-[#0494f4]/25 shrink-0 overflow-hidden transition-transform duration-150 hover:scale-105 p-0`}
      >
        {!imageError && imageSrc ? (
          <img
            src={imageSrc}
            alt={COMPANY_INFO.name}
            referrerPolicy="no-referrer"
            onError={() => {
              // Try fallback to png before showing vector
              if (imageSrc !== '/assets/icons/icon-512.png') {
                // If the image had an issue, fallback to the canonical png
                const img = new Image();
                img.src = '/assets/icons/icon-512.png';
                img.onload = () => setImageError(false);
                img.onerror = () => setImageError(true);
              } else {
                setImageError(true);
              }
            }}
            className="w-full h-full object-cover block"
          />
        ) : (
          /* High-fidelity Vector fallback rendered inside square curved container */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="42" fill="#0a192f" stroke="#ffffff" strokeWidth="1.5" />
            <path
              d="M 60 25 A 28 28 0 1 0 78 58 L 56 58 L 56 50 L 68 50 A 18 18 0 1 1 56 32 Z"
              fill="#ffffff"
            />
            <path d="M 52 42 L 64 42 L 72 50 L 64 58 L 52 58 L 60 50 Z" fill="#0494f4" />
            <circle cx="50" cy="50" r="5" fill="#0494f4" />
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className={`font-black leading-none flex items-center gap-1.5 uppercase font-sans ${textSizes[size]}`}>
            <span className="text-zinc-950 dark:text-white transition-colors font-black tracking-tight">
              GOTHWAD
            </span>
            <span className="text-[#0494f4] font-black tracking-tight">
              TECH
            </span>
          </div>
        </div>
      )}
    </div>
  );
};


