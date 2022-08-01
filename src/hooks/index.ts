import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { useFormatDate } from "./useDate";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { useCurrentWidth } from "./useCurrentWidth";
export  { useCurrentWidth, useFormatDate };
