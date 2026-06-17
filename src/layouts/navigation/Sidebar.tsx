import { useState } from "react";
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
  FaLayerGroup,
  FaChevronDown,
  FaChevronUp,
  FaBell,
  FaBriefcase,
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

type SubLink = {
  text: string;
  path: string;
  icon: IconType;
  badge?: number;
};

type MerchantLink = {
  text: string;
  path: string;
  icon: IconType;
  badge?: number;
  children?: SubLink[];
};

const merchantLinks: MerchantLink[] = [
  { text: "dashboard", path: "/merchant/dashboard", icon: FaTachometerAlt },
  { text: "list a truck", path: "/merchant/list-truck", icon: FaPlusCircle },
  { text: "my fleet", path: "/merchant/fleet", icon: FaTruck },
  { text: "my driver", path: "/merchant/driver", icon: FaLayerGroup },
  {
    text: "job requests",
    path: "/merchant/job-requests",
    icon: FaClipboardList,
    badge: 4,
    children: [
      {
        text: "job requests",
        path: "/merchant/job-requests",
        icon: FaBell,
        badge: 4,
      },
      {
        text: "all jobs",
        path: "/merchant/all-jobs",
        icon: FaBriefcase,
      },
    ],
  },
  { text: "earnings", path: "/merchant/earnings", icon: FaMoneyBillWave },
  { text: "transactions", path: "/merchant/transactions", icon: FaExchangeAlt },
];

type SidebarLinkProps = {
  text: string;
  path: string;
  icon: IconType;
  badge?: number;
  children?: SubLink[];
};

const SidebarLink = ({
  link,
  isActive,
  navigate,
  onClick,
}: {
  link: SidebarLinkProps;
  isActive: (path: string) => boolean;
  navigate: (path: string) => void;
  onClick?: () => void;
}) => {
  const Icon = link.icon;
  const hasChildren = link.children && link.children.length > 0;
  const isParentActive = hasChildren
    ? link.children!.some((child) => isActive(child.path))
    : isActive(link.path);

  const [open, setOpen] = useState(isParentActive);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`w-[calc(100%-24px)] flex items-center gap-3 px-4 py-[22px] mx-3 rounded-xl transition-all duration-200 ${
            isParentActive ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <Icon className="text-white text-[18px] shrink-0" />

          <span className="flex-1 text-sm font-medium capitalize text-white text-left">
            {link.text}
          </span>

          {link.badge && !open && (
            <span className="min-w-[22px] h-[22px] flex items-center justify-center rounded-full text-[11px] font-semibold bg-white text-black mr-2">
              {link.badge}
            </span>
          )}

          {open ? (
            <FaChevronUp className="text-white/60 text-[11px] shrink-0" />
          ) : (
            <FaChevronDown className="text-white/60 text-[11px] shrink-0" />
          )}
        </button>

        {open && (
          <div className="mt-1 mb-1 space-y-[2px]">
            {link.children!.map((child) => {
              const ChildIcon = child.icon;
              const childActive = isActive(child.path);

              return (
                <button
                  key={child.path}
                  onClick={() => {
                    navigate(child.path);
                    onClick?.();
                  }}
                  className={`w-[calc(100%-24px)] flex items-center gap-3 pl-11 pr-4 py-[14px] mx-3 rounded-xl transition-all duration-200 ${
                    childActive ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <ChildIcon
                    className={`text-[13px] shrink-0 ${
                      childActive ? "text-white" : "text-white/50"
                    }`}
                  />

                  <span
                    className={`flex-1 text-xs font-medium capitalize text-left ${
                      childActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    {child.text}
                  </span>

                  {child.badge && (
                    <span className="min-w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-semibold bg-white text-black">
                      {child.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        navigate(link.path);
        onClick?.();
      }}
      className={`w-[calc(100%-24px)] flex items-center gap-3 px-4 py-[22px] mx-3 rounded-xl transition-all duration-200 ${
        isActive(link.path) ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <Icon className="text-white text-[18px] shrink-0" />

      <span className="flex-1 text-sm font-medium capitalize text-white text-left">
        {link.text}
      </span>

      {link.badge && (
        <span className="min-w-[22px] h-[22px] flex items-center justify-center rounded-full text-[11px] font-semibold bg-white text-black">
          {link.badge}
        </span>
      )}
    </button>
  );
};

const Sidebar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const { pathname } = useLocation();

  const isMerchant = pathname.includes("/merchant");
  const links = isMerchant ? merchantLinks : customerLinks;

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <aside className="w-full h-full flex flex-col bg-[var(--color-primary)] overflow-y-auto">
      <div className="px-5 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3" onClick={onLinkClick}>
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
              isActive={isActive}
              navigate={navigate}
              onClick={onLinkClick}
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
    <div className="fixed inset-0 z-[9999] md:hidden">
      <div
        className="absolute inset-0 bg-black/60 z-[9998]"
        onClick={onClose}
      />

      <div className="absolute left-0 top-0 h-full w-[260px] bg-[var(--color-primary)] flex flex-col z-[9999] shadow-2xl">
        <Sidebar onLinkClick={onClose} />
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
