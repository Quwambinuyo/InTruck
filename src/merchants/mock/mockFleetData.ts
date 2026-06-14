export type FleetStatus = "active" | "idle" | "maintenance";

export type FleetDriver = {
  id: string;
  name: string;
  licence: string;
  phone: string;
  avatar?: string;
};

export type Fleet = {
  id: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  type: string;
  capacity: number;
  status: FleetStatus;
  image: string;
  driver: FleetDriver | null;
  lastTrip?: string;
  mileage: number;
  location: string;
};

export const FLEET_TRUCKS: Fleet[] = [
  {
    id: "FLT-001",
    plate: "LND-442-KA",
    make: "Mack",
    model: "Granite",
    year: 2021,
    type: "Heavy Duty",
    capacity: 30,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
    driver: {
      id: "DRV-001",
      name: "Emeka Ojo",
      licence: "LIC-NG-4821",
      phone: "+234 801 234 5678",
    },
    lastTrip: "2024-06-10",
    mileage: 142300,
    location: "Lagos → Abuja",
  },
  {
    id: "FLT-002",
    plate: "ABJ-801-ZF",
    make: "Scania",
    model: "R500",
    year: 2020,
    type: "Long Haul",
    capacity: 25,
    status: "idle",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80",
    driver: null,
    lastTrip: "2024-06-08",
    mileage: 98500,
    location: "Abuja Depot",
  },
  {
    id: "FLT-003",
    plate: "PH-209-EK",
    make: "MAN",
    model: "TGS 26.440",
    year: 2019,
    type: "Flatbed",
    capacity: 20,
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    driver: {
      id: "DRV-003",
      name: "Chidi Nweke",
      licence: "LIC-NG-3312",
      phone: "+234 803 456 7890",
    },
    lastTrip: "2024-06-05",
    mileage: 210400,
    location: "PH Workshop",
  },
  {
    id: "FLT-004",
    plate: "KNO-317-BX",
    make: "Volvo",
    model: "FH16",
    year: 2022,
    type: "Refrigerated",
    capacity: 18,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    driver: {
      id: "DRV-004",
      name: "Fatima Aliyu",
      licence: "LIC-NG-5509",
      phone: "+234 806 789 0123",
    },
    lastTrip: "2024-06-11",
    mileage: 67200,
    location: "Kano → Lagos",
  },
  {
    id: "FLT-005",
    plate: "IBA-554-QR",
    make: "Mercedes",
    model: "Actros 2545",
    year: 2021,
    type: "Tanker",
    capacity: 35,
    status: "idle",
    image:
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=600&q=80",
    driver: null,
    lastTrip: "2024-06-09",
    mileage: 175600,
    location: "Ibadan Depot",
  },
  {
    id: "FLT-006",
    plate: "ENS-112-FG",
    make: "DAF",
    model: "XF 480",
    year: 2020,
    type: "Container",
    capacity: 28,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80",
    driver: {
      id: "DRV-006",
      name: "Segun Adeyemi",
      licence: "LIC-NG-7734",
      phone: "+234 809 012 3456",
    },
    lastTrip: "2024-06-11",
    mileage: 88900,
    location: "Enugu → Port Harcourt",
  },
];

export const FLEET_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Idle", value: "idle" },
  { label: "Maintenance", value: "maintenance" },
];
