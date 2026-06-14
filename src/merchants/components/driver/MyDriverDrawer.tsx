import { useState } from "react";
import {
  FaStar,
  FaTruck,
  FaPhone,
  FaCheckCircle,
  FaIdCard,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaTimesCircle,
} from "react-icons/fa";
import StatusPill from "../../../ui/StatusPill";
import type { MyDriver, KYCStatus } from "../../mock/mockMyDriverData";

type Props = {
  driver: MyDriver | null;
  onClose: () => void;
  onAssignTruck: (driver: MyDriver) => void;
  onUnassignTruck: (driver: MyDriver) => void;
  onContact: (driver: MyDriver) => void;
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

const KYCBadge = ({ status }: { status: KYCStatus }) => {
  const map: Record<KYCStatus, { label: string; className: string }> = {
    verified: {
      label: "Verified",
      className: "bg-green-50 text-green-700 border-green-100",
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-50 text-yellow-700 border-yellow-100",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-50 text-red-600 border-red-100",
    },
  };
  const { label, className } = map[status];
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${className}`}
    >
      {label}
    </span>
  );
};

const DocImage = ({ src, label }: { src: string; label: string }) => {
  const [zoomed, setZoomed] = useState(false);
  return (
    <>
      <div
        className="rounded-xl overflow-hidden border border-black/[0.08] cursor-pointer group relative"
        onClick={() => setZoomed(true)}
      >
        <img
          src={src}
          alt={label}
          className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end">
          <p className="text-[10px] text-white font-semibold px-2 pb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to enlarge
          </p>
        </div>
      </div>
      <p className="text-[11px] text-black/40 mt-1.5 text-center">{label}</p>
      {zoomed && (
        <div
          className="fixed inset-0 z-[3000] bg-black/80 flex items-center justify-center p-6"
          onClick={() => setZoomed(false)}
        >
          <img
            src={src}
            alt={label}
            className="max-w-full max-h-full rounded-xl object-contain"
          />
        </div>
      )}
    </>
  );
};

const MyDriverDrawer = ({
  driver,
  onClose,
  onAssignTruck,
  onUnassignTruck,
  onContact,
}: Props) => {
  if (!driver) return null;

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
              {driver.state} · Joined {formatDate(driver.joinedDate)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[13px] text-black/50 hover:text-black bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-black/[0.08] flex-shrink-0">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[17px] font-black text-black">
                  {driver.name}
                </p>
                <KYCBadge status={driver.kycStatus} />
              </div>
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
              <p className="text-[11px] text-black/40 text-center">Jobs done</p>
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
                Personal info
              </p>
            </div>
            <div className="divide-y divide-black/[0.06]">
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
                <p className="text-[12px] text-black/40">Email</p>
                <div className="flex items-center gap-1.5">
                  <FaEnvelope className="text-black/40 text-xs" />
                  <p className="text-[12px] font-semibold text-black">
                    {driver.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Address</p>
                <div className="flex items-start gap-1.5 max-w-[60%] text-right">
                  <FaMapMarkerAlt className="text-black/40 text-xs mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] font-semibold text-black">
                    {driver.address}, {driver.state}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Truck type</p>
                <div className="flex items-center gap-1.5">
                  <FaTruck className="text-black/40 text-xs" />
                  <p className="text-[12px] font-semibold text-black">
                    {driver.truckType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/[0.03] rounded-xl border border-black/[0.06] overflow-hidden">
            <div className="px-5 py-3 border-b border-black/[0.06]">
              <p className="text-[11px] font-semibold text-black/40 uppercase tracking-wider">
                KYC documents
              </p>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <DocImage
                    src={driver.licenceImage}
                    label="Driver's licence"
                  />
                </div>
                <div>
                  <DocImage src={driver.ninImage} label="NIN slip" />
                </div>
              </div>
              <div className="divide-y divide-black/[0.06] border border-black/[0.06] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-[12px] text-black/40">Licence ID</p>
                  <div className="flex items-center gap-1.5">
                    <FaIdCard className="text-black/40 text-xs" />
                    <p className="text-[12px] font-semibold text-black font-mono">
                      {driver.licenceId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-[12px] text-black/40">Licence expiry</p>
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-black/40 text-xs" />
                    <p className="text-[12px] font-semibold text-black">
                      {formatDate(driver.licenceExpiry)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-[12px] text-black/40">NIN</p>
                  <p className="text-[12px] font-semibold text-black font-mono">
                    {driver.nin}
                  </p>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-[12px] text-black/40">KYC status</p>
                  <KYCBadge status={driver.kycStatus} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/[0.03] rounded-xl border border-black/[0.06] overflow-hidden">
            <div className="px-5 py-3 border-b border-black/[0.06]">
              <p className="text-[11px] font-semibold text-black/40 uppercase tracking-wider">
                Assigned truck
              </p>
            </div>
            <div className="px-5 py-4">
              {driver.assignedTruck ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
                    <FaTruck className="text-black/40" size={16} />
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-black">
                      {driver.assignedPlate}
                    </p>
                    <p className="text-[11px] text-black/40 font-mono mt-0.5">
                      {driver.assignedTruck}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[12px] text-black/30 italic">
                  No truck assigned
                </p>
              )}
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

        <div className="flex-shrink-0 px-6 py-5 border-t border-black/[0.08] space-y-2">
          {!driver.assignedTruck ? (
            <button
              onClick={() => onAssignTruck(driver)}
              className="w-full py-3 bg-black text-white text-[14px] font-black rounded-xl hover:bg-black/80 transition-colors flex items-center justify-center gap-2"
            >
              <FaCheckCircle size={13} />
              Assign a truck
            </button>
          ) : (
            <button
              onClick={() => onUnassignTruck(driver)}
              className="w-full py-3 bg-black/5 text-black text-[14px] font-black rounded-xl hover:bg-black/10 transition-colors flex items-center justify-center gap-2"
            >
              <FaTimesCircle size={13} />
              Unassign truck
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

export default MyDriverDrawer;
