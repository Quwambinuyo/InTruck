import {
  SEED_POST_JOBS,
  type PostJobType,
  type PostJobStatus,
  type PostJobPriority,
} from "./mockPostJobData";

export type Offer = {
  id: string;
  driver: string;
  price: number;
  message: string;
};

export type MyJobStatus = "active" | "completed" | "cancelled";

export type MyJob = {
  id: string;
  title: string;
  cargo: string;
  pickup: string;
  dropoff: string;
  date: string;
  truckType: string;
  status: MyJobStatus;
  postStatus: PostJobStatus;
  priority: PostJobPriority;
  bids: number;
  price?: number;
  offers: Offer[];
  quantity: number;
  weightKg: number;
  notes: string;
};

const TRUCK_TYPE_LABELS: Record<string, string> = {
  flatbed: "Flatbed",
  tipper: "Tipper",
  curtainsider: "Curtainsider",
  tanker: "Tanker",
  lowloader: "Low Loader",
  any: "Any available",
};

const STATUS_MAP: Record<PostJobStatus, MyJobStatus> = {
  open: "active",
  assigned: "active",
  in_transit: "active",
  delivered: "completed",
  cancelled: "cancelled",
};

const formatPickupDateTime = (date: string, time: string) => {
  const d = new Date(`${date}T${time}:00`);
  const datePart = d.toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${datePart} ${time}`;
};

const getJobPrice = (job: PostJobType) => {
  if (job.pricingMode === "fixed" && job.fixedPriceNgn) {
    return job.fixedPriceNgn;
  }
  if (job.acceptedOfferId) {
    const accepted = job.offers.find((o) => o.id === job.acceptedOfferId);
    if (accepted) return accepted.priceNgn;
  }
  return undefined;
};

const mapPostJobToMyJob = (postJob: PostJobType): MyJob => ({
  id: postJob.id,
  title: `${postJob.cargoType} delivery`,
  cargo: `${postJob.cargoType} • ${postJob.weightKg.toLocaleString()} kg`,
  pickup: `${postJob.pickupCity}, ${postJob.pickupState}`,
  dropoff: `${postJob.deliveryCity}, ${postJob.deliveryState}`,
  date: formatPickupDateTime(postJob.pickupDate, postJob.pickupTime),
  truckType: TRUCK_TYPE_LABELS[postJob.truckType] ?? postJob.truckType,
  status: STATUS_MAP[postJob.status],
  postStatus: postJob.status,
  priority: postJob.priority,
  bids: postJob.offers.length,
  price: getJobPrice(postJob),
  offers: postJob.offers.map((o) => ({
    id: o.id,
    driver: o.driverName,
    price: o.priceNgn,
    message: o.message,
  })),
  quantity: postJob.quantity,
  weightKg: postJob.weightKg,
  notes: postJob.notes,
});

export const MOCK_MY_JOBS: MyJob[] = SEED_POST_JOBS.map(mapPostJobToMyJob);
