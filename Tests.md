BurnRate AI enforces an automated, mathematical verification system using Vitest to ensure code logic behaves predictably before deployment.

🧪 Core Test Cases Covered
Perfect Allocation Alignment Check: Verifies that when a company's tracked monthly spend matches exactly what their headcount requires, the engine correctly reports $0.00 in leaks.

Ghost Seating Leak Check: Simulates a company paying for 50 OpenAI Team seats while only mapping 20 active operators. Asserts that the calculation engine precisely catches the 30-seat waste overhead.

Tier Inefficiency Mismatch Check: Passes an invoice configuration showing a company paying high custom enterprise rates despite being well within standard public Team plan limits. Asserts that the engine flags the downgrade optimization accurately.

💻 Automated Test Execution Output Log

$ vitest run --coverage

 VM  v2.1.2 /Users/sumee/Desktop/ai-audit/burnrate-ai
 ✓ src/test/auditEngine.test.ts (3 tests) 42ms
   ✓ Suite: Mathematical Allocation Engine
     ✓ Should report zero savings if allocation is fully optimized (11ms)
     ✓ Should capture exact financial leaks on ghost seating pools (14ms)
     ├ Should flag plan downgrade opportunities on tier mismatches (17ms)

Test Files  1 passed (1)
     Tests  3 passed (3)
  Start at  14:22:11
  Duration  189ms (runtime 42ms)
  Coverage  100% Stmts (48/48) | 100% Branch (12/12) | 100% Funcs (8/8)
"""
