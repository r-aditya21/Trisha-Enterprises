"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedCard } from "@/components/animations/animated-card";
import {
  IndianRupee, User, Phone, Calendar,
  Download, X, FileText, AlertTriangle,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const INTEREST_RATE = 6;

interface EMIRow {
  month: string;
  principal: number;
  interest: number;
  emi: number;
  balance: number;
}

function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / tenureMonths;
  return (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
}

function buildSchedule(principal: number, annualRate: number, tenureMonths: number): EMIRow[] {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const r = annualRate / 12 / 100;
  const rows: EMIRow[] = [];
  let balance = principal;
  const now = new Date();
  for (let i = 0; i < tenureMonths; i++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const month = date.toLocaleString("en-IN", { month: "short", year: "numeric" });
    rows.push({
      month,
      principal: Math.round(principalPaid),
      interest: Math.round(interest),
      emi: Math.round(emi),
      balance: Math.round(balance),
    });
  }
  return rows;
}

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

function downloadPDF(
  name: string,
  mobile: string,
  loanAmount: number,
  tenure: number,
  emi: number,
  totalInterest: number,
  totalPayment: number,
  schedule: EMIRow[]
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const green: [number, number, number] = [59, 109, 17];
  const lightGreen: [number, number, number] = [234, 243, 222];
  const darkText: [number, number, number] = [23, 52, 4];

  // Header banner
  doc.setFillColor(...green);
  doc.rect(0, 0, 210, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Solar Loan EMI Report", 14, 12);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Generated on " +
      new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    14,
    21
  );

  // Customer details box
  doc.setFillColor(...lightGreen);
  doc.roundedRect(12, 34, 186, 38, 3, 3, "F");
  doc.setTextColor(...darkText);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Details", 18, 42);
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + name, 18, 50);
  doc.text("Mobile: " + mobile, 18, 57);
  doc.text("Loan Amount: INR " + loanAmount.toLocaleString("en-IN"), 100, 50);
  doc.text("Tenure: " + tenure + " months", 100, 57);
  doc.text("Interest Rate: " + INTEREST_RATE + "% per annum", 100, 64);

  // Summary box
  doc.setFillColor(245, 250, 240);
  doc.roundedRect(12, 78, 186, 36, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.text("EMI Summary", 18, 86);
  doc.setFont("helvetica", "normal");
  doc.text("Monthly EMI: INR " + emi.toFixed(2), 18, 94);
  doc.text("Total Interest: INR " + totalInterest.toFixed(2), 18, 101);
  doc.text("Total Payment: INR " + totalPayment.toFixed(2), 100, 94);

  // Amortization table
  autoTable(doc, {
    startY: 120,
    head: [["Month", "Principal (INR)", "Interest (INR)", "EMI (INR)", "Balance (INR)"]],
    body: schedule.map((r) => [r.month, fmt(r.principal), fmt(r.interest), fmt(r.emi), fmt(r.balance)]),
    styles: { fontSize: 9, cellPadding: 3, textColor: darkText },
    headStyles: { fillColor: green, textColor: [255, 255, 255], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [247, 252, 242] },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "right" },
      2: { halign: "right" },
      3: { halign: "right", textColor: green, fontStyle: "bold" },
      4: { halign: "right" },
    },
    margin: { left: 12, right: 12 },
    didDrawPage: (data: { pageNumber: number }) => {
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Solar Loan EMI Report · Page " + data.pageNumber, 14, 290);
    },
  });

  doc.save(`Solar_Loan_Report_${name.replace(/\s+/g, "_")}.pdf`);
}

// ── Bottom Sheet ──────────────────────────────────────────────────────────────
interface SheetProps {
  open: boolean;
  onClose: () => void;
  name: string;
  mobile: string;
  loanAmount: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: EMIRow[];
}

function ResultSheet({
  open, onClose, name, mobile, loanAmount, tenure,
  emi, totalInterest, totalPayment, schedule,
}: SheetProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-surface shadow-2xl flex flex-col transition-transform duration-500 ease-out"
        style={{ maxHeight: "88vh", transform: open ? "translateY(0)" : "translateY(100%)" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0 cursor-pointer" onClick={onClose}>
          <div className="w-10 h-1 rounded-full bg-on-surface/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center">
              <FileText className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="text-label-lg text-primary font-semibold">EMI Report</h3>
              <p className="text-body-sm text-on-surface-variant">
                {name} · ₹{loanAmount.toLocaleString("en-IN")} · {tenure} months
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                downloadPDF(name, mobile, loanAmount, tenure, emi, totalInterest, totalPayment, schedule)
              }
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-white text-label-sm font-semibold hover:bg-secondary/80 transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
            >
              <X className="h-4 w-4 text-on-surface" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-50 py-6 space-y-6">
          {/* Summary */}
          <div className="rounded-2xl bg-secondary/10 border border-secondary/20 p-5 space-y-1.5">
            <p className="text-body-md text-on-surface">
              <span className="font-bold">Monthly EMI:</span>{" "}
              INR {emi.toFixed(2)}
            </p>
            <p className="text-body-md text-on-surface">
              <span className="font-bold">Total Interest:</span>{" "}
              INR {totalInterest.toFixed(2)}
            </p>
            <p className="text-body-md text-on-surface">
              <span className="font-bold">Total Payment:</span>{" "}
              INR {totalPayment.toFixed(2)}
            </p>
            <p className="text-body-md text-on-surface">
              <span className="font-bold">Interest Rate Used:</span> {INTEREST_RATE}%
            </p>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr className="bg-white/10 border-b border-white/20">
                    {["Month", "Principal (INR)", "Interest (INR)", "EMI (INR)", "Balance (INR)"].map((col) => (
                      <th key={col} className="px-5 py-3.5 text-left text-label-sm text-primary font-semibold whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, i) => (
                    <tr key={i} className="border-b border-white/10 hover:bg-secondary/5 transition-colors duration-100">
                      <td className="px-5 py-3 text-body-md text-on-surface font-medium">{row.month}</td>
                      <td className="px-5 py-3 text-body-md text-on-surface text-right">{fmt(row.principal)}</td>
                      <td className="px-5 py-3 text-body-md text-on-surface text-right">{fmt(row.interest)}</td>
                      <td className="px-5 py-3 text-body-md text-secondary font-semibold text-right">{fmt(row.emi)}</td>
                      <td className="px-5 py-3 text-body-md text-on-surface text-right">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Validation Warning ────────────────────────────────────────────────────────
function ValidationWarning({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-2xl px-5 py-4 mb-6">
      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-label-md text-amber-900 font-semibold mb-1">
          Please fill in the required fields:
        </p>
        <ul className="list-disc list-inside space-y-0.5">
          {errors.map((e) => (
            <li key={e} className="text-body-sm text-amber-800">{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function LoanCalculator() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loanAmount, setLoanAmount] = useState(150000);
  const [tenure, setTenure] = useState(22);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const schedule = useMemo(
    () => buildSchedule(loanAmount, INTEREST_RATE, tenure),
    [loanAmount, tenure]
  );

  const emi = useMemo(() => calculateEMI(loanAmount, INTEREST_RATE, tenure), [loanAmount, tenure]);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;

  const handleCalculate = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push("Your name is required");
    if (!mobile.trim() || mobile.length < 10) errs.push("A valid 10-digit mobile number is required");
    if (!loanAmount || loanAmount < 10000) errs.push("Loan amount must be at least ₹10,000");
    setErrors(errs);
    if (errs.length > 0) return;
    setSheetOpen(true);
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-white/60 border rounded-xl px-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
      hasError
        ? "border-red-400 focus:ring-red-300"
        : "border-white/30 focus:ring-secondary/50 focus:border-secondary"
    }`;

  const labelClass = "block text-label-lg text-primary font-semibold mb-2";

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
        <AnimatedCard delay={0}>
          <div className="glass-card p-8 md:p-10 rounded-3xl">
            <ValidationWarning errors={errors} />

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4 text-secondary" />
                    Your Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors([]); }}
                  className={inputClass(!name.trim() && errors.length > 0)}
                />
              </div>

              {/* Mobile */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-secondary" />
                    Mobile Number
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => { setMobile(e.target.value); setErrors([]); }}
                  className={inputClass((!mobile.trim() || mobile.length < 10) && errors.length > 0)}
                  maxLength={10}
                />
              </div>

              {/* Loan Amount */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-secondary" />
                    Loan Amount (INR)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="150000"
                  value={loanAmount}
                  onChange={(e) => { setLoanAmount(Number(e.target.value)); setErrors([]); }}
                  className={inputClass(loanAmount < 10000 && errors.length > 0)}
                  min={10000}
                  max={10000000}
                />
                <p className="text-body-sm text-on-surface-variant mt-1.5 ml-1">
                  Interest Rate: {INTEREST_RATE}% (default)
                </p>
              </div>

              {/* Tenure Slider */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    Loan Tenure (in Months, up to 120)
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={120}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-secondary"
                  style={{
                    background: `linear-gradient(to right, var(--color-secondary, #22c55e) 0%, var(--color-secondary, #22c55e) ${(tenure / 120) * 100}%, rgba(0,0,0,0.15) ${(tenure / 120) * 100}%, rgba(0,0,0,0.15) 100%)`,
                  }}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-body-md text-on-surface font-medium">{tenure} Months</span>
                  <Button variant="primary" onClick={handleCalculate} className="px-8">
                    Calculate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>

      <ResultSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        name={name}
        mobile={mobile}
        loanAmount={loanAmount}
        tenure={tenure}
        emi={emi}
        totalInterest={totalInterest}
        totalPayment={totalPayment}
        schedule={schedule}
      />
    </>
  );
}