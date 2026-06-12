import { useState } from "react";
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import FilterChip from "../../../ui/FilterChip";
import StatusPill from "../../../ui/StatusPill";
import JobDrawer from "./JobDrawer";

type JobStatus = "active" | "completed" | "cancelled" | "all";

type Offer = {
  id: string;
  driver: string;
  price: number;
  message: string;
};

type Job = {
  id: string;
  title: string;
  cargo: string;
  pickup: string;
  dropoff: string;
  date: string;
  truckType: string;
  status: Exclude<JobStatus, "all">;
  bids: number;
  price?: number;
  offers: Offer[];
};

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Granite delivery",
    cargo: "Granite / Gravel",
    pickup: "Ikeja, Lagos",
    dropoff: "Lekki, Lagos",
    date: "2026-06-14",
    truckType: "Tipper",
    status: "active",
    bids: 4,
    offers: [
      {
        id: "o1",
        driver: "John D",
        price: 120000,
        message: "Can deliver fast",
      },
      { id: "o2", driver: "Ahmed K", price: 115000, message: "Available now" },
    ],
  },
  {
    id: "2",
    title: "Cement haulage",
    cargo: "Cement",
    pickup: "Apapa, Lagos",
    dropoff: "Ajah, Lagos",
    date: "2026-06-10",
    truckType: "Flatbed",
    status: "completed",
    bids: 2,
    price: 180000,
    offers: [],
  },
  {
    id: "3",
    title: "Steel transport",
    cargo: "Steel / Iron",
    pickup: "Surulere, Lagos",
    dropoff: "Victoria Island, Lagos",
    date: "2026-06-08",
    truckType: "Low Loader",
    status: "cancelled",
    bids: 0,
    offers: [],
  },
];

const MyJobs = () => {
  const [filter, setFilter] = useState<JobStatus>("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs =
    filter === "all" ? MOCK_JOBS : MOCK_JOBS.filter((j) => j.status === filter);

  return (
    <div className="w-full space-y-4 pb-6">
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

              <StatusPill status={job.status} />
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
