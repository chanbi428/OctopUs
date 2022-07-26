import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { Provider } from "react-redux";
// import { applyMiddleware, createStore } from "redux";
// import promiseMiddleware from "redux-promise";
// import reduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

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
        store={createStoreWithMiddleware(
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      > */}
      <App />
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
