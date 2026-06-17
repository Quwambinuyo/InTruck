export type AllJobStatus =
  | "open"
  | "assigned"
  | "in_transit"
  | "delivered"
  | "cancelled";

export type AllJobPriority = "urgent" | "standard" | "low";

export type AllJobType = {
  id: string;
  postedDate: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupState: string;
  deliveryState: string;
  cargoType: string;
  weightKg: number;
  truckType: string;
  status: AllJobStatus;
  priority: AllJobPriority;
  estimatedDelivery: string;
  distance: string;
  budgetNgn: number;
  bidsCount: number;
  postedBy: string;
  contactPhone: string;
  notes: string;
};

export const SEED_ALL_JOBS: AllJobType[] = [
  {
    id: "PJ-009001",
    postedDate: "2025-06-01T09:10:00Z",
    pickupAddress: "14 Apapa Wharf Road",
    deliveryAddress: "22 Kano Industrial Estate",
    pickupState: "Lagos",
    deliveryState: "Kano",
    cargoType: "Electronics",
    weightKg: 3200,
    truckType: "40-footer Flat Bed",
    status: "in_transit",
    priority: "urgent",
    estimatedDelivery: "2025-06-13",
    distance: "1,120 km",
    budgetNgn: 480000,
    bidsCount: 7,
    postedBy: "TechBase Nigeria Ltd",
    contactPhone: "08031234567",
    notes: "Fragile — handle with care. Driver must call on arrival.",
  },
  {
    id: "PJ-009002",
    postedDate: "2025-06-03T11:30:00Z",
    pickupAddress: "Block C, Aba Trade Fair Complex",
    deliveryAddress: "5 Airport Road, Enugu",
    pickupState: "Abia",
    deliveryState: "Enugu",
    cargoType: "Clothing & Textiles",
    weightKg: 800,
    truckType: "Mini Truck",
    status: "open",
    priority: "standard",
    estimatedDelivery: "2025-06-18",
    distance: "210 km",
    budgetNgn: 85000,
    bidsCount: 2,
    postedBy: "Amaka Fashion Hub",
    contactPhone: "09011223344",
    notes: "",
  },
  {
    id: "PJ-009003",
    postedDate: "2025-06-04T14:00:00Z",
    pickupAddress: "27 Trans Amadi Industrial Layout",
    deliveryAddress: "Port Harcourt Central Market",
    pickupState: "Rivers",
    deliveryState: "Rivers",
    cargoType: "Food & Perishables",
    weightKg: 1500,
    truckType: "Refrigerated Truck",
    status: "delivered",
    priority: "urgent",
    estimatedDelivery: "2025-06-06",
    distance: "35 km",
    budgetNgn: 60000,
    bidsCount: 5,
    postedBy: "Freshco Distributors",
    contactPhone: "08098765432",
    notes: "Must arrive before 6AM. Dock gate closes at 6:30AM.",
  },
  {
    id: "PJ-009004",
    postedDate: "2025-06-02T08:00:00Z",
    pickupAddress: "Maiduguri Main Market",
    deliveryAddress: "18 Wuse Zone 4",
    pickupState: "Borno",
    deliveryState: "FCT",
    cargoType: "Agricultural Produce",
    weightKg: 4800,
    truckType: "60-footer Container Truck",
    status: "delivered",
    priority: "standard",
    estimatedDelivery: "2025-06-07",
    distance: "1,340 km",
    budgetNgn: 620000,
    bidsCount: 9,
    postedBy: "GreenField Agro Exports",
    contactPhone: "07012233445",
    notes: "",
  },
  {
    id: "PJ-009005",
    postedDate: "2025-06-05T07:15:00Z",
    pickupAddress: "Lekki Free Trade Zone",
    deliveryAddress: "Sagamu Interchange Depot",
    pickupState: "Lagos",
    deliveryState: "Ogun",
    cargoType: "Industrial Machinery",
    weightKg: 7200,
    truckType: "Heavy Haulage",
    status: "open",
    priority: "urgent",
    estimatedDelivery: "2025-06-20",
    distance: "88 km",
    budgetNgn: 210000,
    bidsCount: 0,
    postedBy: "OmniTech Engineering",
    contactPhone: "08155667788",
    notes: "Requires escort vehicle. Abnormal load permit attached.",
  },
  {
    id: "PJ-009006",
    postedDate: "2025-06-01T14:30:00Z",
    pickupAddress: "Challenge Market, Ibadan",
    deliveryAddress: "Ojota Motor Park",
    pickupState: "Oyo",
    deliveryState: "Lagos",
    cargoType: "Building Materials",
    weightKg: 5500,
    truckType: "Tipper Truck",
    status: "cancelled",
    priority: "low",
    estimatedDelivery: "2025-06-05",
    distance: "145 km",
    budgetNgn: 130000,
    bidsCount: 3,
    postedBy: "BuildRight Supplies",
    contactPhone: "09033445566",
    notes: "Cancelled — load no longer available.",
  },
  {
    id: "PJ-009007",
    postedDate: "2025-06-06T11:00:00Z",
    pickupAddress: "Apapa Container Terminal",
    deliveryAddress: "Kaduna Dry Port",
    pickupState: "Lagos",
    deliveryState: "Kaduna",
    cargoType: "Consumer Goods",
    weightKg: 6000,
    truckType: "40-footer Container Truck",
    status: "assigned",
    priority: "standard",
    estimatedDelivery: "2025-06-19",
    distance: "950 km",
    budgetNgn: 390000,
    bidsCount: 6,
    postedBy: "PanAfrica Trade Co.",
    contactPhone: "08099887766",
    notes: "",
  },
  {
    id: "PJ-009008",
    postedDate: "2025-06-07T16:45:00Z",
    pickupAddress: "3 Textile Mill Road, Kaduna",
    deliveryAddress: "Gbagi Market, Ibadan",
    pickupState: "Kaduna",
    deliveryState: "Oyo",
    cargoType: "Clothing & Textiles",
    weightKg: 2100,
    truckType: "Curtain-side Truck",
    status: "open",
    priority: "low",
    estimatedDelivery: "2025-06-22",
    distance: "820 km",
    budgetNgn: 275000,
    bidsCount: 1,
    postedBy: "Arewa Fabrics Ltd",
    contactPhone: "08022334455",
    notes: "",
  },
];

export const ALL_JOB_STATUS_OPTIONS = [
  { label: "Open", value: "open" },
  { label: "Assigned", value: "assigned" },
  { label: "In Transit", value: "in_transit" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export const ALL_JOB_PRIORITY_OPTIONS = [
  { label: "Urgent", value: "urgent" },
  { label: "Standard", value: "standard" },
  { label: "Low", value: "low" },
];

export const ALL_JOB_CARGO_OPTIONS = [
  { label: "Electronics", value: "Electronics" },
  { label: "Clothing & Textiles", value: "Clothing & Textiles" },
  { label: "Food & Perishables", value: "Food & Perishables" },
  { label: "Agricultural Produce", value: "Agricultural Produce" },
  { label: "Industrial Machinery", value: "Industrial Machinery" },
  { label: "Building Materials", value: "Building Materials" },
  { label: "Consumer Goods", value: "Consumer Goods" },
];
