import { combineReducers } from "redux";
import todoreducers from "./Reducer.js";

const rootreducers = combineReducers(
{  a:  todoreducers}
);

export default rootreducers;
 