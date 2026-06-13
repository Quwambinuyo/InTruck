export type DriverStatus = "available" | "busy" | "offline";

export interface DriverReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Driver {
  id: string;
  name: string;
  avatar?: string;
  status: DriverStatus;
  rating: number;
  reviewCount: number;
  numberOfJobs: number;
  jobsCompleted: number;
  truckType: string;
  location: string;
  lat: number;
  lng: number;
  phone: string;
  reviews: DriverReview[];
}

export const MOCK_DRIVERS: Driver[] = [
  {
    id: "1",
    name: "Emeka Okafor",
    status: "available",
    rating: 4.8,
    reviewCount: 43,
    numberOfJobs: 57,
    jobsCompleted: 51,
    truckType: "Flatbed",
    location: "Apapa, Lagos",
    lat: 6.4481,
    lng: 3.3595,
    phone: "+234 801 234 5678",
    reviews: [
      {
        id: "r1",
        author: "Tunde B.",
        rating: 5,
        comment: "Delivered on time, very professional.",
        date: "2024-05-20",
      },
      {
        id: "r2",
        author: "Amara K.",
        rating: 5,
        comment: "Handled fragile cargo with care.",
        date: "2024-05-10",
      },
      {
        id: "r3",
        author: "Seun O.",
        rating: 4,
        comment: "Good driver, slight delay at pickup.",
        date: "2024-04-28",
      },
    ],
  },
  {
    id: "2",
    name: "Abubakar Sule",
    status: "busy",
    rating: 4.5,
    reviewCount: 29,
    numberOfJobs: 40,
    jobsCompleted: 34,
    truckType: "Tipper",
    location: "Kano, Kano",
    lat: 12.0022,
    lng: 8.5919,
    phone: "+234 802 345 6789",
    reviews: [
      {
        id: "r4",
        author: "Musa A.",
        rating: 5,
        comment: "Excellent service, very reliable.",
        date: "2024-05-18",
      },
      {
        id: "r5",
        author: "Fatima L.",
        rating: 4,
        comment: "Good communication throughout.",
        date: "2024-05-02",
      },
    ],
  },
  {
    id: "3",
    name: "Chukwudi Eze",
    status: "available",
    rating: 4.2,
    reviewCount: 17,
    numberOfJobs: 26,
    jobsCompleted: 20,
    truckType: "Tanker",
    location: "Enugu, Enugu",
    lat: 6.4584,
    lng: 7.5464,
    phone: "+234 803 456 7890",
    reviews: [
      {
        id: "r6",
        author: "Ngozi P.",
        rating: 4,
        comment: "Decent driver, gets the job done.",
        date: "2024-05-15",
      },
      {
        id: "r7",
        author: "Emeka T.",
        rating: 4,
        comment: "Reliable and punctual.",
        date: "2024-04-20",
      },
    ],
  },
  {
    id: "4",
    name: "Tunde Badmus",
    status: "offline",
    rating: 4.9,
    reviewCount: 62,
    numberOfJobs: 78,
    jobsCompleted: 74,
    truckType: "Low Loader",
    location: "Ibadan, Oyo",
    lat: 7.3775,
    lng: 3.947,
    phone: "+234 804 567 8901",
    reviews: [
      {
        id: "r8",
        author: "Bola F.",
        rating: 5,
        comment: "Best driver on the platform, period.",
        date: "2024-05-22",
      },
      {
        id: "r9",
        author: "Yinka S.",
        rating: 5,
        comment: "Super fast and very careful.",
        date: "2024-05-12",
      },
    ],
  },
  {
    id: "5",
    name: "Usman Garba",
    status: "available",
    rating: 4.6,
    reviewCount: 38,
    numberOfJobs: 50,
    jobsCompleted: 45,
    truckType: "Curtainsider",
    location: "Kaduna, Kaduna",
    lat: 10.5105,
    lng: 7.4165,
    phone: "+234 805 678 9012",
    reviews: [
      {
        id: "r10",
        author: "Hauwa M.",
        rating: 5,
        comment: "Always on time, very communicative.",
        date: "2024-05-19",
      },
      {
        id: "r11",
        author: "Kabir D.",
        rating: 4,
        comment: "Good driver overall.",
        date: "2024-05-05",
      },
    ],
  },
  {
    id: "6",
    name: "Biodun Adeyemi",
    status: "busy",
    rating: 4.3,
    reviewCount: 22,
    numberOfJobs: 33,
    jobsCompleted: 27,
    truckType: "Flatbed",
    location: "Benin City, Edo",
    lat: 6.335,
    lng: 5.627,
    phone: "+234 806 789 0123",
    reviews: [
      {
        id: "r12",
        author: "Osaro E.",
        rating: 4,
        comment: "Solid driver, no complaints.",
        date: "2024-05-08",
      },
    ],
  },
];
