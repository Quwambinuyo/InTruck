import Badge from "./Badge";
import type { BadgeTone } from "./Badge";

type MapValue = {
  tone: BadgeTone;
  label: string;
};

const MAP: Record<string, MapValue> = {
  active: { tone: "ok", label: "Active" },
  pending: { tone: "warn", label: "Pending" },
  suspended: { tone: "crit", label: "Suspended" },

  none: { tone: "muted", label: "No KYC" },
  tier1: { tone: "gold", label: "Tier 1" },
  tier2: { tone: "teal", label: "Tier 2" },
  tier3: { tone: "purple", label: "Tier 3" },

  approved: { tone: "ok", label: "Approved" },
  rejected: { tone: "crit", label: "Rejected" },
  review: { tone: "warn", label: "Under review" },

  frozen: { tone: "crit", label: "Frozen" },

  completed: { tone: "ok", label: "Completed" },
  failed: { tone: "crit", label: "Failed" },
  reversed: { tone: "gold", label: "Reversed" },

  paid: { tone: "info", label: "Paid" },
  in_transit: { tone: "purple", label: "In transit" },
  delivered: { tone: "ok", label: "Delivered" },
  cancelled: { tone: "muted", label: "Cancelled" },
  disputed: { tone: "crit", label: "Disputed" },

  open: { tone: "crit", label: "Open" },
  investigating: { tone: "warn", label: "Investigating" },
  resolved: { tone: "ok", label: "Resolved" },
  closed: { tone: "muted", label: "Closed" },
  cleared: { tone: "ok", label: "Cleared" },

  sent: { tone: "ok", label: "Sent" },
  scheduled: { tone: "info", label: "Scheduled" },
  draft: { tone: "muted", label: "Draft" },
  live: { tone: "ok", label: "Live" },

  low: { tone: "muted", label: "Low" },
  medium: { tone: "warn", label: "Medium" },
  high: { tone: "crit", label: "High" },
  critical: { tone: "crit", label: "Critical" },
};

type Props = {
  status?: string;
  label?: string;
  tone?: BadgeTone;
  className?: string;
};

const StatusPill = ({ status, label, tone, className = "" }: Props) => {
  const cfg = status ? MAP[status] : undefined;

  return (
    <Badge tone={tone || cfg?.tone} className={className}>
      {label || cfg?.label || status || "—"}
    </Badge>
  );
};

export default StatusPill;
