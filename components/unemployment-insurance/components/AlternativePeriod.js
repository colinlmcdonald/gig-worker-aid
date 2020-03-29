import React, { useMemo, useEffect } from "react";
import Calculator from "../Calculator";
import {
  NEXT_ROUTE,
  quarters,
  RESET_FOR_ALTERNATIVE_PERIOD
} from "../constants";
import { useUnemploymentInsuranceDispatchContext } from "../context";
import { findNextRoute } from "../utils/findNextRoute";

const AlternativePeriod = ({ route: { props, next } }) => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const alternativeQuarters = quarters.map(q => {
    if (q.key === 1) {
      q.year = 2020;
    } else {
      q.year = 2019;
    }
    return q;
  });
  const orderlyQuarters = useMemo(
    () =>
      alternativeQuarters.sort((a, b) => {
        if (a.year > b.year) {
          return 1;
        } else if (a.year > b.year) {
          return -1;
        }
        return 0;
      }),
    [alternativeQuarters]
  );

  useEffect(() => {
    dispatch({
      type: RESET_FOR_ALTERNATIVE_PERIOD
    });
  }, [dispatch]);

  useEffect(() => {
    const nextRoute = findNextRoute(next);
    dispatch({ type: NEXT_ROUTE, payload: nextRoute });
  }, [dispatch, next]);
  return <Calculator quarter={orderlyQuarters[Number(props.next) - 1]} />;
};

export default AlternativePeriod;
