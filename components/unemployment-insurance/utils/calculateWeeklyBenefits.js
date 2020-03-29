import * as benefitsTables from "../../../data/benefits";

export const calculateWeeklyBenefits = (highestQuarterIncome, state) => {
  const benefitsTable = benefitsTables[state];
  const income = Number(highestQuarterIncome);
  const { amount } = benefitsTable.find(({ range }) => {
    const [bottom, top] = range;
    if (!top) {
      return income >= bottom;
    }
    return income >= bottom && income <= top;
  });
  return amount;
};
