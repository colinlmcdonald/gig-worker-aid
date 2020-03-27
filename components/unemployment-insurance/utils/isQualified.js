export const mapSalaryToQuarters = salary => {
  const byQuarter = Number(salary) / 4;
  return [...Array(4)].fill("").map((a, i) => ({
    quarter: `q${i + 1}`,
    income: byQuarter
  }));
};

export const isQualified = quarters => {
  const highestQuarter = highestQuarterlyEarnings(quarters);
  if (highestQuarter >= 1300) {
    return true;
  }
  if (highestQuarter >= 900) {
    const basePeriodEarnings = quarters.reduce((acc, { income }) => {
      return acc + Number(income);
    }, 0);
    console.log(basePeriodEarnings, highestQuarter);
    return basePeriodEarnings >= highestQuarter * 1.25;
  }
  return false;
};

export const highestQuarterlyEarnings = quarters =>
  quarters.reduce((acc, { income }) => {
    if (acc < Number(income)) {
      return Number(income);
    }
    return acc;
  }, 0);
