import { createSlice, CreateSliceOptions } from "@reduxjs/toolkit";

interface IGameSettingsState {
  gameTargetNumber: number;
  suggestedNumber: number;
  answers: number[];
  startGame: boolean;
}
const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState: {
    gameTargetNumber: 0,
    suggestedNumber: 0,
    answers: [],
    startGame: false,
  },
  reducers: {
    startGame: (state, action) => {
      state.gameTargetNumber = action.payload;
      state.startGame = true;
    },
    resetGame: (state, action) => {
      state.gameTargetNumber = 0;
    },
    updateSuggestedNumber: (state, action) => {
      state.suggestedNumber = action.payload;
    },
    updateAnswers: (state, action) => {
      state.answers.push(action.payload);
    },
    newGame: (state, action) => {
      state.gameTargetNumber = 0;
      state.suggestedNumber = 0;
      state.answers = [];
      state.startGame = false;
    },
  },
} as CreateSliceOptions<IGameSettingsState>);

export const actions = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
