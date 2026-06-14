import { useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import StatCard from "../../../ui/StatCard";
import StatusPill from "../../../ui/StatusPill";
import SearchInput from "../../../ui/SearchInput";
import { SelectField } from "../../../pages/auth/FormField";
import Button from "../../../ui/Button";
import DataTable, { type ColumnDef } from "../../../ui/DataTable";
import MyDriverDrawer from "./MyDriverDrawer";
import {
  SEED_MY_DRIVERS,
  DRIVER_STATUS_OPTIONS,
  DRIVER_KYC_OPTIONS,
  type MyDriver,
  type KYCStatus,
} from "../../mock/mockMyDriverData";

const KYCBadge = ({ status }: { status: KYCStatus }) => {
  const map: Record<KYCStatus, { label: string; className: string }> = {
    verified: {
      label: "Verified",
      className: "bg-green-50 text-green-700 border-green-100",
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-50 text-yellow-700 border-yellow-100",
    },
    rejected: {
      label: "Rejected",
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

const COLUMNS: ColumnDef<MyDriver>[] = [
  {
    label: "Driver",
    span: 3,
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-black/[0.08] flex-shrink-0">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[13px] zabalBoldFont font-semibold text-black">
            {row.name}
          </p>
          <p className="text-xs font-mono text-black/40 mt-0.5">{row.id}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Contact",
    span: 2,
    render: (row) => (
      <div>
        <p className="text-[12px] text-black">{row.phone}</p>
        <p className="text-xs text-black/40 mt-0.5">{row.state}</p>
      </div>
    ),
  },
  {
    label: "Licence ID",
    span: 2,
    render: (row) => (
      <p className="text-[12px] font-mono text-black">{row.licenceId}</p>
    ),
  },
  {
    label: "Truck type",
    span: 2,
    render: (row) => <p className="text-[12px] text-black">{row.truckType}</p>,
  },
  {
    label: "Assigned plate",
    span: 2,
    render: (row) =>
      row.assignedPlate ? (
        <p className="text-[12px] zabalBoldFont font-semibold text-black">
          {row.assignedPlate}
        </p>
      ) : (
        <p className="text-[12px] text-black/30 italic">None</p>
      ),
  },
  {
    label: "Rating",
    span: 1,
    render: (row) => (
      <div className="flex items-center gap-1">
        <FaStar className="text-yellow-400" size={11} />
        <p className="text-[12px] text-black">{row.rating.toFixed(1)}</p>
      </div>
    ),
  },
  {
    label: "KYC",
    span: 2,
    render: (row) => <KYCBadge status={row.kycStatus} />,
  },
  {
    label: "Status",
    span: 2,
    render: (row) => <StatusPill status={row.status} />,
  },
];

const MyDriver = () => {
  const [drivers] = useState<MyDriver[]>(SEED_MY_DRIVERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [kycFilter, setKycFilter] = useState("");
  const [kycOpen, setKycOpen] = useState(false);
  const [selected, setSelected] = useState<MyDriver | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return drivers.filter((d) => {
      const matchQ =
        !q ||
        `${d.name} ${d.phone} ${d.licenceId} ${d.id} ${d.assignedPlate ?? ""}`
          .toLowerCase()
          .includes(q);
      const matchS = !statusFilter || d.status === statusFilter;
      const matchK = !kycFilter || d.kycStatus === kycFilter;
      return matchQ && matchS && matchK;
    });
  }, [drivers, search, statusFilter, kycFilter]);

  const stats = useMemo(
    () => ({
      total: drivers.length,
      active: drivers.filter((d) => d.status === "active").length,
      idle: drivers.filter((d) => d.status === "idle").length,
      assigned: drivers.filter((d) => d.status === "assigned").length,
      verified: drivers.filter((d) => d.kycStatus === "verified").length,
      pending: drivers.filter((d) => d.kycStatus === "pending").length,
    }),
    [drivers],
  );

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-black">My Drivers</h1>
          <p className="text-sm text-black/40 mt-1">
            Manage registered drivers, KYC documents, and truck assignments
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            className="rounded-md text-[12px] px-5 bg-black"
            variant="merchant"
          >
            + Register driver
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <StatCard
          label="Total drivers"
          value={String(stats.total)}
          tooltip="All registered drivers"
        />
        <StatCard
          label="Active"
          value={String(stats.active)}
          tooltip="Currently on a trip"
          trend="up"
          delta={
            stats.total
              ? `${Math.round((stats.active / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Idle"
          value={String(stats.idle)}
          tooltip="Available and not on a trip"
          trend="flat"
          delta={
            stats.total
              ? `${Math.round((stats.idle / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Assigned"
          value={String(stats.assigned)}
          tooltip="Drivers with a truck assigned"
          trend="up"
          delta={
            stats.total
              ? `${Math.round((stats.assigned / stats.total) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="KYC verified"
          value={String(stats.verified)}
          tooltip="Drivers with verified documents"
        />
        <StatCard
          label="KYC pending"
          value={String(stats.pending)}
          tooltip="Drivers awaiting document verification"
          trend="down"
          delta={
            stats.total
              ? `${Math.round((stats.pending / stats.total) * 100)}%`
              : "0%"
          }
        />
      </div>

      <div className="flex gap-3 mb-5 flex-wrap items-end">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search name, phone, licence..."
          className="flex-1 min-w-[200px] max-w-sm"
        />
        <SelectField
          label=""
          value={statusFilter}
          open={statusOpen}
          setOpen={setStatusOpen}
          options={DRIVER_STATUS_OPTIONS}
          placeholder="All statuses"
          onChange={setStatusFilter}
          className="w-44"
        />
        <SelectField
          label=""
          value={kycFilter}
          open={kycOpen}
          setOpen={setKycOpen}
          options={DRIVER_KYC_OPTIONS}
          placeholder="All KYC"
          onChange={setKycFilter}
          className="w-40"
        />
      </div>

      <div className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden">
        <DataTable<MyDriver>
          columns={COLUMNS}
          rows={filtered}
          getKey={(row) => row.id}
          onRowClick={(row) => setSelected(row)}
          emptyMessage="No drivers found."
          minWidth="1100px"
        />
      </div>

      <MyDriverDrawer
        driver={selected}
        onClose={() => setSelected(null)}
        onAssignTruck={(driver) => {
          console.log("assign truck to", driver.id);
        }}
        onUnassignTruck={(driver) => {
          console.log("unassign truck from", driver.id);
        }}
        onContact={(driver) => {
          console.log("contact", driver.phone);
        }}
      />
    </div>
  );
};

export default MyDriver;
