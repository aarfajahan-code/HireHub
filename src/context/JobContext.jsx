import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJobs } from '../data/jobsData';

const JobContext = createContext();

// Realistic initial preloaded applications for demo showcase
const DEFAULT_APPLICATIONS = [
  {
    id: "app-101",
    jobId: "job-1",
    jobTitle: "Frontend Engineering Intern (React / TypeScript)",
    company: "Linear",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80",
    location: "Remote, Global",
    salary: "₹45,000 / month",
    type: "Internship",
    appliedDate: "Nov 18, 2026",
    status: "Shortlisted",
    statusNotes: "Technical interview scheduled for Nov 24 at 3:00 PM IST.",
    resumeName: "Arjun_Verma_Resume_2026.pdf",
    coverLetter: "I've been using Linear daily for tracking my side projects and admire the fast keyboard interactions. I would love to bring my TypeScript and React skills to help optimize component render speeds.",
    availability: "Immediate (within 1 week)"
  },
  {
    id: "app-102",
    jobId: "job-3",
    jobTitle: "UI/UX & Product Design Intern",
    company: "Figma",
    companyLogo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=128&auto=format&fit=crop&q=80",
    location: "Remote, India / APAC",
    salary: "₹50,000 / month",
    type: "Internship",
    appliedDate: "Nov 15, 2026",
    status: "Under Review",
    statusNotes: "Application is currently under portfolio review by design leads.",
    resumeName: "Arjun_Verma_Resume_2026.pdf",
    coverLetter: "Excited about design systems and web typography. My case studies demonstrate end-to-end design thinking from discovery to high-fidelity prototyping.",
    availability: "Starting Jan 2027"
  },
  {
    id: "app-103",
    jobId: "job-2",
    jobTitle: "Junior Full Stack Developer",
    company: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80",
    location: "Bangalore, India",
    salary: "₹18 - ₹24 LPA",
    type: "Full-time",
    appliedDate: "Nov 10, 2026",
    status: "Applied",
    statusNotes: "Application submitted successfully. Awaiting recruiter review.",
    resumeName: "Arjun_Verma_Resume_2026.pdf",
    coverLetter: "Strong foundation in distributed systems, RESTful architectures, and React. Built a complete payment integration project in college.",
    availability: "Available upon graduation"
  }
];

export const JobProvider = ({ children }) => {
  const [jobs] = useState(initialJobs);

  // Saved Jobs
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const stored = localStorage.getItem('hirehub_saved_jobs');
      return stored ? JSON.parse(stored) : ["job-1", "job-4", "job-11"];
    } catch {
      return ["job-1", "job-4", "job-11"];
    }
  });

  // Applied Jobs
  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem('hirehub_applications');
      return stored ? JSON.parse(stored) : DEFAULT_APPLICATIONS;
    } catch {
      return DEFAULT_APPLICATIONS;
    }
  });

  // Sync saved jobs with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hirehub_saved_jobs', JSON.stringify(savedJobIds));
    } catch (e) {
      console.error("Failed to save jobs to localStorage", e);
    }
  }, [savedJobIds]);

  // Sync applications with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hirehub_applications', JSON.stringify(applications));
    } catch (e) {
      console.error("Failed to save applications to localStorage", e);
    }
  }, [applications]);

  // Toggle Save/Bookmark
  const toggleSaveJob = (jobId) => {
    let isSaved = false;
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        isSaved = false;
        return prev.filter((id) => id !== jobId);
      } else {
        isSaved = true;
        return [...prev, jobId];
      }
    });
    return isSaved;
  };

  const isJobSaved = (jobId) => savedJobIds.includes(jobId);

  // Check if already applied to prevent duplicates
  const isJobApplied = (jobId) => applications.some((app) => app.jobId === jobId);

  // Apply to job
  const applyToJob = (jobId, applicationDetails) => {
    if (isJobApplied(jobId)) {
      return { success: false, message: "You have already applied for this position." };
    }

    const job = jobs.find((j) => j.id === jobId);
    if (!job) {
      return { success: false, message: "Job not found." };
    }

    const newApplication = {
      id: "app-" + Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      location: job.location,
      salary: job.salary,
      type: job.type,
      appliedDate: "Just now",
      status: "Applied",
      statusNotes: "Your application has been received and sent to the hiring team.",
      resumeName: applicationDetails.resumeName || "Uploaded_Resume.pdf",
      coverLetter: applicationDetails.coverLetter || "I am enthusiastic about this opportunity and look forward to contributing to your team.",
      availability: applicationDetails.availability || "Immediate",
      contactEmail: applicationDetails.email,
      contactPhone: applicationDetails.phone,
      portfolio: applicationDetails.portfolio || ""
    };

    setApplications((prev) => [newApplication, ...prev]);
    return { success: true, application: newApplication };
  };

  // Withdraw an application
  const withdrawApplication = (appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
    return { success: true };
  };

  // Get job by ID
  const getJobById = (id) => jobs.find((job) => job.id === id);

  // Get saved jobs list
  const getSavedJobs = () => jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <JobContext.Provider
      value={{
        jobs,
        savedJobIds,
        applications,
        toggleSaveJob,
        isJobSaved,
        isJobApplied,
        applyToJob,
        withdrawApplication,
        getJobById,
        getSavedJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
