export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1 h-4 bg-primary flex-shrink-0" />
      <span className="text-primary text-[10px] font-bold uppercase tracking-[0.18em]">
        {children}
      </span>
    </div>
  );
}
