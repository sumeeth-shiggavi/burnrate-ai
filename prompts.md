While the core audit calculations are 100% deterministic to ensure financial accuracy, BurnRate AI utilizes targeted AI workflows across the product design, database mapping, and growth engineering phases.

📋 System Prompts Registry
1. Database Schema Synthesis Prompt
Used to generate the initial migration layout inside Supabase:


Act as a Principal Database Engineer specializing in PostgreSQL. Generate a highly optimized, type-safe SQL migration script for a SaaS table named 'audits'. 
The schema must support columns for unique UUID primary keys, company names, industry tags, total monthly current spend, optimized target spends, and annual calculated savings. 
Include strict indexing rules on the primary keys and company name attributes. Ensure clean default timestamps for audit creation tracking.
2. Tailored Strategic Remediation Prompt
Used to generate actionable copy recommendations on the results screen based on identified financial leaks:

Act as a meticulous fractional B2B SaaS CFO. Review this financial calculation artifact indicating that a tech startup is wasting capital on unassigned workspace licenses. 
Draft a direct, highly technical itemized remediation step detailing how the operations team can prune ghost licenses without damaging core engineering velocity. 
Keep the tone urgent, metrics-focused, and corporate. Avoid generic platitudes. Focus strictly on license allocation consolidation.
"""
