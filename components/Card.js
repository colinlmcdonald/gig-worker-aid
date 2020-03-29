import React from "react";
import { Box, Flex, Heading } from "rebass";

const Card = ({ children, header }) => {
  return (
    <Box
      marginTop={4}
      width={[1]}
      sx={{ width: 500, height: 48, textAlign: "center" }}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
      >
        <Heading fontSize={[3, 3, 4]} color="text">
          {header}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
};

export default Card;
