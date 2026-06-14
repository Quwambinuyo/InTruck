import { useState, useMemo } from "react";
import StatCard from "../../../ui/StatCard";
import StatusPill from "../../../ui/StatusPill";
import SearchInput from "../../../ui/SearchInput";
import { SelectField } from "../../../pages/auth/FormField";
import Avatar from "../../../ui/Avatar";
import DataTable, { type ColumnDef } from "../../../ui/DataTable";
import FleetDrawer from "./FleetDrawer";
import {
  FLEET_TRUCKS,
  FLEET_STATUS_OPTIONS,
  type Fleet,
} from "../../mock/mockFleetData";

const COLUMNS: ColumnDef<Fleet>[] = [
  {
    label: "Truck",
    span: 3,
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-14 h-10 rounded-lg overflow-hidden border border-black/[0.07] flex-shrink-0 bg-black/[0.03]">
          <img
            src={row.image}
            alt={`${row.make} ${row.model}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[13px] zabalBoldFont font-semibold text-black">
            {row.plate}
          </p>
          <p className="text-xs font-mono text-black/40 mt-0.5">{row.id}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Make & model",
    span: 2,
    render: (row) => (
      <div>
        <p className="text-[12px] zabalBoldFont text-black">
          {row.make} {row.model}
        </p>
        <p className="text-xs text-black/40 mt-0.5">
          {row.year} · {row.type}
        </p>
      </div>
    ),
  },
  {
    label: "Capacity",
    span: 1,
    render: (row) => <p className="text-[12px] text-black">{row.capacity}t</p>,
  },
  {
    label: "Location",
    span: 2,
    render: (row) => (
      <p className="text-[12px] text-black/70 truncate max-w-[140px]">
        {row.location}
      </p>
    ),
  },
  {
    label: "Status",
    span: 2,
    render: (row) => <StatusPill status={row.status} />,
  },
  {
    label: "Assigned driver",
    span: 3,
    render: (row) =>
      row.driver ? (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.driver.name} size={30} />
          <div>
            <p className="text-[12px] zabalBoldFont text-black leading-tight">
              {row.driver.name}
            </p>
            <p className="text-xs text-black/40 mt-0.5">{row.driver.licence}</p>
          </div>
        </div>
      ) : (
        <p className="text-[12px] text-black/30 italic">Unassigned</p>
      ),
  },
];

const MyFleet = () => {
  const [fleets] = useState<Fleet[]>(FLEET_TRUCKS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [selected, setSelected] = useState<Fleet | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return fleets.filter((f) => {
      const matchQ =
        !q ||
        `${f.plate} ${f.make} ${f.model} ${f.id}`.toLowerCase().includes(q);
      const matchS = !statusFilter || f.status === statusFilter;
      return matchQ && matchS;
    });
  }, [fleets, search, statusFilter]);

  const stats = useMemo(
    () => ({
      idle: fleets.filter((f) => f.status === "idle").length,
      active: fleets.filter((f) => f.status === "active").length,
      maintenance: fleets.filter((f) => f.status === "maintenance").length,
      assigned: fleets.filter((f) => !!f.driver).length,
      unassigned: fleets.filter((f) => !f.driver).length,
    }),
    [fleets],
  );

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-black">My Fleet</h1>
          <p className="text-sm text-black/40 mt-1">
            Overview of all registered trucks and their current status
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <StatCard
          label="Available trucks"
          value={String(stats.idle)}
          tooltip="Idle trucks ready to be dispatched"
          trend="up"
          delta={
            fleets.length
              ? `${Math.round((stats.idle / fleets.length) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Active"
          value={String(stats.active)}
          tooltip="Currently on delivery or in motion"
          trend="flat"
          delta={
            fleets.length
              ? `${Math.round((stats.active / fleets.length) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Maintenance"
          value={String(stats.maintenance)}
          tooltip="Under service or repair"
          trend="down"
          delta={
            fleets.length
              ? `${Math.round((stats.maintenance / fleets.length) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          label="Drivers assigned"
          value={String(stats.assigned)}
          tooltip="Trucks with a driver currently assigned"
        />
        <StatCard
          label="Unassigned"
          value={String(stats.unassigned)}
          tooltip="Trucks with no driver currently assigned"
        />
        <StatCard
          label="Fleet size"
          value={String(fleets.length)}
          tooltip="Total registered fleet units"
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
          options={FLEET_STATUS_OPTIONS}
          placeholder="All statuses"
          onChange={setStatusFilter}
          className="w-48"
        />
      </div>

      <div className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden">
        <DataTable<Fleet>
          columns={COLUMNS}
          rows={filtered}
          getKey={(row) => row.id}
          onRowClick={(row) => setSelected(row)}
          emptyMessage="No trucks found."
          minWidth="1000px"
        />
      </div>

      <FleetDrawer
        fleet={selected}
        onClose={() => setSelected(null)}
        onAssignDriver={(fleet) => {
          console.log("assign driver to", fleet.id);
        }}
        onUnassignDriver={(fleet) => {
          console.log("unassign driver from", fleet.id);
        }}
      />
    </div>
  );
};

export default MyFleet;
