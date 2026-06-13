import React from "react";
import {
  FaRegSun,
  FaMountain,
  FaGlobeAmericas,
  FaWater,
  FaCube,
  FaBox,
  FaTruck,
  FaTruckMoving,
  FaOilCan,
  FaTrailer,
} from "react-icons/fa";

type Material = {
  name: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
};

const materials: Material[] = [
  {
    name: "Sharp Sand",
    desc: "Fine-grade construction sand for mortar, plaster, and block laying.",
    icon: <FaRegSun />,
    color: "#EAB308",
  },
  {
    name: "Granite (Chippings)",
    desc: "Crushed granite for concrete mixes, driveways, and foundations.",
    icon: <FaMountain />,
    color: "#64748B",
  },
  {
    name: "Laterite",
    desc: "Red earth for road bases, filling, and leveling large plots.",
    icon: <FaGlobeAmericas />,
    color: "#B45309",
  },
  {
    name: "Gravel",
    desc: "Washed gravel for drainage, landscaping, and concrete production.",
    icon: <FaWater />,
    color: "#475569",
  },
  {
    name: "Blocks & Cement",
    desc: "Bulk sandcrete blocks and bagged cement delivered site-direct.",
    icon: <FaCube />,
    color: "#78716C",
  },
  {
    name: "Custom Load",
    desc: "Anything else  agricultural produce, machinery, or mixed cargo.",
    icon: <FaBox />,
    color: "#1a1a1a",
  },
];

type TruckType = {
  name: string;
  capacity: string;
  desc: string;
  icon: React.ReactNode;
};

const truckTypes: TruckType[] = [
  {
    name: "Tipper Truck",
    capacity: "10–20 tonnes",
    desc: "The workhorse for sand and granite InTruckage across construction sites.",
    icon: <FaTruck />,
  },
  {
    name: "Flatbed Truck",
    capacity: "15–30 tonnes",
    desc: "Ideal for machinery, steel, timber, and oversized cargo.",
    icon: <FaTruckMoving />,
  },
  {
    name: "Tanker",
    capacity: "33,000 litres",
    desc: "Petroleum products, water, and liquid chemical transport.",
    icon: <FaOilCan />,
  },
  {
    name: "Articulated Truck",
    capacity: "Up to 40 tonnes",
    desc: "Long-InTruck interstate delivery for maximum bulk capacity.",
    icon: <FaTrailer />,
  },
];

export default function Fleet() {
  return (
    <section id="fleet" className="py-24 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(125deg, white 55%, var(--color-text) 55%)`,
        }}
      />
      <div
        className="absolute z-0"
        style={{
          top: 0,
          right: 0,
          width: "45%",
          height: "100%",
          background: `linear-gradient(125deg, transparent 0%, transparent 45%, black 45%, black 100%)`,
          opacity: 0.07,
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6">
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-0.5 bg-[--color-text]" />
                <span className="text-[--color-text] text-xs font-semibold uppercase tracking-[0.2em]">
                  What We Move
                </span>
              </div>
              <h2
                className="text-[--color-text] mt-2 uppercase leading-none"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                }}
              >
                Every material.
                <br />
                <span className="text-[--color-primary]">Every project.</span>
              </h2>
            </div>
            <a
              href="#"
              className="self-start md:self-auto px-6 py-3 border-2 border-[--color-text] hover:bg-[--color-text] hover:text-white text-[--color-text] text-sm font-bold uppercase tracking-wide transition-all duration-200"
            >
              Post a load →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((m) => (
              <div
                key={m.name}
                className="group flex items-start gap-4 p-6 border border-black/10 hover:border-black/20 hover:shadow-md transition-all duration-200 cursor-pointer bg-white"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: m.color + "15", color: m.color }}
                >
                  {m.icon}
                </div>
                <div>
                  <h3
                    className="text-[--color-text] text-lg uppercase"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {m.name}
                  </h3>
                  <p className="text-[--color-text-secondary] text-sm leading-relaxed mt-1">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-0.5 bg-[--color-text]" />
              <span className="text-[--color-text] text-xs font-semibold uppercase tracking-[0.2em]">
                Our Fleet
              </span>
            </div>
            <h2
              className="text-[--color-text] mt-2 uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              }}
            >
              The right truck
              <br />
              <span className="text-[--color-primary]">for every job.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-black/10">
            {truckTypes.map((truck, i) => (
              <div
                key={truck.name}
                className={`p-8 bg-white hover:bg-[--color-text] group transition-colors duration-300 ${
                  i < truckTypes.length - 1
                    ? "border-b lg:border-b-0 lg:border-r border-black/10"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-1 bg-[--color-text] group-hover:w-full group-hover:bg-white transition-all duration-500" />
                  <div className="text-[--color-text]  text-2xl opacity-70 group-hover:opacity-100 transition-all">
                    {truck.icon}
                  </div>
                </div>
                <h3
                  className="text-[--color-text]  text-xl uppercase mb-1 transition-colors"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  {truck.name}
                </h3>
                <p className="text-[--color-primary]  text-xs font-bold uppercase tracking-widest mb-3 transition-colors">
                  {truck.capacity}
                </p>
                <p className="text-[--color-text-secondary]  text-sm leading-relaxed transition-colors">
                  {truck.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
