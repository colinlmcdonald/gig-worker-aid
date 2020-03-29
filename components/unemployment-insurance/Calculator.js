import React, { useMemo, useEffect } from "react";
import { Box, Flex, Heading } from "rebass";
import { Input, Label } from "@rebass/forms";
import {
  useUnemploymentInsuranceDispatchContext,
  useUnemploymentInsuranceStateContext
} from "./context";
import {
  UPDATE_INCOME_BY_MONTH,
  UPDATE_STATE,
  INVALIDATE_UPDATE
} from "./constants";

const Quarter = ({ name, months, year }) => (
  <React.Fragment>
    <Box m={2}>
      <Heading fontSize={[2]} color="text">
        {name} - {year}
        <Months months={months} year={year} />
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
      <Flex justifyContent="center" alignItems="center">
        {columnOne.map(({ name, months, year }) => (
          <Quarter name={name} months={months} year={year} key={name} />
        ))}
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        {columnTwo.map(({ name, months, year }) => (
          <Quarter name={name} months={months} year={year} key={name} />
        ))}
      </Flex>
    </React.Fragment>
  );
};

const Months = ({ months, year }) => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const {
    incomeByYearAndMonth,
    updated
  } = useUnemploymentInsuranceStateContext();
  useEffect(() => {
    const isFilledOut = Object.keys(incomeByYearAndMonth).reduce(
      (acc, year) => {
        const months = incomeByYearAndMonth[year];
        const allMonthsFilledOut = Object.values(months).every(
          mth => mth.length
        );
        return acc + (allMonthsFilledOut ? Object.values(months).length : 0);
      },
      0
    );
    if (isFilledOut === 12) {
      dispatch({ type: UPDATE_STATE, payload: {} }); // just set updated: true
    } else if (updated) {
      dispatch({ type: INVALIDATE_UPDATE });
    }
  }, [incomeByYearAndMonth]);
  return months.map(({ key, name }) => (
    <React.Fragment key={key}>
      <Label htmlFor={key} fontSize={1}>
        {name}
      </Label>
      <Input
        bg="background"
        id={key}
        name={key}
        defaultValue={
          incomeByYearAndMonth[year] && incomeByYearAndMonth[year][key]
            ? incomeByYearAndMonth[year][key]
            : undefined
        }
        onChange={e => {
          dispatch({
            type: UPDATE_INCOME_BY_MONTH,
            payload: { [year]: { [key]: e.target.value } }
          });
        }}
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
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Heading fontSize={[1, 1, 2]} color="text">
        Enter your income for each of the months listed:
      </Heading>
      <Box p={2} fontSize={3} width={1} color="text" bg="layoutBackground">
        <Quarters quarters={orderlyQuarters} />
      </Box>
    </Flex>
  );
};

export default Calculator;
