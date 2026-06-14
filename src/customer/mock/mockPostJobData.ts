export type PostJobStatus =
  | "open"
  | "assigned"
  | "in_transit"
  | "delivered"
  | "cancelled";

export type PostJobPriority = "urgent" | "standard" | "low";

export type PostJobPricingMode = "open" | "fixed";

export type PostJobOffer = {
  id: string;
  driverName: string;
  driverId: string;
  plate: string;
  truckType: string;
  priceNgn: number;
  message: string;
  rating: number;
  submittedAt: string;
};

export type PostJobType = {
  id: string;
  postedAt: string;
  cargoType: string;
  weightKg: number;
  quantity: number;
  notes: string;
  pickupState: string;
  pickupCity: string;
  pickupAddress: string;
  deliveryState: string;
  deliveryCity: string;
  deliveryAddress: string;
  pickupDate: string;
  pickupTime: string;
  truckType: string;
  pricingMode: PostJobPricingMode;
  fixedPriceNgn: number | null;
  priority: PostJobPriority;
  status: PostJobStatus;
  offers: PostJobOffer[];
  acceptedOfferId: string | null;
};

export const SEED_POST_JOBS: PostJobType[] = [
  {
    id: "PJ-004401",
    postedAt: "2025-06-10T07:30:00Z",
    cargoType: "Granite / Gravel",
    weightKg: 18000,
    quantity: 1,
    notes: "Deliver to site before 8AM. Call site manager on arrival.",
    pickupState: "Lagos",
    pickupCity: "Ikorodu",
    pickupAddress: "12 Apapa Wharf Road, Ikorodu",
    deliveryState: "Ogun",
    deliveryCity: "Sagamu",
    deliveryAddress: "Km 5 Sagamu–Ibadan Expressway",
    pickupDate: "2025-06-13",
    pickupTime: "06:00",
    truckType: "tipper",
    pricingMode: "open",
    fixedPriceNgn: null,
    priority: "urgent",
    status: "open",
    acceptedOfferId: null,
    offers: [
      {
        id: "OFF-001",
        driverName: "Emeka Okafor",
        driverId: "DRV-0001",
        plate: "LG-442-AKJ",
        truckType: "Tipper Truck",
        priceNgn: 95000,
        message:
          "I can pick up first thing tomorrow morning. Truck is available now.",
        rating: 4.8,
        submittedAt: "2025-06-10T09:12:00Z",
      },
      {
        id: "OFF-002",
        driverName: "Biodun Adewale",
        driverId: "DRV-0021",
        plate: "OY-221-PLK",
        truckType: "Tipper Truck",
        priceNgn: 88000,
        message: "Ready to move. I've done this route many times.",
        rating: 4.5,
        submittedAt: "2025-06-10T10:44:00Z",
      },
    ],
  },
  {
    id: "PJ-004402",
    postedAt: "2025-06-11T09:00:00Z",
    cargoType: "Agricultural produce",
    weightKg: 5000,
    quantity: 200,
    notes: "",
    pickupState: "Kano",
    pickupCity: "Kano",
    pickupAddress: "Dawanau International Grain Market",
    deliveryState: "Lagos",
    deliveryCity: "Apapa",
    deliveryAddress: "3 Creek Road, Apapa",
    pickupDate: "2025-06-14",
    pickupTime: "08:00",
    truckType: "flatbed",
    pricingMode: "fixed",
    fixedPriceNgn: 420000,
    priority: "standard",
    status: "assigned",
    acceptedOfferId: "OFF-003",
    offers: [
      {
        id: "OFF-003",
        driverName: "Adamu Yusuf",
        driverId: "DRV-0014",
        plate: "MG-008-YMR",
        truckType: "Flatbed Truck",
        priceNgn: 420000,
        message: "Accepting at your fixed price. I am in Kano already.",
        rating: 4.9,
        submittedAt: "2025-06-11T10:05:00Z",
      },
    ],
  },
  {
    id: "PJ-004403",
    postedAt: "2025-06-09T14:00:00Z",
    cargoType: "Steel / Iron",
    weightKg: 22000,
    quantity: 1,
    notes: "Oversized coils. Requires strapping and edge protection.",
    pickupState: "Delta",
    pickupCity: "Warri",
    pickupAddress: "Warri Industrial Area, Effurun",
    deliveryState: "Rivers",
    deliveryCity: "Port Harcourt",
    deliveryAddress: "Trans Amadi Industrial Layout",
    pickupDate: "2025-06-12",
    pickupTime: "07:30",
    truckType: "lowloader",
    pricingMode: "open",
    fixedPriceNgn: null,
    priority: "urgent",
    status: "in_transit",
    acceptedOfferId: "OFF-004",
    offers: [
      {
        id: "OFF-004",
        driverName: "Chukwudi Nwachukwu",
        driverId: "DRV-0008",
        plate: "PH-110-BKC",
        truckType: "Low Loader",
        priceNgn: 175000,
        message: "Low loader available. I handle steel coils regularly.",
        rating: 4.7,
        submittedAt: "2025-06-09T15:30:00Z",
      },
    ],
  },
  {
    id: "PJ-004404",
    postedAt: "2025-06-08T11:20:00Z",
    cargoType: "Consumer goods",
    weightKg: 3200,
    quantity: 480,
    notes: "",
    pickupState: "Lagos",
    pickupCity: "Ikeja",
    pickupAddress: "21 Oba Akran Avenue, Ikeja",
    deliveryState: "Abuja",
    deliveryCity: "Abuja",
    deliveryAddress: "18 Wuse Zone 4, Abuja",
    pickupDate: "2025-06-11",
    pickupTime: "09:00",
    truckType: "curtainsider",
    pricingMode: "fixed",
    fixedPriceNgn: 280000,
    priority: "standard",
    status: "delivered",
    acceptedOfferId: "OFF-005",
    offers: [
      {
        id: "OFF-005",
        driverName: "Lawal Hassan",
        driverId: "DRV-0031",
        plate: "KD-554-ZZP",
        truckType: "Curtainsider",
        priceNgn: 280000,
        message: "Happy to take this. Curtainsider is clean and ready.",
        rating: 4.6,
        submittedAt: "2025-06-08T12:00:00Z",
      },
    ],
  },
  {
    id: "PJ-004405",
    postedAt: "2025-06-12T08:45:00Z",
    cargoType: "Cement",
    weightKg: 9000,
    quantity: 360,
    notes: "Bags must stay dry. Tarpaulin cover required.",
    pickupState: "Ogun",
    pickupCity: "Ewekoro",
    pickupAddress: "Dangote Cement Plant, Ewekoro",
    deliveryState: "Ondo",
    deliveryCity: "Akure",
    deliveryAddress: "7 Oyemekun Road, Akure",
    pickupDate: "2025-06-15",
    pickupTime: "06:30",
    truckType: "flatbed",
    pricingMode: "open",
    fixedPriceNgn: null,
    priority: "low",
    status: "open",
    acceptedOfferId: null,
    offers: [],
  },
  {
    id: "PJ-004406",
    postedAt: "2025-06-11T16:00:00Z",
    cargoType: "Machinery",
    weightKg: 14000,
    quantity: 1,
    notes: "Generator set on skids. Needs chains and blocking.",
    pickupState: "Lagos",
    pickupCity: "Apapa",
    pickupAddress: "Kirikiri Industrial Estate",
    deliveryState: "Enugu",
    deliveryCity: "Enugu",
    deliveryAddress: "9th Mile Corner, Ngwo",
    pickupDate: "2025-06-14",
    pickupTime: "05:00",
    truckType: "lowloader",
    pricingMode: "fixed",
    fixedPriceNgn: 350000,
    priority: "urgent",
    status: "cancelled",
    acceptedOfferId: null,
    offers: [
      {
        id: "OFF-006",
        driverName: "Emeka Okafor",
        driverId: "DRV-0001",
        plate: "LG-442-AKJ",
        truckType: "Low Loader",
        priceNgn: 350000,
        message: "Available and ready.",
        rating: 4.8,
        submittedAt: "2025-06-11T17:10:00Z",
      },
    ],
  },
];

export const POST_JOB_STATUS_OPTIONS = [
  { label: "Open", value: "open" },
  { label: "Assigned", value: "assigned" },
  { label: "In Transit", value: "in_transit" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export const POST_JOB_PRIORITY_OPTIONS = [
  { label: "Urgent", value: "urgent" },
  { label: "Standard", value: "standard" },
  { label: "Low", value: "low" },
];

export const TRUCK_TYPE_OPTIONS = [
  { id: "flatbed", label: "Flatbed", desc: "Open deck, heavy loads" },
  { id: "tipper", label: "Tipper", desc: "Sand, granite, aggregate" },
  {
    id: "curtainsider",
    label: "Curtainsider",
    desc: "Bagged & palletised goods",
  },
  { id: "tanker", label: "Tanker", desc: "Liquids & bulk dry goods" },
  { id: "lowloader", label: "Low Loader", desc: "Machinery & oversized cargo" },
  { id: "any", label: "Any available", desc: "Let drivers bid" },
];

export const PRICING_MODE_OPTIONS = [
  { id: "open", label: "Open to bids", desc: "Drivers propose their price" },
  { id: "fixed", label: "Set my price", desc: "You name the amount" },
];

export const CARGO_TYPE_OPTIONS = [
  "Granite / Gravel",
  "Sand",
  "Cement",
  "Steel / Iron",
  "Agricultural produce",
  "Building materials",
  "Machinery",
  "Consumer goods",
  "Liquid / Oil & Gas",
  "Other",
];
