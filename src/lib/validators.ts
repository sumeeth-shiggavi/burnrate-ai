import { z } from "zod";

export const companyProfileSchema = z.object({
  companyName: z.string().min(2, "Company name must contain at least 2 characters."),
  companySize: z.string().min(1, "Please select an organizational headcount range."),
  industry: z.string().min(1, "Please select your primary industry vertical.")
});

export const toolAllocationSchema = z.object({
  toolId: z.string(),
  currentPlan: z.string().min(1, "Plan selection required."),
  seats: z.number().int().min(1, "Must allocate at least 1 seat."),
  monthlySpend: z.number().min(0, "Spend cannot be a negative value.")
});

export const completeAuditInputSchema = companyProfileSchema.extend({
  tools: z.array(toolAllocationSchema).min(1, "Please configure at least one active AI tool to run the audit engine.")
});

export type CompanyProfileInput = z.infer<typeof companyProfileSchema>;
export type ToolAllocationInput = z.infer<typeof toolAllocationSchema>;
export type CompleteAuditInput = z.infer<typeof completeAuditInputSchema>;