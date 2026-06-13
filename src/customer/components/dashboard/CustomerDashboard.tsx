import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaWallet,
  FaClock,
  FaArrowRight,
  FaPlus,
} from "react-icons/fa";
import StatCard from "../../../ui/StatCard";
import Button from "../../../ui/Button";
import StatusPill from "../../../ui/StatusPill";

const DELIVERIES = [
  {
    id: "TRK-8821",
    route: "Lagos → Ibadan",
    truck: "Mack Granite 6×4",
    status: "In Transit",
    progress: 75,
    coords: [6.9, 3.9],
  },
  {
    id: "TRK-8820",
    route: "Abuja → Kaduna",
    truck: "Volvo FH16",
    status: "Loading",
    progress: 35,
    coords: [9.05785, 7.49508],
  },
];

const ORDERS = [
  {
    id: "#TRK001",
    service: "Truck Rental",
    date: "12 Jun 2026",
    amount: "₦120,000",
    status: "completed",
  },
  {
    id: "#TRK002",
    service: "Granite Delivery",
    date: "11 Jun 2026",
    amount: "₦450,000",
    status: "pending",
  },
  {
    id: "#TRK003",
    service: "Sand Delivery",
    date: "10 Jun 2026",
    amount: "₦85,000",
    status: "in_transit",
  },
];

function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (instanceRef.current || !mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [8.5, 5.5],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 19 },
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const truckIcon = (color: string) =>
      L.divIcon({
        className: "",
        html: `<div style="width:34px;height:34px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.25);">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 640 512">
            <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7C500 102.7 483.7 96 467.3 96H416V48c0-26.5-21.5-48-48-48H48z"/>
          </svg>
        </div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

    L.marker([6.9, 3.9], { icon: truckIcon("#000000") })
      .addTo(map)
      .bindPopup("<b>TRK-8821</b><br>Lagos → Ibadan<br>75% complete");

    L.marker([9.05785, 7.49508], { icon: truckIcon("#000000") })
      .addTo(map)
      .bindPopup("<b>TRK-8820</b><br>Abuja → Kaduna<br>Loading");

    instanceRef.current = map;

    return () => {
      map.remove();
      instanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} className="h-full w-full" />;
}

const CustomerDashboard = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">Overview</h2>

        <button className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/80 transition">
          <FaPlus size={12} />
          Book a Truck
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        <div className="min-w-0">
          <StatCard
            label="Active Deliveries"
            value="12"
            delta="8% this week"
            trend="up"
            icon={<FaTruck size={15} />}
            sparkline={[7, 9, 8, 11, 10, 12, 12]}
            tooltip="Number of shipments currently on the road. Counts any delivery with status 'In Transit' or 'Loading' at this moment."
          />
        </div>

        <div className="min-w-0">
          <StatCard
            label="Wallet Balance"
            value="₦450,000"
            trend="flat"
            icon={<FaWallet size={15} />}
            tooltip="Your current InTruck wallet balance. Fund your wallet to pay for truck bookings, deliveries, and other platform services instantly."
            footer={
              <div className="mt-2">
                <Button
                  variant="customer"
                  fullWidth={false}
                  className="!py-1.5 px-3 text-xs rounded-lg"
                >
                  Fund Wallet
                </Button>
              </div>
            }
          />
        </div>

        <div className="min-w-0">
          <StatCard
            label="Total Orders"
            value="54"
            delta="3 this month"
            trend="up"
            icon={<FaMapMarkerAlt size={15} />}
            sparkline={[40, 44, 46, 48, 50, 52, 54]}
            tooltip="Cumulative number of orders you have placed on the platform — including truck rentals, material deliveries, and scheduled runs."
          />
        </div>

        <div className="min-w-0">
          <StatCard
            label="Pending Requests"
            value="4"
            trend="flat"
            icon={<FaClock size={15} />}
            tooltip="Booking requests that have been submitted but not yet confirmed by a truck operator. These are awaiting driver acceptance or admin review."
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-black/10 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
            <div>
              <h3 className="font-semibold text-black">Live Tracking</h3>
              <p className="text-xs text-black/50 mt-0.5">
                2 trucks active right now
              </p>
            </div>

            <button className="text-sm font-medium text-black hover:underline">
              Full map
            </button>
          </div>

          <div className="h-[280px] sm:h-[320px]">
            <LiveMap />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-black/10 bg-white p-5">
          <h3 className="font-semibold text-black mb-4">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <FaTruck size={18} />,
                label: "Rent a Truck",
                desc: "Book instantly",
              },
              {
                icon: <FaMapMarkerAlt size={18} />,
                label: "Granite Delivery",
                desc: "Schedule a run",
              },
              {
                icon: <FaWallet size={18} />,
                label: "Fund Wallet",
                desc: "Top up balance",
              },
              {
                icon: <FaClock size={18} />,
                label: "Track Shipment",
                desc: "View live location",
              },
            ].map((a) => (
              <button
                key={a.label}
                className="rounded-xl border border-black/10 p-3 text-left hover:bg-black/5 transition"
              >
                <span className="text-black mb-2 block">{a.icon}</span>
                <p className="text-sm font-semibold text-black leading-tight">
                  {a.label}
                </p>
                <p className="text-xs text-black/50 mt-0.5">{a.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-black">Active Deliveries</h3>

          <button className="text-sm text-black hover:underline inline-flex items-center gap-1.5">
            View all <FaArrowRight size={11} />
          </button>
        </div>

        <div className="space-y-4">
          {DELIVERIES.map((d) => (
            <div
              key={d.id}
              className="flex flex-col gap-3 border border-black/10 rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-black text-sm">
                      {d.route}
                    </p>
                    <span className="text-xs bg-black/5 text-black/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {d.id}
                    </span>
                  </div>
                  <p className="text-xs text-black/50 mt-0.5">{d.truck}</p>
                </div>

                <button className="shrink-0 bg-black text-white px-3 py-1.5 rounded-lg text-xs hover:bg-black/80">
                  Track
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs text-black/50 mb-1.5">
                  <span>{d.status}</span>
                  <span>{d.progress}%</span>
                </div>

                <div className="h-1.5 bg-black/10 rounded-full">
                  <div
                    className="h-1.5 bg-black rounded-full"
                    style={{ width: `${d.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-black">Recent Orders</h3>
          <button className="text-sm text-black hover:underline">
            View all
          </button>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[520px] px-4 sm:px-0">
            <div
              className="grid text-left text-xs uppercase tracking-wide text-black/50 border-b border-black/10 pb-3"
              style={{ gridTemplateColumns: "1fr 2fr 1.5fr 1.2fr 1fr" }}
            >
              <span>Order</span>
              <span>Service</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            <div className="divide-y divide-black/5">
              {ORDERS.map((o) => (
                <div
                  key={o.id}
                  className="grid items-center py-3.5 hover:bg-black/5 rounded-lg px-0.5"
                  style={{ gridTemplateColumns: "1fr 2fr 1.5fr 1.2fr 1fr" }}
                >
                  <span className="font-mono text-xs text-black/60">
                    {o.id}
                  </span>
                  <span className="font-medium text-black text-sm">
                    {o.service}
                  </span>
                  <span className="text-black/50 text-sm">{o.date}</span>
                  <span className="font-semibold text-black text-sm">
                    {o.amount}
                  </span>
                  <span>
                    <StatusPill status={o.status} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
