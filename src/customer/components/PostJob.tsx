import { useState } from "react";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWeightHanging,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";

import {
  Field,
  TextAreaField,
  SelectField,
  TruckSelectCard,
} from "../../pages/auth/FormField";
import Button from "../../ui/Button";

const TRUCK_TYPES = [
  { id: "flatbed", label: "Flatbed", desc: "Open deck, heavy loads" },
  { id: "tipper", label: "Tipper", desc: "Sand, granite, aggregate" },
  {
    id: "curtainsider",
    label: "Curtainsider",
    desc: "Bagged & palletised goods",
  },
  { id: "tanker", label: "Tanker", desc: "Liquids & bulk dry goods" },
  { id: "lowloader", label: "Low Loader", desc: "Machinery & oversized cargo" },
  { id: "any", label: "Any available", desc: "Let drivers bid" },
];

const PRICING_OPTIONS = [
  {
    id: "open",
    label: "Open to bids",
    desc: "Drivers propose their price",
  },
  {
    id: "fixed",
    label: "Set my price",
    desc: "You name the amount",
  },
];

const CARGO_TYPES = [
  "Granite / Gravel",
  "Sand",
  "Cement",
  "Steel / Iron",
  "Agricultural produce",
  "Building materials",
  "Machinery",
  "Consumer goods",
  "Other",
];

type PricingMode = "fixed" | "open";

const PostJob = () => {
  const [truckType, setTruckType] = useState("");
  const [pricingMode, setPricingMode] = useState<PricingMode>("open");
  const [cargoType, setCargoType] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 ">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
          <FaCheckCircle className="text-white text-2xl" />
        </div>
        <h2 className="text-xl font-black text-black">Job posted</h2>
        <p className="text-sm text-black/50 max-w-xs">
          Drivers in your route area will be notified. You'll get bids within
          minutes.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 px-6 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-black/80 transition"
        >
          Post another job
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-4  pb-5">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-lg font-black text-black">Post a haulage job</h2>
          <p className="text-xs text-black/40 mt-0.5">
            Fill in the details drivers will bid or confirm instantly
          </p>
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">
            1
          </span>
          <h3 className="font-bold text-black text-base">
            What are you moving?
          </h3>
        </div>

        <SelectField
          label="Cargo type"
          value={cargoType}
          placeholder="Select cargo type"
          onChange={setCargoType}
          options={CARGO_TYPES.map((c) => ({ value: c, label: c }))}
          open={selectOpen}
          setOpen={setSelectOpen}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Weight (tonnes)"
            type="number"
            min={0}
            placeholder="e.g. 10"
            icon={<FaWeightHanging />}
          />

          <Field
            label="Quantity (units)"
            type="number"
            min={0}
            placeholder="e.g. 1"
            icon={<FaBoxOpen />}
          />
        </div>

        <TextAreaField
          label="Additional notes"
          placeholder="Fragile, hazardous, oversized, special handling…"
          rows={2}
        />
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">
            2
          </span>
          <h3 className="font-bold text-black text-base">Route & schedule</h3>
        </div>

        <Field
          label="Pickup location"
          type="text"
          placeholder="Street, city or LGA"
          icon={<FaMapMarkerAlt />}
        />

        <Field
          label="Dropoff location"
          type="text"
          placeholder="Street, city or LGA"
        />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Pickup date" type="date" icon={<FaCalendarAlt />} />
          <Field label="Pickup time" type="time" />
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">
            3
          </span>
          <h3 className="font-bold text-black text-base">Truck type</h3>
        </div>

        <TruckSelectCard
          label="Truck type"
          value={truckType}
          onChange={setTruckType}
          options={TRUCK_TYPES}
        />
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">
            4
          </span>
          <h3 className="font-bold text-black text-base">Pricing preference</h3>
        </div>

        <TruckSelectCard
          label="Pricing preference"
          value={pricingMode}
          onChange={(v) => setPricingMode(v as PricingMode)}
          options={PRICING_OPTIONS}
        />

        {pricingMode === "fixed" && (
          <Field label="Your offer (₦)" type="number" placeholder="0.00" />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-black/10 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-black/40">Ready to post?</p>
            <p className="text-sm font-bold text-black truncate mt-0.5">
              {cargoType || "No cargo selected"} ·{" "}
              {truckType
                ? TRUCK_TYPES.find((t) => t.id === truckType)?.label
                : "Any truck"}
            </p>
          </div>

          <Button
            className="w-[200px] bg-primary"
            onClick={() => setSubmitted(true)}
            fullWidth={false}
          >
            <FaTruck size={13} />
            Post job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
