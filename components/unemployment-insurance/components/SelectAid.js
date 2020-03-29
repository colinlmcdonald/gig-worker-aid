import React, { useState, useEffect } from "react";
import { Flex } from "rebass";
import ButtonSelection from "../../ButtonSelection";
import {
  useUnemploymentInsuranceDispatchContext,
  useUnemploymentInsuranceStateContext
} from "../context";
import { UPDATE_STATE, NEXT_ROUTE } from "../constants";

const SelectAid = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const { aid, route } = useUnemploymentInsuranceStateContext();

  useEffect(() => {
    if (aid) {
      const nextRoute = route.routes.find(route => route.route === `/${aid}`);
      dispatch({ type: NEXT_ROUTE, payload: nextRoute });
    }
  }, [aid]);

  const handleClick = type => () => {
    dispatch({ type: UPDATE_STATE, payload: { aid: type } });
  };
  const buttons = [
    {
      name: "Full-time Employment",
      onClick: handleClick("fte"),
      selected: aid === "fte"
    },
    {
      name: "Self-employed",
      onClick: handleClick("se"),
      selected: aid === "se"
    },
    {
      name: "Part-time Employment",
      onClick: handleClick("pte"),
      selected: aid === "pte"
    }
  ];
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <ButtonSelection buttons={buttons} />
    </Flex>
  );
};

export default SelectAid;
