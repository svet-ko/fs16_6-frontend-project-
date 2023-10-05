import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";
import { PersistConfig } from "redux-persist/lib/types";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import productReducer from "../redux/slices/productsSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import cartReducer from "./slices/cartSlice";

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['cartReducer']
};

const rootReducer = combineReducers({
  productReducer,
  //usersReducer,
  cartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

const store = createStore();

export type AppState = ReturnType<typeof rootReducer>; //export to let react-redux library knowlege of the type of the store
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

setupListeners(store.dispatch);

export default store;