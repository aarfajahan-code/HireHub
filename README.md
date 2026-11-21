<<<<<<< HEAD
# HireHub — Modern Job & Internship Portal 🚀

A modern, SaaS-grade Job and Internship Portal built with **React.js**, **Tailwind CSS**, and **Context API**. Designed to connect ambitious students and new graduates with top product startups and global tech enterprises.

![HireHub Preview](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Key Highlights & Architecture

- **Clean SaaS Aesthetic**: Modern palette (Slate & Navy background with Indigo/Purple brand accents), rounded cards (`rounded-2xl`), subtle shadows, smooth transitions, and dark/light mode toggle.
- **State Management & Persistence**:
  - `AuthContext`: Student authentication, profile updates, and demo account login.
  - `JobContext`: Real-time state for 3,500+ curated jobs, active applications, bookmarking, and duplicate prevention.
  - `ThemeContext`: Persistent dark & light theme synced with `document.documentElement`.
  - `ToastContext`: Floating animated toast notifications for all user actions.
  - **LocalStorage**: Applications, bookmarks, user profiles, and theme preferences persist across reloads.
- **Zero Dummy Content**: Realistic job roles, salaries/stipends, requirements, tech stacks, and company profiles (Linear, Stripe, Vercel, Figma, Razorpay, Notion, Swiggy, Datadog).

---

## 📱 Pages & Features

### 1. Landing Page (`/`)
- **Hero Section**: "Find Your Dream Internship or Job" with keyword, location, and opportunity type search bar.
- **Popular Categories**: Software & Tech, UI/UX Design, Data Science & AI, Product Management, Cybersecurity, and more.
- **Featured Opportunities**: Interactive filter tabs (*All*, *Internships*, *Full-Time*, *Remote*).
- **Top Companies Hiring**: Verified company badges, ratings, and open position counts.
- **Platform Metrics & Trust Chips**: 3,500+ jobs, 850+ companies, 24k+ students hired.
- **Process Guide & Student Testimonials**: How HireHub accelerates placements.

### 2. Job Listing Page (`/jobs`)
- Real-time search across job titles, skills, and companies.
- Filter sidebar:
  - **Opportunity Type**: Internships vs. Full-time.
  - **Workplace Mode**: Remote, Hybrid, On-site.
  - **Experience Level**: Fresher/Student, Entry Level (0-1 yrs), Mid Level (1-3 yrs).
  - **Domain / Category**: Filter by technical specialization.
  - **Minimum Monthly Stipend**: Quick salary threshold filter.
- Sorting by **Newest First**, **Highest Stipend / Salary**, and **Most Popular**.
- Interactive pagination (6 jobs per page) with loading skeletons.
- 1-click bookmarking and quick application drawer.

### 3. Job Details Page (`/jobs/:id`)
- Comprehensive job overview: description, responsibilities, required skills tags, eligibility criteria, and perks/benefits.
- Company details, verified employer badges, and official website links.
- Apply Now button opening the pre-filled application modal.
- Shareable job link with 1-click clipboard copy.
- Similar opportunities recommendation section.

### 4. Student Dashboard (`/dashboard`)
- Personalized welcome card with candidate avatar, university, and contact details.
- Overview metrics: Total Applications, Shortlisted/Interviewing, Under Review, Saved Jobs.
- **Applications Tracker**:
  - Status badges (*Shortlisted*, *Under Review*, *Applied*, *Rejected*).
  - Review notes from hiring teams.
  - Expandable drawer to inspect submitted cover letters and attached resumes.
  - Withdrawal option.
- **Saved Openings**: Quick access to bookmarked jobs.
- **Profile Editor**:
  - Update personal info, bio, college, graduation year.
  - Interactive skill tag manager (add/remove skills).
  - Resume upload interface (PDF/DOCX).
  - Portfolio, GitHub, and LinkedIn URL links.

### 5. Application System
- Direct modal application pre-filled with candidate profile data.
- Resume upload and validation.
- Custom cover letter field with role-specific placeholder.
- Availability picker (*Immediate*, *2 Weeks*, *Next Semester*).
- **Duplicate Prevention**: Intelligently detects if already applied and points to the application tracker.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (v18.3.1), Vite 5
- **Routing**: React Router DOM (v6.26)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans & Inter

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 👤 Demo Student Account
To quickly test the app without typing:
- Click **"Log in with Demo Student Account"** on the `/login` page or inside `/dashboard`.
- **Pre-configured Candidate**: Arjun Verma (IIT Delhi, Class of 2025) with 3 active applications in review.
=======
# Pulse-Analytics-Project
>>>>>>> e1e25b9b2ff9ed1f0081f7dd98e622cfa223988c
