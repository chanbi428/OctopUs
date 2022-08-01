import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
// import { createStore } from "redux";
// import promiseMiddleware from "redux-promise";
// import reduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";

// const logger = createLogger();

// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   reduxThunk
// )(createStore);

// const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider
      store={createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
      > */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
