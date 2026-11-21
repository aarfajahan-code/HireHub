import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, ArrowRight, Sparkles, Building2, ShieldCheck, Star } from 'lucide-react';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [jobType, setJobType] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append('q', searchTerm.trim());
    if (locationTerm.trim()) params.append('location', locationTerm.trim());
    if (jobType !== 'All') params.append('type', jobType);
    navigate(`/jobs?${params.toString()}`);
  };

  const handleQuickTag = (tag) => {
    navigate(`/jobs?q=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background radial gradient decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 shadow-sm mb-6 hover:border-indigo-200 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>HireHub 2026 Season: 3,500+ Verified Summer Internships & Tech Roles</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15] font-['Plus_Jakarta_Sans']">
          Find Your Dream{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Internship or Job
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The verified talent portal for ambitious students and new graduates. Direct applications, transparent stipends, and zero spam recruiters.
        </p>

        {/* High-Converting Search Bar Card */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-center gap-2 sm:gap-3"
          >
            {/* Input 1: Keyword */}
            <div className="flex items-center gap-2.5 px-3 py-2 w-full md:flex-1 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-indigo-500 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, skills, or company..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Input 2: Location */}
            <div className="flex items-center gap-2.5 px-3 py-2 w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
              <MapPin className="w-5 h-5 text-purple-500 shrink-0" />
              <input
                type="text"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                placeholder="Location (e.g. Remote)"
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Select 3: Job Type */}
            <div className="flex items-center gap-2 px-3 py-2 w-full md:w-44">
              <Briefcase className="w-5 h-5 text-slate-400 shrink-0" />
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                aria-label="Select opportunity type"
                className="w-full bg-transparent text-sm text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
              >
                <option value="All" className="dark:bg-slate-900">All Types</option>
                <option value="Internship" className="dark:bg-slate-900">Internship Only</option>
                <option value="Full-time" className="dark:bg-slate-900">Full-Time Only</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all shrink-0"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Search Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Popular Searches:</span>
            {['React Intern', 'Product Design', 'Remote', 'AI/ML', 'Full Stack', 'DevOps'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickTag(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Chips / Feature highlights */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">850+ Companies</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Direct hiring teams</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">₹45K/mo Avg</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Competitive stipends</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">100% Verified</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">No ghosting / scams</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">4.9 / 5 Rating</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Candidate approval</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
