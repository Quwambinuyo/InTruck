import { useState, useMemo } from "react";
import StatCard from "../../../ui/StatCard";
import SearchInput from "../../../ui/SearchInput";
import { SelectField } from "../../../pages/auth/FormField";
import DataTable, { type ColumnDef } from "../../../ui/DataTable";
import AllJobsDrawer from "./AllJobsDrawer";
import {
  SEED_ALL_JOBS,
  ALL_JOB_STATUS_OPTIONS,
  ALL_JOB_PRIORITY_OPTIONS,
  ALL_JOB_CARGO_OPTIONS,
  type AllJobType,
} from "../../mock/mockAllJobsData";

const StatusBadge = ({ status }: { status: AllJobType["status"] }) => {
  const map: Record<
    AllJobType["status"],
    { label: string; className: string }
  > = {
    open: {
      label: "Open",
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    assigned: {
      label: "Assigned",
      className: "bg-blue-50 text-blue-700 border-blue-100",
    },
    in_transit: {
      label: "In Transit",
      className: "bg-purple-50 text-purple-700 border-purple-100",
    },
    delivered: {
      label: "Delivered",
      className: "bg-green-50 text-green-700 border-green-100",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-50 text-red-600 border-red-100",
    },
  };
  const { label, className } = map[status];
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${className}`}
    >
      {label}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: AllJobType["priority"] }) => {
  const map: Record<
    AllJobType["priority"],
    { label: string; className: string }
  > = {
    urgent: {
      label: "Urgent",
      className: "bg-red-50 text-red-600 border-red-100",
    },
    standard: {
      label: "Standard",
      className: "bg-blue-50 text-blue-600 border-blue-100",
    },
    low: {
      label: "Low",
      className: "bg-gray-50 text-gray-500 border-gray-100",
    },
  };
  const { label, className } = map[priority];
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${className}`}
    >
      {label}
    </span>
  );
};

const formatCurrency = (n: number) => `₦${n.toLocaleString("en-NG")}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const COLUMNS: ColumnDef<AllJobType>[] = [
  {
    label: "Job ID",
    span: 2,
    render: (row) => (
      <div>
        <p className="text-[12px] font-mono font-semibold text-black">
          {row.id}
        </p>
        <p className="text-xs text-black/40 mt-0.5">
          {formatDate(row.postedDate)}
        </p>
      </div>
    ),
  },
  {
    label: "Route",
    span: 3,
    render: (row) => (
      <div>
        <p className="text-[12px] text-black font-semibold">
          {row.pickupState} → {row.deliveryState}
        </p>
        <p className="text-xs text-black/40 mt-0.5 truncate max-w-[200px]">
          {row.pickupAddress}
        </p>
      </div>
    ),
  },
  {
    label: "Cargo",
    span: 2,
    render: (row) => (
      <div>
        <p className="text-[12px] text-black">{row.cargoType}</p>
        <p className="text-xs text-black/40 mt-0.5">
          {row.weightKg.toLocaleString()} kg
        </p>
      </div>
    ),
  },
  {
    label: "Truck type",
    span: 2,
    render: (row) => <p className="text-[12px] text-black">{row.truckType}</p>,
  },
  {
    label: "Posted by",
    span: 3,
    render: (row) => (
      <div>
        <p className="text-[12px] font-semibold text-black">{row.postedBy}</p>
        {/* <p className="text-xs text-black/40 mt-0.5">{row.contactPhone}</p> */}
      </div>
    ),
  },
  {
    label: "Budget",
    span: 2,
    render: (row) => (
      <p className="text-[12px] font-semibold text-black">
        {formatCurrency(row.budgetNgn)}
      </p>
    ),
  },
  {
    label: "Bids",
    span: 2,
    render: (row) => (
      <span
        className={`text-[11px] font-semibold px-2 py-1 rounded-full border ${
          row.bidsCount > 0
            ? "bg-orange-50 text-orange-600 border-orange-100"
            : "bg-black/[0.03] text-black/30 border-black/[0.06]"
        }`}
      >
        {row.bidsCount}
      </span>
    ),
  },
  {
    label: "Priority",
    span: 2,
    render: (row) => <PriorityBadge priority={row.priority} />,
  },
  {
    label: "Status",
    span: 2,
    render: (row) => <StatusBadge status={row.status} />,
  },
];

const AllJobs = () => {
  const [jobs] = useState<AllJobType[]>(SEED_ALL_JOBS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [cargoFilter, setCargoFilter] = useState("");
  const [cargoOpen, setCargoOpen] = useState(false);
  const [selected, setSelected] = useState<AllJobType | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jobs.filter((j) => {
      const matchQ =
        !q ||
        `${j.id} ${j.postedBy} ${j.pickupState} ${j.deliveryState} ${j.cargoType} ${j.truckType}`
          .toLowerCase()
          .includes(q);
      const matchS = !statusFilter || j.status === statusFilter;
      const matchP = !priorityFilter || j.priority === priorityFilter;
      const matchC = !cargoFilter || j.cargoType === cargoFilter;
      return matchQ && matchS && matchP && matchC;
    });
  }, [jobs, search, statusFilter, priorityFilter, cargoFilter]);

  const stats = useMemo(
    () => ({
      total: jobs.length,
      open: jobs.filter((j) => j.status === "open").length,
      active: jobs.filter(
        (j) => j.status === "assigned" || j.status === "in_transit",
      ).length,
      delivered: jobs.filter((j) => j.status === "delivered").length,
      urgent: jobs.filter((j) => j.priority === "urgent").length,
      totalBids: jobs.reduce((sum, j) => sum + j.bidsCount, 0),
    }),
    [jobs],
  );

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-black">All Jobs</h1>
          <p className="text-sm text-black/40 mt-1">
            Browse all customer jobs available on the platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <StatCard
          label="Total jobs"
          value={String(stats.total)}
          tooltip="All jobs posted by customers"
        />
        <StatCard
          label="Open"
          value={String(stats.open)}
          tooltip="Jobs currently accepting bids"
          trend="up"
          delta={
            stats.total
              ? `${Math.round((stats.open / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Active"
          value={String(stats.active)}
          tooltip="Assigned or in transit"
          trend="flat"
          delta={
            stats.total
              ? `${Math.round((stats.active / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Delivered"
          value={String(stats.delivered)}
          tooltip="Successfully completed jobs"
          trend="up"
          delta={
            stats.total
              ? `${Math.round((stats.delivered / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Urgent jobs"
          value={String(stats.urgent)}
          tooltip="High-priority jobs needing fast turnaround"
          trend="down"
          delta={
            stats.total
              ? `${Math.round((stats.urgent / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Total bids placed"
          value={String(stats.totalBids)}
          tooltip="All bids across every job"
          trend="up"
        />
      </div>

      <div className="flex gap-3 mb-5 flex-wrap items-end">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search ID, customer, route, cargo..."
          className="flex-1 min-w-[200px] max-w-sm"
        />
        <SelectField
          label=""
          value={statusFilter}
          open={statusOpen}
          setOpen={setStatusOpen}
          options={ALL_JOB_STATUS_OPTIONS}
          placeholder="All statuses"
          onChange={setStatusFilter}
          className="w-44"
        />
        <SelectField
          label=""
          value={priorityFilter}
          open={priorityOpen}
          setOpen={setPriorityOpen}
          options={ALL_JOB_PRIORITY_OPTIONS}
          placeholder="All priorities"
          onChange={setPriorityFilter}
          className="w-40"
        />
        <SelectField
          label=""
          value={cargoFilter}
          open={cargoOpen}
          setOpen={setCargoOpen}
          options={ALL_JOB_CARGO_OPTIONS}
          placeholder="All cargo"
          onChange={setCargoFilter}
          className="w-40"
        />
      </div>

      <div className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden">
        <DataTable<AllJobType>
          columns={COLUMNS}
          rows={filtered}
          getKey={(row) => row.id}
          onRowClick={(row) => setSelected(row)}
          emptyMessage="No jobs found."
          minWidth="1300px"
        />
      </div>

      <AllJobsDrawer
        job={selected}
        onClose={() => setSelected(null)}
        onBid={(job) => {
          console.log("bid on job", job.id);
        }}
        onContact={(job) => {
          console.log("contact customer for job", job.id);
        }}
      />
    </div>
  );
};

export default AllJobs;
