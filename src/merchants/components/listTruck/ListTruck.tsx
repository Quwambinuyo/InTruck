import { useState, useMemo } from "react";
import DataTable, { type ColumnDef } from "../../../ui/DataTable";
import StatusPill from "../../../ui/StatusPill";
import Button from "../../../ui/Button";
import StatCard from "../../../ui/StatCard";
import { SelectField } from "../../../pages/auth/FormField";
import SearchInput from "../../../ui/SearchInput";
import {
  SEED_TRUCKS,
  STATUS_OPTIONS,
  type Truck,
} from "../../mock/mockListTruckData";
import Avatar from "../../../ui/Avatar";

const COLUMNS: ColumnDef<Truck>[] = [
  {
    label: "Plate / ID",
    span: 2,
    render: (row) => (
      <div>
        <p className="text-sm font-semibold text-black">{row.plate}</p>
        <p className="text-xs font-mono text-black/40 mt-0.5">{row.id}</p>
      </div>
    ),
  },
  {
    label: "Make & model",
    span: 2,
    render: (row) => (
      <div>
        <p className="text-[12px] text-black zabalBoldFont">
          {row.make} {row.model}
        </p>
        <p className="text-xs text-black mt-0.5">{row.year}</p>
      </div>
    ),
  },
  {
    label: "Type",
    span: 2,
    render: (row) => <p className="text-[12px] text-black">{row.type}</p>,
  },
  {
    label: "Capacity",
    span: 2,
    render: (row) => <p className="text-[12px] text-black">{row.capacity}t</p>,
  },
  {
    label: "Status",
    span: 2,
    render: (row) => <StatusPill status={row.status} />,
  },
  {
    label: "Assigned driver",
    span: 2,
    render: (row) =>
      row.driver ? (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.driver.name} size={32} />
          <div>
            <p className="text-[12px] text-black zabalBoldFont leading-tight">
              {row.driver.name}
            </p>
            <p className="text-xs text-black mt-0.5">{row.driver.licence}</p>
          </div>
        </div>
      ) : (
        <p className="text-[12px] text-black/30 italic">Unassigned</p>
      ),
  },
  {
    label: "Actions",
    span: 1,
    render: () => (
      <button className="zabalBoldFont px-3 py-1.5 text-purple-800 text-[11px]">
        Assign
      </button>
    ),
  },
];

const ListTruck = () => {
  const [trucks] = useState<Truck[]>(SEED_TRUCKS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return trucks.filter((t) => {
      const matchQ =
        !q ||
        `${t.plate} ${t.make} ${t.model} ${t.id}`.toLowerCase().includes(q);
      const matchS = !statusFilter || t.status === statusFilter;
      return matchQ && matchS;
    });
  }, [trucks, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: trucks.length,
      active: trucks.filter((t) => t.status === "active").length,
      idle: trucks.filter((t) => t.status === "idle").length,
      maintenance: trucks.filter((t) => t.status === "maintenance").length,
      unassigned: trucks.filter((t) => !t.driver).length,
    }),
    [trucks],
  );

  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-0">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-black">Trucks</h1>
          <p className="text-sm text-black/40 mt-1">
            Manage your fleet, register trucks, and assign drivers
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            className="rounded-md text-[12px] px-5 bg-black"
            variant="merchant"
          >
            + Register truck
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <StatCard
          label="Total trucks"
          value={String(stats.total)}
          tooltip="All registered fleet units"
        />

        <StatCard
          label="Active"
          value={String(stats.active)}
          tooltip="Currently on delivery or in motion"
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
          tooltip="Available but not assigned"
          trend="flat"
          delta={
            stats.total
              ? `${Math.round((stats.idle / stats.total) * 100)}%`
              : "0%"
          }
        />

        <StatCard
          label="Maintenance"
          value={String(stats.maintenance)}
          tooltip="Under service or repair"
          trend="down"
          delta={
            stats.total
              ? `${Math.round((stats.maintenance / stats.total) * 100)}%`
              : "0%"
          }
        />

        <StatCard
          label="Unassigned"
          value={String(stats.unassigned)}
          tooltip="Trucks with no driver currently assigned"
        />

        <StatCard
          label="Coverage"
          value={
            stats.total
              ? `${Math.round(((stats.active + stats.idle + stats.maintenance) / stats.total) * 100)}%`
              : "0%"
          }
          tooltip="Fleet utilization coverage across all trucks"
        />
      </div>

      <div className="flex gap-3 mb-5 flex-wrap items-end">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search plate, make, model..."
          className="flex-1 min-w-[200px] max-w-sm"
        />
        <SelectField
          label=""
          value={statusFilter}
          open={statusOpen}
          setOpen={setStatusOpen}
          options={STATUS_OPTIONS}
          placeholder="All statuses"
          onChange={setStatusFilter}
          className="w-48"
        />
      </div>

      <div className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden">
        <DataTable<Truck>
          columns={COLUMNS}
          rows={filtered}
          getKey={(row) => row.id}
          emptyMessage="No trucks found."
          minWidth="1000px"
        />
      </div>
    </div>
  );
};

export default ListTruck;
