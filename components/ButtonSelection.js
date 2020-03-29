import React, { useEffect, useState } from "react";
import { Box, Button, Text, Flex } from "rebass";
import {
  useUnemploymentInsuranceDispatchContext,
  useUnemploymentInsuranceStateContext
} from "./unemployment-insurance/context";
import {
  UPDATE_STATE,
  NEXT_ROUTE,
  UPDATE_STATE_MULTISELECT
} from "./unemployment-insurance/constants";
import { findNextRoute } from "./unemployment-insurance/utils/findNextRoute";

const ButtonSelection = ({ route }) => {
  const {
    description,
    dispatchKey,
    options,
    next,
    multiSelect,
    verificationCallback
  } = route;

  const dispatch = useUnemploymentInsuranceDispatchContext();
  const state = useUnemploymentInsuranceStateContext();

  useEffect(() => {
    if (next && !options) {
      const route = findNextRoute(next);
      dispatch({ type: NEXT_ROUTE, payload: route });
    }
  }, [next, options]);

  useEffect(() => {
    const value = state[dispatchKey];
    if (value && !multiSelect) {
      const { next } = options.find(o => o.dispatchValue === value);
      const route = findNextRoute(next);
      dispatch({ type: NEXT_ROUTE, payload: route });
    } else if (value && multiSelect) {
      const next = verificationCallback(state);
      const route = findNextRoute(next);
      dispatch({ type: NEXT_ROUTE, payload: route });
    }
  }, [state[dispatchKey], multiSelect]);

  const selectedValue = state[dispatchKey] || (multiSelect && []);

  const handleClick = dispatchValue => () => {
    let value = dispatchValue;
    if (multiSelect) {
      const currentValue = state[dispatchKey] || [];
      const copy = currentValue.slice();
      const found = currentValue.find(v => v === dispatchValue);
      if (found) {
        const withRemovedValue = copy.filter(v => v !== dispatchValue);
        value = withRemovedValue;
      } else {
        value = copy.concat([dispatchValue]);
      }
    }
    dispatch({
      type: UPDATE_STATE,
      payload: { [dispatchKey]: value }
    });
  };

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      {description && (
        <Text p={3} fontSize={[1, 2, 3]}>
          {description}
        </Text>
      )}
      {options &&
        options.map(({ title, dispatchValue }) => {
          const selected = multiSelect
            ? selectedValue.find(v => v === dispatchValue)
            : selectedValue === dispatchValue;
          return (
            <Box key={title} marginLeft={2} width={1 / 2} marginTop={2}>
              <Button
                variant={selected ? "primary" : "outline"}
                width={1}
                sx={{
                  ":focus": { outline: "none" },
                  ":hover": { backgroundColor: "primary", color: "background" },
                  cursor: "pointer"
                }}
                onClick={handleClick(dispatchValue)}
                bg={selected ? "primary" : "background"}
                height={80}
              >
                {title}
              </Button>
            </Box>
          );
        })}
    </Flex>
  );
};

export default ButtonSelection;
