import React from "react";
import { Text } from "rebass";

const Info = ({ route }) => {
  const { description, link } = route;
  return <Text>{description}</Text>;
};

export default Info;
