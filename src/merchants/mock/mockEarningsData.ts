export type EarningsRange = "7d" | "30d" | "90d" | "1y";

export type EarningsPoint = {
  label: string;
  earnings: number;
  jobs: number;
};

export type PayoutStatus = "paid" | "pending" | "processing";

export type Payout = {
  id: string;
  date: string;
  amount: number;
  status: PayoutStatus;
  method: string;
  reference: string;
};

export type EarningsBreakdownItem = {
  label: string;
  value: number;
  color: string;
};

export const EARNINGS_SUMMARY: Record<
  EarningsRange,
  {
    total: number;
    change: number;
    jobsCompleted: number;
    avgPerJob: number;
    pending: number;
  }
> = {
  "7d": {
    total: 482000,
    change: 8.4,
    jobsCompleted: 6,
    avgPerJob: 80333,
    pending: 95000,
  },
  "30d": {
    total: 2140000,
    change: 12.7,
    jobsCompleted: 24,
    avgPerJob: 89166,
    pending: 175000,
  },
  "90d": {
    total: 5860000,
    change: -3.2,
    jobsCompleted: 61,
    avgPerJob: 96065,
    pending: 310000,
  },
  "1y": {
    total: 21450000,
    change: 18.9,
    jobsCompleted: 248,
    avgPerJob: 86491,
    pending: 420000,
  },
};

export const EARNINGS_CHART_DATA: Record<EarningsRange, EarningsPoint[]> = {
  "7d": [
    { label: "Mon", earnings: 60000, jobs: 1 },
    { label: "Tue", earnings: 95000, jobs: 1 },
    { label: "Wed", earnings: 40000, jobs: 0 },
    { label: "Thu", earnings: 120000, jobs: 2 },
    { label: "Fri", earnings: 75000, jobs: 1 },
    { label: "Sat", earnings: 52000, jobs: 1 },
    { label: "Sun", earnings: 40000, jobs: 0 },
  ],
  "30d": [
    { label: "Week 1", earnings: 480000, jobs: 5 },
    { label: "Week 2", earnings: 620000, jobs: 7 },
    { label: "Week 3", earnings: 510000, jobs: 6 },
    { label: "Week 4", earnings: 530000, jobs: 6 },
  ],
  "90d": [
    { label: "Apr", earnings: 1820000, jobs: 19 },
    { label: "May", earnings: 1980000, jobs: 21 },
    { label: "Jun", earnings: 2060000, jobs: 21 },
  ],
  "1y": [
    { label: "Jul", earnings: 1450000, jobs: 16 },
    { label: "Aug", earnings: 1620000, jobs: 18 },
    { label: "Sep", earnings: 1380000, jobs: 15 },
    { label: "Oct", earnings: 1790000, jobs: 19 },
    { label: "Nov", earnings: 1920000, jobs: 21 },
    { label: "Dec", earnings: 2240000, jobs: 24 },
    { label: "Jan", earnings: 1680000, jobs: 18 },
    { label: "Feb", earnings: 1750000, jobs: 19 },
    { label: "Mar", earnings: 1890000, jobs: 20 },
    { label: "Apr", earnings: 1820000, jobs: 19 },
    { label: "May", earnings: 1980000, jobs: 21 },
    { label: "Jun", earnings: 2060000, jobs: 21 },
  ],
};

export const EARNINGS_BREAKDOWN: Record<
  EarningsRange,
  EarningsBreakdownItem[]
> = {
  "7d": [
    { label: "Tipper", value: 220000, color: "#000000" },
    { label: "Flatbed", value: 130000, color: "#3B82F6" },
    { label: "Low Loader", value: 95000, color: "#F59E0B" },
    { label: "Curtainsider", value: 37000, color: "#10B981" },
  ],
  "30d": [
    { label: "Tipper", value: 980000, color: "#000000" },
    { label: "Flatbed", value: 620000, color: "#3B82F6" },
    { label: "Low Loader", value: 350000, color: "#F59E0B" },
    { label: "Curtainsider", value: 190000, color: "#10B981" },
  ],
  "90d": [
    { label: "Tipper", value: 2640000, color: "#000000" },
    { label: "Flatbed", value: 1750000, color: "#3B82F6" },
    { label: "Low Loader", value: 980000, color: "#F59E0B" },
    { label: "Curtainsider", value: 490000, color: "#10B981" },
  ],
  "1y": [
    { label: "Tipper", value: 9650000, color: "#000000" },
    { label: "Flatbed", value: 6240000, color: "#3B82F6" },
    { label: "Low Loader", value: 3820000, color: "#F59E0B" },
    { label: "Curtainsider", value: 1740000, color: "#10B981" },
  ],
};

export const RECENT_PAYOUTS: Payout[] = [
  {
    id: "PO-10045",
    date: "2026-06-12",
    amount: 420000,
    status: "paid",
    method: "GTBank •••• 4821",
    reference: "REF-882190",
  },
  {
    id: "PO-10044",
    date: "2026-06-08",
    amount: 175000,
    status: "paid",
    method: "GTBank •••• 4821",
    reference: "REF-881304",
  },
  {
    id: "PO-10043",
    date: "2026-06-14",
    amount: 95000,
    status: "pending",
    method: "GTBank •••• 4821",
    reference: "REF-880922",
  },
  {
    id: "PO-10042",
    date: "2026-06-05",
    amount: 280000,
    status: "paid",
    method: "Kuda •••• 1190",
    reference: "REF-879884",
  },
  {
    id: "PO-10041",
    date: "2026-06-13",
    amount: 80000,
    status: "processing",
    method: "GTBank •••• 4821",
    reference: "REF-879511",
  },
];

export const EARNINGS_RANGE_OPTIONS: { label: string; value: EarningsRange }[] =
  [
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "90 Days", value: "90d" },
    { label: "1 Year", value: "1y" },
  ];
