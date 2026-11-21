import React from 'react';
import { SearchX, BookmarkX, FileQuestion, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  type = 'search',
  title,
  description,
  actionLabel,
  onAction,
  actionLink
}) {
  const getIcon = () => {
    switch (type) {
      case 'saved':
        return <BookmarkX className="w-12 h-12 text-slate-400 dark:text-slate-500" />;
      case 'applications':
        return <FileQuestion className="w-12 h-12 text-slate-400 dark:text-slate-500" />;
      default:
        return <SearchX className="w-12 h-12 text-slate-400 dark:text-slate-500" />;
    }
  };

  return (
    <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 my-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
        {getIcon()}
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 font-['Plus_Jakarta_Sans']">
        {title || "No results found"}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
        {description || "We couldn't find any opportunities matching your selected criteria. Try adjusting your search query or reset your filters."}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          {actionLabel || "Reset Filters"}
        </button>
      )}

      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all"
        >
          {actionLabel || "Explore Available Openings"}
        </Link>
      )}
    </div>
  );
}
