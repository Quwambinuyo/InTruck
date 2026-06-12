import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenuOutline, IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { MobileSidebarWrapper } from "./Sidebar";

const dummyUser = {
  firstName: "John",
  lastName: "Doe",
  avatar: "",
  roles: ["BusinessAdmin"],
  business: {
    status: "Approved" as "Pending" | "Approved" | "Rejected" | undefined,
  },
};

const Topbar = () => {
  const { pathname } = useLocation();

  const displayPath = pathname.split("/")[1].replace("-", " ");
  const userName = `${dummyUser.firstName} ${dummyUser.lastName}`;

  return (
    <nav className="fixed sm:h-[65px] md:h-[70px] lg:h-[75px] xl:h-[80px] w-full left-0 top-0 z-[1000] hidden md:flex max-w-[1655px] mx-auto bg-white">
      <div className="flex w-full items-center border-b border-[#00000014]">
        <div className="md:ml-[220px] lg:ml-[230px] xl:ml-[256px] flex gap-3 items-center justify-between w-full px-6">
          <div className="flex items-center gap-3 sm:w-2/5">
            <h4 className="text-xl lg:text-[22px] xl:text-2xl text-[#060606] capitalize font-medium whitespace-nowrap">
              {displayPath === "merchants" ? "manage merchants" : displayPath}
            </h4>
          </div>

          <div className="flex items-center justify-end gap-6 sm:w-3/5">
            <button className="text-[#06060699] hover:text-[#060606] transition-colors relative p-1">
              <IoNotificationsOutline size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 cursor-pointer shrink-0 group">
              <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {dummyUser.firstName[0]}
                  {dummyUser.lastName[0]}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-[#060606]">
                  {userName}
                </span>
                <FiChevronDown
                  className="text-[#06060699] group-hover:text-[#060606] transition-colors"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;

export const MobileTopbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed bg-white px-4 sm:px-8 md:hidden top-0 left-0 z-10 w-full h-[60px] sm:h-[63px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <Link
            to=""
            className="inline-flex items-center justify-center gap-1 rounded-[20px] h-[50px] w-[100px]"
          >
            <span className="font-poppins text-lg font-medium text-[#000000]">
              InTruck
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button className="text-[#06060699] relative p-1">
              <IoNotificationsOutline size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              className="text-primary-purple"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <IoMenuOutline size={32} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && <MobileSidebarWrapper onClose={() => setMenuOpen(false)} />}
    </>
  );
};
