import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Palette, 
  BrainCircuit, 
  Boxes, 
  TrendingUp, 
  ShieldCheck, 
  CircleDollarSign, 
  PenTool, 
  ArrowRight 
} from 'lucide-react';
import { categories } from '../../data/categoriesData';

const iconMap = {
  Code2,
  Palette,
  BrainCircuit,
  Boxes,
  TrendingUp,
  ShieldCheck,
  CircleDollarSign,
  PenTool
};

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Explore by Specialization
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-['Plus_Jakarta_Sans']">
              Popular Job & Internship Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
              Find curated opportunities aligned with your exact technical skillset.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Code2;

            return (
              <div
                key={category.id}
                onClick={() => navigate(`/jobs?category=${category.id}`)}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900/60 shadow-sm hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.bgLight} group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {category.count} Openings
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-['Plus_Jakarta_Sans']">
                    {category.name}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700">
                  <span>Browse roles</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
