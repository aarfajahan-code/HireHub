import React from 'react';
import { platformStats } from '../../data/companiesData';

export default function StatsSection() {
  return (
    <section className="py-14 bg-gradient-to-br from-indigo-900 via-slate-900 to-navy-950 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {platformStats.map((stat, idx) => (
            <div key={idx} className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 font-['Plus_Jakarta_Sans']">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base font-semibold text-white/90 mt-2">
                {stat.label}
              </p>
              <p className="text-xs text-indigo-300/80 mt-1">
                {stat.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
