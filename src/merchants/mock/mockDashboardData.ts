export const jobRequests = [
  {
    id: "JR-2841",
    cargo: "Granite / Gravel",
    pickup: "Apapa, Lagos",
    dropoff: "Ibadan, Oyo",
    weight: "30 tonnes",
    offer: "₦180,000",
    status: "pending",
    time: "2h ago",
  },
  {
    id: "JR-2839",
    cargo: "Cement",
    pickup: "Ikorodu, Lagos",
    dropoff: "Abeokuta, Ogun",
    weight: "20 tonnes",
    offer: "Open bid",
    status: "pending",
    time: "4h ago",
  },
  {
    id: "JR-2835",
    cargo: "Steel / Iron",
    pickup: "Oshodi, Lagos",
    dropoff: "Benin City, Edo",
    weight: "45 tonnes",
    offer: "₦320,000",
    status: "accepted",
    time: "Yesterday",
  },
  {
    id: "JR-2830",
    cargo: "Agricultural produce",
    pickup: "Kano, Kano",
    dropoff: "Lagos Island, Lagos",
    weight: "15 tonnes",
    offer: "₦240,000",
    status: "completed",
    time: "2 days ago",
  },
];

export const fleet = [
  {
    plate: "LND 421 AA",
    type: "Flatbed",
    status: "on-trip",
    driver: "Emeka Obi",
    route: "Lagos → Ibadan",
  },
  {
    plate: "ABJ 882 KA",
    type: "Tipper",
    status: "available",
    driver: "Musa Aliyu",
    route: null,
  },
  {
    plate: "KAN 007 ZZ",
    type: "Tanker",
    status: "maintenance",
    driver: "Tunde Bello",
    route: null,
  },
  {
    plate: "OG 334 BA",
    type: "Low Loader",
    status: "available",
    driver: "Chidi Eze",
    route: null,
  },
];

export const earnings = [
  { month: "Jan", value: 2800000 },
  { month: "Feb", value: 3100000 },
  { month: "Mar", value: 2600000 },
  { month: "Apr", value: 3800000 },
  { month: "May", value: 4200000 },
  { month: "Jun", value: 3500000 },
];

export const successScores = [
  { month: "Jan", score: 88 },
  { month: "Feb", score: 91 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 93 },
  { month: "May", score: 97 },
  { month: "Jun", score: 94 },
];

export const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pending", color: "#92400e", bg: "#fef3c7" },
  accepted: { label: "Accepted", color: "#065f46", bg: "#d1fae5" },
  completed: { label: "Completed", color: "#1e3a5f", bg: "#dbeafe" },
  "on-trip": { label: "On Trip", color: "#92400e", bg: "#fef3c7" },
  available: { label: "Available", color: "#065f46", bg: "#d1fae5" },
  maintenance: { label: "Maintenance", color: "#7f1d1d", bg: "#fee2e2" },
};

export const fleetDotColor: Record<string, string> = {
  "on-trip": "#f59e0b",
  available: "#22c55e",
  maintenance: "#ef4444",
};
