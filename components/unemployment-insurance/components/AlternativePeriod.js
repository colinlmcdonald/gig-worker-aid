import React, { useImperativeHandle, useEffect } from "react";
import Calculator from "../Calculator";
import {
  NEXT_ROUTE,
  quarters,
  RESET_FOR_ALTERNATIVE_PERIOD
} from "../constants";
import { useUnemploymentInsuranceDispatchContext } from "../context";
import { findNextRoute } from "../utils/findNextRoute";

const AlternativePeriod = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const alternativeQuarters = quarters.map(q => {
    if (q.key === 1) {
      q.year = 2020;
    } else {
      q.year = 2019;
    }
    return q;
  });

  useEffect(() => {
    dispatch({
      type: RESET_FOR_ALTERNATIVE_PERIOD
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: NEXT_ROUTE,
      payload: findNextRoute("/ui-qualification")
    });
  }, [dispatch]);
  return <Calculator quarters={alternativeQuarters} />;
};

export default AlternativePeriod;
