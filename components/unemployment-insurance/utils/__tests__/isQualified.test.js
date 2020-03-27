import { isQualified, mapSalaryToQuarters } from "../isQualified";

describe("income is qualified for UI", () => {
  test("highest quarter is above 1300", () => {
    const quarters = [
      { income: "1300" },
      { income: "900" },
      { income: "800" },
      { income: "500" }
    ];
    const result = isQualified(quarters);
    expect(result).toBe(true);
  });

  test("highest quarter is over 900 and total base period earnings is 1.25 highest quarter", () => {
    const basePeriodEarnings = 900 * 1.25;
    const basePeriodEarningsWithoutHighest = basePeriodEarnings - 900;
    const otherQuarters = `${basePeriodEarningsWithoutHighest / 3}`;
    const quarters = [
      { income: otherQuarters },
      { income: otherQuarters },
      { income: "900" },
      { income: otherQuarters }
    ];
    const result = isQualified(quarters);
    expect(result).toBe(true);
  });
});

describe("income is NOT qualified for UI", () => {
  test("highest quarter is below 1300, over 900, but total base period earnings are NOT 1.25 highest quarter", () => {
    const basePeriodEarnings = 900 * 1.24;
    const basePeriodEarningsWithoutHighest = basePeriodEarnings - 900;
    const otherQuarters = `${basePeriodEarningsWithoutHighest / 3}`;
    const quarters = [
      { income: otherQuarters },
      { income: otherQuarters },
      { income: "900" },
      { income: otherQuarters }
    ];
    const result = isQualified(quarters);
    expect(result).toBe(false);
  });
});
