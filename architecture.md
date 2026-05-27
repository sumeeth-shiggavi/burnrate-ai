# BurnRate AI 📊 - System Architecture Specification

This document details the underlying architectural patterns, system layout, data ingestion pipelines, and cloud multi-tenancy rules governing the BurnRate AI engine.

---

## 🗺️ File System Routing Topology
The codebase uses the Next.js 15 App Router framework. It strictly decouples client-facing browser interactions from secure server-side execution and persistence layers:

```text
burnrate-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── audit/
│   │   │       └── route.ts       # Backend: Serverless API Node handling DB writes
│   │   ├── admin/
│   │   │   └── page.tsx           # UI Layer: Operations metrics console
│   │   ├── audit/
│   │   │   ├── page.tsx           # UI Layer: Dynamic state-managed form wizard
│   │   │   └── results/
│   │   │       └── [[...id]]/
│   │   │           └── page.tsx   # UI Layer: Server-rendered user report dashboard
│   │   ├── login/
│   │   │   └── page.tsx           # UI Layer: Secure access gate control panel
│   │   ├── layout.tsx             # Global application HTML5 shell wrapper
│   │   └── page.tsx               # UI Layer: Primary product conversion landing page
│   └── lib/
│       ├── auditEngine.ts         # Logic: Pure deterministic optimization algorithms
│       ├── supabase.ts            # Config: Shared initialization client hook
│       └── validators.ts          # Security: Zod input schema integrity guards
