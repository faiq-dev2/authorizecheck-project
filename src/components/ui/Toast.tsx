"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastTone = "error" | "success" | "info";

type ToastItem = {
  id: number;
  message: string;
  tone: ToastTone;
};

type ToastContextValue = {
  showToast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TONE_STYLES: Record<
  ToastTone,
  { bar: string; icon: string; iconName: string }
> = {
  error: {
    bar: "bg-error",
    icon: "text-error",
    iconName: "error",
  },
  success: {
    bar: "bg-on-tertiary-container",
    icon: "text-on-tertiary-container",
    iconName: "check_circle",
  },
  info: {
    bar: "bg-secondary",
    icon: "text-secondary",
    iconName: "info",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, tone: ToastTone = "error") => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 4200);
    },
    [],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed top-24 right-4 z-[100] flex w-[min(100vw-2rem,22rem)] flex-col gap-space-sm"
      >
        {toasts.map((toast) => {
          const tone = TONE_STYLES[toast.tone];
          return (
            <div
              key={toast.id}
              className="pointer-events-auto relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_12px_40px_rgba(11,28,48,0.18)] border border-surface-container animate-[toast-in_0.28s_ease-out]"
              role="status"
            >
              <div className={`absolute left-0 top-0 h-full w-1 ${tone.bar}`} />
              <div className="flex items-start gap-space-sm p-space-md pl-space-md">
                <span
                  className={`material-symbols-outlined mt-0.5 shrink-0 text-[22px] ${tone.icon}`}
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {tone.iconName}
                </span>
                <p className="flex-1 font-body-md text-body-md text-on-surface leading-snug pt-0.5">
                  {toast.message}
                </p>
                <button
                  aria-label="Dismiss notification"
                  className="shrink-0 rounded-md p-1 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                  onClick={() => dismiss(toast.id)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
