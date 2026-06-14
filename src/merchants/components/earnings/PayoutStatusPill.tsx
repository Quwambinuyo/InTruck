import type { PayoutStatus } from "../../mock/mockEarningsData";

const STYLES: Record<PayoutStatus, string> = {
  paid: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
};

const LABELS: Record<PayoutStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  processing: "Processing",
};

type Props = {
  status: PayoutStatus;
};

const PayoutStatusPill = ({ status }: Props) => {
  return (
    <span
      className={`text-[11px] zabalSemiboldFont px-2.5 py-1 rounded-full border ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
};

export default PayoutStatusPill;
