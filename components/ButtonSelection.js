import React from "react";
import { Box, Button, Flex } from "rebass";

const ButtonSelection = ({ buttons }) => {
  return (
    <Flex>
      {buttons.map(({ name, onClick, selected }) => (
        <Box key={name} marginLeft={2}>
          <Button
            variant={selected ? "primary" : "outline"}
            sx={{ ":focus": { outline: "none" } }}
            onClick={onClick}
          >
            {name}
          </Button>
        </Box>
      ))}
    </Flex>
  );
};

export default ButtonSelection;
