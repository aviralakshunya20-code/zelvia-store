'use client';

import React from 'react';

export function HomeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Chimney */}
      <rect x="42" y="16" width="6" height="12" fill="#64748b" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
      <ellipse cx="45" cy="12" rx="3" ry="1.5" fill="#cbd5e1" opacity="0.6" />
      {/* House Body */}
      <rect x="15" y="27" width="34" height="26" rx="2" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
      {/* Roof */}
      <polygon points="32,10 9,28 55,28" fill="#f43f5e" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
      {/* Door */}
      <path d="M21 53 V38 Q21 37 22 37 H28 Q29 37 29 38 V53 Z" fill="#b45309" stroke="#0f172a" strokeWidth="2.2" />
      <circle cx="27" cy="46" r="1.2" fill="#fef08a" />
      {/* Window */}
      <rect x="34" y="36" width="11" height="11" rx="1.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.2" />
      <line x1="39.5" y1="36" x2="39.5" y2="47" stroke="#0f172a" strokeWidth="1.8" />
      <line x1="34" y1="41.5" x2="45" y2="41.5" stroke="#0f172a" strokeWidth="1.8" />
      {/* Green grass ground */}
      <rect x="12" y="53" width="40" height="3" rx="1.5" fill="#22c55e" stroke="#0f172a" strokeWidth="1.8" />
    </svg>
  );
}

export function ElectronicsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Refrigerator on right */}
      <rect x="33" y="12" width="18" height="42" rx="2" fill="#fb7185" stroke="#0f172a" strokeWidth="2.2" />
      <line x1="33" y1="26" x2="51" y2="26" stroke="#0f172a" strokeWidth="2.2" />
      <rect x="36" y="17" width="2" height="5" rx="1" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
      <rect x="36" y="30" width="2" height="7" rx="1" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
      {/* Microwave on top left */}
      <rect x="13" y="16" width="17" height="13" rx="1.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.2" />
      <rect x="15" y="18" width="9" height="9" rx="1" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
      <circle cx="27" cy="21" r="1.2" fill="#0f172a" />
      <circle cx="27" cy="25" r="1.2" fill="#0f172a" />
      {/* Washing machine on bottom left */}
      <rect x="13" y="31" width="17" height="23" rx="2" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.2" />
      <circle cx="21.5" cy="43.5" r="6" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
      <circle cx="21.5" cy="43.5" r="3.5" fill="#93c5fd" />
      <circle cx="16" cy="34" r="1" fill="#0f172a" />
      <circle cx="19" cy="34" r="1" fill="#0f172a" />
    </svg>
  );
}

export function BabyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Baby Bib in center */}
      <path d="M22 17 C26 12 38 12 42 17 C46 22 47 34 40 40 C34 45 30 45 24 40 C17 34 18 22 22 17 Z" fill="#fed7aa" stroke="#0f172a" strokeWidth="2.2" />
      <path d="M27 16 C30 19 34 19 37 16" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="32" cy="28" r="3" fill="#f43f5e" />
      {/* Milk bottle on right */}
      <rect x="38" y="24" width="12" height="25" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />
      <rect x="40" y="20" width="8" height="4" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.8" />
      <path d="M42 20 Q44 14 46 20 Z" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.8" />
      <line x1="41" y1="32" x2="47" y2="32" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="41" y1="37" x2="45" y2="37" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pacifier on left */}
      <circle cx="18" cy="42" r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
      <circle cx="18" cy="42" r="2" fill="#ffffff" />
      <path d="M14 42 Q10 42 10 46 Q10 50 14 50" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function FashionIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Dress */}
      <path d="M20 18 Q27 21 34 18 L32 25 L38 46 Q27 49 16 46 L22 25 Z" fill="#93c5fd" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
      {/* Belt */}
      <line x1="22" y1="26" x2="32" y2="26" stroke="#f43f5e" strokeWidth="2.5" />
      {/* High Heel */}
      <path d="M33 46 Q37 43 45 46 Q47 48 48 49 L46 53 L38 53 L37 49 L34 53 L32 53 Z" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
      {/* Diamond on top right */}
      <polygon points="44,14 52,14 55,18 48,25 41,18" fill="#e0f2fe" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
      <line x1="41" y1="18" x2="55" y2="18" stroke="#0f172a" strokeWidth="1.5" />
      <line x1="48" y1="14" x2="48" y2="25" stroke="#0f172a" strokeWidth="1.5" />
    </svg>
  );
}

export function ShoesIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Sparkles */}
      <path d="M20 15 L22 19 L26 21 L22 23 L20 27 L18 23 L14 21 L18 19 Z" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" />
      <circle cx="48" cy="18" r="1.5" fill="#22c55e" />
      {/* Sneaker */}
      <path
        d="M14 36 L24 22 Q29 20 33 26 L38 31 Q47 31 53 38 L54 44 L14 44 Z"
        fill="#f43f5e"
        stroke="#0f172a"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Blue toe & details */}
      <path d="M43 32 Q49 32 54 39 L54 44 L40 44 Z" fill="#3b82f6" stroke="#0f172a" strokeWidth="1.8" />
      {/* Sole */}
      <rect x="13" y="44" width="42" height="6" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />
      <line x1="16" y1="47" x2="52" y2="47" stroke="#cbd5e1" strokeWidth="1.8" />
      {/* Laces */}
      <line x1="28" y1="28" x2="33" y2="33" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="31" y1="26" x2="36" y2="31" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GroceryIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Wine Bottle */}
      <rect x="33" y="12" width="7" height="18" rx="1.5" fill="#881337" stroke="#0f172a" strokeWidth="2" />
      <rect x="35" y="8" width="3" height="4" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" />
      {/* Carrot */}
      <path d="M19 16 L23 26 L17 26 Z" fill="#f97316" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
      <path d="M21 16 Q20 11 18 13 M21 16 Q23 11 25 13" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      {/* Jar */}
      <rect x="42" y="19" width="8" height="11" rx="1.5" fill="#e0f2fe" stroke="#0f172a" strokeWidth="2" />
      <rect x="43" y="16" width="6" height="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
      {/* Basket */}
      <path d="M12 28 L15 50 H49 L52 28 Z" fill="#fef08a" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
      {/* Basket Rim */}
      <rect x="10" y="26" width="44" height="4" rx="1.5" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
      {/* Basket slats */}
      <line x1="22" y1="33" x2="24" y2="47" stroke="#0f172a" strokeWidth="1.8" />
      <line x1="32" y1="33" x2="32" y2="47" stroke="#0f172a" strokeWidth="1.8" />
      <line x1="42" y1="33" x2="40" y2="47" stroke="#0f172a" strokeWidth="1.8" />
    </svg>
  );
}

export function BeautyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Compact mirror */}
      <circle cx="24" cy="40" r="12" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.2" />
      <circle cx="24" cy="40" r="7.5" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.8" />
      {/* Lipstick */}
      <rect x="36" y="32" width="8" height="18" rx="1.5" fill="#facc15" stroke="#0f172a" strokeWidth="2" />
      <path d="M38 32 L38 23 Q40 20 42 22 L42 32 Z" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
      {/* Makeup Brush */}
      <path d="M47 16 C45 22 47 28 47 28 L51 28 C51 28 53 22 51 16 Z" fill="#fed7aa" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
      <rect x="48" y="28" width="2" height="20" rx="1" fill="#0f172a" />
      {/* Sparkles */}
      <path d="M31 16 L32 19 L35 20 L32 21 L31 24 L30 21 L27 20 L30 19 Z" fill="#fbbf24" stroke="#0f172a" strokeWidth="1" />
    </svg>
  );
}

export function FragranceIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Spray droplets */}
      <circle cx="18" cy="18" r="1.5" fill="#38bdf8" />
      <circle cx="22" cy="14" r="1.5" fill="#38bdf8" />
      <circle cx="25" cy="19" r="1.5" fill="#38bdf8" />
      {/* Atomizer pump nozzle */}
      <path d="M29 25 L24 23 L24 20 L32 20 L32 25" fill="#facc15" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
      <rect x="30" y="25" width="8" height="5" rx="1" fill="#facc15" stroke="#0f172a" strokeWidth="2" />
      {/* Perfume bottle body */}
      <path
        d="M22 35 C18 42 20 54 34 54 C48 54 50 42 46 35 C43 30 38 30 34 30 C30 30 25 30 22 35 Z"
        fill="#38bdf8"
        stroke="#0f172a"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Pink liquid fill */}
      <path
        d="M22 41 C20 47 23 54 34 54 C45 54 48 47 46 41 Z"
        fill="#f43f5e"
        stroke="#0f172a"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function JewelleryIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Gold Ring */}
      <ellipse cx="40" cy="38" rx="10" ry="12" fill="none" stroke="#f59e0b" strokeWidth="3.2" />
      <ellipse cx="40" cy="38" rx="7.5" ry="9" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
      {/* Big Diamond */}
      <polygon
        points="22,25 32,25 36,31 27,45 18,31"
        fill="#e0f2fe"
        stroke="#0f172a"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Diamond facets */}
      <line x1="18" y1="31" x2="36" y2="31" stroke="#0f172a" strokeWidth="1.8" />
      <line x1="22" y1="25" x2="27" y2="45" stroke="#0f172a" strokeWidth="1.8" />
      <line x1="32" y1="25" x2="27" y2="45" stroke="#0f172a" strokeWidth="1.8" />
      {/* Sparkle rays */}
      <line x1="17" y1="21" x2="14" y2="18" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="18" x2="27" y2="14" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <line x1="37" y1="21" x2="40" y2="18" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SportsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Basketball on top left */}
      <circle cx="24" cy="24" r="11" fill="#f97316" stroke="#0f172a" strokeWidth="2.2" />
      <path d="M13 24 H35 M24 13 V35" stroke="#0f172a" strokeWidth="1.8" />
      <path d="M16 16 Q24 24 16 32 M32 16 Q24 24 32 32" stroke="#0f172a" strokeWidth="1.8" />
      {/* Soccer ball on top right */}
      <circle cx="43" cy="26" r="9" fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />
      <polygon points="43,22 46,25 45,29 41,29 40,25" fill="#0f172a" />
      {/* American football on bottom */}
      <ellipse cx="32" cy="44" rx="14" ry="8" fill="#b45309" stroke="#0f172a" strokeWidth="2.2" />
      <line x1="20" y1="44" x2="44" y2="44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="41" x2="28" y2="47" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="32" y1="41" x2="32" y2="47" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="36" y1="41" x2="36" y2="47" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function WebAppsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Laptop */}
      <rect x="15" y="16" width="34" height="23" rx="3" fill="#3b82f6" stroke="#0f172a" strokeWidth="2.2" />
      <rect x="18" y="19" width="28" height="17" rx="1.5" fill="#ffffff" />
      {/* Code signs */}
      <path d="M23 27 L20 28 L23 29 M27 27 L30 28 L27 29" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="25" y1="26" x2="24" y2="30" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Base */}
      <path d="M10 40 H54 L51 46 H13 Z" fill="#94a3b8" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="28" y="41" width="8" height="2" rx="1" fill="#ffffff" />
    </svg>
  );
}

export function RocketIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
      {/* Flames */}
      <path d="M24 43 Q21 54 28 50 Q32 57 36 50 Q43 54 40 43 Z" fill="#facc15" stroke="#0f172a" strokeWidth="1.8" />
      <path d="M27 44 Q28 50 32 48 Q36 50 37 44 Z" fill="#f43f5e" />
      {/* Rocket Body */}
      <path
        d="M32 10 Q42 22 42 38 L22 38 Q22 22 32 10 Z"
        fill="#f8fafc"
        stroke="#0f172a"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Window */}
      <circle cx="32" cy="24" r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
      <circle cx="33" cy="23" r="1.8" fill="#ffffff" />
      {/* Fins */}
      <polygon points="22,32 14,40 22,40" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="42,32 50,40 42,40" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
