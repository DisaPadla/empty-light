import { createStore, applyMiddleware, compose } from "redux";
import "regenerator-runtime/runtime";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "../reducers/root";
import { rootSaga } from "../sagas/root";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)(createStore);

export const configureStore = function(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(optionalReducer, () => {
      store.replaceReducer(optionalReducer);
    });
  }

  return store;
};
