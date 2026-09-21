"use client";

import { useRef } from "react";
import { useState, useEffect } from "react";
import { Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

type TimeLeft = {
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

const TARGET_DATE = new Date("2027-03-31T23:59:59").getTime();

function getTimeLeft(): TimeLeft {
  const distance = TARGET_DATE - Date.now();
  if (distance < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

const formatNum = (num: number) => num.toString().padStart(2, "0");

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 bg-[#1A6BA8] border border-white/10 rounded-lg py-2 px-1 sm:py-3 sm:px-2 flex flex-col items-center justify-center shadow-inner min-w-0">
      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 tabular-nums leading-none">
        {value}
      </span>
      <span className="text-[9px] sm:text-xs text-white/80 font-medium uppercase tracking-wider text-center truncate w-full">
        {label}
      </span>
    </div>
  );
}

export function SchemeBenefitTimer() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Initialize with server-safe value to prevent hydration mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [mounted, setMounted] = useState(false);

  // Scale-up entrance animation
  useGsapReveal(containerRef, ".benefit-card", {
    y: 24,
    fromScale: 0.96,
    duration: 0.8,
    start: "top 88%",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setTimeLeft(getTimeLeft());
    }, 0);

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    // min-h prevents layout shift (CLS) while the timer hydrates
    <div ref={containerRef} className="w-full max-w-4xl">
      <div
        className="benefit-card w-full bg-[#0B5A96] p-4 sm:p-6 rounded-xl font-sans flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 shadow-lg min-h-[160px] md:min-h-[120px]"
        aria-label="Government subsidy scheme countdown timer"
      >
        {/* Left Section: Timer */}
        <div className="flex-1 w-full">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className="w-8 h-8 rounded shrink-0 bg-white/10 border border-white/20 flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              <Hourglass className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-[#FBBF24] text-sm font-bold tracking-wide uppercase mb-1">
                Time Left to Get Benefit of Scheme
              </h3>
              <p className="text-white text-sm">
                Scheme closes on{" "}
                <time dateTime="2027-03-31" className="text-[#FBBF24] font-semibold">
                  31 March 2027
                </time>
              </p>
            </div>
          </div>

          {/* Countdown Boxes */}
          <div className="flex gap-1.5 sm:gap-3" aria-live="polite" aria-atomic="true">
            <TimeBox value={mounted ? String(timeLeft.days) : "–"} label="Days" />
            <TimeBox value={mounted ? formatNum(timeLeft.hours) : "–"} label="Hours" />
            <TimeBox value={mounted ? formatNum(timeLeft.mins) : "–"} label="Mins" />
            <TimeBox value={mounted ? formatNum(timeLeft.secs) : "–"} label="Secs" />
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <Button asChild size="sm" className="h-12 sm:h-14 w-full sm:w-[160px] md:w-[180px] text-sm sm:text-base bg-secondary text-white hover:bg-secondary/90 transition-all shadow-md">
            <Link href="/benefit" scroll={true}>Know More</Link>
          </Button>
          <Button asChild size="sm" className="h-12 sm:h-14 w-full sm:w-[160px] md:w-[180px] text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}