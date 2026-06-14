import StatusPill from "../../../ui/StatusPill";
import { type JobRequestType } from "../../mock/mockJobRequestData";

type Props = {
  job: JobRequestType | null;
  onClose: () => void;
  onAccept?: (job: JobRequestType) => void;
  onCancel?: (job: JobRequestType) => void;
  onContact?: (job: JobRequestType) => void;
};

const PriorityBadge = ({
  priority,
}: {
  priority: JobRequestType["priority"];
}) => {
  const map = {
    urgent: {
      label: "Urgent",
      className: "bg-red-50 text-red-600 border-red-100",
    },
    standard: {
      label: "Standard",
      className: "bg-blue-50 text-blue-600 border-blue-100",
    },
    low: {
      label: "Low",
      className: "bg-gray-50 text-gray-500 border-gray-100",
    },
  };

  const { label, className } = map[priority];

  return (
    <span
      className={`text-[11px] zabalSemiboldFont px-2.5 py-1 rounded-full border ${className}`}
    >
      {label}
    </span>
  );
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatCurrency = (n: number) => `₦${n.toLocaleString("en-NG")}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const JobRequestDrawer = ({
  job,
  onClose,
  onAccept,
  onCancel,
  onContact,
}: Props) => {
  if (!job) return null;

  const isPending = job.status === "pending";
  const isActive = job.status === "accepted" || job.status === "in_transit";
  const isTerminal = job.status === "delivered" || job.status === "cancelled";

  return (
    <div className="fixed inset-0 z-[2000] flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-[560px] h-full bg-white shadow-xl flex flex-col">
        <div className="flex-shrink-0 px-6 py-5 border-b border-black/[0.08] flex items-start justify-between">
          <div>
            <h2 className="text-[17px] zabalSemiboldFont text-black">
              {job.id}
            </h2>
            <p className="text-[12px] text-black/40 mt-0.5">
              Job request details
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[13px] text-black/50 hover:text-black bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div className="flex items-center gap-2">
            <StatusPill status={job.status} />
            <PriorityBadge priority={job.priority} />
          </div>

          <div className="bg-black/[0.03] rounded-xl overflow-hidden border border-black/[0.06]">
            <div className="px-5 pt-4 pb-4 border-b border-black/[0.06]">
              <p className="text-[14px] zabalSemiboldFont text-black mb-3">
                {job.cargoType} — {job.weightKg.toLocaleString()} kg
              </p>

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
                    <p className="text-[13px] zabalSemiboldFont text-black">
                      {job.pickupAddress}
                    </p>
                    <p className="text-[11px] text-black/40">
                      {job.pickupState} · Pickup location
                    </p>
                  </div>

                  <div>
                    <p className="text-[13px] zabalSemiboldFont text-black">
                      {job.deliveryAddress}
                    </p>
                    <p className="text-[11px] text-black/40">
                      {job.deliveryState} · Drop-off location
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-black/[0.06]">
              <div className="px-5 py-3 flex flex-col gap-0.5">
                <p className="text-[11px] text-black/40">Truck type</p>
                <p className="text-[13px] zabalSemiboldFont text-black">
                  {job.truckType}
                </p>
              </div>

              <div className="px-5 py-3 flex flex-col gap-0.5">
                <p className="text-[11px] text-black/40">Distance</p>
                <p className="text-[13px] zabalSemiboldFont text-black">
                  {job.distance}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-5 py-4 flex flex-col gap-1">
              <p className="text-[11px] text-black/40 flex items-center gap-1.5">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Requested
              </p>

              <p className="text-[20px] zabalSemiboldFont text-black leading-tight">
                {formatDate(job.requestDate)}
              </p>

              <p className="text-[11px] text-black/40">
                {formatDateTime(job.requestDate)}
              </p>
            </div>

            <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-5 py-4 flex flex-col gap-1">
              <p className="text-[11px] text-black/40 flex items-center gap-1.5">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Est. delivery
              </p>

              <p className="text-[20px] zabalSemiboldFont text-black leading-tight">
                {formatDate(job.estimatedDelivery)}
              </p>

              <p className="text-[11px] text-black/40">Expected arrival</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[12px] text-black/50 bg-black/[0.04] border border-black/[0.06] rounded-full px-3 py-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {job.requestedBy}
            </span>

            <p className="text-[22px] zabalSemiboldFont text-black">
              {formatCurrency(job.amountNgn)}
            </p>
          </div>

          <div>
            <p className="text-[11px] zabalSemiboldFont text-black/40 uppercase tracking-wider mb-3">
              Assigned driver
            </p>

            {job.assignedDriver ? (
              <div className="rounded-xl border border-black/[0.08] px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-[11px] zabalSemiboldFont flex items-center justify-center flex-shrink-0">
                      {getInitials(job.assignedDriver)}
                    </div>

                    <div>
                      <p className="zabalSemiboldFont text-[14px] text-black">
                        {job.assignedDriver}
                      </p>

                      <p className="text-[11px] font-mono text-black/40">
                        {job.assignedDriverId}
                      </p>
                    </div>
                  </div>

                  {job.assignedPlate && (
                    <span className="text-[11px] font-mono zabalSemiboldFont bg-black/[0.04] border border-black/[0.08] px-2.5 py-1 rounded-md text-black/60">
                      {job.assignedPlate}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-[13px] text-black/30 py-4 text-center">
                No driver assigned yet
              </p>
            )}
          </div>

          {job.notes ? (
            <div>
              <p className="text-[11px] zabalSemiboldFont text-black/40 uppercase tracking-wider mb-3">
                Notes
              </p>

              <div className="rounded-xl border border-black/[0.08] bg-black/[0.03] px-4 py-3.5">
                <p className="text-[12px] text-black/60 leading-relaxed">
                  {job.notes}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {!isTerminal && (
          <div className="flex-shrink-0 px-6 py-5 border-t border-black/[0.08]">
            {isPending && (
              <div className="flex gap-3">
                <button
                  onClick={() => onCancel?.(job)}
                  className="flex-1 py-3 border border-black/[0.12] zabalBoldFont text-black/60 text-[14px] rounded-xl hover:bg-black/[0.03] transition-colors"
                >
                  Cancel request
                </button>

                <button
                  onClick={() => onAccept?.(job)}
                  className="flex-1 py-3 bg-black zabalBoldFont text-white text-[14px] rounded-xl hover:bg-black/80 transition-colors"
                >
                  Accept job
                </button>
              </div>
            )}

            {isActive && (
              <button
                onClick={() => onContact?.(job)}
                className="w-full py-3 bg-black zabalBoldFont text-white text-[14px] rounded-xl hover:bg-black/80 transition-colors"
              >
                Contact driver
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRequestDrawer;
