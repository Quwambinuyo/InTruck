export type DriverStatus = "active" | "idle" | "assigned";
export type KYCStatus = "verified" | "pending" | "rejected";

export type DriverReview = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type MyDriverType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  status: DriverStatus;
  avatar: string;
  licenceId: string;
  licenceImage: string;
  licenceExpiry: string;
  nin: string;
  ninImage: string;
  truckType: string;
  assignedTruck: string | null;
  assignedPlate: string | null;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  kycStatus: KYCStatus;
  joinedDate: string;
  reviews: DriverReview[];
};

export const SEED_MY_DRIVERS: MyDriverType[] = [
  {
    id: "DRV-001",
    name: "Emeka Ojo",
    phone: "+234 801 234 5678",
    email: "emeka.ojo@intruck.ng",
    address: "14 Bode Thomas Street, Surulere",
    state: "Lagos",
    status: "assigned",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    licenceId: "LIC-NG-4821",
    licenceImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    licenceExpiry: "2027-03-15",
    nin: "NIN-7734-8821-KK",
    ninImage:
      "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=400&q=80",
    truckType: "Heavy Duty",
    assignedTruck: "FLT-001",
    assignedPlate: "LND-442-KA",
    rating: 4.8,
    reviewCount: 34,
    jobsCompleted: 112,
    kycStatus: "verified",
    joinedDate: "2022-04-10",
    reviews: [
      {
        id: "R1",
        author: "Ade Logistics Ltd",
        rating: 5,
        comment: "Very punctual and careful with goods. Highly recommend.",
        date: "2024-05-20",
      },
      {
        id: "R2",
        author: "ChiChi Foods",
        rating: 4,
        comment: "Good driver, arrived a bit late but delivery was perfect.",
        date: "2024-04-11",
      },
    ],
  },
  {
    id: "DRV-002",
    name: "Tunde Bello",
    phone: "+234 802 345 6789",
    email: "tunde.bello@intruck.ng",
    address: "7 Ahmadu Bello Way, Garki",
    state: "Abuja",
    status: "idle",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    licenceId: "LIC-NG-3302",
    licenceImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    licenceExpiry: "2026-08-20",
    nin: "NIN-5512-3390-AB",
    ninImage:
      "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=400&q=80",
    truckType: "Long Haul",
    assignedTruck: null,
    assignedPlate: null,
    rating: 4.5,
    reviewCount: 21,
    jobsCompleted: 78,
    kycStatus: "verified",
    joinedDate: "2023-01-18",
    reviews: [
      {
        id: "R3",
        author: "Nnamdi Cargo Co.",
        rating: 5,
        comment: "Excellent service, very professional.",
        date: "2024-03-08",
      },
    ],
  },
  {
    id: "DRV-003",
    name: "Chidi Nweke",
    phone: "+234 803 456 7890",
    email: "chidi.nweke@intruck.ng",
    address: "22 Rumuola Road, GRA Phase 2",
    state: "Port Harcourt",
    status: "assigned",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    licenceId: "LIC-NG-3312",
    licenceImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    licenceExpiry: "2025-12-01",
    nin: "NIN-9910-2281-PH",
    ninImage:
      "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=400&q=80",
    truckType: "Flatbed",
    assignedTruck: "FLT-003",
    assignedPlate: "PH-209-EK",
    rating: 4.2,
    reviewCount: 15,
    jobsCompleted: 54,
    kycStatus: "pending",
    joinedDate: "2023-07-05",
    reviews: [],
  },
  {
    id: "DRV-004",
    name: "Fatima Aliyu",
    phone: "+234 806 789 0123",
    email: "fatima.aliyu@intruck.ng",
    address: "3 Murtala Mohammed Way, Nassarawa GRA",
    state: "Kano",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    licenceId: "LIC-NG-5509",
    licenceImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    licenceExpiry: "2028-02-10",
    nin: "NIN-4401-7723-KN",
    ninImage:
      "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=400&q=80",
    truckType: "Refrigerated",
    assignedTruck: "FLT-004",
    assignedPlate: "KNO-317-BX",
    rating: 4.9,
    reviewCount: 47,
    jobsCompleted: 163,
    kycStatus: "verified",
    joinedDate: "2021-11-22",
    reviews: [
      {
        id: "R4",
        author: "FreshFarms Nigeria",
        rating: 5,
        comment: "Always keeps perishables safe. Outstanding driver.",
        date: "2024-06-01",
      },
      {
        id: "R5",
        author: "ColdChain Express",
        rating: 5,
        comment: "Top tier professionalism and punctuality.",
        date: "2024-05-14",
      },
    ],
  },
  {
    id: "DRV-005",
    name: "Segun Adeyemi",
    phone: "+234 809 012 3456",
    email: "segun.adeyemi@intruck.ng",
    address: "45 Ogui Road, Independence Layout",
    state: "Enugu",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    licenceId: "LIC-NG-7734",
    licenceImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    licenceExpiry: "2026-05-30",
    nin: "NIN-2230-5518-EN",
    ninImage:
      "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=400&q=80",
    truckType: "Container",
    assignedTruck: "FLT-006",
    assignedPlate: "ENS-112-FG",
    rating: 4.6,
    reviewCount: 29,
    jobsCompleted: 91,
    kycStatus: "verified",
    joinedDate: "2022-09-14",
    reviews: [
      {
        id: "R6",
        author: "Oakwood Imports",
        rating: 5,
        comment: "Delivered across state lines without a single issue.",
        date: "2024-04-28",
      },
    ],
  },
  {
    id: "DRV-006",
    name: "Blessing Okafor",
    phone: "+234 808 901 2345",
    email: "blessing.okafor@intruck.ng",
    address: "9 Ekwueme Square, Awka",
    state: "Anambra",
    status: "idle",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    licenceId: "LIC-NG-6621",
    licenceImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    licenceExpiry: "2027-09-18",
    nin: "NIN-8812-4490-AN",
    ninImage:
      "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=400&q=80",
    truckType: "Heavy Duty",
    assignedTruck: null,
    assignedPlate: null,
    rating: 3.9,
    reviewCount: 8,
    jobsCompleted: 22,
    kycStatus: "rejected",
    joinedDate: "2024-01-03",
    reviews: [],
  },
];

export const DRIVER_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Idle", value: "idle" },
  { label: "Assigned", value: "assigned" },
];

export const DRIVER_KYC_OPTIONS = [
  { label: "Verified", value: "verified" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];
