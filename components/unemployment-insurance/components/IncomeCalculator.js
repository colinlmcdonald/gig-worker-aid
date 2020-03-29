import React, { useEffect, useMemo } from "react";
import Calculator from "../Calculator";
import { quarters, NEXT_ROUTE } from "../constants";
import { useUnemploymentInsuranceDispatchContext } from "../context";
import { findNextRoute } from "../utils/findNextRoute";

const IncomeCalculator = ({ route: { props, next } }) => {
  const dispatch = useUnemploymentInsuranceDispatchContext();

  useEffect(() => {
    const nextRoute = findNextRoute(next);
    dispatch({ type: NEXT_ROUTE, payload: nextRoute });
  }, [dispatch, next]);
  const q = quarters.map(quarter => ({ ...quarter, year: "2019" }));
  const orderlyQuarters = useMemo(
    () =>
      q.sort((a, b) => {
        if (a.year > b.year) {
          return 1;
        } else if (a.year > b.year) {
          return -1;
        }
        return 0;
      }),
    [q]
  );

  return <Calculator quarter={orderlyQuarters[Number(props.next) - 1]} />;
};

export default IncomeCalculator;
