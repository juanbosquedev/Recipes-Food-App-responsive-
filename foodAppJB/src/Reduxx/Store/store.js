// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   reducer: {

//   },
// })
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "../Reducer/Reducer"

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);


export default store;