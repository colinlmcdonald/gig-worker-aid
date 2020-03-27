import React, { useEffect } from "react";
import Calculator from "../Calculator";
import {
  useUnemploymentInsuranceDispatchContext,
  useUnemploymentInsuranceStateContext
} from "../context";
import { NEXT_ROUTE, quarters } from "../constants";

const PartTimeEmployment = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const { route } = useUnemploymentInsuranceStateContext();
  useEffect(() => {
    dispatch({ type: NEXT_ROUTE, payload: route.routes[0] });
  }, [dispatch]);
  const q = quarters.map(quarter => ({ ...quarter, year: "2020" }));
  return <Calculator quarters={q} />;
};

export default PartTimeEmployment;
