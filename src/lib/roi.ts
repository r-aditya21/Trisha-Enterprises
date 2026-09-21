import type { ROICalculation } from "@/types";

const LOCATION_MULTIPLIERS: Record<string, number> = {
  ca: 1.15,
  tx: 1.05,
  fl: 1.08,
  az: 1.2,
  other: 1.0,
};

export function calculateROI(
  monthlyBill: number,
  roofSize: number,
  location: string
): ROICalculation {
  const locationMult = LOCATION_MULTIPLIERS[location] ?? 1;
  const annualUsage = monthlyBill * 12;
  const savingsRate = 0.8;
  const annualSavings = Math.round(annualUsage * savingsRate * locationMult);
  const kwPer100SqFt = 0.15;
  const systemSizeKw = Math.min(Math.round(roofSize * kwPer100SqFt * 10) / 10, 25);
  const costPerWatt = 2.8;
  const systemCost = systemSizeKw * 1000 * costPerWatt;
  const incentive = systemCost * 0.3;
  const netCost = systemCost - incentive;
  const paybackYears = Math.round((netCost / annualSavings) * 10) / 10;

  let recommendedPackage = "Essential";
  if (systemSizeKw >= 12) recommendedPackage = "Premium";
  else if (systemSizeKw >= 8) recommendedPackage = "Performance";

  return {
    monthlyBill,
    roofSize,
    location,
    annualSavings,
    paybackYears: Math.max(paybackYears, 3),
    recommendedPackage,
    systemSizeKw,
  };
}
