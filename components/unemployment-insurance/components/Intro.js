import React, { useEffect } from "react";
import { Heading } from "rebass";
import { useUnemploymentInsuranceDispatchContext } from "../context";
import { NEXT_ROUTE } from "../constants";
import { findNextRoute } from "../utils/findNextRoute";

const Intro = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  useEffect(() => {
    const nextRoute = findNextRoute("/employment-status");
    dispatch({ type: NEXT_ROUTE, payload: nextRoute });
  }, [dispatch]);
  return <Heading>Welcome!</Heading>;
};

export default Intro;
