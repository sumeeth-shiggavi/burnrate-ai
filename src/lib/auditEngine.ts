import { PRICING_DATABASE } from "./pricingData";

export interface UserItemInput {
  toolId: string;
  currentPlan: string;
  seats: number;
  monthlySpend: number;
}

export interface OptimizedItemOutput {
  toolId: string;
  displayName: string;
  currentPlan: string;
  recommendedPlan: string;
  recommendedSeats: number;
  currentSpend: number;
  optimizedSpend: number;
  monthlyLeak: number;
  reason: string;
}

export interface ComprehensiveAuditSummary {
  items: OptimizedItemOutput[];
  totalCurrentMonthlySpend: number;
  totalOptimizedMonthlySpend: number;
  totalMonthlySavings: number;
  calculatedAnnualSavings: number;
}

export function calculateOptimization(inputs: UserItemInput[]): ComprehensiveAuditSummary {
  let totalCurrentMonthlySpend = 0;
  let totalOptimizedMonthlySpend = 0;

  const items: OptimizedItemOutput[] = inputs.map((input) => {
    totalCurrentMonthlySpend += input.monthlySpend;
    
    const targetTool = PRICING_DATABASE[input.toolId];
    if (!targetTool) {
      totalOptimizedMonthlySpend += input.monthlySpend;
      return {
        toolId: input.toolId,
        displayName: input.toolId,
        currentPlan: input.currentPlan,
        recommendedPlan: input.currentPlan,
        recommendedSeats: input.seats,
        currentSpend: input.monthlySpend,
        optimizedSpend: input.monthlySpend,
        monthlyLeak: 0,
        reason: "Custom tooling profiles evaluated as fully optimized by default parameters."
      };
    }

    const currentPlanMeta = targetTool.plans[input.currentPlan];
    let recommendedPlan = input.currentPlan;
    let recommendedSeats = input.seats;
    let calculatedTargetSpend = input.monthlySpend;
    let reason = "Plan architecture fully optimized for current organization headcount configuration.";

    // Logic Breach 1: Team Plan over-provisioned with sub-minimum actual seating capacities
    if (input.currentPlan === "team" && currentPlanMeta && input.seats < currentPlanMeta.minSeats) {
      const lowerPlanKey = Object.keys(targetTool.plans).find(k => k !== "team") || "plus";
      const alternativePlanMeta = targetTool.plans[lowerPlanKey];
      
      if (alternativePlanMeta) {
        recommendedPlan = alternativePlanMeta.name;
        recommendedSeats = input.seats;
        calculatedTargetSpend = alternativePlanMeta.costPerSeatMonthly * input.seats;
        reason = `Paying for Team plan premium tier metrics while maintaining only ${input.seats} active licenses. Downgrading to ${alternativePlanMeta.name} secures same seat requirements cleanly.`;
      }
    } 
    // Logic Breach 2: Overpaying past theoretical baseline seat cost multipliers
    else if (currentPlanMeta) {
      const standardCost = currentPlanMeta.costPerSeatMonthly * input.seats;
      if (input.monthlySpend > standardCost) {
        calculatedTargetSpend = standardCost;
        reason = `Billed spend exceeds theoretical maximum tier cost targets by $${(input.monthlySpend - standardCost).toFixed(2)}. Indicates unassigned or ghost licenses running active balances.`;
      }
    }

    const leak = Math.max(0, input.monthlySpend - calculatedTargetSpend);
    totalOptimizedMonthlySpend += calculatedTargetSpend;

    return {
      toolId: input.toolId,
      displayName: targetTool.displayName,
      currentPlan: currentPlanMeta?.name || input.currentPlan,
      recommendedPlan: recommendedPlan === input.currentPlan && currentPlanMeta ? currentPlanMeta.name : recommendedPlan,
      recommendedSeats,
      currentSpend: input.monthlySpend,
      optimizedSpend: calculatedTargetSpend,
      monthlyLeak: leak,
      reason
    };
  });

  const totalMonthlySavings = Math.max(0, totalCurrentMonthlySpend - totalOptimizedMonthlySpend);
  const calculatedAnnualSavings = totalMonthlySavings * 12;

  return {
    items,
    totalCurrentMonthlySpend,
    totalOptimizedMonthlySpend,
    totalMonthlySavings,
    calculatedAnnualSavings
  };
}