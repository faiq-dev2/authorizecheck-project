"use client";

import { useEffect, useState } from "react";

export function PrivacyBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 bg-surface-container-lowest text-on-surface hover:text-secondary shadow-lg rounded-full p-3 flex items-center justify-center transition-all ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      <span className="material-symbols-outlined text-[24px]">arrow_upward</span>
    </button>
  );
}
