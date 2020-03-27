import React from "react";
import { Box, Flex, Heading, Link, Text } from "rebass";
import NextLink from "next/link";

const Contents = ({ contents }) =>
  contents.map(({ content, title }) => (
    <React.Fragment key={title}>
      <Text marginTop={3} fontWeight="bold">
        {title}
      </Text>
      <Text marginTop={1} color="text">
        {content}
      </Text>
    </React.Fragment>
  ));

const Content = ({ content, title }) => (
  <React.Fragment>
    <Heading marginTop={1} fontSize={3}>
      {title}
    </Heading>
    <Text marginTop={1} color="text">
      {content}
    </Text>
  </React.Fragment>
);

const Sidebar = ({ sidebar: { title, content, contents, link } }) => {
  return (
    <Box
      sx={{ borderLeft: "2px solid black", width: "500px", height: "85vh" }}
      paddingLeft={2}
    >
      <Heading marginTop={1} fontSize={3}>
        {title}
      </Heading>
      {contents && <Contents contents={contents} />}
      {content && <Content content={content} />}
      {link && (
        <Box marginTop={3}>
          <NextLink href={link.href}>
            <Link sx={{ ":hover": { cursor: "pointer" } }}>{link.text}</Link>
          </NextLink>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
