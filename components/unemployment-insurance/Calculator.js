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
      <Heading fontSize={[3, 3, 4]} color="text">
        {name} - {year}
        <Months months={months} year={year} />
      </Heading>
    </Box>
  </React.Fragment>
);

// const Quarters = ({ quarters }) => {
//   const [q1, q2, q3, q4] = quarters.slice(0, quarters.length);
//   const columnOne = [q1, q2];
//   const columnTwo = [q3, q4];
//   return (
//     <React.Fragment>
//       <Flex justifyContent="center" alignItems="center">
//         {columnOne.map(({ name, months, year }) => (
//           <Quarter name={name} months={months} year={year} key={name} />
//         ))}
//       </Flex>
//       <Flex justifyContent="center" alignItems="center">
//         {columnTwo.map(({ name, months, year }) => (
//           <Quarter name={name} months={months} year={year} key={name} />
//         ))}
//       </Flex>
//     </React.Fragment>
//   );
// };

const Months = ({ months, year }) => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const {
    incomeByYearAndMonth,
    updated
  } = useUnemploymentInsuranceStateContext();
  useEffect(() => {
    if (
      Object.keys(incomeByYearAndMonth).length &&
      incomeByYearAndMonth[year]
    ) {
      const isFilledOut = months.every(({ key }) => {
        const months = incomeByYearAndMonth[year];
        return months[key];
      });
      console.log(incomeByYearAndMonth);

      if (isFilledOut) {
        dispatch({ type: UPDATE_STATE, payload: {} }); // just set updated: true
      } else if (updated) {
        dispatch({ type: INVALIDATE_UPDATE });
      }
    }
  }, [incomeByYearAndMonth]);
  return months.map(({ key, name }) => (
    <React.Fragment key={key}>
      <Label htmlFor={key} fontSize={[2, 3, 3]}>
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
            payload: { [year]: { [key]: e.target.value.replace(",", "") } }
          });
        }}
      ></Input>
    </React.Fragment>
  ));
};

const Calculator = ({ quarter }) => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Heading fontSize={[2, 2, 3]} color="text">
        Enter your income for each of the months listed:
      </Heading>
      <Box
        p={2}
        fontSize={3}
        width={[1, 2 / 3, 1 / 2]}
        color="text"
        bg="layoutBackground"
      >
        <Quarter {...quarter} />
      </Box>
    </Flex>
  );
};

export default Calculator;
