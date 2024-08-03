import { createStore } from "redux";
import { allReducers } from "./Reducers";
export const reduxStore =createStore(allReducers)