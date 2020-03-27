import {
  NEXT,
  UPDATE_STATE,
  NEXT_ROUTE,
  UPDATE_INCOME_BY_MONTH
} from "./constants";
import routes from "./routes";

export const initialState = {
  route: routes.slice(0, 1)[0],
  routes: routes.slice(1, routes.length),
  previousRoutes: []
};

export default function reducer(state, action) {
  const { type, payload } = action;
  console.log(type, payload);
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
        route: state.routes.slice(0, 1)[0],
        routes: state.routes.slice(1, state.routes.length),
        previousRoutes: [...state.previousRoutes, state.route]
      };

    case NEXT_ROUTE:
      return {
        ...state,
        routes: [payload, ...state.routes]
      };

    case UPDATE_INCOME_BY_MONTH:
      return {
        ...state,
        incomeByMonth: {
          ...state.incomeByMonth,
          ...payload
        }
      };
  }
}
