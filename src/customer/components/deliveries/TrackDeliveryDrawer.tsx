import StatusPill from "../../../ui/StatusPill";
import MapView from "../../../ui/MapView";

type DeliveryStatus = "pending" | "in_transit" | "delivered" | "cancelled";

type Delivery = {
  id: string;
  title: string;
  driver: string;
  truck: string;
  pickup: string;
  dropoff: string;
  date: string;
  status: DeliveryStatus;
  progress: number;
  pickupCoords?: [number, number];
  dropoffCoords?: [number, number];
};

type Props = {
  delivery: Delivery | null;
  onClose: () => void;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const statusColor: Record<DeliveryStatus, string> = {
  pending: "#f59e0b",
  in_transit: "#3b82f6",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

const DEFAULT_PICKUP: [number, number] = [6.4281, 3.4219];
const DEFAULT_DROPOFF: [number, number] = [6.4698, 3.5852];

const TrackDeliveryDrawer = ({ delivery, onClose }: Props) => {
  if (!delivery) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-[560px] h-full bg-white shadow-xl flex flex-col">
        <div className="flex-shrink-0 px-6 py-5 border-b border-black/[0.08] flex items-start justify-between">
          <div>
            <h2 className="text-[17px] text-black zabalBoldFont">
              {delivery.title}
            </h2>
            <p className="text-[12px] text-black/40 mt-0.5">
              Live tracking & delivery details
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
            pickupCoords={delivery.pickupCoords ?? DEFAULT_PICKUP}
            dropoffCoords={delivery.dropoffCoords ?? DEFAULT_DROPOFF}
            pickupLabel={delivery.pickup}
            dropoffLabel={delivery.dropoff}
            progress={delivery.progress}
            showTruck={delivery.status === "in_transit"}
            height={280}
          />

          <div className="px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <StatusPill status={delivery.status} />
              <span className="text-[11px] text-black/40">{delivery.date}</span>
            </div>

            <div className="bg-black/[0.03] rounded-xl overflow-hidden border border-black/[0.06]">
              <div className="px-5 pt-4 pb-4 border-b border-black/[0.06]">
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
                      <p className="text-[13px] text-black zabalBoldFont">
                        {delivery.pickup}
                      </p>
                      <p className="text-[11px] text-black/40">
                        Pickup location
                      </p>
                    </div>
                    <div>
                      <p className="text-[13px] text-black zabalBoldFont">
                        {delivery.dropoff}
                      </p>
                      <p className="text-[11px] text-black/40">
                        Drop-off location
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-black/[0.06]">
                <div className="px-5 py-3 flex flex-col gap-0.5">
                  <p className="text-[11px] text-black/40">Driver</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-[10px] flex items-center justify-center flex-shrink-0 zabalBoldFont">
                      {getInitials(delivery.driver)}
                    </div>
                    <p className="text-[13px] zabalBoldFont text-black">
                      {delivery.driver}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-3 flex flex-col gap-0.5">
                  <p className="text-[11px] text-black/40">Truck type</p>
                  <p className="text-[13px] zabalBoldFont text-black">
                    {delivery.truck}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] zabalBoldFont text-black/40 uppercase tracking-wider">
                  Progress
                </p>
                <p className="text-[13px] text-black zabalBoldFont">
                  {delivery.progress}%
                </p>
              </div>
              <div className="h-2 bg-black/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${delivery.progress}%`,
                    background: statusColor[delivery.status],
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <p className="text-[10px] text-black/30">Picked up</p>
                <p className="text-[10px] text-black/30">Delivered</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="w-full py-3 bg-black text-white text-[13px] rounded-xl hover:bg-black/80 transition-colors zabalBoldFont">
                Contact Driver
              </button>
              <button className="w-full zabalBoldFont py-3 border border-black/[0.1] text-black text-[13px] rounded-xl hover:bg-black/[0.04] transition-colors">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDeliveryDrawer;
