import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  postedDate: string;
}

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return <p className="text-center text-gray-600 mt-8">No jobs found. Try a different search.</p>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">{job.title}</h2>
          <div className="flex items-center text-gray-600 mb-2">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <p className="text-gray-700 mb-4">{job.description}</p>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Posted on {job.postedDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;