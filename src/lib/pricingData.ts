export interface PlanDetails {
  name: string;
  costPerSeatMonthly: number;
  minSeats: number;
  maxSeats?: number;
  isFlatRate?: boolean;
  includesFeatures: string[];
}

export interface ToolPricingStructure {
  id: string;
  displayName: string;
  plans: Record<string, PlanDetails>;
  apiAlternativePricePerMillionTokens?: {
    input: number;
    output: number;
  };
}

export const PRICING_DATABASE: Record<string, ToolPricingStructure> = {
  openai: {
    id: "openai",
    displayName: "OpenAI ChatGPT",
    plans: {
      plus: { 
        name: "ChatGPT Plus", 
        costPerSeatMonthly: 20.00, 
        minSeats: 1, 
        maxSeats: 1,
        includesFeatures: ["Individual advanced tools access"] 
      },
      team: { 
        name: "ChatGPT Team", 
        costPerSeatMonthly: 30.00, 
        minSeats: 2, 
        includesFeatures: ["Admin console", "Shared workspace variables", "Higher rate limits"] 
      }
    },
    apiAlternativePricePerMillionTokens: { input: 2.50, output: 10.00 } // GPT-4o target baselines
  },
  claude: {
    id: "claude",
    displayName: "Anthropic Claude",
    plans: {
      pro: { 
        name: "Claude Pro", 
        costPerSeatMonthly: 20.00, 
        minSeats: 1, 
        maxSeats: 1,
        includesFeatures: ["Priority operations access"] 
      },
      team: { 
        name: "Claude Team", 
        costPerSeatMonthly: 30.00, 
        minSeats: 5, 
        includesFeatures: ["Central billing models", "Increased context allocation windows"] 
      }
    },
    apiAlternativePricePerMillionTokens: { input: 3.00, output: 15.00 } // Claude 3.5 Sonnet baselines
  },
  cursor: {
    id: "cursor",
    displayName: "Cursor AI",
    plans: {
      pro: {
        name: "Pro",
        costPerSeatMonthly: 20.00,
        minSeats: 1,
        includesFeatures: ["Unlimited premium models completions"]
      },
      business: {
        name: "Business",
        costPerSeatMonthly: 40.00,
        minSeats: 1,
        includesFeatures: ["Centralized team billing", "Privacy mode enforcement"]
      }
    }
  }
};