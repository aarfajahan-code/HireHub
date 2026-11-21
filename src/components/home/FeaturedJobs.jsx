import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import JobCard from '../jobs/JobCard';
import ApplyModal from '../jobs/ApplyModal';

export default function FeaturedJobs() {
  const { jobs } = useJobs();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'internships') return job.isInternship;
    if (activeTab === 'fulltime') return !job.isInternship;
    if (activeTab === 'remote') return job.workplaceType === 'Remote';
    return true;
  }).slice(0, 6);

  return (
    <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hand-Picked For You</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
            Featured Jobs & Internships
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Verified opportunities from fast-growing startups and industry giants.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Openings' },
            { id: 'internships', label: 'Internships' },
            { id: 'fulltime', label: 'Full-time' },
            { id: 'remote', label: 'Remote Only' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApplyClick={(j) => setSelectedJobToApply(j)}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-12 text-center">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm transition-all shadow-sm group"
        >
          <span>Explore All 3,500+ Openings</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Apply Modal */}
      {selectedJobToApply && (
        <ApplyModal
          job={selectedJobToApply}
          onClose={() => setSelectedJobToApply(null)}
        />
      )}
    </section>
  );
}
