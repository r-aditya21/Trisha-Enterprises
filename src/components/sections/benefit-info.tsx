import React from 'react';

export default function SolarBenefits() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 text-slate-800 font-sans p-6 md:p-12 flex flex-col items-center justify-center selection:bg-blue-500/10">
      <div className="max-w-5xl w-full">
        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0A4384] mb-12 tracking-tight">
          Benefits
        </h1>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 relative mb-16">
          {/* Vertical Divider Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-slate-300 -translate-x-1/2" />

          {/* Left Column: Residential Households */}
          <div className="flex flex-col items-center text-center px-4 md:px-8 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Subsidy for
              </h2>
              <h2 className="text-xl md:text-2xl font-bold text-[#0A4384]">
                Residential Households
              </h2>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-medium text-slate-700">
                Rs. <span className="text-2xl md:text-3xl font-extrabold text-[#0A4384]">30,000</span> per kW
              </p>
              <p className="text-xs text-slate-500 font-medium">up to 2 kW</p>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-medium text-slate-700">
                Rs. <span className="text-2xl md:text-3xl font-extrabold text-[#0A4384]">18,000</span> per kW
              </p>
              <p className="text-xs text-slate-500 font-medium max-w-xs">
                for additional capacity up to 3 kW
              </p>
            </div>

            <div className="space-y-1 pt-2">
              <p className="text-xl font-medium text-slate-700">
                Rs. <span className="text-2xl md:text-3xl font-extrabold text-[#0A4384]">78,000</span>
              </p>
              <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
                Total subsidy for systems larger than 3 kW capped at
              </p>
            </div>
          </div>

          {/* Right Column: GHS/RWA */}
          <div className="flex flex-col items-center text-center px-4 md:px-8 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Subsidy for <span className="text-[#0A4384]">GHS/RWA</span>
              </h2>
              <p className="text-[10px] md:text-xs text-slate-500 font-semibold tracking-wide mt-1">
                (Group Housing Society/Resident Welfare Association)
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-lg font-medium text-slate-700">
                Rs. <span className="text-2xl md:text-3xl font-extrabold text-[#0A4384]">18,000</span> per kW
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-md">
                for common facilities, including <span className="font-bold text-slate-700">EV charging, up to 500 kW Capacity</span> (@3 kW per house) with the upper limit being inclusive of individual rooftop plants installed by individual residents in the GHS/RWA
              </p>
            </div>
          </div>
        </div>

        {/* Footer / Sub-text Section */}
        <div className="flex flex-col items-center space-y-6">
          <p className="text-sm md:text-base font-semibold text-slate-800 text-center px-4">
            For special states, an additional <span className="text-[#0A4384]">10% Subsidy</span> will be applicable per kW
          </p>

          <h3 className="text-base md:text-lg font-bold text-slate-900 text-center tracking-tight">
            Suitable Rooftop Solar Plant Capacity for households
          </h3>

          {/* Layout Table */}
          <div className="w-full max-w-3xl overflow-x-auto border border-slate-400 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm">
            <table className="w-full min-w-[500px] text-center border-collapse text-xs md:text-sm font-medium text-slate-700">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-4 text-left font-semibold text-slate-600 bg-slate-50/50 w-2/5 pl-6">
                    Average Monthly Electricity Consumption (units)
                  </td>
                  <td className="p-4 border-l border-slate-300 w-1/5">0-150</td>
                  <td className="p-4 border-l border-slate-300 w-1/5">150-300</td>
                  <td className="p-4 border-l border-slate-300 w-1/5">&gt;300</td>
                </tr>
                <tr>
                  <td className="p-4 text-left font-semibold text-slate-600 bg-slate-50/50 w-2/5 pl-6">
                    Suitable Rooftop Solar Plant Capacity
                  </td>
                  <td className="p-4 border-l border-slate-300 font-bold text-slate-900">1-2 kW</td>
                  <td className="p-4 border-l border-slate-300 font-bold text-slate-900">2-3 kW</td>
                  <td className="p-4 border-l border-slate-300 font-bold text-slate-900">Above 3 kW</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Note */}
          <p className="text-[11px] text-slate-400 font-medium self-end pt-4">
            Note: For detailed information, scheme guidelines may be referred.
          </p>
        </div>
      </div>
    </div>
  );
}