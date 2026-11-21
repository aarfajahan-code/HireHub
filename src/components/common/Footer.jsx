import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Github, Twitter, Linkedin, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const { showSuccess } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    showSuccess("Thank you for subscribing to weekly job alerts!");
    e.target.reset();
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Hire<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              The premier career and internship gateway connecting ambitious students and fresh grads with top-tier product startups and global tech companies.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <label htmlFor="newsletter-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Subscribe for weekly curated openings
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your student email..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm shadow-indigo-500/25"
                >
                  <Send className="w-3.5 h-3.5" />
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* Column 1: For Students */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              For Candidates
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/jobs?type=Internship" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Summer Internships
                </Link>
              </li>
              <li>
                <Link to="/jobs?experience=Fresher" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Fresher & Junior Roles
                </Link>
              </li>
              <li>
                <Link to="/jobs?workplace=Remote" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Remote Tech Jobs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Application Tracker
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=saved" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Saved Opportunities
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Popular Categories */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/jobs?category=engineering" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=design" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Product & UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=data-science" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Data Science & AI
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=product" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Product Management
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=cybersecurity" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  DevOps & Cloud Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Platform */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#companies" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Partner Companies
                </a>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500 cursor-not-allowed">
                  Employer Portal (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500 cursor-not-allowed">
                  Campus Placement Drives
                </span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500 cursor-not-allowed">
                  Salary Benchmark Guide
                </span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500 cursor-not-allowed">
                  Privacy Policy & Terms
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-1">
            © 2026 HireHub Inc. Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for students and job seekers worldwide.
          </p>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition-colors">
              <Twitter className="w-4 h-4" />
            </span>
            <span className="hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition-colors">
              <Github className="w-4 h-4" />
            </span>
            <span className="hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition-colors">
              <Linkedin className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
