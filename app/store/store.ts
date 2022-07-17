import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import gameSettingsReducer from "./reducers/gameSettingsSlice";

const appStore = configureStore({
  reducer: {
    appSettings: gameSettingsReducer,
  },
});

export default appStore;

export type RootState = ReturnType<typeof appStore.getState>;
export type DispatchApp = typeof appStore.dispatch;
