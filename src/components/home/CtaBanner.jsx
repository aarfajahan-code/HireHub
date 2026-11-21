import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200 mb-6 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Get Hired in 2026</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] leading-tight">
              Ready to Accelerate Your Career Trajectory?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-indigo-200/90 leading-relaxed max-w-2xl">
              Join thousands of college students and engineering grads who found high-impact internships and full-time roles through HireHub. Free forever for students.
            </p>

            {/* Benefit Checkmarks */}
            <div className="mt-6 flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm text-indigo-100 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified salary ranges
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct hiring manager review
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time status tracking
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-3.5 rounded-xl bg-white text-indigo-950 font-bold text-sm sm:text-base hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Create Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/jobs"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-sm border border-white/10 transition-all text-center"
              >
                Explore Open Roles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
