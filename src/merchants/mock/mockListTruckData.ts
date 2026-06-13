export type TruckStatus = "active" | "idle" | "maintenance";

export interface Driver {
  name: string;
  phone: string;
  licence: string;
}

export interface Truck {
  id: string;
  plate: string;
  make: string;
  model: string;
  year: string;
  type: string;
  capacity: number;
  status: TruckStatus;
  driver: Driver | null;
}

export const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "idle", label: "Idle" },
  { value: "maintenance", label: "Maintenance" },
];

export const SEED_TRUCKS: Truck[] = [
  {
    id: "TRK-001",
    plate: "LND-421AB",
    make: "Mercedes",
    model: "Actros",
    year: "2021",
    type: "Flatbed",
    capacity: 30,
    status: "active",
    driver: {
      name: "Emeka Nwosu",
      phone: "+234 801 111 2233",
      licence: "LIC-00091",
    },
  },
  {
    id: "TRK-002",
    plate: "ABJ-813KZ",
    make: "MAN",
    model: "TGX",
    year: "2022",
    type: "Refrigerated",
    capacity: 20,
    status: "active",
    driver: {
      name: "Fatima Bello",
      phone: "+234 802 445 6671",
      licence: "LIC-00112",
    },
  },
  {
    id: "TRK-003",
    plate: "PHC-079YT",
    make: "Volvo",
    model: "FH16",
    year: "2020",
    type: "Tanker",
    capacity: 40,
    status: "idle",
    driver: null,
  },
  {
    id: "TRK-004",
    plate: "KAN-350QX",
    make: "Scania",
    model: "R500",
    year: "2019",
    type: "Curtainsider",
    capacity: 25,
    status: "maintenance",
    driver: {
      name: "Yusuf Ibrahim",
      phone: "+234 803 922 0041",
      licence: "LIC-00078",
    },
  },
  {
    id: "TRK-005",
    plate: "IBA-202MC",
    make: "DAF",
    model: "XF105",
    year: "2023",
    type: "Box truck",
    capacity: 15,
    status: "active",
    driver: {
      name: "Ngozi Eze",
      phone: "+234 807 560 3312",
      licence: "LIC-00135",
    },
  },
  {
    id: "TRK-006",
    plate: "ENU-117VB",
    make: "Iveco",
    model: "Stralis",
    year: "2021",
    type: "Flatbed",
    capacity: 22,
    status: "idle",
    driver: null,
  },
];
