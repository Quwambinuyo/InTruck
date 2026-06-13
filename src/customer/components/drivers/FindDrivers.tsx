import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaStar, FaTruck, FaCircle } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import SearchInput from "../../../ui/SearchInput";
import FilterChip from "../../../ui/FilterChip";
import StatusPill from "../../../ui/StatusPill";
import DataTable, { type ColumnDef } from "../../../ui/DataTable";
import DriverDrawer from "./DriverDrawer";
import {
  MOCK_DRIVERS,
  type Driver,
  type DriverStatus,
} from "../../mock/mockDrivers";

type FilterStatus = "all" | DriverStatus;
type FilterTruck = "all" | string;

const STATUS_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "offline", label: "Offline" },
];

const TRUCK_OPTIONS: { value: FilterTruck; label: string }[] = [
  { value: "all", label: "All trucks" },
  { value: "Flatbed", label: "Flatbed" },
  { value: "Tipper", label: "Tipper" },
  { value: "Tanker", label: "Tanker" },
  { value: "Low Loader", label: "Low Loader" },
  { value: "Curtainsider", label: "Curtainsider" },
];

const STATUS_COLORS: Record<DriverStatus, string> = {
  available: "#16a34a",
  busy: "#d97706",
  offline: "#9ca3af",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function makeMarkerIcon(status: DriverStatus, active = false) {
  const color = STATUS_COLORS[status];
  const size = active ? 44 : 36;
  const pinH = active ? 54 : 44;
  const r = active ? 11 : 9;
  const cx = size / 2;
  const svg = `
    <svg width="${size}" height="${pinH}" viewBox="0 0 ${size} ${pinH}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="${cx}" cy="${pinH - 2}" rx="${active ? 7 : 6}" ry="2" fill="rgba(0,0,0,0.18)"/>
      <path d="M${cx} 0C${cx - 9.94} 0 0 ${cx - 9.94} 0 ${cx}c0 ${active ? 14.7 : 12} ${cx} ${active ? 32 : 26} ${cx} ${active ? 32 : 26}S${size} ${active ? 37 : 30} ${size} ${cx}C${size} ${cx - 9.94} ${cx + 9.94} 0 ${cx} 0z" fill="${color}"/>
      ${active ? `<circle cx="${cx}" cy="${cx}" r="${r + 3}" fill="white" opacity="0.25"/>` : ""}
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="white" opacity="0.9"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [size, pinH],
    iconAnchor: [cx, pinH],
    popupAnchor: [0, -pinH],
  });
}

const COLUMNS: ColumnDef<Driver>[] = [
  {
    label: "Driver",
    span: 2,
    render: (driver) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black/5 text-black/50 text-[11px] font-black flex items-center justify-center shrink-0">
          {getInitials(driver.name)}
        </div>
        <p className="text-[13px] font-black text-black truncate">
          {driver.name}
        </p>
      </div>
    ),
  },
  {
    label: "Status",
    span: 1,
    render: (driver) => <StatusPill status={driver.status} />,
  },
  {
    label: "Truck",
    span: 1,
    render: (driver) => (
      <div className="flex items-center gap-1.5">
        <FaTruck className="text-black text-[10px]" />
        <p className="text-[12px] text-black/70">{driver.truckType}</p>
      </div>
    ),
  },
  {
    label: "Location",
    span: 2,
    render: (driver) => (
      <p className="text-[12px] text-blacktruncate flex items-center gap-2 ">
        <CiLocationOn className="text-red-600" size={20} /> {driver.location}
      </p>
    ),
  },
  {
    label: "Rating",
    span: 1,
    render: (driver) => (
      <div className="flex items-center gap-1">
        <FaStar className="text-yellow-400" size={10} />
        <p className="text-[12px] font-semibold text-black">
          {driver.rating.toFixed(1)}
        </p>
        <p className="text-[12px] text-black/30">({driver.reviewCount})</p>
      </div>
    ),
  },
  {
    label: "Jobs",
    span: 1,
    render: (driver) => (
      <p className="text-[12px] text-black">{driver.numberOfJobs}</p>
    ),
  },
  {
    label: "Completed Jobs",
    span: 1,
    render: (driver) => (
      <div className="flex items-center gap-1.5">
        <p className="text-[12px] text-black">{driver.jobsCompleted}</p>
        <p className="text-[11px] text-black/30">
          ({Math.round((driver.jobsCompleted / driver.numberOfJobs) * 100)}%)
        </p>
      </div>
    ),
  },
];

const FindDrivers = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [truckFilter, setTruckFilter] = useState<FilterTruck>("all");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const filtered = useMemo(
    () =>
      MOCK_DRIVERS.filter((d) => {
        if (statusFilter !== "all" && d.status !== statusFilter) return false;
        if (truckFilter !== "all" && d.truckType !== truckFilter) return false;
        if (
          search &&
          !d.name.toLowerCase().includes(search.toLowerCase()) &&
          !d.location.toLowerCase().includes(search.toLowerCase()) &&
          !d.truckType.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        return true;
      }),
    [search, statusFilter, truckFilter],
  );

  const availableDrivers = useMemo(
    () => MOCK_DRIVERS.filter((d) => d.status === "available"),
    [],
  );

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current, {
      center: [9.082, 8.6753],
      zoom: 6,
      zoomControl: false,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    mapInstanceRef.current = map;
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();
    availableDrivers.forEach((driver) => {
      const isActive = selectedDriver?.id === driver.id;
      const marker = L.marker([driver.lat, driver.lng], {
        icon: makeMarkerIcon(driver.status, isActive),
        zIndexOffset: isActive ? 1000 : 0,
      }).addTo(map);
      marker.bindTooltip(
        `<div style="font-size:12px;font-weight:700;color:#000">${driver.name}</div>
         <div style="font-size:11px;color:#888">${driver.truckType} · ${driver.location}</div>`,
        {
          direction: "top",
          offset: [0, -44],
          className: "leaflet-tooltip-custom",
        },
      );
      marker.on("click", () => handleRowClick(driver));
      markersRef.current.set(driver.id, marker);
    });
  }, [availableDrivers, selectedDriver]);

  const handleRowClick = useCallback((driver: Driver) => {
    setSelectedDriver(driver);
    const map = mapInstanceRef.current;
    if (map && driver.status === "available") {
      map.flyTo([driver.lat, driver.lng], 10, { duration: 0.8 });
    }
  }, []);

  const handleStatusFilterChange = useCallback((label: string) => {
    const match = STATUS_OPTIONS.find((o) => o.label === label);
    if (match) setStatusFilter(match.value);
  }, []);

  const handleTruckFilterChange = useCallback((label: string) => {
    const match = TRUCK_OPTIONS.find((o) => o.label === label);
    if (match) setTruckFilter(match.value);
  }, []);

  return (
    <>
      <div className="w-full max-w-full overflow-x-hidden space-y-4 pb-5">
        <div className="pt-1">
          <h2 className="text-lg font-black text-black">Find drivers</h2>
          <p className="text-xs text-black/40 mt-0.5">
            Browse available drivers across Nigeria
          </p>
        </div>

        <div className="relative h-[280px] rounded-2xl overflow-hidden border border-black/10">
          <div ref={mapRef} className="w-full h-full" />

          <div className="absolute bottom-3 left-3 z-[10] bg-white/95 backdrop-blur border border-black/10 rounded-xl px-3 py-2 flex items-center gap-3">
            {(["available", "busy", "offline"] as DriverStatus[]).map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <FaCircle size={8} color={STATUS_COLORS[s]} />
                <p className="text-[11px] text-black/60 capitalize">{s}</p>
              </div>
            ))}
          </div>

          <div className="absolute top-3 right-3 z-[5] bg-white/95 backdrop-blur border border-black/10 rounded-xl px-3 py-2">
            <p className="text-[11px] text-black/50">
              <span className="font-black text-black">
                {availableDrivers.length}
              </span>{" "}
              available now
            </p>
          </div>

          <div className="absolute top-3 left-3 z-[10] bg-white/95 backdrop-blur border border-black/10 rounded-xl px-3 py-2">
            <p className="text-[11px] text-black/50 font-semibold">
              Showing available drivers only
            </p>
          </div>
        </div>

        <div className="bg-white border border-black/10 rounded-2xl p-4 space-y-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name, location or truck type…"
          />
          <FilterChip<string>
            options={STATUS_OPTIONS.map((o) => o.label)}
            value={STATUS_OPTIONS.find((o) => o.value === statusFilter)!.label}
            onChange={handleStatusFilterChange}
          />
          <FilterChip<string>
            options={TRUCK_OPTIONS.map((o) => o.label)}
            value={TRUCK_OPTIONS.find((o) => o.value === truckFilter)!.label}
            onChange={handleTruckFilterChange}
          />
          <p className="text-[11px] text-black/30">
            {filtered.length} driver{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
          <DataTable<Driver>
            columns={COLUMNS}
            rows={filtered}
            getKey={(d) => d.id}
            onRowClick={handleRowClick}
            emptyMessage="No drivers match your filters."
            minWidth="800px"
          />
        </div>
      </div>

      <DriverDrawer
        driver={selectedDriver}
        onClose={() => setSelectedDriver(null)}
        onContact={(driver) => window.open(`tel:${driver.phone}`)}
        onAssignJob={() => setSelectedDriver(null)}
      />
    </>
  );
};

export default FindDrivers;
