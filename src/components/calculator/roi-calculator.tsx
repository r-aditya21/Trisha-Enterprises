"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { calculateROI } from "@/lib/roi";
import { formatCurrency } from "@/lib/utils";
import { LOCATIONS } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/animations/reveal-text";

export function ROICalculator() {
  const [monthlyBill, setMonthlyBill] = useState(250);
  const [roofSize, setRoofSize] = useState(1500);
  const [location, setLocation] = useState("ca");

  const result = useMemo(
    () => calculateROI(monthlyBill, roofSize, location),
    [monthlyBill, roofSize, location]
  );

  return (
    <section
      id="calculator"
      className="py-section bg-primary text-white overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent" />
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
        <div>
          <RevealText as="h2" className="text-headline-lg mb-6 text-white">
            How Much Could You Save?
          </RevealText>
          <p className="text-body-lg text-primary-fixed-dim mb-8">
            Use our proprietary algorithm to calculate your potential savings based on your
            current monthly electricity spend and roof area.
          </p>
          <ol className="space-y-6 list-none">
            {[
              "Enter your monthly bill amount",
              "Select your roof size and location",
              "See your instant 25-year estimate",
            ].map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <strong
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold shrink-0 text-white"
                  aria-hidden
                >
                  {i + 1}
                </strong>
                <p className="text-body-md m-0">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 text-on-background shadow-2xl relative">
          <div className="absolute -top-6 -right-6 bg-tertiary-fixed text-on-surface px-6 py-2 rounded-full text-label-md shadow-lg rotate-3 normal-case">
            Most Popular Tool
          </div>
          <h3 className="text-headline-md mb-8 text-primary">Calculate Savings</h3>

          <div className="space-y-8">
            <div>
              <label htmlFor="bill-range" className="block text-label-md text-on-surface-variant mb-3 normal-case">
                Average Monthly Bill ($)
              </label>
              <input
                id="bill-range"
                type="range"
                min={50}
                max={1000}
                step={10}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
                aria-valuemin={50}
                aria-valuemax={1000}
                aria-valuenow={monthlyBill}
              />
              <div className="flex justify-between mt-2 text-headline-sm text-secondary">
                <p className="m-0">$50</p>
                <p className="m-0 font-semibold" aria-live="polite">
                  ${monthlyBill}
                </p>
                <p className="m-0">$1000</p>
              </div>
            </div>

            <div>
              <label htmlFor="roof-range" className="block text-label-md text-on-surface-variant mb-3 normal-case">
                Roof Area (sq ft)
              </label>
              <input
                id="roof-range"
                type="range"
                min={800}
                max={4000}
                step={100}
                value={roofSize}
                onChange={(e) => setRoofSize(Number(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <p className="mt-2 text-secondary font-semibold">{roofSize} sq ft</p>
            </div>

            <div>
              <label htmlFor="location" className="block text-label-md text-on-surface-variant mb-3 normal-case">
                Location
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 rounded-xl border border-outline-variant/50 bg-surface-container-low focus:border-secondary focus:ring-0"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-8 border-t border-outline-variant/30">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  key={result.annualSavings}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center p-4 rounded-xl bg-surface-container-low"
                >
                  <p className="text-body-md text-on-surface-variant mb-1">Annual Savings</p>
                  <p className="text-headline-md text-primary">
                    {formatCurrency(result.annualSavings)}
                  </p>
                </motion.div>
                <motion.div
                  key={result.paybackYears}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center p-4 rounded-xl bg-surface-container-low"
                >
                  <p className="text-body-md text-on-surface-variant mb-1">Payback</p>
                  <p className="text-headline-md text-primary">{result.paybackYears} yrs</p>
                </motion.div>
              </div>
              <p className="text-center text-body-md text-on-surface-variant mb-2">
                Recommended: <strong className="text-secondary">{result.recommendedPackage}</strong> ·{" "}
                {result.systemSizeKw} kW system
              </p>
              <div className="h-2 rounded-full bg-surface-container overflow-hidden mb-6">
                <motion.div
                  className="h-full gradient-cta rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((result.annualSavings / 5000) * 100, 100)}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            <Button asChild className="w-full rounded-xl">
              <Link href="/contact">Get Detailed Report</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
