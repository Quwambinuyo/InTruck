const PALETTE: [string, string][] = [
  ["#E0F2F1", "#005F55"],
  ["#F5F3FF", "#5B21B6"],
  ["#FEF3C7", "#92400E"],
  ["#FEE2E2", "#991B1B"],
  ["#DBEAFE", "#1E3A8A"],
  ["#FCE7F3", "#9D174D"],
  ["#D1FAE5", "#065F46"],
  ["#E0E7FF", "#3730A3"],
];

type NameInput =
  | string
  | {
      firstName?: string;
      lastName?: string;
    }
  | null
  | undefined;

function getFullName(name: NameInput): string {
  if (!name) return "?";
  if (typeof name === "string") return name;
  return `${name.firstName ?? ""} ${name.lastName ?? ""}`.trim() || "?";
}

function pick(name: NameInput): [string, string] {
  const safe = getFullName(name);

  const seed: number = safe
    .split("")
    .reduce((a: number, c: string) => a + c.charCodeAt(0), 0);

  return PALETTE[seed % PALETTE.length];
}

type AvatarProps = {
  name: NameInput;
  size?: number;
  className?: string;
};

const Avatar = ({ name, size = 36, className = "" }: AvatarProps) => {
  const fullName = getFullName(name);

  const initials =
    fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "?";

  const [bg, fg] = pick(name);

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        color: fg,
        fontSize: size * 0.26,
      }}
      title={fullName}
    >
      {initials}
    </div>
  );
};

export default Avatar;
