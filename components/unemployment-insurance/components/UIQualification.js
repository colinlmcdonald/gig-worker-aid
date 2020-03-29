import React, { useEffect, useMemo } from "react";
import { Box, Text } from "rebass";
import {
  useUnemploymentInsuranceStateContext,
  useUnemploymentInsuranceDispatchContext
} from "../context";
import { isQualified, highestQuarterlyEarnings } from "../utils/isQualified";
import { NEXT_ROUTE } from "../constants";
import { calculateWeeklyBenefits } from "../utils/calculateWeeklyBenefits";
import { findNextRoute } from "../utils/findNextRoute";

const monthsToQuartersHash = [
  "jan,feb,mar",
  "apr,may,jun",
  "jul,aug,sep",
  "oct,nov,dec"
];

const reduceMonthsToQuarters = incomeByMonth => {
  return Object.entries(incomeByMonth).reduce(
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
};

const UIQualification = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const {
    incomeByYearAndMonth,
    state,
    route,
    previousRoutes
  } = useUnemploymentInsuranceStateContext();
  const incomeByMonth = useMemo(
    () =>
      Object.keys(incomeByYearAndMonth).reduce((acc, key) => {
        return {
          ...acc,
          ...incomeByYearAndMonth[key]
        };
      }, {}),
    [incomeByYearAndMonth]
  );
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
  const weeklyBenefit = useMemo(() => {
    if (qualified) {
      return calculateWeeklyBenefits(earnings, "california"); // TODO: Check state
    }
  }, [earnings, qualified]);
  const previousRouteWasAlternativePeriod = useMemo(() => {
    const previousRoutesCopy = previousRoutes.slice();
    const previousRoute = previousRoutesCopy.pop();
    return previousRoute.route === "/alternative-period";
  });

  useEffect(() => {
    if (previousRouteWasAlternativePeriod) {
      dispatch({
        type: NEXT_ROUTE,
        payload: findNextRoute("/not-eligible-ui")
      });
    } else if (!qualified) {
      dispatch({
        type: NEXT_ROUTE,
        payload: findNextRoute("/alternative-period")
      });
    }
  }, [qualified, route, previousRouteWasAlternativePeriod]);

  return (
    <Box>
      {qualified && (
        <React.Fragment>
          <Text>Are qualififed!</Text>
          <Text>Highest Quarterly Earnings: {earnings}</Text>
          <Text>COVID-19 Pandemic Assistance: $600</Text>
          <Text>
            Estimated Weekly Assistance Until July 31, 2020:{" "}
            {Number(weeklyBenefit) + 600}
          </Text>
          <Text>
            Estimated Weekly Benefit After July 31, 2020: {weeklyBenefit}
          </Text>
        </React.Fragment>
      )}
      {!qualified && (
        <React.Fragment>
          <Text>
            {previousRouteWasAlternativePeriod
              ? "Ah, sorry! We're not able to determine if you are eligible for Unemployment Insurance based on the information provided. Check out more here!"
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
