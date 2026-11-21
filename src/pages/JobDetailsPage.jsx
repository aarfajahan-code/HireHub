import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  Send, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft,
  Sparkles,
  Users,
  ShieldCheck,
  Check,
  Briefcase
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useToast } from '../context/ToastContext';
import ApplyModal from '../components/jobs/ApplyModal';
import JobCard from '../components/jobs/JobCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export default function JobDetailsPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getJobById, jobs, toggleSaveJob, isJobSaved, isJobApplied } = useJobs();
  const { showSuccess, showInfo } = useToast();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const job = getJobById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (searchParams.get('apply') === 'true') {
      setApplyModalOpen(true);
    }
  }, [id, searchParams]);

  if (!job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Job Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">
          This position may have been filled or the link might be incorrect.
        </p>
        <Link
          to="/jobs"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm"
        >
          Explore Available Openings
        </Link>
      </div>
    );
  }

  const saved = isJobSaved(job.id);
  const applied = isJobApplied(job.id);

  // Similar jobs
  const similarJobs = jobs
    .filter((j) => j.id !== job.id && (j.category === job.category || j.type === job.type))
    .slice(0, 3);

  const handleBookmark = () => {
    const isNowSaved = toggleSaveJob(job.id);
    if (isNowSaved) {
      showSuccess(`Saved "${job.title}" to bookmarks.`);
    } else {
      showInfo(`Removed from bookmarks.`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showSuccess("Job link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen py-8 lg:py-12 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Openings</span>
        </Link>

        {/* Main Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-start sm:items-center gap-5">
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-md shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 flex items-center gap-1"
                  >
                    <span>{job.company}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    <CheckCircle2 className="w-3 h-3 text-indigo-600" /> Verified Employer
                  </span>
                  <span className="text-xs text-slate-400">• Posted {job.postedDate}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                  {job.title}
                </h1>

                {/* Sub details chips */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-4 h-4 text-purple-500" /> {job.location} ({job.workplaceType})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Briefcase className="w-4 h-4 text-indigo-500" /> {job.type}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-4 h-4 text-emerald-500" /> {job.applicantsCount} Applicants
                  </span>
                </div>
              </div>
            </div>

            {/* Actions CTA in header */}
            <div className="flex items-center gap-3 self-start lg:self-center">
              <button
                onClick={handleBookmark}
                className={`p-3 rounded-2xl border transition-all ${
                  saved
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={saved ? 'Remove bookmark' : 'Bookmark job'}
              >
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Share link"
              >
                {copiedLink ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
              </button>

              {applied ? (
                <div className="px-6 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-sm border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Applied</span>
                </div>
              ) : (
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* 2-Column Grid: Content + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview / Description */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                About the Role
              </h2>
              <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </div>

            {/* Key Responsibilities */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Key Responsibilities
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Required Skills & Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold border border-slate-200/80 dark:border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Eligibility & Candidate Profile
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {job.eligibility.map((crit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perks & Benefits */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Perks & Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {job.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-3"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Side Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Summary Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Job Overview
              </h3>

              <div className="space-y-3 text-xs sm:text-sm divide-y divide-slate-100 dark:divide-slate-800">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Compensation:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{job.salary}</span>
                </div>

                <div className="pt-3 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Job Type:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.type}</span>
                </div>

                <div className="pt-3 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Work Mode:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.workplaceType}</span>
                </div>

                <div className="pt-3 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Experience:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.experienceLevel}</span>
                </div>

                <div className="pt-3 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.duration || "Standard"}</span>
                </div>

                <div className="pt-3 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Application Deadline:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{job.deadline}</span>
                </div>
              </div>

              {/* Big CTA Button */}
              {applied ? (
                <div className="w-full py-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-center border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Application Submitted</span>
                </div>
              ) : (
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply for this Role</span>
                </button>
              )}
            </div>

            {/* Company About Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                About {job.company}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {job.aboutCompany}
              </p>
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
              >
                <span>Visit company website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* Similar Jobs Section */}
        {similarJobs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-['Plus_Jakarta_Sans']">
              Similar Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarJobs.map((simJob) => (
                <JobCard
                  key={simJob.id}
                  job={simJob}
                  onApplyClick={() => {
                    navigate(`/jobs/${simJob.id}?apply=true`);
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Apply Modal */}
      {applyModalOpen && (
        <ApplyModal
          job={job}
          onClose={() => setApplyModalOpen(false)}
        />
      )}
    </div>
  );
}
