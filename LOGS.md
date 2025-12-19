Test run (Vitest) output summary:

- Ran: npx vitest run --reporter verbose
- Result: All tests passed (2 tests, 2 passed)

Excerpt:

 RUN  v1.6.1 C:/Users/v-tianji/Desktop/ghcpd/oswe-mini-prime-new
 ✓ src/tests/priceCalculation.test.tsx > Price calculation > premium seat adds surcharge
 ✓ src/tests/seatSelector.test.tsx > Seat selection and booking flow > user can select seats and see booking in history

Test Files  2 passed (2)
Tests  2 passed (2)

Dev server:

- Command: npm run dev
- Vite output (excerpt):
  VITE v5.4.21  ready in 1039 ms
  ➜  Local:   http://localhost:5174/

Notes:
- The app is frontend-only and uses in-memory mock data. Open the Local URL above to interact with the UI.
- All tests executed and passed successfully.
