import React, { useMemo } from "react";
import { Box, Flex, Heading } from "rebass";
import { Input, Label } from "@rebass/forms";
import { useUnemploymentInsuranceDispatchContext } from "./context";
import { UPDATE_INCOME_BY_MONTH } from "./constants";

const Quarter = ({ name, months, year }) => (
  <React.Fragment>
    <Box m={2}>
      <Heading fontSize={[2]} color="text">
        {name} - {year}
        <Months months={months} />
      </Heading>
    </Box>
  </React.Fragment>
);

const Quarters = ({ quarters }) => {
  const [q1, q2, q3, q4] = quarters.slice(0, quarters.length);
  const columnOne = [q1, q2];
  const columnTwo = [q3, q4];
  return (
    <React.Fragment>
      <Flex>
        {columnOne.map(({ name, months, year }) => (
          <Quarter name={name} months={months} year={year} />
        ))}
      </Flex>
      <Flex>
        {columnTwo.map(({ name, months, year }) => (
          <Quarter name={name} months={months} year={year} />
        ))}
      </Flex>
    </React.Fragment>
  );
};

const Months = ({ months }) => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  return months.map(({ key, name }) => (
    <React.Fragment>
      <Label htmlFor={key} fontSize={1}>
        {name}
      </Label>
      <Input
        id={key}
        name={key}
        onChange={e =>
          dispatch({
            type: UPDATE_INCOME_BY_MONTH,
            payload: { [key]: e.target.value }
          })
        }
      ></Input>
    </React.Fragment>
  ));
};

const Calculator = ({ quarters }) => {
  const orderlyQuarters = useMemo(
    () =>
      quarters.sort((a, b) => {
        if (a.year > b.year) {
          return 1;
        } else if (a.year > b.year) {
          return -1;
        }
        return 0;
      }),
    [quarters]
  );
  return (
    <Box sx={{ width: "400px" }}>
      <Heading fontSize={[1, 1, 2]} color="text">
        Enter your income for each of the months listed:
      </Heading>
      <Box p={2} fontSize={3} width={1} color="text" bg="background">
        <Quarters quarters={orderlyQuarters} />
      </Box>
    </Box>
  );
};

export default Calculator;
