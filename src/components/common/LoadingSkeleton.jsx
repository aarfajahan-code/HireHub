import React from 'react';

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  if (type === 'detail') {
    return (
      <div className="animate-pulse space-y-6 max-w-5xl mx-auto px-4 py-8">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4"></div>
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="md:col-span-2 space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6"></div>
          </div>
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-5"
        >
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
            <div className="space-y-2.5 flex-1">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3"></div>
              <div className="flex gap-2 pt-1">
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-24"></div>
            <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
