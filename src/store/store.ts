import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import currencySaga from "./currency/currency.saga";
import { currencySlice } from "./currency/currency.slice";
  
  let sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  
  const store = configureStore({
    reducer: {
        currency: currencySlice.reducer
    },
    middleware
  });

  export type TState = ReturnType<typeof store.getState>
  export type TDispatch = typeof store.dispatch
  
  sagaMiddleware.run(currencySaga);
  
  export default store;


  