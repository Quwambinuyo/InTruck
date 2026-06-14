export type JobRequestStatus =
  | "pending"
  | "accepted"
  | "in_transit"
  | "delivered"
  | "cancelled";

export type JobRequestPriority = "urgent" | "standard" | "low";

export type JobRequestType = {
  id: string;
  requestDate: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupState: string;
  deliveryState: string;
  cargoType: string;
  weightKg: number;
  truckType: string;
  assignedDriver: string | null;
  assignedDriverId: string | null;
  assignedPlate: string | null;
  status: JobRequestStatus;
  priority: JobRequestPriority;
  estimatedDelivery: string;
  distance: string;
  amountNgn: number;
  requestedBy: string;
  contactPhone: string;
  notes: string;
};

export const SEED_JOB_REQUESTS: JobRequestType[] = [
  {
    id: "JR-001284",
    requestDate: "2025-06-10T08:22:00Z",
    pickupAddress: "14 Apapa Wharf Road",
    deliveryAddress: "22 Kano Industrial Estate",
    pickupState: "Lagos",
    deliveryState: "Kano",
    cargoType: "Electronics",
    weightKg: 3200,
    truckType: "40-footer Flat Bed",
    assignedDriver: "Emeka Okafor",
    assignedDriverId: "DRV-0001",
    assignedPlate: "LG-442-AKJ",
    status: "in_transit",
    priority: "urgent",
    estimatedDelivery: "2025-06-13",
    distance: "1,120 km",
    amountNgn: 480000,
    requestedBy: "TechBase Nigeria Ltd",
    contactPhone: "08031234567",
    notes: "Fragile — handle with care. Driver must call on arrival.",
  },
  {
    id: "JR-001285",
    requestDate: "2025-06-11T10:05:00Z",
    pickupAddress: "Block C, Aba Trade Fair Complex",
    deliveryAddress: "5 Airport Road, Enugu",
    pickupState: "Abia",
    deliveryState: "Enugu",
    cargoType: "Clothing & Textiles",
    weightKg: 800,
    truckType: "Mini Truck",
    assignedDriver: null,
    assignedDriverId: null,
    assignedPlate: null,
    status: "pending",
    priority: "standard",
    estimatedDelivery: "2025-06-14",
    distance: "210 km",
    amountNgn: 85000,
    requestedBy: "Amaka Fashion Hub",
    contactPhone: "09011223344",
    notes: "",
  },
  {
    id: "JR-001286",
    requestDate: "2025-06-11T13:47:00Z",
    pickupAddress: "27 Trans Amadi Industrial Layout",
    deliveryAddress: "Port Harcourt Central Market",
    pickupState: "Rivers",
    deliveryState: "Rivers",
    cargoType: "Food & Perishables",
    weightKg: 1500,
    truckType: "Refrigerated Truck",
    assignedDriver: "Chukwudi Nwachukwu",
    assignedDriverId: "DRV-0008",
    assignedPlate: "PH-110-BKC",
    status: "accepted",
    priority: "urgent",
    estimatedDelivery: "2025-06-12",
    distance: "35 km",
    amountNgn: 60000,
    requestedBy: "Freshco Distributors",
    contactPhone: "08098765432",
    notes: "Must arrive before 6AM. Dock gate closes at 6:30AM.",
  },
  {
    id: "JR-001287",
    requestDate: "2025-06-09T09:00:00Z",
    pickupAddress: "Maiduguri Main Market",
    deliveryAddress: "18 Wuse Zone 4",
    pickupState: "Borno",
    deliveryState: "FCT",
    cargoType: "Agricultural Produce",
    weightKg: 4800,
    truckType: "60-footer Container Truck",
    assignedDriver: "Adamu Yusuf",
    assignedDriverId: "DRV-0014",
    assignedPlate: "MG-008-YMR",
    status: "delivered",
    priority: "standard",
    estimatedDelivery: "2025-06-12",
    distance: "1,340 km",
    amountNgn: 620000,
    requestedBy: "GreenField Agro Exports",
    contactPhone: "07012233445",
    notes: "",
  },
  {
    id: "JR-001288",
    requestDate: "2025-06-12T07:15:00Z",
    pickupAddress: "Lekki Free Trade Zone",
    deliveryAddress: "Sagamu Interchange Depot",
    pickupState: "Lagos",
    deliveryState: "Ogun",
    cargoType: "Industrial Machinery",
    weightKg: 7200,
    truckType: "Heavy Haulage",
    assignedDriver: null,
    assignedDriverId: null,
    assignedPlate: null,
    status: "pending",
    priority: "urgent",
    estimatedDelivery: "2025-06-13",
    distance: "88 km",
    amountNgn: 210000,
    requestedBy: "OmniTech Engineering",
    contactPhone: "08155667788",
    notes: "Requires escort vehicle. Abnormal load permit attached.",
  },
  {
    id: "JR-001289",
    requestDate: "2025-06-08T14:30:00Z",
    pickupAddress: "Challenge Market, Ibadan",
    deliveryAddress: "Ojota Motor Park",
    pickupState: "Oyo",
    deliveryState: "Lagos",
    cargoType: "Building Materials",
    weightKg: 5500,
    truckType: "Tipper Truck",
    assignedDriver: "Biodun Adewale",
    assignedDriverId: "DRV-0021",
    assignedPlate: "OY-221-PLK",
    status: "cancelled",
    priority: "low",
    estimatedDelivery: "2025-06-11",
    distance: "145 km",
    amountNgn: 130000,
    requestedBy: "BuildRight Supplies",
    contactPhone: "09033445566",
    notes: "Cancelled by client — load no longer available.",
  },
  {
    id: "JR-001290",
    requestDate: "2025-06-12T11:00:00Z",
    pickupAddress: "Apapa Container Terminal",
    deliveryAddress: "Kaduna Dry Port",
    pickupState: "Lagos",
    deliveryState: "Kaduna",
    cargoType: "Consumer Goods",
    weightKg: 6000,
    truckType: "40-footer Container Truck",
    assignedDriver: null,
    assignedDriverId: null,
    assignedPlate: null,
    status: "pending",
    priority: "standard",
    estimatedDelivery: "2025-06-15",
    distance: "950 km",
    amountNgn: 390000,
    requestedBy: "PanAfrica Trade Co.",
    contactPhone: "08099887766",
    notes: "",
  },
  {
    id: "JR-001291",
    requestDate: "2025-06-10T16:45:00Z",
    pickupAddress: "3 Textile Mill Road, Kaduna",
    deliveryAddress: "Gbagi Market, Ibadan",
    pickupState: "Kaduna",
    deliveryState: "Oyo",
    cargoType: "Clothing & Textiles",
    weightKg: 2100,
    truckType: "Curtain-side Truck",
    assignedDriver: "Lawal Hassan",
    assignedDriverId: "DRV-0031",
    assignedPlate: "KD-554-ZZP",
    status: "in_transit",
    priority: "low",
    estimatedDelivery: "2025-06-14",
    distance: "820 km",
    amountNgn: 275000,
    requestedBy: "Arewa Fabrics Ltd",
    contactPhone: "08022334455",
    notes: "",
  },
];

export const JOB_STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "In Transit", value: "in_transit" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export const JOB_PRIORITY_OPTIONS = [
  { label: "Urgent", value: "urgent" },
  { label: "Standard", value: "standard" },
  { label: "Low", value: "low" },
];
