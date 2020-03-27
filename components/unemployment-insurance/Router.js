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
    console.log(Components);
    console.log(route);
    const Component = Components[route.component];
    const handleNextClick = () => dispatch({ type: NEXT });
    return (
      <Flex>
        <Card header={route.description}>
          <Box marginTop={3} sx={{ width: "100%" }}>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Component />
              <Box
                margin={4}
                // sx={{ justifySelf: "flex-end", alignSelf: "flex-end" }}
              >
                <Button
                  sx={{ ":focus": { outline: "none" } }}
                  onClick={handleNextClick}
                  disabled={Boolean(route.changeIsRequired && !updated)}
                >
                  Next
                </Button>
              </Box>
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
