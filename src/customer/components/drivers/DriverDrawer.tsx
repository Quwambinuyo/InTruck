import { FaStar, FaTruck, FaPhone, FaCheckCircle } from "react-icons/fa";
import StatusPill from "../../../ui/StatusPill";
import MapView from "../../../ui/MapView";
import type { Driver } from "../../mock/mockDrivers";

type Props = {
  driver: Driver | null;
  onClose: () => void;
  onContact: (driver: Driver) => void;
  onAssignJob: (driver: Driver) => void;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <FaStar
      key={i}
      className={i < Math.round(rating) ? "text-yellow-400" : "text-black/10"}
      size={12}
    />
  ));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const DriverDrawer = ({ driver, onClose, onContact, onAssignJob }: Props) => {
  if (!driver) return null;

  const driverCoords: [number, number] = [driver.lat, driver.lng];

  return (
    <div className="fixed inset-0 z-[2000] flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-[560px] h-full bg-white shadow-xl flex flex-col">
        <div className="flex-shrink-0 px-6 py-5 border-b border-black/[0.08] flex items-start justify-between">
          <div>
            <h2 className="text-[17px] font-black text-black">
              Driver profile
            </h2>
            <p className="text-[12px] text-black/40 mt-0.5">
              {driver.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[13px] text-black/50 hover:text-black bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <MapView
            pickupCoords={driverCoords}
            dropoffCoords={driverCoords}
            pickupLabel={driver.location}
            dropoffLabel={driver.location}
            progress={0}
            showTruck={false}
            height={320}
          />

          <div className="px-6 py-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-black/5 text-black/60 text-[18px] font-black flex items-center justify-center shrink-0">
                {getInitials(driver.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[17px] font-black text-black">
                  {driver.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex items-center gap-0.5">
                    {renderStars(driver.rating)}
                  </div>
                  <p className="text-[12px] font-semibold text-black">
                    {driver.rating.toFixed(1)}
                  </p>
                  <p className="text-[12px] text-black/40">
                    ({driver.reviewCount} reviews)
                  </p>
                </div>
                <div className="mt-1.5">
                  <StatusPill status={driver.status} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 flex flex-col items-center gap-1">
                <p className="text-[22px] font-black text-black">
                  {driver.jobsCompleted}
                </p>
                <p className="text-[11px] text-black/40 text-center">
                  Jobs done
                </p>
              </div>
              <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 flex flex-col items-center gap-1">
                <p className="text-[22px] font-black text-black">
                  {driver.rating.toFixed(1)}
                </p>
                <p className="text-[11px] text-black/40 text-center">Rating</p>
              </div>
              <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 flex flex-col items-center gap-1">
                <p className="text-[22px] font-black text-black">
                  {driver.reviewCount}
                </p>
                <p className="text-[11px] text-black/40 text-center">Reviews</p>
              </div>
            </div>

            <div className="bg-black/[0.03] rounded-xl border border-black/[0.06] overflow-hidden">
              <div className="px-5 py-3 border-b border-black/[0.06]">
                <p className="text-[11px] font-semibold text-black/40 uppercase tracking-wider">
                  Info
                </p>
              </div>
              <div className="divide-y divide-black/[0.06]">
                <div className="flex items-center justify-between px-5 py-3">
                  <p className="text-[12px] text-black/40">Truck type</p>
                  <div className="flex items-center gap-1.5">
                    <FaTruck className="text-black/40 text-xs" />
                    <p className="text-[12px] font-semibold text-black">
                      {driver.truckType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                  <p className="text-[12px] text-black/40">Location</p>
                  <p className="text-[12px] font-semibold text-black">
                    {driver.location}
                  </p>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                  <p className="text-[12px] text-black/40">Phone</p>
                  <div className="flex items-center gap-1.5">
                    <FaPhone className="text-black/40 text-xs" />
                    <p className="text-[12px] font-semibold text-black">
                      {driver.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                  <p className="text-[12px] text-black/40">Status</p>
                  <StatusPill status={driver.status} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-semibold text-black/40 uppercase tracking-wider">
                Reviews
              </p>

              {driver.reviews.length === 0 ? (
                <p className="text-[13px] text-black/30 text-center py-4">
                  No reviews yet
                </p>
              ) : (
                driver.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-black/10 text-black/50 text-[9px] font-black flex items-center justify-center">
                          {getInitials(review.author)}
                        </div>
                        <p className="text-[12px] font-semibold text-black">
                          {review.author}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-[12px] text-black/60 leading-relaxed">
                      {review.comment}
                    </p>
                    <p className="text-[11px] text-black/30">
                      {formatDate(review.date)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 px-6 py-5 border-t border-black/[0.08] space-y-2">
          {driver.status === "available" && (
            <button
              onClick={() => onAssignJob(driver)}
              className="w-full py-3 bg-black text-white text-[14px] font-black rounded-xl hover:bg-black/80 transition-colors flex items-center justify-center gap-2"
            >
              <FaCheckCircle size={13} />
              Assign a job
            </button>
          )}
          <button
            onClick={() => onContact(driver)}
            className="w-full py-3 bg-black/5 text-black text-[14px] font-black rounded-xl hover:bg-black/10 transition-colors flex items-center justify-center gap-2"
          >
            <FaPhone size={12} />
            Contact driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDrawer;
