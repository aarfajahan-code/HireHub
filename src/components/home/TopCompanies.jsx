import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle2, Star, ArrowUpRight } from 'lucide-react';
import { companies } from '../../data/companiesData';

export default function TopCompanies() {
  return (
    <section id="companies" className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Trusted Employers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-['Plus_Jakarta_Sans']">
            Work with World-Class Teams
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
            Leading product companies actively hiring interns and entry-level talent on HireHub.
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-card hover:border-indigo-200 dark:hover:border-slate-700 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Logo and Badges */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                          {company.name}
                        </h3>
                        {company.verified && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100 dark:fill-indigo-950 shrink-0" title="Verified Employer" />
                        )}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {company.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-semibold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{company.rating}</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {company.tagline}
                </p>
              </div>

              {/* Bottom footer of card */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{company.openPositions}</span> Open Positions
                </span>

                <Link
                  to={`/jobs?company=${company.name}`}
                  className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 group-hover:underline"
                >
                  <span>View jobs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
