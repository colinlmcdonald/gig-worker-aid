import React from "react";
import App from "../components/App";
import { Box, Flex, Heading } from "rebass";
import { Input, Label, Select } from "@rebass/forms";
import { useUnemploymentInsuranceDispatchContext } from "../components/unemployment-insurance/context";
import { UPDATE_STATE } from "../components/unemployment-insurance/constants";

const Quarter = ({ name, months }) => (
  <React.Fragment>
    <Box m={2}>
      <Heading fontSize={[2]} color="text">
        {name}
        <Months months={months} />
      </Heading>
    </Box>
  </React.Fragment>
);

const Quarters = ({ quarters }) => {
  const [q1, q2, q3, q4] = quarters.slice(0, quarters.length);
  const columnOne = [q1, q3];
  const columnTwo = [q2, q4];
  return (
    <React.Fragment>
      <Flex>
        {columnOne.map(({ name, months }) => (
          <Quarter name={name} months={months} />
        ))}
      </Flex>
      <Flex>
        {columnTwo.map(({ name, months }) => (
          <Quarter name={name} months={months} />
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
          dispatch({ type: UPDATE_STATE, payload: { [key]: e.target.value } })
        }
      ></Input>
    </React.Fragment>
  ));
};

const quarters = [
  {
    name: "1st Quarter",
    months: [
      { key: "jan", name: "January" },
      { key: "feb", name: "February" },
      { key: "mar", name: "March" }
    ]
  },
  {
    name: "2nd Quarter",
    months: [
      { key: "apr", name: "April" },
      { key: "may", name: "May" },
      { key: "jun", name: "June" }
    ]
  },
  {
    name: "3rd Quarter",
    months: [
      { key: "jul", name: "July" },
      { key: "aug", name: "August" },
      { key: "sep", name: "September" }
    ]
  },
  {
    name: "4th Quarter",
    months: [
      { key: "oct", name: "October" },
      { key: "nov", name: "November" },
      { key: "dec", name: "December" }
    ]
  }
];

const Calculator = () => {
  return (
    <App>
      <Flex flexDirection={"column"}>
        <Box
          p={2}
          fontSize={3}
          width={[1, 1, 1 / 2]}
          color="text"
          bg="background"
        ></Box>
        <Heading fontSize={[1, 1, 2]} color="text">
          Enter your previous 4 quarters income by month.
        </Heading>
        <Box p={2} fontSize={3} width={[1 / 2]} color="text" bg="background">
          <Quarters quarters={quarters} />
        </Box>
      </Flex>
    </App>
  );
};

export default Calculator;
