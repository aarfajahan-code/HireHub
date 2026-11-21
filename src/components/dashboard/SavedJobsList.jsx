import React from 'react';
import { useJobs } from '../../context/JobContext';
import JobCard from '../jobs/JobCard';
import EmptyState from '../common/EmptyState';

export default function SavedJobsList({ onApplyJob }) {
  const { getSavedJobs } = useJobs();
  const savedJobs = getSavedJobs();

  if (savedJobs.length === 0) {
    return (
      <EmptyState
        type="saved"
        title="No saved jobs or internships"
        description="You haven't bookmarked any jobs yet. When exploring openings, click the bookmark icon to save roles you want to apply to later."
        actionLabel="Explore All Openings"
        actionLink="/jobs"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {savedJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onApplyClick={onApplyJob}
        />
      ))}
    </div>
  );
}
