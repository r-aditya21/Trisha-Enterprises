"use client";

import React, { useState } from "react";
import { 
  Percent, 
  CircleDollarSign, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  Users, 
  Zap, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export function LoanDetails() {
  const [activeTab, setActiveTab] = useState<"small" | "large">("small");

  return (
    <section className="bg-slate-50 py-16 px-6 sm:px-8 md:px-12 rounded-3xl max-w-6xl mx-auto my-12 border border-slate-200/60 shadow-sm">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200/60 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          PM Surya Ghar - Muft Bijli Yojana
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Solar Roof Top Financing Scheme
        </h2>
        <p className="text-slate-600 text-base sm:text-lg">
          Explore structured banking loan benefits designed to make your transition to solar energy seamless, highly affordable, and hassle-free.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns: Comparison & System Plans */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Selector Switches */}
          <div className="bg-slate-200/70 p-1.5 rounded-xl flex gap-2">
            <button
              onClick={() => setActiveTab("small")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                activeTab === "small"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Up to 3 kW Systems
            </button>
            <button
              onClick={() => setActiveTab("large")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                activeTab === "large"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              &gt; 3 kW to 10 kW Systems
            </button>
          </div>

          {/* Conditional Plan Details View */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Max Loan Amount</span>
                <span className="text-2xl font-bold text-slate-900">
                  {activeTab === "small" ? "Rs. 2.00 Lakhs" : "Rs. 6.00 Lakhs"}
                </span>
                <span className="text-xs text-slate-500 block mt-1">
                  {activeTab === "small" ? "Capped fixed ceiling rate" : "Based on scale of installation"}
                </span>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Government Subsidy</span>
                <span className="text-2xl font-bold text-emerald-700">
                  {activeTab === "small" ? "Up to Rs. 78,000" : "Rs. 78,000"}
                </span>
                <span className="text-xs text-slate-500 block mt-1">
                  {activeTab === "small" ? "1kW: ₹30k | 2kW: ₹60k | 3kW: ₹78k" : "Fixed max subsidy support"}
                </span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Parameter List Specifications */}
            <div className="space-y-4">
              <div className="flex justify-between items-start py-1 text-sm sm:text-base">
                <span className="text-slate-500 font-medium">Project Margin Required</span>
                <span className="text-slate-900 font-semibold text-right">
                  {activeTab === "small" ? "Minimum 10% of Cost" : "Minimum 20% of Cost"}
                </span>
              </div>
              <div className="flex justify-between items-start py-1 text-sm sm:text-base">
                <span className="text-slate-500 font-medium">Net Annual Income Rule</span>
                <span className="text-slate-900 font-semibold text-right">
                  {activeTab === "small" ? "No Minimum Requirement" : "Minimum Rs. 3.00 Lakhs"}
                </span>
              </div>
              <div className="flex justify-between items-start py-1 text-sm sm:text-base">
                <span className="text-slate-500 font-medium">Mandatory Asset Insurance</span>
                <span className="text-slate-900 font-semibold text-right">
                  {activeTab === "small" ? "NOT Mandatory" : "Mandatory (Customer Borne)"}
                </span>
              </div>
              <div className="flex justify-between items-start py-1 text-sm sm:text-base">
                <span className="text-slate-500 font-medium">PAN Card Requirement</span>
                <span className="text-slate-900 font-semibold text-right">
                  {activeTab === "small" ? "Optional for CIBIL checks" : "Mandatory"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Global Terms & Criteria Info Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white tracking-wide border-b border-white/10 pb-3">
              Standard Loan Policies
            </h3>

            {/* Interest Rates Wrapper */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-white/10 rounded-xl text-amber-400 mt-0.5">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Competitive Interest Rates</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <strong>Effective Rate: 7%</strong> (RBI Repo Rate + 0.50%) for Home Loan Applicants. Non-Home Loan customers follow Home Loan RoI + 100 bps.
                </p>
              </div>
            </div>

            {/* Tenor Wrapper */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-white/10 rounded-xl text-amber-400 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Flexible Repayment Term</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Maximum <strong>120 Months</strong> tenure with a <strong>6-month moratorium</strong> period from the initial disbursement date. No prepayment penalties apply.
                </p>
              </div>
            </div>

            {/* Processing & Security */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-white/10 rounded-xl text-amber-400 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Zero Fees & Hypothecation</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Enjoy <strong>NIL processing fees</strong>. Security configuration requires straightforward hypothecation of the solar infrastructure assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Eligibility & Operational Guidelines Accordion Footer */}
      <div className="mt-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          Applicant Eligibility & Application Process
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Available to all individual applicants with clean rooftop ownership rights.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Minimum operational CIBIL score of <strong>680 and above</strong> (New-to-Credit/NTC applicants are also fully eligible).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Requires latest electricity statement records alongside a mandatory standard Savings Bank Account link.</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Applicants aged <strong>65 years and above</strong> can add a co-borrower (spouse or children) easily.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>All requests are digitally compiled via the **Jan Samarth Portal** through either self-sourced or assisted journeys.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Disbursements are transferred straight to certified EPC installers/vendors upon successful verification of MNRE feasibility reports.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}