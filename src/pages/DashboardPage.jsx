import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  Bookmark, 
  Settings, 
  MapPin, 
  GraduationCap, 
  Mail, 
  Phone, 
  FileText, 
  Sparkles, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import OverviewStats from '../components/dashboard/OverviewStats';
import ApplicationsList from '../components/dashboard/ApplicationsList';
import SavedJobsList from '../components/dashboard/SavedJobsList';
import ProfileEditor from '../components/dashboard/ProfileEditor';
import ApplyModal from '../components/jobs/ApplyModal';

export default function DashboardPage() {
  const { user, isAuthenticated, loginWithDemo } = useAuth();
  const { applications, savedJobIds } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'applications', 'saved', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // If not authenticated, show sign-in prompt with quick demo access
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
            Student Dashboard Access
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
            Please log in or click below to launch the interactive demo student profile.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                loginWithDemo();
              }}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Demo Student Dashboard</span>
            </button>
            <Link
              to="/login"
              className="block w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Log in with existing account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome & Student Profile Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-start sm:items-center gap-5">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-500/30 shadow-md shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                    Welcome back, {user.name} 👋
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Active Student
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                  {user.title || "Computer Science Undergrad"}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                    {user.college} ('{user.graduationYear?.slice(-2)})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-500" />
                    {user.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-teal-500" />
                    {user.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 self-start md:self-center">
              <Link
                to="/jobs"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm shadow-indigo-500/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Browse New Roles</span>
              </Link>
              <button
                onClick={() => handleTabChange('profile')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-colors"
              >
                Edit Profile
              </button>
            </div>

          </div>
        </div>

        {/* Overview Stats Cards */}
        <OverviewStats
          applications={applications}
          savedCount={savedJobIds.length}
          onTabChange={handleTabChange}
        />

        {/* Dashboard Tab Navigation Bar */}
        <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'My Applications', count: applications.length, icon: Briefcase },
            { id: 'saved', label: 'Saved Openings', count: savedJobIds.length, icon: Bookmark },
            { id: 'profile', label: 'Student Profile & Resume', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
                  isSelected
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab View */}
        <div>
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                  Submitted Job & Internship Applications
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Real-time status updates from hiring managers
                </span>
              </div>
              <ApplicationsList applications={applications} />
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                  Saved Job Openings ({savedJobIds.length})
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Opportunities you bookmarked for later
                </span>
              </div>
              <SavedJobsList onApplyJob={(j) => setSelectedJobToApply(j)} />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                  Manage Candidate Profile & Resume
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Data persists across browser sessions in LocalStorage
                </span>
              </div>
              <ProfileEditor />
            </div>
          )}
        </div>

      </div>

      {/* Apply Modal */}
      {selectedJobToApply && (
        <ApplyModal
          job={selectedJobToApply}
          onClose={() => setSelectedJobToApply(null)}
        />
      )}
    </div>
  );
}
