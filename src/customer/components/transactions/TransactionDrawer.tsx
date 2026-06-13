import { FaTruck, FaArrowDown, FaArrowUp } from "react-icons/fa";
import StatusPill from "../../../ui/StatusPill";
import type { Transaction } from "../../mock/mockTransactions";

type Props = {
  tx: Transaction | null;
  onClose: () => void;
};

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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const TransactionDrawer = ({ tx, onClose }: Props) => {
  if (!tx) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-[560px] h-full bg-white shadow-xl flex flex-col">
        <div className="flex-shrink-0 px-6 py-5 border-b border-black/[0.08] flex items-start justify-between">
          <div>
            <h2 className="text-[17px] font-black text-black">
              Transaction detail
            </h2>
            <p className="text-[12px] text-black/40 mt-0.5">{tx.ref}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[13px] text-black/50 hover:text-black bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                  tx.type === "job" ? "bg-black/5" : "bg-green-50"
                }`}
              >
                {tx.type === "job" ? (
                  <FaTruck className="text-black/50 text-base" />
                ) : (
                  <FaArrowDown className="text-green-500 text-base" />
                )}
              </div>
              <div>
                <p className="text-[15px] font-black text-black">
                  {tx.type === "job"
                    ? "Haulage payment"
                    : (tx.description ?? "Wallet top-up")}
                </p>
                <p className="text-[12px] text-black/40">
                  {formatDate(tx.date)}
                </p>
              </div>
            </div>
            <StatusPill status={tx.status} />
          </div>

          <div className="bg-black/[0.03] border border-black/[0.06] rounded-2xl px-5 py-4 flex flex-col items-center gap-1">
            <p className="text-[11px] text-black/40 font-medium">Amount</p>
            <p
              className={`text-[36px] font-black leading-tight ${
                tx.amount > 0 ? "text-green-600" : "text-black"
              }`}
            >
              {formatAmount(tx.amount)}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  tx.amount > 0 ? "bg-green-100" : "bg-black/10"
                }`}
              >
                {tx.amount > 0 ? (
                  <FaArrowDown className="text-green-600 text-[9px]" />
                ) : (
                  <FaArrowUp className="text-black/50 text-[9px]" />
                )}
              </span>
              <p className="text-[12px] text-black/40">
                {tx.amount > 0
                  ? "Funds added to wallet"
                  : "Deducted from wallet"}
              </p>
            </div>
          </div>

          <div className="bg-black/[0.03] rounded-xl border border-black/[0.06] overflow-hidden">
            <div className="px-5 py-3 border-b border-black/[0.06]">
              <p className="text-[11px] font-semibold text-black/40 uppercase tracking-wider">
                Details
              </p>
            </div>
            <div className="divide-y divide-black/[0.06]">
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Reference</p>
                <p className="text-[12px] font-mono text-black">{tx.ref}</p>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Type</p>
                <p className="text-[12px] font-semibold text-black">
                  {tx.type === "job" ? "Haulage payment" : "Wallet funding"}
                </p>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Date</p>
                <p className="text-[12px] font-semibold text-black">
                  {formatDate(tx.date)}
                </p>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Status</p>
                <StatusPill status={tx.status} />
              </div>
            </div>
          </div>

          {tx.route && (
            <div className="bg-black/[0.03] rounded-xl border border-black/[0.06] overflow-hidden">
              <div className="px-5 py-3 border-b border-black/[0.06]">
                <p className="text-[11px] font-semibold text-black/40 uppercase tracking-wider">
                  Route
                </p>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-stretch gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2 h-2 rounded-full bg-black" />
                    <div
                      className="flex-1 w-px bg-black/20 my-1"
                      style={{ minHeight: 20 }}
                    />
                    <div className="w-2 h-2 rounded-sm bg-black/40" />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-[13px] font-bold text-black">
                        {tx.route.pickup}
                      </p>
                      <p className="text-[11px] text-black/40">
                        Pickup location
                      </p>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-black">
                        {tx.route.dropoff}
                      </p>
                      <p className="text-[11px] text-black/40">
                        Drop-off location
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tx.driver && (
            <div className="bg-black/[0.03] rounded-xl border border-black/[0.06] overflow-hidden">
              <div className="px-5 py-3 border-b border-black/[0.06]">
                <p className="text-[11px] font-semibold text-black/40 uppercase tracking-wider">
                  Driver
                </p>
              </div>
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 text-[11px] font-black flex items-center justify-center shrink-0">
                  {getInitials(tx.driver)}
                </div>
                <p className="text-[14px] font-bold text-black">{tx.driver}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDrawer;
