import {
  FaTruck,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserSlash,
} from "react-icons/fa";
import StatusPill from "../../../ui/StatusPill";
import Avatar from "../../../ui/Avatar";
import type { Fleet } from "../../mock/mockFleetData";

type Props = {
  fleet: Fleet | null;
  onClose: () => void;
  onAssignDriver: (fleet: Fleet) => void;
  onUnassignDriver: (fleet: Fleet) => void;
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatMileage(m: number) {
  return m.toLocaleString("en-NG") + " km";
}

const FleetDrawer = ({
  fleet,
  onClose,
  onAssignDriver,
  onUnassignDriver,
}: Props) => {
  if (!fleet) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-[560px] h-full bg-white shadow-xl flex flex-col">
        <div className="flex-shrink-0 px-6 py-5 border-b border-black/[0.08] flex items-start justify-between">
          <div>
            <h2 className="text-[17px] font-black text-black">Fleet details</h2>
            <p className="text-[12px] text-black/40 mt-0.5">{fleet.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[13px] text-black/50 hover:text-black bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="rounded-2xl overflow-hidden border border-black/[0.08] aspect-video w-full">
            <img
              src={fleet.image}
              alt={`${fleet.make} ${fleet.model}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="text-[20px] font-black text-black">{fleet.plate}</p>
              <p className="text-[13px] text-black/40 mt-0.5 font-mono">
                {fleet.id}
              </p>
            </div>
            <StatusPill status={fleet.status} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 flex flex-col items-center gap-1">
              <p className="text-[20px] font-black text-black">
                {fleet.capacity}t
              </p>
              <p className="text-[11px] text-black/40 text-center">Capacity</p>
            </div>
            <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 flex flex-col items-center gap-1">
              <p className="text-[20px] font-black text-black">{fleet.year}</p>
              <p className="text-[11px] text-black/40 text-center">Year</p>
            </div>
            <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 flex flex-col items-center gap-1">
              <p className="text-[20px] font-black text-black truncate w-full text-center">
                {fleet.type.split(" ")[0]}
              </p>
              <p className="text-[11px] text-black/40 text-center">Type</p>
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
                <p className="text-[12px] text-black/40">Make & model</p>
                <div className="flex items-center gap-1.5">
                  <FaTruck className="text-black/40 text-xs" />
                  <p className="text-[12px] font-semibold text-black">
                    {fleet.make} {fleet.model}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Location</p>
                <div className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-black/40 text-xs" />
                  <p className="text-[12px] font-semibold text-black">
                    {fleet.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Mileage</p>
                <div className="flex items-center gap-1.5">
                  <FaTachometerAlt className="text-black/40 text-xs" />
                  <p className="text-[12px] font-semibold text-black">
                    {formatMileage(fleet.mileage)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-[12px] text-black/40">Last trip</p>
                <div className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-black/40 text-xs" />
                  <p className="text-[12px] font-semibold text-black">
                    {formatDate(fleet.lastTrip)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-black/40 uppercase tracking-wider">
              Assigned driver
            </p>

            {fleet.driver ? (
              <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-5 py-4 flex items-center gap-4">
                <Avatar name={fleet.driver.name} size={44} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-black text-black">
                    {fleet.driver.name}
                  </p>
                  <p className="text-[12px] text-black/40 mt-0.5">
                    {fleet.driver.licence}
                  </p>
                  <p className="text-[12px] text-black/40">
                    {fleet.driver.phone}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-5 py-5 flex flex-col items-center gap-2">
                <FaUserSlash className="text-black/20" size={22} />
                <p className="text-[13px] text-black/30 italic">
                  No driver assigned
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 px-6 py-5 border-t border-black/[0.08] space-y-2">
          {!fleet.driver ? (
            <button
              onClick={() => onAssignDriver(fleet)}
              className="w-full py-3 bg-black text-white text-[14px] font-black rounded-xl hover:bg-black/80 transition-colors"
            >
              Assign a driver
            </button>
          ) : (
            <button
              onClick={() => onUnassignDriver(fleet)}
              className="w-full py-3 bg-black/5 text-black text-[14px] font-black rounded-xl hover:bg-black/10 transition-colors flex items-center justify-center gap-2"
            >
              <FaUserSlash size={13} />
              Unassign driver
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FleetDrawer;
