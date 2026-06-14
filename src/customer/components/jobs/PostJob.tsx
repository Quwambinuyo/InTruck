import { useState, useMemo } from "react";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaWeightHanging,
  FaBoxOpen,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import {
  getStates,
  getCitiesAndTownsByState,
} from "nigerian-states-lgas-cities-towns";

import {
  Field,
  TextAreaField,
  SelectField,
  TruckSelectCard,
} from "../../../pages/auth/FormField";
import { DatePicker } from "../../../ui/DatePicker";
import { TimePicker } from "../../../ui/TimePicker";
import Button from "../../../ui/Button";
import {
  TRUCK_TYPE_OPTIONS,
  PRICING_MODE_OPTIONS,
  CARGO_TYPE_OPTIONS,
  POST_JOB_PRIORITY_OPTIONS,
  type PostJobPricingMode,
  type PostJobPriority,
} from "../../mock/mockPostJobData";

const PostJob = () => {
  const [truckType, setTruckType] = useState("");
  const [pricingMode, setPricingMode] = useState<PostJobPricingMode>("open");
  const [cargoType, setCargoType] = useState("");
  const [priority, setPriority] = useState<PostJobPriority>("standard");
  const [submitted, setSubmitted] = useState(false);

  const [pickupState, setPickupState] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffState, setDropoffState] = useState("");
  const [dropoffCity, setDropoffCity] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const [cargoOpen, setCargoOpen] = useState(false);
  const [pickupStateOpen, setPickupStateOpen] = useState(false);
  const [pickupCityOpen, setPickupCityOpen] = useState(false);
  const [dropoffStateOpen, setDropoffStateOpen] = useState(false);
  const [dropoffCityOpen, setDropoffCityOpen] = useState(false);

  const NG_STATES = useMemo(
    () =>
      [...new Set(getStates())].map((s: string) => ({ value: s, label: s })),
    [],
  );

  const pickupCities = useMemo(() => {
    if (!pickupState) return [];
    return [...new Set(getCitiesAndTownsByState(pickupState))].map(
      (city: string) => ({ value: city, label: city }),
    );
  }, [pickupState]);

  const dropoffCities = useMemo(() => {
    if (!dropoffState) return [];
    return [...new Set(getCitiesAndTownsByState(dropoffState))].map(
      (city: string) => ({ value: city, label: city }),
    );
  }, [dropoffState]);

  const priorityMap: Record<
    PostJobPriority,
    { label: string; className: string }
  > = {
    urgent: {
      label: "Urgent",
      className: "bg-red-50 text-red-600 border-red-100",
    },
    standard: {
      label: "Standard",
      className: "bg-blue-50 text-blue-600 border-blue-100",
    },
    low: {
      label: "Low",
      className: "bg-gray-50 text-gray-500 border-gray-100",
    },
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
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
    <div className="w-full max-w-full space-y-4 pb-10">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-lg font-black text-black">Post a haulage job</h2>
          <p className="text-xs text-black/40 mt-0.5">
            Fill in the details — drivers will bid or confirm instantly
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
          options={CARGO_TYPE_OPTIONS.map((c) => ({ value: c, label: c }))}
          open={cargoOpen}
          setOpen={setCargoOpen}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        <div className="space-y-3">
          <p className="text-xs font-semibold text-black/50 uppercase tracking-wider">
            Pickup location
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SelectField
              label="State"
              searchable
              value={pickupState}
              placeholder="Select state"
              onChange={(v) => {
                setPickupState(v);
                setPickupCity("");
              }}
              options={NG_STATES}
              open={pickupStateOpen}
              setOpen={setPickupStateOpen}
              icon={<FaMapMarkerAlt />}
            />
            <SelectField
              label="City / Town"
              searchable
              value={pickupCity}
              placeholder={pickupState ? "Select city" : "Pick state first"}
              onChange={setPickupCity}
              options={pickupCities}
              open={pickupCityOpen}
              setOpen={(v) => pickupState && setPickupCityOpen(v)}
            />
          </div>
          <Field
            label="Street address"
            type="text"
            placeholder="e.g. 12 Apapa Road, Ikorodu"
            icon={<FaMapMarkerAlt />}
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-black/50 uppercase tracking-wider">
            Dropoff location
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SelectField
              label="State"
              value={dropoffState}
              searchable
              placeholder="Select state"
              onChange={(v) => {
                setDropoffState(v);
                setDropoffCity("");
              }}
              options={NG_STATES}
              open={dropoffStateOpen}
              setOpen={setDropoffStateOpen}
              icon={<FaMapMarkerAlt />}
            />
            <SelectField
              label="City / Town"
              value={dropoffCity}
              searchable
              placeholder={dropoffState ? "Select city" : "Pick state first"}
              onChange={setDropoffCity}
              options={dropoffCities}
              open={dropoffCityOpen}
              setOpen={(v) => dropoffState && setDropoffCityOpen(v)}
            />
          </div>
          <Field
            label="Street address"
            type="text"
            placeholder="e.g. Km 5 Ibadan-Lagos Expressway"
            icon={<FaMapMarkerAlt />}
            value={dropoffAddress}
            onChange={(e) => setDropoffAddress(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DatePicker
            label="Pickup date"
            value={pickupDate}
            onChange={setPickupDate}
          />
          <TimePicker
            label="Pickup time"
            value={pickupTime}
            onChange={setPickupTime}
          />
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
          options={TRUCK_TYPE_OPTIONS}
        />
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">
            4
          </span>
          <h3 className="font-bold text-black text-base">Priority</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {POST_JOB_PRIORITY_OPTIONS.map((opt) => {
            const isSelected = priority === opt.value;
            const meta = priorityMap[opt.value as PostJobPriority];
            return (
              <button
                key={opt.value}
                onClick={() => setPriority(opt.value as PostJobPriority)}
                className={`flex flex-col items-start gap-1 px-4 py-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `${meta.className} border-current`
                    : "bg-white border-black/10 hover:border-black/20"
                }`}
              >
                <span
                  className={`text-[11px] font-black uppercase tracking-wide ${
                    isSelected ? "" : "text-black/40"
                  }`}
                >
                  {opt.label}
                </span>
                <span
                  className={`text-[10px] leading-tight ${
                    isSelected ? "opacity-70" : "text-black/30"
                  }`}
                >
                  {opt.value === "urgent" && "Time-critical delivery"}
                  {opt.value === "standard" && "Normal scheduling"}
                  {opt.value === "low" && "Flexible timeline"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">
            5
          </span>
          <h3 className="font-bold text-black text-base">Pricing preference</h3>
        </div>
        <TruckSelectCard
          label="Pricing preference"
          value={pricingMode}
          onChange={(v) => setPricingMode(v as PostJobPricingMode)}
          options={PRICING_MODE_OPTIONS}
        />
        {pricingMode === "fixed" && (
          <Field label="Your offer (₦)" type="number" placeholder="0.00" />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-black/10 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-xs text-black/40">Ready to post?</p>
              {priority && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityMap[priority].className}`}
                >
                  {priorityMap[priority].label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-black mt-0.5 min-w-0">
              <span className="truncate">
                {pickupCity && pickupState
                  ? `${pickupCity}, ${pickupState}`
                  : pickupState || "No pickup"}
              </span>
              <FaArrowRight className="flex-shrink-0 text-black/60" />
              <span className="truncate">
                {dropoffCity && dropoffState
                  ? `${dropoffCity}, ${dropoffState}`
                  : dropoffState || "No dropoff"}
              </span>
            </div>
            <p className="text-xs text-black/50 truncate mt-1">
              {cargoType || "No cargo selected"}
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
