import React from "react";
import { Box } from "rebass";
import { Input, Label } from "@rebass/forms";
import { useUnemploymentInsuranceDispatchContext } from "../context";
import { UPDATE_STATE } from "../constants";

const FullTimeEmployment = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const handleSalaryChange = e => {
    dispatch({ type: UPDATE_STATE, payload: { salary: e.target.value } });
  };
  return (
    <Box sx={{ width: "200px" }}>
      <Label htmlFor="salary">Salary</Label>
      <Input name="salary" id="salary" onChange={handleSalaryChange}></Input>
    </Box>
  );
};
export default FullTimeEmployment;
