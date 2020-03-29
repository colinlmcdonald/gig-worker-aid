import React, { useEffect } from "react";
import { Box, Text, Link } from "rebass";
import { useUnemploymentInsuranceDispatchContext } from "../context";
import { findNextRoute } from "../utils/findNextRoute";
import { NEXT_ROUTE } from "../constants";

const Info = ({ route }) => {
  const { description, link, links } = route;
  const dispatch = useUnemploymentInsuranceDispatchContext();

  useEffect(() => {
    if (route.next) {
      const nextRoute = findNextRoute(route.next);
      dispatch({ type: NEXT_ROUTE, payload: nextRoute });
    }
  }, [route, dispatch]);
  return (
    <Box fontSize={4} margin={4} sx={{ textAlign: "left" }}>
      {typeof description === "string" ? (
        <Text>{description}</Text>
      ) : (
        description &&
        description.length &&
        description.map((d, i) => <Text marginTop={i === 0 ? 0 : 3}>{d}</Text>)
      )}
      {link && (
        <Link target="_blank" href={link.href}>
          {link.text}
        </Link>
      )}
      {links && (
        <Box marginTop={3}>
          {links.map(l => (
            <Box marginTop={3}>
              <Link target="_blank" href={l.href}>
                {l.text}
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Info;
