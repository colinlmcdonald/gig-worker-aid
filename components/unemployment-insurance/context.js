import { createContext, useContext } from "react";

export const UnemploymentInsuranceStateContext = createContext();
export const UnemploymentInsuranceDispatchContext = createContext();
export const useUnemploymentInsuranceStateContext = () =>
  useContext(UnemploymentInsuranceStateContext);
export const useUnemploymentInsuranceDispatchContext = () =>
  useContext(UnemploymentInsuranceDispatchContext);
