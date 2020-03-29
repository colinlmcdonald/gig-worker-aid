import React, { useEffect } from "react";
import { Label, Select } from "@rebass/forms";
import { Box, Flex } from "rebass";
import { UPDATE_STATE } from "../constants";
import { useUnemploymentInsuranceDispatchContext } from "../context";

const states = [
  { code: "CA", name: "California" },
  { code: "NY", name: "New York" }
];

const StateSelect = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const handleClick = e => {
    dispatch({ type: UPDATE_STATE, payload: { state: e.target.value } });
  };
  useEffect(() => {
    dispatch({ type: UPDATE_STATE, payload: { state: "California" } });
  }, [dispatch]);
  return (
    <Flex justifyContent="center" alignItems="center">
      <Box width={1 / 2}>
        <Label htmlFor="state">State</Label>
        <Select id="state" name="state" onChange={handleClick} bg="background">
          {states.map(state => (
            <option key={state.code} name={state}>
              {state.name}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  );
};
export default StateSelect;
