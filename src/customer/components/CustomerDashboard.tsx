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
import StatCard from "../../ui/StatCard";
import Button from "../../ui/Button";

const DELIVERIES = [
  {
    id: "TRK-8821",
    route: "Lagos → Ibadan",
    truck: "Mack Granite 6×4",
    status: "In Transit",
    progress: 75,
    color: "bg-blue-700",
    coords: [6.9, 3.9],
  },
  {
    id: "TRK-8820",
    route: "Abuja → Kaduna",
    truck: "Volvo FH16",
    status: "Loading",
    progress: 35,
    color: "bg-orange-500",
    coords: [9.05785, 7.49508],
  },
];

const ORDERS = [
  {
    id: "#TRK001",
    service: "Truck Rental",
    date: "12 Jun 2026",
    amount: "₦120,000",
    status: "Completed",
    pill: "bg-green-100 text-green-700",
  },
  {
    id: "#TRK002",
    service: "Granite Delivery",
    date: "11 Jun 2026",
    amount: "₦450,000",
    status: "Pending",
    pill: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "#TRK003",
    service: "Sand Delivery",
    date: "10 Jun 2026",
    amount: "₦85,000",
    status: "In Transit",
    pill: "bg-blue-100 text-blue-700",
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
            <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7C500 102.7 483.7 96 467.3 96H416V48c0-26.5-21.5-48-48-48H48zm0 64H368V320H221.2C208.7 302.9 190.6 288 160 288s-48.7 14.9-61.2 32H48V64zM416 160h51.3L544 236.7V256H416V160zM160 432a48 48 0 1 1 0-96 48 48 0 1 1 0 96zm272-48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/>
          </svg>
        </div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

    L.marker([6.9, 3.9], { icon: truckIcon("#1d4ed8") })
      .addTo(map)
      .bindPopup("<b>TRK-8821</b><br>Lagos → Ibadan<br>75% complete");

    L.marker([9.05785, 7.49508], { icon: truckIcon("#f97316") })
      .addTo(map)
      .bindPopup("<b>TRK-8820</b><br>Abuja → Kaduna<br>Loading");

    instanceRef.current = map;

    return () => {
      map.remove();
      instanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ height: "100%", width: "100%", borderRadius: "inherit" }}
    />
  );
}

const CustomerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
        <button className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
          <FaPlus size={12} />
          Book a Truck
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          label="Active Deliveries"
          value="12"
          delta="8% this week"
          trend="up"
          accent="purple"
          icon={<FaTruck size={15} />}
          sparkline={[7, 9, 8, 11, 10, 12, 12]}
          tooltip="Total trucks currently en route across all active bookings."
        />
        <StatCard
          label="Wallet Balance"
          value="₦450,000"
          trend="flat"
          accent="teal"
          icon={<FaWallet size={15} />}
          footer={
            <div className="mt-2">
              <Button
                variant="customer"
                fullWidth={false}
                className="!py-1.5 px-3 text-xs rounded-lg"
                onClick={() => {}}
              >
                Fund Wallet
              </Button>
            </div>
          }
          tooltip="Your available balance for booking and payments."
        />
        <StatCard
          label="Total Orders"
          value="54"
          delta="3 this month"
          trend="up"
          accent="gold"
          icon={<FaMapMarkerAlt size={15} />}
          sparkline={[40, 44, 46, 48, 50, 52, 54]}
          footer="Completed deliveries"
        />
        <StatCard
          label="Pending Requests"
          value="4"
          trend="flat"
          accent="crit"
          icon={<FaClock size={15} />}
          footer="Awaiting confirmation"
          tooltip="Bookings submitted but not yet accepted by a driver."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-semibold text-slate-900">Live Tracking</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                2 trucks active right now
              </p>
            </div>
            <button className="text-sm font-medium text-blue-700 hover:underline">
              Full map
            </button>
          </div>
          <div style={{ height: 320 }}>
            <LiveMap />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <FaTruck size={18} />,
                label: "Rent a Truck",
                desc: "Book instantly",
                hover: "hover:border-blue-300 hover:bg-blue-50",
                color: "text-blue-700",
              },
              {
                icon: <FaMapMarkerAlt size={18} />,
                label: "Granite Delivery",
                desc: "Schedule a run",
                hover: "hover:border-orange-300 hover:bg-orange-50",
                color: "text-orange-600",
              },
              {
                icon: <FaWallet size={18} />,
                label: "Fund Wallet",
                desc: "Top up balance",
                hover: "hover:border-green-300 hover:bg-green-50",
                color: "text-green-600",
              },
              {
                icon: <FaClock size={18} />,
                label: "Track Shipment",
                desc: "View live location",
                hover: "hover:border-purple-300 hover:bg-purple-50",
                color: "text-purple-600",
              },
            ].map((a) => (
              <button
                key={a.label}
                className={`rounded-xl border border-slate-200 p-4 text-left transition ${a.hover}`}
              >
                <span className={`${a.color} mb-2 block`}>{a.icon}</span>
                <p className="text-sm font-semibold text-slate-800">
                  {a.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{a.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Active Deliveries</h3>
          <button className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:underline">
            View all <FaArrowRight size={11} />
          </button>
        </div>

        <div className="space-y-4">
          {DELIVERIES.map((d) => (
            <div
              key={d.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900">{d.route}</p>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                    {d.id}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-slate-400">{d.truck}</p>
              </div>

              <div className="w-full sm:max-w-xs">
                <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                  <span>{d.status}</span>
                  <span>{d.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div
                    className={`h-1.5 rounded-full ${d.color} transition-all`}
                    style={{ width: `${d.progress}%` }}
                  />
                </div>
              </div>

              <button className="shrink-0 rounded-lg border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
                Track
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Recent Orders</h3>
          <button className="text-sm text-blue-700 hover:underline">
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                <th className="pb-3">Order</th>
                <th className="pb-3">Service</th>
                <th className="pb-3 hidden sm:table-cell">Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ORDERS.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 font-mono text-xs text-slate-500">
                    {o.id}
                  </td>
                  <td className="py-3.5 font-medium text-slate-700">
                    {o.service}
                  </td>
                  <td className="py-3.5 text-slate-400 hidden sm:table-cell">
                    {o.date}
                  </td>
                  <td className="py-3.5 font-semibold text-slate-900">
                    {o.amount}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${o.pill}`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
