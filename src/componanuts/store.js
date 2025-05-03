import { createStore } from "redux";
import rootreducers from "./main";

const store = createStore(
    rootreducers
);

export default store;
