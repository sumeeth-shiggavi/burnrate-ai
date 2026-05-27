# Platform Analytics & KPI Dashboard Matrix

To monitor platform performance and operational health, BurnRate AI tracks three core key performance indicators (KPIs) through its central metrics matrix.

## 📊 Core Performance Health Metrics

### 1. Product Engagement Performance
* **Wizard Completion Velocity:** Tracks the average time elapsed from hitting Step 1 to triggering the final "Generate Audit Report" callback on Step 3 (System Target: < 45 seconds).
* **Funnel Drop-Off Rate:** Monitors step-to-step drop-offs inside the wizard interface, isolating points where complex input fields might cause friction.

### 2. System Architecture Metrics
* **Serverless Node Execution Latency:** Tracks the processing speed of the backend /api/audit serverless function when handling writes to Supabase (System Target: < 180ms).
* **Database IOPS Health:** Monitors the response latency of cloud database lookups on the results page.

### 3. Growth & Value Metrics
* **Total Tracked Leak Capital:** The aggregate sum of all financial leaks flagged across the platform. This serves as a powerful marketing statistic for press releases and landing page copy.
* **Average Annual Savings Found:** The average calculated runway extension returned per successful audit pass (Current Baseline Target: $8,200 / startup annualized).
