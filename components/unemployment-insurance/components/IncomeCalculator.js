import React, { useEffect } from "react";
import Calculator from "../Calculator";
import { quarters, NEXT_ROUTE } from "../constants";
import {
  useUnemploymentInsuranceDispatchContext,
  useUnemploymentInsuranceStateContext
} from "../context";
import { findNextRoute } from "../utils/findNextRoute";

const IncomeCalculator = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();

  useEffect(() => {
    const next = findNextRoute("/ui-qualification");
    dispatch({ type: NEXT_ROUTE, payload: next });
  }, [dispatch]);
  const q = quarters.map(quarter => ({ ...quarter, year: "2019" }));
  return <Calculator quarters={q} />;
};

export default IncomeCalculator;
