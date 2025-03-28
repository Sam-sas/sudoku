import React, { useReducer, createContext, useContext } from "react";
import { turn2DArray } from "../utils/Common";

//if there isn't a board available, use this default board/state
const defaultBoard = turn2DArray(
  Array(9)
    .fill()
    .map(() => Array(9).fill(0))
);
const defaultSolution = defaultBoard;
const defaultDifficulty = "";
const defaultLoad = false;

const defaultState = {
  board: defaultBoard,
  solution: defaultSolution,
  selectedCell: {
    outerBoxLocation: null,
    innerBoxLocation: null,
    inputIndex: null,
    value: 0,
  },
  difficulty: defaultDifficulty,
  isLoading: defaultLoad,
  prefilled: defaultBoard,
};

const ACTIONS = {
  SETUP_BOARD: "SETUP_BOARD",
  SELECT_DIFFICULTY: "SELECT_DIFFICULTY",
  UPDATE_CELL: "UPDATE_CELL",
  SELECT_CELL: "SELECT_CELL",
  RESET_BOARD: "RESET_BOARD",
  SET_LOADING: "SET_LOADING",
};

const sudokuReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload ?? defaultState.isLoading };
    case ACTIONS.SETUP_BOARD:
      return {
        ...state,
        board: action.payload ?? defaultState.board,
      };
    case ACTIONS.SELECT_DIFFICULTY:
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
      const updatedBoard = [...state.board];

      updatedBoard[row][column][inputIndex] = value;
      return {
        ...state,
        board: updatedBoard,
      };
    default:
      return state;
  }
};

const SudokuContext = createContext();

export const SudokuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sudokuReducer, defaultState);

  const startNewGame = (difficulty) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SELECT_DIFFICULTY, payload: difficulty });
    dispatch({ type: ACTIONS.SETUP_BOARD, payload: defaultState.board });
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
