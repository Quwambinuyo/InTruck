import { useState, useMemo } from "react";
import StatCard from "../../../ui/StatCard";
import SearchInput from "../../../ui/SearchInput";
import { SelectField } from "../../../pages/auth/FormField";
import DataTable, { type ColumnDef } from "../../../ui/DataTable";
import JobRequestDrawer from "./JobRequestDrawer";
import {
  SEED_JOB_REQUESTS,
  JOB_STATUS_OPTIONS,
  JOB_PRIORITY_OPTIONS,
  type JobRequestType,
} from "../../mock/mockJobRequestData";

const PriorityBadge = ({
  priority,
}: {
  priority: JobRequestType["priority"];
}) => {
  const map = {
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

const JobStatusBadge = ({ status }: { status: JobRequestType["status"] }) => {
  const map = {
    pending: {
      label: "Pending",
      className: "bg-yellow-50 text-yellow-700 border-yellow-100",
    },
    accepted: {
      label: "Accepted",
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

const formatCurrency = (n: number) => `₦${n.toLocaleString("en-NG")}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const COLUMNS: ColumnDef<JobRequestType>[] = [
  {
    label: "Job ID",
    span: 2,
    render: (row) => (
      <div>
        <p className="text-[12px] font-mono font-semibold text-black">
          {row.id}
        </p>
        <p className="text-xs text-black/40 mt-0.5">
          {formatDate(row.requestDate)}
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
    label: "Driver",
    span: 2,
    render: (row) =>
      row.assignedDriver ? (
        <div>
          <p className="text-[12px] font-semibold text-black">
            {row.assignedDriver}
          </p>
          <p className="text-xs font-mono text-black/40 mt-0.5">
            {row.assignedPlate}
          </p>
        </div>
      ) : (
        <p className="text-[12px] text-black/30 italic">Unassigned</p>
      ),
  },
  {
    label: "Value",
    span: 2,
    render: (row) => (
      <p className="text-[12px] font-semibold text-black">
        {formatCurrency(row.amountNgn)}
      </p>
    ),
  },
  {
    label: "Priority",
    span: 1,
    render: (row) => <PriorityBadge priority={row.priority} />,
  },
  {
    label: "Status",
    span: 2,
    render: (row) => <JobStatusBadge status={row.status} />,
  },
];

const JobRequest = () => {
  const [jobs] = useState<JobRequestType[]>(SEED_JOB_REQUESTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [selected, setSelected] = useState<JobRequestType | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jobs.filter((j) => {
      const matchQ =
        !q ||
        `${j.id} ${j.requestedBy} ${j.pickupState} ${j.deliveryState} ${j.cargoType} ${j.truckType} ${j.assignedDriver ?? ""}`
          .toLowerCase()
          .includes(q);
      const matchS = !statusFilter || j.status === statusFilter;
      const matchP = !priorityFilter || j.priority === priorityFilter;
      return matchQ && matchS && matchP;
    });
  }, [jobs, search, statusFilter, priorityFilter]);

  const stats = useMemo(
    () => ({
      total: jobs.length,
      pending: jobs.filter((j) => j.status === "pending").length,
      inTransit: jobs.filter((j) => j.status === "in_transit").length,
      delivered: jobs.filter((j) => j.status === "delivered").length,
      urgent: jobs.filter((j) => j.priority === "urgent").length,
      unassigned: jobs.filter(
        (j) => !j.assignedDriver && j.status === "pending",
      ).length,
    }),
    [jobs],
  );

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-black">Job Requests</h1>
          <p className="text-sm text-black/40 mt-1">
            Track and manage all incoming and active logistics requests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <StatCard
          label="Total requests"
          value={String(stats.total)}
          tooltip="All job requests"
        />
        <StatCard
          label="Pending"
          value={String(stats.pending)}
          tooltip="Awaiting driver assignment or acceptance"
          trend="flat"
          delta={
            stats.total
              ? `${Math.round((stats.pending / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="In transit"
          value={String(stats.inTransit)}
          tooltip="Jobs currently on the road"
          trend="up"
          delta={
            stats.total
              ? `${Math.round((stats.inTransit / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Delivered"
          value={String(stats.delivered)}
          tooltip="Successfully completed deliveries"
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
          tooltip="High-priority requests"
          trend="down"
          delta={
            stats.total
              ? `${Math.round((stats.urgent / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Needs driver"
          value={String(stats.unassigned)}
          tooltip="Pending requests without an assigned driver"
          trend="down"
          delta={
            stats.pending
              ? `${Math.round((stats.unassigned / stats.pending) * 100)}% of pending`
              : "0%"
          }
        />
      </div>

      <div className="flex gap-3 mb-5 flex-wrap items-end">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search ID, client, route, cargo..."
          className="flex-1 min-w-[200px] max-w-sm"
        />
        <SelectField
          label=""
          value={statusFilter}
          open={statusOpen}
          setOpen={setStatusOpen}
          options={JOB_STATUS_OPTIONS}
          placeholder="All statuses"
          onChange={setStatusFilter}
          className="w-44"
        />
        <SelectField
          label=""
          value={priorityFilter}
          open={priorityOpen}
          setOpen={setPriorityOpen}
          options={JOB_PRIORITY_OPTIONS}
          placeholder="All priorities"
          onChange={setPriorityFilter}
          className="w-40"
        />
      </div>

      <div className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden">
        <DataTable<JobRequestType>
          columns={COLUMNS}
          rows={filtered}
          getKey={(row) => row.id}
          onRowClick={(row) => setSelected(row)}
          emptyMessage="No job requests found."
          minWidth="1200px"
        />
      </div>

      <JobRequestDrawer
        job={selected}
        onClose={() => setSelected(null)}
        onAccept={(job) => {
          console.log("accept job", job.id);
        }}
        onCancel={(job) => {
          console.log("cancel job", job.id);
        }}
        onContact={(job) => {
          console.log("contact driver for job", job.id);
        }}
      />
    </div>
  );
};

export default JobRequest;
