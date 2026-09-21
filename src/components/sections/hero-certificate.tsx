"use client";

import { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { Award, Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/ui/lightbox";

export function HeroCertificate({ inline = false }: { inline?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  if (inline) {
    return (
      <>
        {/* Compact Inline version for mobile layout */}
        <div className="relative w-full max-w-[280px]">
          {/* Decorative glow */}
          <div
            className="absolute -inset-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-xl opacity-70 pointer-events-none"
            aria-hidden="true"
          />

          {/* Certificate Card Preview */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="View authorization certificate — click to expand"
            className="group relative bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200/80 shadow-lg transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl w-full text-left"
          >
            {/* Top Info Tag */}
            <div className="flex items-center gap-1.5 mb-2 text-slate-600">
              <Award className="w-3.5 h-3.5 text-amber-500" aria-hidden />
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">
                Authorized Agency
              </span>
            </div>

            {/* Image with aspect-ratio container */}
            <div className="relative aspect-[4/3] w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow-inner">
              <Image
                src={IMAGES.certificate}
                alt="Trisha Enterprises Certification of Authorization — official document"
                fill
                className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="280px"
                priority
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1">
                <div className="bg-white/90 p-2 rounded-full shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-4 h-4 text-slate-900" aria-hidden />
                </div>
                <span className="text-white text-[10px] font-medium tracking-wide drop-shadow-sm">
                  Click to Expand
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Accessible lightbox using shared component */}
        <Lightbox
          open={isOpen}
          onClose={() => setIsOpen(false)}
          label="Trisha Enterprises Authorization Certificate full view"
        >
          <div className="relative w-full h-full">
            <Image
              src={IMAGES.certificate}
              alt="Trisha Enterprises Certification of Authorization — detailed high resolution view"
              fill
              className="object-contain rounded-xl"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </Lightbox>
      </>
    );
  }

  return (
    <>
      {/* Positioned at bottom-right of the hero section - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block absolute right-4 bottom-16 md:right-16 md:bottom-24 z-10 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
        {/* Decorative glow */}
        <div
          className="absolute -inset-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-xl opacity-70 pointer-events-none"
          aria-hidden="true"
        />

        {/* Certificate Card Preview */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="View authorization certificate — click to expand"
          className="group relative bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200/80 shadow-lg transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl w-full text-left"
        >
          {/* Top Info Tag */}
          <div className="flex items-center gap-1.5 mb-2 text-slate-600">
            <Award className="w-3.5 h-3.5 text-amber-500" aria-hidden />
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">
              Authorized Agency
            </span>
          </div>

          {/* Image with aspect-ratio container */}
          <div className="relative aspect-[4/3] w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow-inner">
            <Image
              src={IMAGES.certificate}
              alt="Trisha Enterprises Certification of Authorization — official document"
              fill
              className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
              priority
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1">
              <div className="bg-white/90 p-2 rounded-full shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Maximize2 className="w-4 h-4 text-slate-900" aria-hidden />
              </div>
              <span className="text-white text-[10px] font-medium tracking-wide drop-shadow-sm">
                Click to Expand
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Accessible lightbox using shared component */}
      <Lightbox
        open={isOpen}
        onClose={() => setIsOpen(false)}
        label="Trisha Enterprises Authorization Certificate full view"
      >
        <div className="relative w-full h-full">
          <Image
            src={IMAGES.certificate}
            alt="Trisha Enterprises Certification of Authorization — detailed high resolution view"
            fill
            className="object-contain rounded-xl"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </Lightbox>
    </>
  );
}