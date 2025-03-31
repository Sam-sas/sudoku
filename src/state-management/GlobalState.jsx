import React, { useReducer, createContext, useContext, useEffect } from "react";
import { turn2DArray } from "../utils/Common";
import { getGameDifficulty, getRandomGame } from "../calls/getGames";

//if there isn't a board available, use this default board/state
const defaultBoard = turn2DArray(
  Array(9)
    .fill()
    .map(() => Array(9).fill(0))
);

const defaultDifficulty = "";
const defaultLoad = false;
const defaultUsePencil = false;

const defaultState = {
  board: defaultBoard,
  solution: defaultBoard,
  selectedCell: {
    outerBoxLocation: null,
    innerBoxLocation: null,
    inputIndex: null,
    value: 0,
  },
  difficulty: defaultDifficulty,
  isLoading: defaultLoad,
  prefilled: defaultBoard,
  usePencil: defaultUsePencil,
};

const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_PUZZLE: "SET_PUZZLE",
  SET_SOLUTION: "SET_SOLUTION",
  SET_PREFILLED: "SET_PREFILLED",
  SET_DIFFICULTY: "SET_DIFFICULTY",
  SELECT_CELL: "SELECT_CELL",
  UPDATE_CELL: "UPDATE_CELL",
  RESET_BOARD: "RESET_BOARD",
  SET_USE_PENCIL: "SET_USE_PENCIL",
};

const sudokuReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload ?? defaultState.isLoading };
    case ACTIONS.SET_PUZZLE:
      return {
        ...state,
        board: action.payload ?? defaultState.board,
      };
    case ACTIONS.SET_SOLUTION:
      return {
        ...state,
        solution: action.payload ?? defaultState.board,
      };
    case ACTIONS.SET_PREFILLED:
      return {
        ...state,
        prefilled: action.payload ?? defaultState.board,
      };
    case ACTIONS.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload ?? defaultState.difficulty,
      };
    case ACTIONS.SELECT_CELL:
      return {
        ...state,
        selectedCell: action.payload ?? defaultState.selectedCell,
      };
    case ACTIONS.UPDATE_CELL:
      const { row, column, inputIndex, value } = action.payload;
      const updatedBoard = state.board.map((row) =>
        row.map((cell) => [...cell])
      );
      updatedBoard[row][column][inputIndex] = value;
      return {
        ...state,
        board: updatedBoard,
      };
    case ACTIONS.SET_USE_PENCIL:
      console.log("hi")
      return { ...state, usePencil: action.payload ?? defaultState.usePencil };
    default:
      return state;
  }
};

const SudokuContext = createContext();

export const SudokuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sudokuReducer, defaultState);

  const startNewGame = async (difficulty) => {
    if (!difficulty) {
      const data = await getRandomGame();
      if (data) {
        dispatch({ type: "SET_PUZZLE", payload: turn2DArray(data.puzzle) });
        dispatch({ type: "SET_SOLUTION", payload: turn2DArray(data.solution) });
        dispatch({ type: "SET_PREFILLED", payload: turn2DArray(data.puzzle) });
        dispatch({ type: "SET_DIFFICULTY", payload: data.difficulty });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_USE_PENCIL", payload: false });
      }
    } else {
      const data = await getGameDifficulty(difficulty);
      if (data) {
        dispatch({ type: "SET_PUZZLE", payload: turn2DArray(data.puzzle) });
        dispatch({ type: "SET_SOLUTION", payload: turn2DArray(data.solution) });
        dispatch({ type: "SET_PREFILLED", payload: turn2DArray(data.puzzle) });
        dispatch({ type: "SET_DIFFICULTY", payload: data.difficulty });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_USE_PENCIL", payload: false });
      }
    }
  };

  return (
    <SudokuContext.Provider value={{ state, dispatch, startNewGame }}>
      {children}
    </SudokuContext.Provider>
  );
};

// Custom hook for easy access
export const useSudoku = () => {
  return useContext(SudokuContext);
};
