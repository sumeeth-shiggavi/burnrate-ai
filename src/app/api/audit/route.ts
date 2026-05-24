import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { completeAuditInputSchema } from "@/lib/validators";
import { calculateOptimization } from "@/lib/auditEngine";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    
    const parsedData = completeAuditInputSchema.safeParse(rawBody);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid schema payload input vectors", details: parsedData.error.format() },
        { status: 400 }
      );
    }

    const { companyName, companySize, industry, tools } = parsedData.data;
    const calculationResults = calculateOptimization(tools);

    const { data: reportRecord, error: dbError } = await supabase
      .from("audits")
      .insert([
        {
          company_name: companyName,
          company_size: companySize,
          industry: industry,
          total_monthly_current_spend: calculationResults.totalCurrentMonthlySpend,
          total_monthly_optimized_spend: calculationResults.totalOptimizedMonthlySpend,
          calculated_annual_savings: calculationResults.calculatedAnnualSavings
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase ingestion bottleneck encountered:", dbError);
      return NextResponse.json({ error: "Failed tracking record to persistent matrix" }, { status: 500 });
    }

    return NextResponse.json({ success: true, reportId: reportRecord.id }, { status: 201 });

  } catch (globalError) {
    console.error("Internal endpoint runtime exception:", globalError);
    return NextResponse.json({ error: "Internal Server Processing Error" }, { status: 500 });
  }
}