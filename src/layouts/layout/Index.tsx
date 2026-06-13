import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar, { MobileTopbar } from "../navigation/Topbar";
import Sidebar from "../navigation/Sidebar";

const LayoutWrapper = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <div className="  md:ml-[220px] lg:ml-[235px] xl:ml-[256px] px-2 sm:px-3 md:px-5 xl:px-6 pb-8 sm:pb-10  max-w-[1400px] mx-auto bg-[#f4f4f4]">
        <div className="block md:hidden">
          <MobileTopbar />
        </div>
        <div className="hidden md:block">
          <Topbar />
        </div>
        <aside
          className="fixed bg-primary-color md:w-[220px] lg:w-[233px] xl:w-[256px] h-screen left-0 top-0 hidden md:block"
          style={{ zIndex: 1001 }}
        >
          <Sidebar />
        </aside>

        <main className="mt-[60px] sm:mt-[65px] lg:mt-[75px] xl:mt-[80px] relative py-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LayoutWrapper;
