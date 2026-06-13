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
      <div className="w-full max-w-full overflow-x-hidden space-y-4 pb-24">
        <div className="pt-1">
          <h2 className="text-lg font-black text-black">Transactions</h2>
          <p className="text-xs text-black/40 mt-0.5">
            Your haulage payments and wallet activity
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-black/10 rounded-2xl p-4 space-y-1">
            <p className="text-xs text-black/40 font-medium">Total funded</p>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <FaArrowDown className="text-green-600 text-[10px]" />
              </span>
              <p className="text-base font-black text-black">
                ₦{totalIn.toLocaleString("en-NG")}
              </p>
            </div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-4 space-y-1">
            <p className="text-xs text-black/40 font-medium">Total spent</p>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <FaArrowUp className="text-red-500 text-[10px]" />
              </span>
              <p className="text-base font-black text-black">
                ₦{totalOut.toLocaleString("en-NG")}
              </p>
            </div>
          </div>
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
