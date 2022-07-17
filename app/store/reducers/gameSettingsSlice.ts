import { createSlice, CreateSliceOptions } from "@reduxjs/toolkit";

interface IGameSettingsState {
  tragetNumber: number;
  startGame: boolean;
}
const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState: {
    tragetNumber: 0,
    startGame: false,
  },
  reducers: {
    startGame: (state, action) => {
      state.tragetNumber = action.payload;
      state.startGame = true;
    },
    resetGame: (state, action) => {
      state.tragetNumber = 0;
    },
  },
} as CreateSliceOptions<IGameSettingsState>);

export const actions = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
