import {
  FaTruck,
  FaClipboardList,
  FaMoneyBillWave,
  FaStar,
  FaChevronRight,
  FaMapMarkerAlt,
  FaCircle,
} from "react-icons/fa";
import StatCard from "../../../ui/StatCard";

import {
  jobRequests,
  fleet,
  earnings,
  successScores,
  statusConfig,
  fleetDotColor,
} from "../../mock/mockDashboardData";

import EarningsChart from "./charts/EarningsChart";
import SuccessScoreChart from "./charts/SuccessChart";

const MerchantDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-black zabalBoldFont">
          Dashboard
        </h2>
        <p className="text-xs text-black/40 mt-0.5 zabalRegFont">
          Welcome back — here's what's happening with your fleet
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3">
        <StatCard
          label="Active Trucks"
          value="12"
          delta="2 this week"
          trend="up"
          icon={<FaTruck size={14} />}
          sparkline={[8, 9, 10, 9, 11, 12, 12]}
          footer="3 on delivery"
        />
        <StatCard
          label="Job Requests"
          value="8"
          delta="5 today"
          trend="up"
          icon={<FaClipboardList size={14} />}
          sparkline={[3, 5, 4, 6, 7, 5, 8]}
          footer="4 pending review"
        />
        <StatCard
          label="Total Earnings"
          value="₦4.2M"
          delta="12% vs last month"
          trend="up"
          icon={<FaMoneyBillWave size={14} />}
          sparkline={[2800000, 3100000, 2600000, 3800000, 4200000, 3500000]}
          footer="This month"
          tooltip="Net earnings after platform fees and deductions"
        />
        <StatCard
          label="Avg. Rating"
          value="4.8"
          delta="0.1 this week"
          trend="down"
          icon={<FaStar size={14} />}
          sparkline={[4.9, 4.8, 5.0, 4.7, 4.9, 4.8]}
          footer="From 142 trips"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-black/10 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-black text-black zabalBoldFont">
                Job Requests
              </h3>
              <p className="text-xs text-black/40 zabalRegFont">
                Recent incoming requests for your fleet
              </p>
            </div>
            <button className="text-xs font-semibold text-black border border-black/15 rounded-xl px-3 py-1.5 hover:bg-black/5 transition zabalSemiboldFont">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {jobRequests.map((job) => {
              const sc = statusConfig[job.status];

              return (
                <div
                  key={job.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-black/8 hover:border-black/20 hover:bg-black/[0.01] transition cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-black zabalBoldFont">
                        {job.id}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full zabalSemiboldFont"
                        style={{ color: sc.color, background: sc.bg }}
                      >
                        {sc.label}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-black truncate zabalSemiboldFont">
                      {job.cargo}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1">
                      <FaMapMarkerAlt className="text-black/30 text-[10px]" />
                      <span className="text-xs text-black/50 truncate zabalRegFont">
                        {job.pickup}
                      </span>
                      <FaChevronRight className="text-black/20 text-[9px]" />
                      <span className="text-xs text-black/50 truncate zabalRegFont">
                        {job.dropoff}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-black/40 zabalRegFont">
                        {job.weight}
                      </span>
                      <span className="text-xs font-bold text-black zabalBoldFont">
                        {job.offer}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] text-black/30 zabalRegFont">
                      {job.time}
                    </span>

                    {job.status === "pending" && (
                      <div className="flex gap-1.5">
                        <button className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black text-white">
                          Accept
                        </button>
                        <button className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-black/15">
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 p-5 flex flex-col gap-6">
          <EarningsChart data={earnings} />
          <SuccessScoreChart data={successScores} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/10 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-black text-black zabalBoldFont">
              Fleet Overview
            </h3>
            <p className="text-xs text-black/40 zabalRegFont">
              Live status of your registered trucks
            </p>
          </div>
          <button className="text-xs font-semibold text-black border border-black/15 rounded-xl px-3 py-1.5 hover:bg-black/5 transition zabalSemiboldFont">
            Manage fleet
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {fleet.map((truck) => {
            const sc = statusConfig[truck.status];
            const dot = fleetDotColor[truck.status];

            return (
              <div
                key={truck.plate}
                className="rounded-xl border border-black/10 p-4 space-y-3 hover:border-black/25 transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center">
                    <FaTruck className="text-black text-sm" />
                  </div>
                  <FaCircle size={8} style={{ color: dot, marginTop: 4 }} />
                </div>

                <div>
                  <p className="text-sm font-black text-black zabalBoldFont">
                    {truck.plate}
                  </p>
                  <p className="text-xs text-black/40 zabalRegFont">
                    {truck.type}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-black/50 zabalRegFont">
                    Driver:{" "}
                    <span className="text-black font-semibold zabalSemiboldFont">
                      {truck.driver}
                    </span>
                  </p>

                  {truck.route && (
                    <p className="text-[11px] text-black/40 zabalRegFont flex items-center gap-1">
                      <FaMapMarkerAlt size={9} />
                      {truck.route}
                    </p>
                  )}
                </div>

                <span
                  className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full zabalSemiboldFont"
                  style={{ color: sc.color, background: sc.bg }}
                >
                  {sc.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
