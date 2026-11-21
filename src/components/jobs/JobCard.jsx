import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bookmark, 
  MapPin, 
  Clock, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  ChevronRight,
  Calendar
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';

export default function JobCard({ job, onApplyClick }) {
  const { toggleSaveJob, isJobSaved, isJobApplied } = useJobs();
  const { showSuccess, showInfo } = useToast();
  const navigate = useNavigate();

  const saved = isJobSaved(job.id);
  const applied = isJobApplied(job.id);

  const handleBookmark = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const nowSaved = toggleSaveJob(job.id);
    if (nowSaved) {
      showSuccess(`Saved "${job.title}" to bookmarks.`);
    } else {
      showInfo(`Removed from bookmarks.`);
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onApplyClick) {
      onApplyClick(job);
    } else {
      navigate(`/jobs/${job.id}?apply=true`);
    }
  };

  return (
    <div 
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-card hover:border-indigo-200 dark:hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between relative"
    >
      <div>
        {/* Top bar of Card */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3.5">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors">
                  {job.company}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100 dark:fill-indigo-950 shrink-0" />
                <span className="text-[11px] text-slate-400">• {job.postedDate}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-['Plus_Jakarta_Sans'] line-clamp-1">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-xl border transition-all shrink-0 ${
              saved
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/60 dark:border-indigo-800 dark:text-indigo-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            aria-label="Bookmark Job"
            title={saved ? 'Remove bookmark' : 'Save opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
          </button>
        </div>

        {/* Tags / Badges */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 my-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
            job.isInternship 
              ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-100 dark:border-purple-800/60'
              : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-100 dark:border-blue-800/60'
          }`}>
            {job.type}
          </span>

          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {job.workplaceType}
          </span>

          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/60">
            {job.experienceLevel}
          </span>

          {job.isFeatured && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Featured
            </span>
          )}
        </div>

        {/* Short Summary */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {job.summary || job.description}
        </p>

        {/* Skills Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] text-slate-400 font-medium">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Information Row */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        
        {/* Salary & Location */}
        <div className="space-y-1">
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            {job.salary}
          </div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Deadline: {job.deadline}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {applied ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/80">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Applied
            </span>
          ) : (
            <button
              onClick={handleApply}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-500/20"
            >
              <span>Apply Now</span>
              <Send className="w-3 h-3" />
            </button>
          )}

          <Link
            to={`/jobs/${job.id}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="View Details"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
