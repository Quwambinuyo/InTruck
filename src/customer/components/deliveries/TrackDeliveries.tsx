import { useState } from "react";
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import StatusPill from "../../../ui/StatusPill";
import FilterChip from "../../../ui/FilterChip";
import TrackDeliveryDrawer from "./TrackDeliveryDrawer";

type DeliveryStatus = "pending" | "in_transit" | "delivered" | "cancelled";

type Delivery = {
  id: string;
  title: string;
  driver: string;
  truck: string;
  pickup: string;
  dropoff: string;
  date: string;
  status: DeliveryStatus;
  progress: number;
  pickupCoords?: [number, number];
  dropoffCoords?: [number, number];
};

const MOCK_DELIVERIES: Delivery[] = [
  {
    id: "1",
    title: "Cement Delivery",
    driver: "John Cargo",
    truck: "Flatbed Truck",
    pickup: "Apapa, Lagos",
    dropoff: "Lekki, Lagos",
    date: "2026-06-14",
    status: "in_transit",
    progress: 65,
    pickupCoords: [6.4281, 3.3694],
    dropoffCoords: [6.4698, 3.5852],
  },
  {
    id: "2",
    title: "Steel Transport",
    driver: "Mike Haulage",
    truck: "Low Loader",
    pickup: "Ikeja, Lagos",
    dropoff: "Victoria Island, Lagos",
    date: "2026-06-10",
    status: "delivered",
    progress: 100,
    pickupCoords: [6.6018, 3.3515],
    dropoffCoords: [6.4281, 3.4219],
  },
  {
    id: "3",
    title: "Sand Supply",
    driver: "Ade Logistics",
    truck: "Tipper",
    pickup: "Surulere, Lagos",
    dropoff: "Ajah, Lagos",
    date: "2026-06-08",
    status: "pending",
    progress: 20,
    pickupCoords: [6.5006, 3.3523],
    dropoffCoords: [6.4667, 3.5976],
  },
];

type Filter = DeliveryStatus | "all";

const FILTERS: Filter[] = [
  "all",
  "pending",
  "in_transit",
  "delivered",
  "cancelled",
];

const TrackDeliveries = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Delivery | null>(null);

  const filtered =
    filter === "all"
      ? MOCK_DELIVERIES
      : MOCK_DELIVERIES.filter((d) => d.status === filter);

  return (
    <div className="w-full space-y-4 pb-6">
      <div>
        <h2 className="text-[20px] text-black zabalBoldFont">
          Track Deliveries
        </h2>
        <p className="text-[12px] text-black/40">
          Monitor your shipments in real time
        </p>
      </div>

      <FilterChip options={FILTERS} value={filter} onChange={setFilter} />

      <div className="space-y-3">
        {filtered.map((d) => (
          <div
            key={d.id}
            onClick={() => setSelected(d)}
            className="bg-white border border-black/[0.08] rounded-2xl p-4 space-y-3 cursor-pointer hover:border-black/20 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[14px] text-black zabalBoldFont">
                  {d.title}
                </h3>
                <p className="text-[11px] text-black/40 mt-0.5">{d.driver}</p>
              </div>
              <StatusPill status={d.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[12px] text-black/50">
              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt size={11} />
                <span className="truncate">{d.pickup}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt size={11} />
                <span className="truncate">{d.dropoff}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <FaCalendarAlt size={11} />
                <span>{d.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <FaTruck size={11} />
                <span>{d.truck}</span>
              </div>
            </div>

            <div>
              <div className="h-1.5 bg-black/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${d.progress}%` }}
                />
              </div>
              <p className="text-[11px] text-black/30 mt-1">
                {d.progress}% completed
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-[13px] text-black/30">
          No deliveries found
        </div>
      )}

      <TrackDeliveryDrawer
        delivery={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default TrackDeliveries;
