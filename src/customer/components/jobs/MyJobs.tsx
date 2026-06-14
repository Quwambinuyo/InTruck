import { useState } from "react";
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import FilterChip from "../../../ui/FilterChip";
import StatusPill from "../../../ui/StatusPill";
import JobDrawer from "./JobDrawer";
import {
  MOCK_MY_JOBS,
  type MyJob,
  type MyJobStatus,
} from "../../mock/mockMyJobsData";

type JobFilter = MyJobStatus | "all";

const MyJobs = () => {
  const [filter, setFilter] = useState<JobFilter>("all");
  const [selectedJob, setSelectedJob] = useState<MyJob | null>(null);

  const filteredJobs =
    filter === "all"
      ? MOCK_MY_JOBS
      : MOCK_MY_JOBS.filter((j) => j.status === filter);

  return (
    <div className="w-full space-y-4 ">
      <div>
        <h2 className="text-xl font-black text-black">My Jobs</h2>
        <p className="text-xs text-black/40">Track all your haulage requests</p>
      </div>

      <FilterChip
        options={["all", "active", "completed", "cancelled"]}
        value={filter}
        onChange={setFilter}
      />

      <div className="space-y-3 pb-2">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="bg-white border border-black/10 rounded-2xl p-4 space-y-3 cursor-pointer active:scale-[0.99] transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-black">{job.title}</h3>
                <p className="text-xs text-black/40">{job.cargo}</p>
              </div>

              <StatusPill status={job.postStatus} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-black/60">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span className="truncate">{job.pickup}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span className="truncate">{job.dropoff}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{job.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaTruck />
                <span>{job.truckType}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-black/5">
              <p className="text-xs text-black/40">{job.bids} bids received</p>
              <div className="text-sm font-bold text-black">
                {job.price ? `₦${job.price.toLocaleString()}` : "No price yet"}
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-6 text-black/40 text-sm">
            No jobs found
          </div>
        )}
      </div>

      <JobDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
};

export default MyJobs;
