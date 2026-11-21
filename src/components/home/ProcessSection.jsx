import React from 'react';
import { UserCheck, Search, Send, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: "01",
    title: "Complete Your Profile",
    description: "Fill your education, target skills, links to your GitHub/portfolio, and upload your latest resume in seconds.",
    icon: UserCheck,
    color: "from-blue-500 to-indigo-600"
  },
  {
    step: "02",
    title: "Discover Verified Roles",
    description: "Filter through verified internships and junior tech jobs with completely transparent salary and stipend figures.",
    icon: Search,
    color: "from-purple-500 to-pink-500"
  },
  {
    step: "03",
    title: "1-Click Direct Apply",
    description: "Submit customized cover letters and tailored resumes directly to hiring managers with zero third-party recruiter spam.",
    icon: Send,
    color: "from-emerald-500 to-teal-600"
  },
  {
    step: "04",
    title: "Track & Land Your Offer",
    description: "Receive real-time application updates from Under Review to Shortlisted on your interactive student dashboard.",
    icon: Trophy,
    color: "from-amber-500 to-orange-500"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-['Plus_Jakarta_Sans']">
            How HireHub Accelerates Your Career
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
            No convoluted screening tests or unread emails. We connect you directly with team leads.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 dark:text-slate-700 font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 font-['Plus_Jakarta_Sans']">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-md"
          >
            <span>Create Your Free Student Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
