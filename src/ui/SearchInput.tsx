import { FaSearch } from "react-icons/fa";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}: Props) => {
  return (
    <div className={`relative w-full ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/25 text-xs pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-black/10 rounded-xl pl-8 pr-3 py-2 text-sm text-black placeholder:text-black/30 outline-none focus:border-black/30 bg-white"
      />
    </div>
  );
};

export default SearchInput;
