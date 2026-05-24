import { describe, it, expect } from "vitest";
import { calculateOptimization } from "../src/lib/auditEngine"; // Explicitly targeting src directory

describe("BurnRate AI Core Calculation Engine Validation Pass", () => {
  it("should catch under-allocated single seat anomalies on OpenAI Team plans", () => {
    const anomalousInput = [{
      toolId: "openai",
      currentPlan: "team",
      seats: 1,           
      monthlySpend: 60.00 
    }];

    const auditSummary = calculateOptimization(anomalousInput);
    expect(auditSummary.totalMonthlySavings).toEqual(40.00); 
    expect(auditSummary.items[0].recommendedPlan).toEqual("ChatGPT Plus");
  });

  it("should accurately flag ghost seats when billing numbers exceed base tier limits", () => {
    const ghostSeatInput = [{
      toolId: "cursor",
      currentPlan: "pro",
      seats: 2,
      monthlySpend: 90.00 
    }];

    const auditSummary = calculateOptimization(ghostSeatInput);
    expect(auditSummary.totalMonthlySavings).toEqual(50.00);
    expect(auditSummary.items[0].monthlyLeak).toEqual(50.00);
  });
});