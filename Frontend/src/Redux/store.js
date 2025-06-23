import { createStore } from "redux";
import rootreducers from "./main.js";

const store = createStore(
    rootreducers
);

export default store;
