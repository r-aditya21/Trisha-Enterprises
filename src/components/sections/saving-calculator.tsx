"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedCard } from "@/components/animations/animated-card";
import { 
  Home, 
  Factory, 
  CheckCircle2, 
  IndianRupee, 
  Zap,
  Download
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Standard metrics used for solar calculations
const SOLAR_METRICS = {
  HOME_UNIT_RATE: 7.5,
  IND_UNIT_RATE: 10.0,
  UNITS_PER_KW_MONTHLY: 120,
  COST_PER_KW: 62000, 
};

function calculateSolarSavings(monthlyBill: number, isCommercial: boolean) {
  const unitRate = isCommercial ? SOLAR_METRICS.IND_UNIT_RATE : SOLAR_METRICS.HOME_UNIT_RATE;
  
  const monthlyUnits = monthlyBill / unitRate;
  let requiredKw = Math.ceil(monthlyUnits / SOLAR_METRICS.UNITS_PER_KW_MONTHLY);
  
  if (requiredKw < 1) requiredKw = 1;
  if (requiredKw > 10) requiredKw = 10;

  let subsidy = 0;
  if (!isCommercial) {
    if (requiredKw <= 2) {
      subsidy = requiredKw * 30000;
    } else {
      subsidy = 78000;
    }
  }

  const grossCost = requiredKw * SOLAR_METRICS.COST_PER_KW;
  const netInvestment = grossCost - subsidy;

  const yearlyUnits = requiredKw * SOLAR_METRICS.UNITS_PER_KW_MONTHLY * 12;
  const yearlySavings = yearlyUnits * unitRate;
  const breakEvenYears = netInvestment / yearlySavings;

  return {
    requiredKw,
    grossCost,
    subsidy,
    netInvestment,
    yearlySavings,
    breakEvenYears,
    unitRate
  };
}

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

// ── PDF Generation Function ──────────────────────────────────────────────────
function downloadSavingsPDF(
  monthlyBill: number,
  isCommercial: boolean,
  stats: {
    requiredKw: number;
    grossCost: number;
    subsidy: number;
    netInvestment: number;
    yearlySavings: number;
    breakEvenYears: number;
    unitRate: number;
  }
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
  // Custom colors
  const primaryBlue: [number, number, number] = [11, 26, 40]; // #0B1A28

  // Header banner
  doc.setFillColor(...primaryBlue);
  doc.rect(0, 0, 210, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Solar Savings Report", 14, 18);

  // Date
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Generated on " +
      new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    14,
    40
  );

  // User Inputs Table
  autoTable(doc, {
    startY: 50,
    head: [["Your Consumption Details", "Value"]],
    body: [
      ["Tariff Category", isCommercial ? "Industrial" : "Home"],
      ["Average Monthly Bill", `INR ${fmt(monthlyBill)}`]
    ],
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: [40, 40, 40] },
    styles: { fontSize: 10, cellPadding: 4 },
  });

  // Financial Breakdown Table
  autoTable(doc, {
    startY: (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15,
    head: [["Financial Breakdown", "Value"]],
    body: [
      ["Recommended System Size", `${stats.requiredKw} kW`],
      ["Gross System Cost", `INR ${fmt(stats.grossCost)}`],
      ["PM Surya Ghar Subsidy", isCommercial ? "N/A" : `INR ${fmt(stats.subsidy)}`],
      ["Net Investment", `INR ${fmt(stats.netInvestment)}`],
      ["Estimated Yearly Savings", `INR ${fmt(stats.yearlySavings)}`],
      ["Return on Investment (Break-even)", `${stats.breakEvenYears.toFixed(1)} Years`]
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryBlue, textColor: [255, 255, 255] },
    styles: { fontSize: 10, cellPadding: 4 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  // Footer disclaimer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("*Subsidy estimates based on PM Surya Ghar Scheme 2025. Actual values subject to govt approval.", 14, 280);

  doc.save(`Solar_Savings_Report_${Date.now()}.pdf`);
}

// ── Main Component ───────────────────────────────────────────────────────────
export function SavingsCalculator() {
  const [category, setCategory] = useState<"HOME" | "IND">("HOME");
  const [monthlyBill, setMonthlyBill] = useState(2500);

  const stats = useMemo(
    () => calculateSolarSavings(monthlyBill, category === "IND"),
    [monthlyBill, category]
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <AnimatedCard delay={0}>
        <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* ── Left Panel: Inputs ───────────────────────────────────────── */}
          <div className="p-8 md:p-10 bg-gray-50/50 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-slate-800 mb-8 uppercase tracking-wide">
              Your Consumption
            </h2>

            <div className="space-y-10">
              {/* Category Toggle */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Tariff Category
                </label>
                <div className="flex p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <button
                    onClick={() => setCategory("HOME")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                      category === "HOME"
                        ? "bg-[#0B1A28] text-white shadow-md"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    HOME
                  </button>
                  <button
                    onClick={() => setCategory("IND")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                      category === "IND"
                        ? "bg-[#0B1A28] text-white shadow-md"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Factory className="h-4 w-4" />
                    IND.
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Avg. Monthly Bill
                  </label>
                  <span className="text-3xl font-bold text-[#1a5b8b]">
                    ₹ {fmt(monthlyBill)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={10000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${(monthlyBill - 1000) / 90}%, #e5e7eb ${(monthlyBill - 1000) / 90}%, #e5e7eb 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Right Panel: Results ─────────────────────────────────────── */}
          <div className="p-8 md:p-10 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                Financial Breakdown
              </h2>
              {category === "HOME" && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Subsidy Applied
                </span>
              )}
            </div>

            {/* Main Dark Card */}
            <div className="bg-[#0B1A28] text-white rounded-2xl p-6 mb-6 shadow-lg relative overflow-hidden">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Net Investment
              </p>
              <div className="text-5xl font-bold mb-6">
                ₹{fmt(stats.netInvestment)}
              </div>
              
              <div className="flex items-center gap-8 text-sm">
                <div>
                  <span className="text-slate-400 block mb-1">Gross:</span>
                  <span className="font-semibold">₹{fmt(stats.grossCost)}</span>
                </div>
                {stats.subsidy > 0 && (
                  <div>
                    <span className="text-green-400 block mb-1">- Subsidy:</span>
                    <span className="text-green-400 font-semibold">₹{fmt(stats.subsidy)}</span>
                  </div>
                )}
              </div>

              {/* Decorative background element */}
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none text-9xl">
                {stats.requiredKw}kW
              </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <IndianRupee className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1 flex items-end gap-1">
                  {stats.breakEvenYears.toFixed(1)} <span className="text-sm text-slate-500 font-medium mb-1">Yrs</span>
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                  Return on Investment
                </p>
                <p className="text-xs text-slate-400">Break-even period</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Zap className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">
                  ₹{fmt(stats.yearlySavings)}
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                  Yearly Savings
                </p>
                <p className="text-xs text-slate-400">@ ₹{stats.unitRate}/unit</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 max-w-[200px]">
                *Subsidy estimates based on PM Surya Ghar Scheme 2025. Actual values subject to govt approval.
              </p>
              <Button 
                variant="ghost" 
                onClick={() => downloadSavingsPDF(monthlyBill, category === "IND", stats)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                DOWNLOAD REPORT
              </Button>
            </div>
            
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}