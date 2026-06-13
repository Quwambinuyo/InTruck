import { useEffect, useRef, type ReactNode } from "react";

type Animation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "zoom-in"
  | "zoom-out";

type Props = {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
};

const INITIAL_STYLES: Record<Animation, string> = {
  "fade-up": "opacity-0 translate-y-8",
  "fade-down": "opacity-0 -translate-y-8",
  "fade-left": "opacity-0 translate-x-8",
  "fade-right": "opacity-0 -translate-x-8",
  fade: "opacity-0",
  "zoom-in": "opacity-0 scale-95",
  "zoom-out": "opacity-0 scale-105",
};

const Reveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  className = "",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.remove(
            "opacity-0",
            "translate-y-8",
            "-translate-y-8",
            "translate-x-8",
            "-translate-x-8",
            "scale-95",
            "scale-105",
          );
          if (once) observer.disconnect();
        } else if (!once) {
          INITIAL_STYLES[animation].split(" ").forEach((cls) => {
            el.classList.add(cls);
          });
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, once, threshold]);

  return (
    <div
      ref={ref}
      className={`${INITIAL_STYLES[animation]} ${className}`}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1), transform ${duration}ms cubic-bezier(0.4,0,0.2,1)`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
