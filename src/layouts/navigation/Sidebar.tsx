import { Link, useLocation } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaPlusCircle,
  FaList,
  FaMapMarkerAlt,
  FaTruck,
  FaMoneyBillWave,
  FaClipboardList,
  FaUsers,
  FaTimes,
  FaShoppingBag,
} from "react-icons/fa";

const customerLinks: {
  text: string;
  path: string;
  icon: IconType;
  badge?: number;
}[] = [
  { text: "dashboard", path: "/customer/dashboard", icon: FaTachometerAlt },
  { text: "post a job", path: "/customer/post-job", icon: FaPlusCircle },
  { text: "my jobs", path: "/customer/jobs", icon: FaList, badge: 2 },
  { text: "track deliveries", path: "/customer/track", icon: FaMapMarkerAlt },
  { text: "transactions", path: "/customer/transactions", icon: FaExchangeAlt },
  { text: "find drivers", path: "/customer/drivers", icon: FaUsers },
  { text: "market place", path: "/customer/marketplace", icon: FaShoppingBag },
];

const merchantLinks: {
  text: string;
  path: string;
  icon: IconType;
  badge?: number;
}[] = [
  { text: "dashboard", path: "/merchant/dashboard", icon: FaTachometerAlt },
  { text: "list a truck", path: "/merchant/list-truck", icon: FaPlusCircle },
  { text: "my fleet", path: "/merchant/fleet", icon: FaTruck },
  {
    text: "job requests",
    path: "/merchant/job-requests",
    icon: FaClipboardList,
    badge: 4,
  },
  { text: "earnings", path: "/merchant/earnings", icon: FaMoneyBillWave },
  { text: "transactions", path: "/merchant/transactions", icon: FaExchangeAlt },
];

type SidebarLinkProps = {
  text: string;
  path: string;
  icon: IconType;
  badge?: number;
};

const SidebarLink = ({
  link,
  isActive,
}: {
  link: SidebarLinkProps;
  isActive: boolean;
}) => {
  const Icon = link.icon;

  return (
    <Link
      to={link.path}
      className={`flex items-center gap-3 px-4 py-6 mx-3 rounded-xl transition-all duration-200 ${
        isActive ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <Icon className="text-white text-[18px] shrink-0" />

      <span className="flex-1 text-sm font-medium capitalize text-white">
        {link.text}
      </span>

      {link.badge && (
        <span className="min-w-[22px] h-[22px] flex items-center justify-center rounded-full text-[11px] font-semibold bg-white text-black">
          {link.badge}
        </span>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation();

  const isMerchant = pathname.includes("/merchant");
  const links = isMerchant ? merchantLinks : customerLinks;

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <aside className="w-full h-full flex flex-col bg-[var(--color-primary)] overflow-y-auto">
      <div className="px-5 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <h2 className="font-bold text-white text-base uppercase tracking-wide">
            InTruck
          </h2>
        </Link>
      </div>

      <div className="flex-1 py-5">
        <p className="px-6 mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
          Overview
        </p>

        <div className="space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.text}
              link={link}
              isActive={isActive(link.path)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

export const MobileSidebarWrapper = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[9999] md:hidden ">
      <div
        className="absolute inset-0 bg-black/60 z-[9998]"
        onClick={onClose}
      />

      <div className="absolute left-0 top-0 h-full w-[260px] bg-[var(--color-primary)] flex flex-col z-[9999] shadow-2xl">
        <Sidebar />
      </div>

      <button
        className="absolute top-3 right-3 z-[10000] rounded-full h-[42px] w-[42px] bg-white flex items-center justify-center shadow-md"
        onClick={onClose}
      >
        <FaTimes color="#000" size={20} />
      </button>
    </div>
  );
};
