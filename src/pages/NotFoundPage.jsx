import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
        <Briefcase className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-2 font-['Plus_Jakarta_Sans']">
        Page Not Found
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6 max-w-md">
        The page you are looking for doesn't exist or has been moved to another location.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-500/25"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
