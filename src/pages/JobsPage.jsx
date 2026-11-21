import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  Briefcase,
  Sparkles,
  X
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/jobs/JobCard';
import JobFilterSidebar from '../components/jobs/JobFilterSidebar';
import ApplyModal from '../components/jobs/ApplyModal';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

const ITEMS_PER_PAGE = 6;

export default function JobsPage() {
  const { jobs } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State from URL query or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    workplace: searchParams.get('workplace') || 'all',
    experience: searchParams.get('experience') || 'all',
    category: searchParams.get('category') || 'all',
    minSalary: searchParams.get('minSalary') || 'all',
  });

  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'salary' | 'applicants'
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const loc = searchParams.get('location');
    const type = searchParams.get('type');
    const cat = searchParams.get('category');
    const comp = searchParams.get('company');

    if (q !== null) setSearchQuery(q);
    if (loc !== null) setLocationQuery(loc);
    if (type !== null) setFilters((prev) => ({ ...prev, type }));
    if (cat !== null) setFilters((prev) => ({ ...prev, category: cat }));
    if (comp) setSearchQuery(comp);
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 250);
  };

  const handleResetFilters = () => {
    setIsLoading(true);
    setSearchQuery('');
    setLocationQuery('');
    setFilters({
      type: 'all',
      workplace: 'all',
      experience: 'all',
      category: 'all',
      minSalary: 'all',
    });
    setSearchParams({});
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 250);
  };

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword match (title, company, skills, description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(query));
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) return false;
      }

      // Location match
      if (locationQuery.trim()) {
        const loc = locationQuery.toLowerCase().trim();
        if (!job.location.toLowerCase().includes(loc) && !job.workplaceType.toLowerCase().includes(loc)) {
          return false;
        }
      }

      // Type match (Internship vs Full-time)
      if (filters.type !== 'all') {
        if (filters.type === 'Internship' && !job.isInternship) return false;
        if (filters.type === 'Full-time' && job.isInternship) return false;
      }

      // Workplace match (Remote, Hybrid, On-site)
      if (filters.workplace !== 'all' && job.workplaceType !== filters.workplace) {
        return false;
      }

      // Experience level match
      if (filters.experience !== 'all' && !job.experienceLevel.includes(filters.experience)) {
        return false;
      }

      // Category match
      if (filters.category !== 'all' && job.category !== filters.category) {
        return false;
      }

      // Minimum salary match
      if (filters.minSalary !== 'all') {
        const minVal = parseInt(filters.minSalary, 10);
        if (job.salaryMin < minVal) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary') {
        return b.salaryMin - a.salaryMin;
      }
      if (sortBy === 'applicants') {
        return b.applicantsCount - a.applicantsCount;
      }
      // default 'newest'
      return b.postedTimestamp - a.postedTimestamp;
    });
  }, [jobs, searchQuery, locationQuery, filters, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen py-8 lg:py-12 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Search & Filter Bar */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Keyword Search */}
            <div className="md:col-span-5 relative flex items-center">
              <Search className="w-5 h-5 text-indigo-500 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search job title, skills, or company..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Search */}
            <div className="md:col-span-4 relative flex items-center">
              <MapPin className="w-5 h-5 text-purple-500 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Location (e.g. Remote, Bangalore)"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {locationQuery && (
                <button
                  onClick={() => setLocationQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle & Quick Actions */}
            <div className="md:col-span-3 flex items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="w-full lg:hidden py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                <span>Filters</span>
              </button>

              <button
                onClick={handleResetFilters}
                className="hidden lg:flex w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm items-center justify-center gap-2 transition-colors"
              >
                Reset All
              </button>
            </div>

          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Found <strong className="text-slate-900 dark:text-white">{filteredJobs.length}</strong> active openings
              </span>
              {filters.type !== 'all' && (
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800">
                  Type: {filters.type}
                </span>
              )}
              {filters.workplace !== 'all' && (
                <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-semibold border border-purple-200 dark:border-purple-800">
                  Mode: {filters.workplace}
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="newest" className="dark:bg-slate-900">Newest First</option>
                <option value="salary" className="dark:bg-slate-900">Highest Stipend / CTC</option>
                <option value="applicants" className="dark:bg-slate-900">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Job Cards Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block shrink-0">
            <JobFilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredJobs.length}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm p-4 flex justify-end">
              <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full rounded-2xl p-5 overflow-y-auto">
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <h3 className="font-bold">Filter Openings</h3>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <JobFilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  totalResults={filteredJobs.length}
                />
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Jobs Listing Main Section */}
          <div className="flex-1 w-full space-y-5">
            {isLoading ? (
              <LoadingSkeleton count={4} />
            ) : filteredJobs.length === 0 ? (
              <EmptyState
                title="No matching opportunities found"
                description="We couldn't find any job or internship matching your current search parameters. Try clearing some filters or searching with broader keywords."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : (
              <>
                <div className="space-y-4">
                  {paginatedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApplyClick={(j) => setSelectedJobToApply(j)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{' '}
                      <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                            currentPage === i + 1
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>

      {/* Apply Modal */}
      {selectedJobToApply && (
        <ApplyModal
          job={selectedJobToApply}
          onClose={() => setSelectedJobToApply(null)}
        />
      )}
    </div>
  );
}
