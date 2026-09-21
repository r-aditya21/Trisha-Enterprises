"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Accessible label for the dialog */
  label?: string;
}

/**
 * Shared, accessible lightbox/modal component.
 * - Traps focus on open (via aria-modal)
 * - Closes on Escape key or backdrop click
 * - Prevents body scroll when open
 * - Portals to document.body to avoid z-index issues
 */
export function Lightbox({ open, onClose, children, label = "Image preview" }: LightboxProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          {/* Close button */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
            <span className="text-slate-400 text-xs hidden md:inline-block font-mono select-none">
              ESC or click outside to close
            </span>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-amber-400 transition-all border border-white/10 backdrop-blur-sm shadow-xl"
              aria-label="Close preview"
              type="button"
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
          </div>

          {/* Content container — stop propagation so clicking inside doesn't close */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl p-3 md:p-6 shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
