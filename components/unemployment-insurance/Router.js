import { useMemo } from "react";
import { Box, Button, Flex, Link } from "rebass";
import Card from "../Card";
import Sidebar from "../Sidebar";
import {
  useUnemploymentInsuranceStateContext,
  useUnemploymentInsuranceDispatchContext
} from "./context";
import { NEXT, NEXT_ROUTE, GO_BACK } from "./constants";
import * as Components from "./components";
import { findNextRoute } from "./utils/findNextRoute";

// const useCalculateNextRoute = () => {
//   const { routes } = useUnemploymentInsuranceStateContext();
//   return routes.slice(0, 1)[0];
// };

// const useCalculateFutureRoutes = () => {
//   const { routes } = useUnemploymentInsuranceStateContext();
//   const nextRoute = useCalculateNextRoute();
//   return nextRoute.routes || routes.slice(1, routes.length);
// };

const Router = () => {
  const dispatch = useUnemploymentInsuranceDispatchContext();
  const state = useUnemploymentInsuranceStateContext();
  const { route, updated, previousRoutes } = state;

  const handleGoBack = () => {
    const copy = previousRoutes.slice();
    const previousRoute = copy.pop();
    dispatch({ type: NEXT_ROUTE, payload: previousRoute });
    dispatch({ type: GO_BACK, payload: copy });
  };

  const handleCancel = () => {
    const home = findNextRoute("/");
    dispatch({ type: NEXT_ROUTE, payload: home });
    dispatch({ type: NEXT });
  };

  const endOfTheLine = useMemo(() => {
    if (typeof route.terminal === "function") {
      return route.terminal(state);
    }
    return route.terminal;
  }, [state.qualifiedForUI, route]);

  // const futureRoutes = useCalculateFutureRoutes();
  // const nextRoute = useCalculateNextRoute();

  try {
    const Component = Components[route.component];
    const handleNextClick = () => dispatch({ type: NEXT });
    const disableNextButton = Boolean(route.changeIsRequired && !updated);
    return (
      <Flex>
        <Card header={route.title}>
          <Box
            marginTop={3}
            bg="layoutBackground"
            width={[9 / 10, 3 / 4, 3 / 4]}
            sx={{
              width: "75%",
              border: "1px solid #e3e3e5",
              borderRadius: "12px"
            }}
          >
            {route.route !== "/" && (
              <Flex justifyContent="space-between">
                <Link
                  fontSize={3}
                  marginLeft={3}
                  marginTop={3}
                  onClick={handleGoBack}
                  sx={{
                    cursor: "pointer"
                  }}
                >
                  <Box
                    marginRight={1}
                    sx={{ display: "inline-block" }}
                    fontSize={3}
                  >
                    {"\u27EA"}
                  </Box>{" "}
                  Back
                </Link>
                <Link
                  fontSize={3}
                  marginTop={3}
                  marginRight={3}
                  onClick={handleCancel}
                  sx={{
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </Link>
              </Flex>
            )}
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{
                height: "100%"
              }}
            >
              <Box
                flex="1"
                marginTop={4}
                width={1}
                marginBottom={endOfTheLine ? 4 : undefined}
              >
                <Component route={route} />
              </Box>
              {!endOfTheLine && (
                <Box
                  width={[1 / 3, 1 / 4, 1 / 6]}
                  height={60}
                  flex="1"
                  marginBottom={5}
                  marginTop={5}
                >
                  <Flex alignItems="flex-end" sx={{ height: "100%" }}>
                    <Button
                      sx={{
                        ":focus": { outline: "none" },
                        ":hover": { backgroundColor: "#0077ed" },
                        backgroundColor: "#0071e3",
                        opacity: disableNextButton ? "0.3" : "1",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                      fontSize={[2, 2, 3]}
                      onClick={handleNextClick}
                      disabled={disableNextButton}
                      height={50}
                      width={1}
                      flex="1"
                    >
                      Next
                    </Button>
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>
        </Card>
        {route.sidebar && <Sidebar sidebar={route.sidebar} />}
      </Flex>
    );
  } catch (e) {
    console.error(e);
    return "Whoops we fucked up" + JSON.stringify(e, null, 4);
  }
};

export default Router;
