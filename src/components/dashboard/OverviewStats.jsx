import React from 'react';
import { Send, CheckCircle2, Clock, Bookmark, TrendingUp } from 'lucide-react';

export default function OverviewStats({ applications, savedCount, onTabChange }) {
  const shortlistedCount = applications.filter((app) => app.status === 'Shortlisted').length;
  const underReviewCount = applications.filter((app) => app.status === 'Under Review').length;
  const appliedCount = applications.length;

  const stats = [
    {
      label: "Total Applications",
      value: appliedCount,
      tab: "applications",
      icon: Send,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/60",
      border: "border-indigo-100 dark:border-indigo-900/60"
    },
    {
      label: "Shortlisted / Interviewing",
      value: shortlistedCount,
      tab: "applications",
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      border: "border-emerald-100 dark:border-emerald-900/60"
    },
    {
      label: "Under Review",
      value: underReviewCount,
      tab: "applications",
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/60",
      border: "border-amber-100 dark:border-amber-900/60"
    },
    {
      label: "Saved Opportunities",
      value: savedCount,
      tab: "saved",
      icon: Bookmark,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/60",
      border: "border-purple-100 dark:border-purple-900/60"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            onClick={() => onTabChange && onTabChange(stat.tab)}
            className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border ${stat.border} shadow-sm hover:shadow-card cursor-pointer transition-all flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
              <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                {stat.value}
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                View all &rarr;
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
