import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ExternalLink, 
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';
import EmptyState from '../common/EmptyState';

export default function ApplicationsList({ applications }) {
  const { withdrawApplication } = useJobs();
  const { showSuccess } = useToast();
  const [expandedId, setExpandedId] = useState(null);

  if (!applications || applications.length === 0) {
    return (
      <EmptyState
        type="applications"
        title="No job applications yet"
        description="You haven't submitted any job or internship applications yet. Browse the listing to discover top verified roles!"
        actionLabel="Explore Available Openings"
        actionLink="/jobs"
      />
    );
  }

  const handleWithdraw = (appId, title) => {
    if (window.confirm(`Are you sure you want to withdraw your application for "${title}"?`)) {
      withdrawApplication(appId);
      showSuccess(`Application withdrawn successfully.`);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Shortlisted
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5" />
            Under Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <XCircle className="w-3.5 h-3.5" />
            Not Selected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Clock className="w-3.5 h-3.5" />
            Applied
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {applications.map((app) => {
        const isExpanded = expandedId === app.id;

        return (
          <div
            key={app.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
          >
            {/* Main Application Row */}
            <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={app.companyLogo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80"}
                  alt={app.company}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {app.company}
                    </span>
                    <span className="text-[11px] text-slate-400">• Applied {app.appliedDate}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                    {app.jobTitle}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {app.location}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {app.salary}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                {getStatusBadge(app.status)}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : app.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={isExpanded ? "Collapse details" : "Expand details"}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>

                  <Link
                    to={`/jobs/${app.jobId}`}
                    className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
                    title="View Job Details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleWithdraw(app.id, app.jobTitle)}
                    className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Withdraw Application"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Details Drawer */}
            {isExpanded && (
              <div className="px-6 pb-6 pt-2 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs sm:text-sm animate-in fade-in duration-200">
                {app.statusNotes && (
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        Hiring Team Status Note
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                        {app.statusNotes}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Resume Attached
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      {app.resumeName || "Arjun_Verma_Resume_2026.pdf"}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Stated Availability
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {app.availability || "Immediate"}
                    </span>
                  </div>
                </div>

                {app.coverLetter && (
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Submitted Cover Note
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {app.coverLetter}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
