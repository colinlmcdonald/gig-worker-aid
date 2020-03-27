import React, { useImperativeHandle, useEffect } from "react";
import Calculator from "../Calculator";
import { NEXT_ROUTE, quarters } from "../constants";
import {
  useUnemploymentInsuranceStateContext,
  useUnemploymentInsuranceDispatchContext
} from "../context";

const AlternativePeriod = () => {
  const { qualified, route } = useUnemploymentInsuranceStateContext();
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
    const { routes } = route;
    dispatch({
      type: NEXT_ROUTE,
      payload: routes.find(route => route.route === "/ui-qualification")
    });
  }, [route]);
  return <Calculator quarters={alternativeQuarters} />;
};

export default AlternativePeriod;
