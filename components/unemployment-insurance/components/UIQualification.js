import React, { useEffect, useMemo } from "react";
import { Box, Text, Link } from "rebass";
import {
  useUnemploymentInsuranceStateContext,
  useUnemploymentInsuranceDispatchContext
} from "../context";
import { isQualified, highestQuarterlyEarnings } from "../utils/isQualified";
import { NEXT_ROUTE, QUALIFIED } from "../constants";
import { calculateWeeklyBenefits } from "../utils/calculateWeeklyBenefits";
import { findNextRoute } from "../utils/findNextRoute";

const monthsToQuartersHash = [
  "jan,feb,mar",
  "apr,may,jun",
  "jul,aug,sep",
  "oct,nov,dec"
];

const TextWithBold = ({ text, bold }) => (
  <Text>
    {text}{" "}
    <Text sx={{ display: "inline-block" }} fontWeight="bold">{` ${bold}`}</Text>
  </Text>
);

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

  useEffect(() => {
    if (qualified) {
      dispatch({ type: QUALIFIED });
    }
  }, [qualified]);
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
        payload: findNextRoute("/alternative-income-calculator-1")
      });
    } else {
      // TODO: send to guide
    }
  }, [qualified, route, previousRouteWasAlternativePeriod]);

  return (
    <Box
      fontSize={4}
      margin={3}
      marginLeft={[4, 4, 5]}
      sx={{ textAlign: "left" }}
    >
      {qualified && (
        <React.Fragment>
          <Text>You're qualified 😎</Text>
          <TextWithBold text="COVID-19 Pandemic Assistance:" bold="$600" />
          <TextWithBold
            text="Estimated Weekly Assistance Until 7-31-20:"
            bold={`$${Number(weeklyBenefit) + 600}`}
          />
          <TextWithBold
            text="Estimated Weekly Assistance After 7-31-20:"
            bold={`$${weeklyBenefit}`}
          />
          <Text marginTop={3}>
            To learn more and get instructions on how to sign up, check out our:{" "}
          </Text>
          <Link
            href="https://docs.google.com/document/d/1k1BQzIyqxyTOWLuVeLtg1YKOzHzogGSyNEep5eW6dps/edit"
            target="_blank"
            marginTop={3}
          >
            Unemployment Insurance Guide
          </Link>
        </React.Fragment>
      )}
      {!qualified && (
        <React.Fragment>
          <Text>
            {previousRouteWasAlternativePeriod
              ? "Ah, sorry! We're not able to determine if you are eligible for Unemployment Insurance based on the information provided. Check out more here!"
              : "Sorry, you are not eligible for the Standard Base Period."}
          </Text>
          {!previousRouteWasAlternativePeriod && (
            <Text marginTop={3}>Let's try using the Alternate Period!</Text>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

export default UIQualification;
