import React from 'react';
import { Filter, RotateCcw, DollarSign, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { categories } from '../../data/categoriesData';

export default function JobFilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) {
  const activeCount = Object.values(filters).filter((val) => val && val !== 'all' && val !== '').length;

  return (
    <aside className="w-full lg:w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-6 shadow-sm shrink-0">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
            Filters
          </h3>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Filter 1: Opportunity Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          Opportunity Type
        </label>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Types' },
            { id: 'Internship', label: 'Internships Only' },
            { id: 'Full-time', label: 'Full-time Jobs' }
          ].map((type) => (
            <label
              key={type.id}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 py-1"
            >
              <input
                type="radio"
                name="type"
                checked={filters.type === type.id}
                onChange={() => onFilterChange('type', type.id)}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded border-slate-300 dark:border-slate-700"
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter 2: Workplace Arrangement */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          Work Mode
        </label>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'Any Mode' },
            { id: 'Remote', label: 'Remote / Anywhere' },
            { id: 'Hybrid', label: 'Hybrid' },
            { id: 'On-site', label: 'On-site / In-office' }
          ].map((mode) => (
            <label
              key={mode.id}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 py-1"
            >
              <input
                type="radio"
                name="workplace"
                checked={filters.workplace === mode.id}
                onChange={() => onFilterChange('workplace', mode.id)}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded border-slate-300 dark:border-slate-700"
              />
              <span>{mode.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter 3: Experience Level */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          Experience Level
        </label>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Levels' },
            { id: 'Fresher / Student', label: 'Fresher / Student' },
            { id: 'Entry Level (0-1 yrs)', label: 'Entry Level (0-1 yrs)' },
            { id: 'Mid Level (1-3 yrs)', label: 'Mid Level (1-3 yrs)' }
          ].map((level) => (
            <label
              key={level.id}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 py-1"
            >
              <input
                type="radio"
                name="experience"
                checked={filters.experience === level.id}
                onChange={() => onFilterChange('experience', level.id)}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded border-slate-300 dark:border-slate-700"
              />
              <span>{level.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter 4: Category */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          Specialization / Domain
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Domains</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filter 5: Minimum Stipend / Salary */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          Minimum Monthly Stipend
        </label>
        <select
          value={filters.minSalary}
          onChange={(e) => onFilterChange('minSalary', e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Any Stipend / Salary</option>
          <option value="30000">₹30,000+ / mo</option>
          <option value="40000">₹40,000+ / mo</option>
          <option value="50000">₹50,000+ / mo</option>
        </select>
      </div>

      {/* Active Results Summary in sidebar */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-900 dark:text-white">{totalResults}</span> matching opportunities
        </p>
      </div>

    </aside>
  );
}
