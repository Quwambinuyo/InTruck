type ColumnDef<T> = {
  label: string;
  span?: number;
  render: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: ColumnDef<T>[];
  rows: T[];
  getKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  minWidth?: string;
};

function buildGridCols(columns: ColumnDef<never>[]): string {
  return columns.map((col) => `${col.span ?? 1}fr`).join(" ");
}

const DataTable = <T,>({
  columns,
  rows,
  getKey,
  onRowClick,
  emptyMessage = "No data found.",
  minWidth = "900px",
}: Props<T>) => {
  const gridTemplateColumns = buildGridCols(columns);

  return (
    <div className="overflow-x-auto">
      <div
        className="grid text-[11px] font-semibold text-black zabalBoldFont uppercase tracking-wider border-b border-black/[0.08] pb-3 px-3 p-5"
        style={{ gridTemplateColumns, minWidth }}
      >
        {columns.map((col, i) => (
          <p key={i}>{col.label}</p>
        ))}
      </div>

      <div className="mt-1 divide-y divide-black/[0.05]" style={{ minWidth }}>
        {rows.length === 0 ? (
          <p className="text-center text-sm text-black/30 py-10">
            {emptyMessage}
          </p>
        ) : (
          rows.map((row) => (
            <div
              key={getKey(row)}
              className={`grid items-center px-3 py-3.5 transition ${
                onRowClick ? "cursor-pointer hover:bg-black/[0.02]" : ""
              }`}
              style={{ gridTemplateColumns }}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, i) => (
                <div key={i}>{col.render(row)}</div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataTable;
export type { ColumnDef };
