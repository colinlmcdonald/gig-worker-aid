import { Box, Button, Flex } from "rebass";
import Card from "../Card";
import Sidebar from "../Sidebar";
import {
  useUnemploymentInsuranceStateContext,
  useUnemploymentInsuranceDispatchContext
} from "./context";
import { NEXT } from "./constants";
import * as Components from "./components";

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
  const { route, updated } = useUnemploymentInsuranceStateContext();
  // const futureRoutes = useCalculateFutureRoutes();
  // const nextRoute = useCalculateNextRoute();

  try {
    const Component = Components[route.component];
    const handleNextClick = () => dispatch({ type: NEXT });
    const disableNextButton = Boolean(route.changeIsRequired && !updated);
    const { terminal } = route;
    return (
      <Flex>
        <Card header={route.title}>
          <Box
            marginTop={3}
            bg="layoutBackground"
            sx={{
              width: "75%",
              border: "1px solid #e3e3e5",
              borderRadius: "12px"
            }}
          >
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
                marginBottom={terminal ? 4 : undefined}
              >
                <Component route={route} />
              </Box>
              {!terminal && (
                <Box
                  width={[1 / 6]}
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
