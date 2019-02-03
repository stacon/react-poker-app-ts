import { createStore } from "redux";
import rootReducer from "./root.reducer";

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() // for debugging
);

export default store;