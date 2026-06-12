import { useState } from "react";
import StatusPill from "../../../ui/StatusPill";

type Offer = {
  id: string;
  driver: string;
  price: number;
  message: string;
};

type Job = {
  id: string;
  title: string;
  cargo: string;
  pickup: string;
  dropoff: string;
  date: string;
  truckType: string;
  status: string;
  bids: number;
  price?: number;
  offers: Offer[];
};

type Props = {
  job: Job | null;
  onClose: () => void;
  onAcceptOffer?: (jobId: string, offerId: string) => void;
  onRejectOffer?: (jobId: string, offerId: string) => void;
  onNegotiate?: (jobId: string, offerId: string) => void;
  onCloseJob?: (jobId: string) => void;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const JobDrawer = ({
  job,
  onClose,
  onAcceptOffer,
  onRejectOffer,
  onNegotiate,
  onCloseJob,
}: Props) => {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  if (!job) return null;

  const [datePart, timePart] = job.date.split(" ");

  return (
    <div className="fixed inset-0 z-[2000] flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-[440px] h-full bg-white shadow-xl flex flex-col">
        <div className="flex-shrink-0 px-5 py-4 border-b border-black/[0.08] flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-medium text-black">{job.title}</h2>
            <p className="text-[12px] text-black/40 mt-0.5">
              Job details & offers
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[13px] text-black/50 hover:text-black bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <StatusPill status={job.status} />

          <div className="bg-black/[0.03] rounded-xl overflow-hidden border border-black/[0.06]">
            <div className="px-4 pt-4 pb-3 border-b border-black/[0.06]">
              <p className="text-[14px] font-medium text-black mb-3">
                {job.cargo}
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
                    <p className="text-[13px] font-medium text-black">
                      {job.pickup}
                    </p>
                    <p className="text-[11px] text-black/40">Pickup location</p>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-black">
                      {job.dropoff}
                    </p>
                    <p className="text-[11px] text-black/40">
                      Drop-off location
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-black/[0.06]">
              <div className="px-4 py-2.5 flex flex-col gap-0.5">
                <p className="text-[11px] text-black/40">Truck type</p>
                <p className="text-[13px] font-medium text-black">
                  {job.truckType}
                </p>
              </div>
              <div className="px-4 py-2.5 flex flex-col gap-0.5">
                <p className="text-[11px] text-black/40">Cargo weight</p>
                <p className="text-[13px] font-medium text-black">
                  {job.cargo}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 flex flex-col gap-1">
              <p className="text-[11px] text-black/40 flex items-center gap-1">
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
                Date
              </p>
              <p className="text-[20px] font-medium text-black leading-tight">
                {datePart}
              </p>
              <p className="text-[11px] text-black/40">{job.date}</p>
            </div>
            <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 flex flex-col gap-1">
              <p className="text-[11px] text-black/40 flex items-center gap-1">
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
                Time
              </p>
              <p className="text-[20px] font-medium text-black leading-tight">
                {timePart ?? "—"}
              </p>
              <p className="text-[11px] text-black/40">Pickup time</p>
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              {job.bids} offers received
            </span>
            <p className="text-[20px] font-medium text-black">
              {job.price ? `₦${job.price.toLocaleString()}` : "No price set"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-black/40 uppercase tracking-wider mb-2.5">
              Offers
            </p>

            {job.offers.length === 0 ? (
              <p className="text-[13px] text-black/30 py-4 text-center">
                No offers yet
              </p>
            ) : (
              <div className="space-y-2">
                {job.offers.map((offer) => {
                  const isActive = activeOffer === offer.id;
                  return (
                    <div
                      key={offer.id}
                      onClick={() => setActiveOffer(offer.id)}
                      className={`rounded-xl border px-3.5 py-3 cursor-pointer transition-colors ${
                        isActive
                          ? "bg-black/[0.04] border-black/20"
                          : "bg-white border-black/[0.08] hover:border-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 text-[11px] font-medium flex items-center justify-center flex-shrink-0">
                            {getInitials(offer.driver)}
                          </div>
                          <p className="text-[13px] font-medium text-black">
                            {offer.driver}
                          </p>
                        </div>
                        <p className="text-[14px] font-medium text-black">
                          ₦{offer.price.toLocaleString()}
                        </p>
                      </div>

                      <p className="text-[12px] text-black/50 leading-relaxed mb-2.5">
                        {offer.message}
                      </p>

                      <div className="flex gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAcceptOffer?.(job.id, offer.id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 text-[12px] font-medium rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRejectOffer?.(job.id, offer.id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 text-[12px] font-medium rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNegotiate?.(job.id, offer.id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 text-[12px] font-medium rounded-lg bg-black/[0.04] text-black/60 border border-black/[0.08] hover:bg-black/[0.08] transition-colors"
                        >
                          Negotiate
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 px-5 py-4 border-t border-black/[0.08]">
          <button
            onClick={() => onCloseJob?.(job.id)}
            className="w-full py-2.5 bg-black text-white text-[13px] font-medium rounded-xl hover:bg-black/80 transition-colors"
          >
            Close job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDrawer;
