export type TxType = "job" | "wallet";
export type TxStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  ref: string;
  type: TxType;
  status: TxStatus;
  amount: number;
  date: string;
  driver?: string;
  route?: { pickup: string; dropoff: string };
  description?: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    ref: "TXN-20240601-001",
    type: "job",
    status: "completed",
    amount: -185000,
    date: "2024-06-01",
    driver: "Emeka Okafor",
    route: { pickup: "Apapa, Lagos", dropoff: "Sagamu, Ogun" },
  },
  {
    id: "2",
    ref: "TXN-20240531-002",
    type: "wallet",
    status: "completed",
    amount: 500000,
    date: "2024-05-31",
    description: "Wallet top-up via Paystack",
  },
  {
    id: "3",
    ref: "TXN-20240530-003",
    type: "job",
    status: "pending",
    amount: -97500,
    date: "2024-05-30",
    driver: "Abubakar Sule",
    route: { pickup: "Kano, Kano", dropoff: "Kaduna, Kaduna" },
  },
  {
    id: "4",
    ref: "TXN-20240528-004",
    type: "wallet",
    status: "completed",
    amount: 200000,
    date: "2024-05-28",
    description: "Wallet top-up via bank transfer",
  },
  {
    id: "5",
    ref: "TXN-20240527-005",
    type: "job",
    status: "failed",
    amount: -60000,
    date: "2024-05-27",
    driver: "Chukwudi Eze",
    route: { pickup: "Enugu, Enugu", dropoff: "Onitsha, Anambra" },
  },
  {
    id: "6",
    ref: "TXN-20240525-006",
    type: "job",
    status: "completed",
    amount: -320000,
    date: "2024-05-25",
    driver: "Tunde Badmus",
    route: { pickup: "Ibadan, Oyo", dropoff: "Benin City, Edo" },
  },
  {
    id: "7",
    ref: "TXN-20240520-007",
    type: "wallet",
    status: "completed",
    amount: 1000000,
    date: "2024-05-20",
    description: "Wallet top-up via Paystack",
  },
];
