import React, { useReducer, useEffect } from "react";
import App from "../components/App";
import reducer, {
  initialState
} from "../components/unemployment-insurance/reducer";
import {
  UnemploymentInsuranceDispatchContext,
  UnemploymentInsuranceStateContext
} from "../components/unemployment-insurance/context";
import Router from "../components/unemployment-insurance/Router";
import {
  NEXT,
  NEXT_ROUTE
} from "../components/unemployment-insurance/constants";
import { findNextRoute } from "../components/unemployment-insurance/utils/findNextRoute";

/* 
1. Can you expect to qualify?
    1. This would need to be more in depth for self-employed / gig workers
    2. Base period
        1. Enter previous 4 quarters, skipping the most recently completed one
        2. Do you meet the minimum qualifications?
    3. Alternate period
        1. Please enter this quarters income
        2. Does that meet the minimum qualifications?
*/

/* 
1. Choose state
2. Salaried Employee; Self-Employed; Both
3. Salaried Employee
  a. Enter salary
*/

// have an array with the flow and each call to next moves to the next state in the flow
// have all of the different sub-views that are a part of the flow live in a folder in components
// have a mapping of states to component trees, i.e. /select-state render(</SelectState >)
// each component checks the useUnemploymentInsuranceState()

const UnemploymentInsurance = ({
  url: {
    query: { href }
  }
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (href) {
      const nextRoute = findNextRoute(`/${href}`);
      dispatch({ type: NEXT_ROUTE, payload: nextRoute });
      dispatch({ type: NEXT });
    }
  }, [href]);
  return (
    <App>
      <UnemploymentInsuranceDispatchContext.Provider value={dispatch}>
        <UnemploymentInsuranceStateContext.Provider value={state}>
          <Router />
        </UnemploymentInsuranceStateContext.Provider>
      </UnemploymentInsuranceDispatchContext.Provider>
    </App>
  );
};

export default UnemploymentInsurance;
