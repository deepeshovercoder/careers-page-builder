'use client';

import { useState } from 'react';
import Fuse from 'fuse.js';
import { Job } from '@/types'; 
import Dropdown from '@/components/Dropdown';


interface Props {
  jobs: Job[];
}

export default function JobList({ jobs }: Props) {
    const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

 const locations = Array.from(
  new Set(
    jobs
      .map(j => j.location)
      .filter((loc): loc is string => Boolean(loc))
  )
);

const types = Array.from(
  new Set(
    jobs
      .map(j => j.job_type)
      .filter((type): type is string => Boolean(type))
  )
);


  const fuse = new Fuse(jobs, { keys: ['title', 'department', 'description'], threshold: 0.3 });

  const filteredJobs = search
    ? fuse.search(search).map(res => res.item)
    : jobs.filter(j => 
        (!locationFilter || j.location === locationFilter) && 
        (!typeFilter || j.job_type === typeFilter)
      );

      const PAGE_SIZE = 15;

const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);

const paginatedJobs = filteredJobs.slice(
  (page - 1) * PAGE_SIZE,
  page * PAGE_SIZE
);


  return (
    <div className="my-12">
      <h3 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">Open Positions</h3>
      
      {/* Filters */}
    
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
  <input
    type="text"
    placeholder="Search roles..."
    value={search}
    onChange={e => setSearch(e.target.value)}
    className="sm:col-span-2 border border-gray-300 rounded-xl md:p-0 p-2 md:px-3 px-3 focus-ring"
  />

  <Dropdown
    value={locationFilter}
    onChange={setLocationFilter}
    options={locations}
    placeholder="All Locations"
  />

  <Dropdown
    value={typeFilter}
    onChange={setTypeFilter}
    options={types}
    placeholder="All Types"
  />
</div>



      {/* Job Cards */}
   {filteredJobs.length === 0 ? (
  <p className="text-center text-gray-500 py-12">
    No open positions match your filters.
  </p>
) : (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {paginatedJobs.map(job => (
        <div
          key={job.id}
          className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition p-6"
        >
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {job.title}
          </h4>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p>
              <span className="font-medium">Department:</span>{' '}
              {job.department || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Location:</span>{' '}
              {job.location}
              {job.work_policy && ` • ${job.work_policy}`}
            </p>
            <p>
              <span className="font-medium">Type:</span>{' '}
              {job.job_type}
              {job.employment_type && ` • ${job.employment_type}`}
            </p>
            {job.experience_level && (
              <p>
                <span className="font-medium">Experience:</span>{' '}
                {job.experience_level}
              </p>
            )}
            {job.salary_range && (
              <p className="font-medium text-[var(--primary-color)]">
                {job.salary_range}
              </p>
            )}
          </div>

          <p className="text-gray-700 line-clamp-3">
            {job.description || 'Join our team and make an impact.'}
          </p>

          <p className="text-xs text-gray-500 mt-4">
            Posted{' '}
            {job.posted_days_ago
              ? `${job.posted_days_ago} days ago`
              : 'recently'}
          </p>
        </div>
      ))}
    </div>

    {/* Pagination UI */}
    {totalPages > 1 && (
  <div className="mt-10">

    {/* MOBILE PAGINATION */}
    <div className="flex items-center justify-between gap-2 md:hidden">
      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="px-4 py-2 border rounded-lg disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(p => p + 1)}
        className="px-4 py-2 border rounded-lg disabled:opacity-40"
      >
        Next
      </button>
    </div>

    {/* DESKTOP PAGINATION */}
    <div className="hidden md:flex justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="px-3 py-2 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-2 border rounded ${
            page === i + 1
              ? 'bg-[var(--primary-color)] text-white'
              : ''
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(p => p + 1)}
        className="px-3 py-2 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </div>
)}

  </>
)}
</div>
  );
}