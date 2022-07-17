import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, DispatchApp } from "../store";

export const useDispatchApp: () => DispatchApp = useDispatch;
export const useRootState: TypedUseSelectorHook<RootState> = useSelector;
