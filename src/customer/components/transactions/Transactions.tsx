import { useCallback, useState } from "react";
import { FaTruck, FaArrowDown, FaArrowUp } from "react-icons/fa";
import FilterChip from "../../../ui/FilterChip";
import SearchInput from "../../../ui/SearchInput";
import StatusPill from "../../../ui/StatusPill";
import TransactionDrawer from "./TransactionDrawer";
import DataTable, { type ColumnDef } from "../../../ui/DataTable";
import {
  MOCK_TRANSACTIONS,
  type Transaction,
  type TxType,
  type TxStatus,
} from "../../mock/mockTransactions";
import StatCard from "../../../ui/StatCard";

type FilterType = "all" | TxType;
type FilterStatus = "all" | TxStatus;

const TYPE_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "job", label: "Haulage jobs" },
  { value: "wallet", label: "Wallet" },
];

const STATUS_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

function formatAmount(amount: number) {
  const abs = Math.abs(amount).toLocaleString("en-NG");
  return `${amount < 0 ? "-" : "+"}₦${abs}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TX_COLUMNS: ColumnDef<Transaction>[] = [
  {
    label: "Date",
    span: 2,
    render: (tx) => (
      <p className="text-[13px] text-black/50">{formatDate(tx.date)}</p>
    ),
  },
  {
    label: "Reference",
    span: 2,
    render: (tx) => (
      <p className="text-[13px] font-semibold text-black truncate pr-3">
        {tx.ref}
      </p>
    ),
  },
  {
    label: "Type",
    span: 2,
    render: (tx) => (
      <div className="flex items-center gap-2">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
            tx.type === "job" ? "bg-black/5" : "bg-green-50"
          }`}
        >
          {tx.type === "job" ? (
            <FaTruck className="text-black/40 text-[10px]" />
          ) : (
            <FaArrowDown className="text-green-500 text-[10px]" />
          )}
        </div>
        <p className="text-[13px] text-black/70 capitalize">
          {tx.type === "job" ? "Haulage" : "Wallet"}
        </p>
      </div>
    ),
  },
  {
    label: "Description",
    span: 3,
    render: (tx) => (
      <p className="text-[13px] text-black/60 truncate pr-3">
        {tx.type === "job"
          ? (tx.driver ?? "—")
          : (tx.description ?? "Wallet top-up")}
      </p>
    ),
  },
  {
    label: "Amount",
    span: 2,
    render: (tx) => (
      <p
        className={`text-[13px] font-black ${
          tx.amount > 0 ? "text-green-600" : "text-black"
        }`}
      >
        {formatAmount(tx.amount)}
      </p>
    ),
  },
  {
    label: "Status",
    span: 2,
    render: (tx) => <StatusPill status={tx.status} />,
  },
  {
    label: "",
    span: 1,
    render: () => (
      <p className="text-[12px] text-black zabalBoldFont text-right pr-1">
        View
      </p>
    ),
  },
];

const Transactions = () => {
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filtered = MOCK_TRANSACTIONS.filter((tx) => {
    if (typeFilter !== "all" && tx.type !== typeFilter) return false;
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    if (
      search &&
      !tx.ref.toLowerCase().includes(search.toLowerCase()) &&
      !tx.driver?.toLowerCase().includes(search.toLowerCase()) &&
      !tx.route?.pickup.toLowerCase().includes(search.toLowerCase()) &&
      !tx.route?.dropoff.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const totalIn = MOCK_TRANSACTIONS.filter(
    (t) => t.amount > 0 && t.status === "completed",
  ).reduce((s, t) => s + t.amount, 0);

  const totalOut = MOCK_TRANSACTIONS.filter(
    (t) => t.amount < 0 && t.status === "completed",
  ).reduce((s, t) => s + Math.abs(t.amount), 0);

  const handleTypeFilterChange = useCallback((label: string) => {
    const match = TYPE_OPTIONS.find((o) => o.label === label);
    if (match) setTypeFilter(match.value);
  }, []);

  const handleStatusFilterChange = useCallback((label: string) => {
    const match = STATUS_OPTIONS.find((o) => o.label === label);
    if (match) setStatusFilter(match.value);
  }, []);

  return (
    <>
      <div className="w-full max-w-full overflow-x-hidden space-y-4 pb-5">
        <div className="pt-1">
          <h2 className="text-lg font-black text-black">Transactions</h2>
          <p className="text-xs text-black/40 mt-0.5">
            Your haulage payments and wallet activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <StatCard
            label="Total funded"
            value={`₦${totalIn.toLocaleString("en-NG")}`}
            delta={`${
              MOCK_TRANSACTIONS.filter(
                (t) => t.amount > 0 && t.status === "completed",
              ).length
            } transactions`}
            trend="up"
            icon={<FaArrowDown size={12} />}
            sparkline={[20, 28, 24, 35, 40, 55, 62]}
            tooltip="Total successful wallet funding transactions credited to your account."
          />

          <StatCard
            label="Total spent"
            value={`₦${totalOut.toLocaleString("en-NG")}`}
            delta={`${
              MOCK_TRANSACTIONS.filter(
                (t) => t.amount < 0 && t.status === "completed",
              ).length
            } transactions`}
            trend="down"
            icon={<FaArrowUp size={12} />}
            sparkline={[62, 58, 54, 48, 42, 36, 28]}
            tooltip="Total successful payments made for haulage jobs and related services."
          />
        </div>

        <div className="bg-white border border-black/10 rounded-2xl p-4 space-y-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by ref, driver or route…"
          />

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <FilterChip<string>
                options={TYPE_OPTIONS.map((o) => o.label)}
                value={TYPE_OPTIONS.find((o) => o.value === typeFilter)!.label}
                onChange={handleTypeFilterChange}
              />
            </div>
            <div className="flex-1">
              <FilterChip<string>
                options={STATUS_OPTIONS.map((o) => o.label)}
                value={
                  STATUS_OPTIONS.find((o) => o.value === statusFilter)!.label
                }
                onChange={handleStatusFilterChange}
              />
            </div>
          </div>
        </div>

        <section className="bg-white border border-black/10 rounded-2xl p-4 sm:p-5">
          <DataTable<Transaction>
            columns={TX_COLUMNS}
            rows={filtered}
            getKey={(tx) => tx.id}
            onRowClick={(tx) => setSelectedTx(tx)}
            emptyMessage="No transactions match your filters."
            minWidth="1000px"
          />
        </section>
      </div>

      <TransactionDrawer tx={selectedTx} onClose={() => setSelectedTx(null)} />
    </>
  );
};

export default Transactions;
