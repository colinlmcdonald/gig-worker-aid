import { mergeDeepRight } from "ramda";
import {
  NEXT,
  UPDATE_STATE,
  NEXT_ROUTE,
  UPDATE_INCOME_BY_MONTH,
  INVALIDATE_UPDATE,
  RESET_FOR_ALTERNATIVE_PERIOD,
  GO_BACK,
  QUALIFIED
} from "./constants";
import routes from "./routes";

export const initialState = {
  route: routes.slice(0, 1)[0],
  nextRoute: {},
  previousRoutes: [],
  incomeByYearAndMonth: {}
};

export default function reducer(state, action) {
  const { type, payload } = action;
  console.info(type, payload);
  switch (type) {
    case UPDATE_STATE:
      return {
        ...state,
        ...payload,
        updated: true
      };

    case NEXT:
      return {
        ...state,
        updated: false,
        route: state.nextRoute,
        previousRoutes: [...state.previousRoutes, state.route]
      };

    case NEXT_ROUTE:
      return {
        ...state,
        nextRoute: payload
      };

    case GO_BACK:
      return {
        ...state,
        route: state.nextRoute,
        previousRoutes: payload,
        updated: true
      };

    case UPDATE_INCOME_BY_MONTH:
      return {
        ...state,
        incomeByYearAndMonth: mergeDeepRight(
          state.incomeByYearAndMonth,
          payload
        )
      };

    case INVALIDATE_UPDATE:
      return {
        ...state,
        updated: false
      };

    case QUALIFIED:
      return {
        ...state,
        qualifiedForUI: true
      };

    case RESET_FOR_ALTERNATIVE_PERIOD:
      const removeFirstQuarter = Object.keys(state.incomeByYearAndMonth).reduce(
        (acc, year) => {
          return {
            [year]: Object.entries(state.incomeByYearAndMonth[year]).reduce(
              (acc, [key, value]) => {
                if (key !== "jan" && key !== "feb" && key !== "mar") {
                  acc[key] = value;
                }
                return acc;
              },
              {}
            )
          };
        },
        {}
      );
      return {
        ...state,
        incomeByYearAndMonth: removeFirstQuarter
      };
  }
}
