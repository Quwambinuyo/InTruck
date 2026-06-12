type FilterChipProps<T extends string> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
};

const FilterChip = <T extends string>({
  options,
  value,
  onChange,
}: FilterChipProps<T>) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full text-xs font-semibold border whitespace-nowrap transition ${
            value === opt
              ? "bg-black text-white border-black"
              : "bg-white text-black/60 border-black/10 hover:border-black/30"
          }`}
        >
          {opt.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default FilterChip;
