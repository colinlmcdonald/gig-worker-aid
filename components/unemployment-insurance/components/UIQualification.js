import React, { useEffect, useMemo } from "react";
import { Box, Text } from "rebass";
import {
  useUnemploymentInsuranceStateContext,
  useUnemploymentInsuranceDispatchContext
} from "../context";
import { isQualified, highestQuarterlyEarnings } from "../utils/isQualified";
import { NEXT_ROUTE } from "../constants";

const monthsToQuartersHash = [
  "jan,feb,mar",
  "apr,may,jun",
  "jul,aug,sep",
  "oct,nov,dec"
];

const reduceMonthsToQuarters = incomeByMonth =>
  Object.entries(incomeByMonth).reduce(
    (acc, [key, value]) => {
      const index = monthsToQuartersHash.reduce((acc, q, i) => {
        const index = q.indexOf(key);
        if (index !== -1) {
          return i;
        }
        return acc;
      }, 0);
      acc[index] = acc[index] + Number(value);
      return acc;
    },
    [0, 0, 0, 0]
  );

const statesToSalaryBenefits = {
  california: [
    {
      income: 929,
      rate: 50,
      comparison: "<=",
      kind: "$"
    },
    {
      income: 5741.66,
      rate: 0.6,
      comparison: "<=",
      kind: "%"
    },
    {
      income: 5741.66,
      rate: 0.7,
      comparison: ">",
      kind: "%"
    }
  ]
};

const calculateBenefits = (earnings, state) => {
  const earningsNumb = Number(earnings);
  return statesToSalaryBenefits[state.toLowerCase()].find(
    ({ income, comparison }) => {
      if (comparison === "<=") {
        if (earningsNumb <= income) {
          return true;
        }
      } else if (comparison === ">") {
        if (earningsNumb > income) {
          return true;
        }
      }
    }
  );
};

const calculateWeeklyBenefit = (highestQuarter, benefits) => {
  const { rate, kind } = benefits;
  if (kind === "$") {
    return rate;
  }
  debugger;
  return Math.min(rate * highestQuarter, 450);
};

const UIQualification = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const {
    incomeByMonth,
    state,
    route,
    previousRoutes
  } = useUnemploymentInsuranceStateContext();
  const quarters = useMemo(() => reduceMonthsToQuarters(incomeByMonth), [
    incomeByMonth
  ]);
  const qualified = useMemo(
    () => isQualified(quarters.map(income => ({ income }))),
    [quarters]
  );
  const earnings = useMemo(
    () => highestQuarterlyEarnings(quarters.map(income => ({ income }))),
    [quarters]
  );

  const benefits = useMemo(() => {
    return calculateBenefits(earnings, state);
  }, [earnings]);

  const weeklyBenefit = useMemo(
    () => calculateWeeklyBenefit(earnings, benefits),
    [benefits]
  );
  const previousRouteWasAlternativePeriod = useMemo(() => {
    const previousRoutesCopy = previousRoutes.slice();
    const previousRoute = previousRoutesCopy.pop();
    return previousRoute.route === "/alternative-period";
  });

  useEffect(() => {
    const { routes } = route;
    if (previousRouteWasAlternativePeriod) {
      // dispatch({
      //   type: NEXT_ROUTE,
      //   payload: routes.find(route => route.route === "/ui-qualification")
      // });
    } else if (!qualified) {
      dispatch({
        type: NEXT_ROUTE,
        payload: routes.find(route => route.route === "/alternative-period")
      });
    }
  }, [qualified, route, previousRouteWasAlternativePeriod]);

  return (
    <Box>
      {qualified && (
        <React.Fragment>
          <Text>Are qualififed!</Text>
          <Text>Highest Quarterly Earnings: {earnings}</Text>
          <Text>Estimated Weekly Benefit: {weeklyBenefit}</Text>{" "}
        </React.Fragment>
      )}
      {!qualified && (
        <React.Fragment>
          <Text>
            {previousRouteWasAlternativePeriod
              ? "Sorry, you did not qualify for the Alternative Period. Please click here for what you can do next."
              : "Your earnings were not high enough, so you might not qualify using your Base Period."}
          </Text>
          {!previousRouteWasAlternativePeriod && (
            <Text>Let's try using the Alternate Period.</Text>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

export default UIQualification;
