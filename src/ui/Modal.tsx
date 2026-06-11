import { useEffect, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-lg",
}: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[950] flex items-center justify-center p-3 sm:p-4 animate-fade"
      style={{ background: "rgba(10,10,20,0.55)" }}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-pop w-full ${maxWidth} animate-rise flex flex-col max-h-[92vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between flex-shrink-0 px-6 py-4 border-b border-line">
            <h3 className="text-lg font-black text-ink">{title}</h3>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 text-lg rounded-lg text-muted hover:text-ink hover:bg-fog"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex-1 min-h-0 px-6 py-5 overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-3 px-6 py-4 border-t border-line">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
