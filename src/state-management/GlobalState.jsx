import React, { useReducer, createContext, useContext } from "react";
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

const defaultSudokuState = {
  board: defaultBoard,
  solution: defaultBoard,
  selectedCell: {
    outerBoxLocation: null,
    innerBoxLocation: null,
    inputIndex: null,
    value: 0,
    updateOrderNumber: 0,
  },
  difficulty: defaultDifficulty,
  isLoading: defaultLoad,
  prefilled: defaultBoard,
};

const defaultPencilState = {
  usePencil: defaultUsePencil,
  undoAllMarkings: false,
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
  SET_UNDO_MARKINGS: "SET_UNDO_MARKINGS",
};

const sudokuReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload ?? defaultSudokuState.isLoading,
      };
    case ACTIONS.SET_PUZZLE:
      return {
        ...state,
        board: action.payload ?? defaultSudokuState.board,
      };
    case ACTIONS.SET_SOLUTION:
      return {
        ...state,
        solution: action.payload ?? defaultSudokuState.board,
      };
    case ACTIONS.SET_PREFILLED:
      return {
        ...state,
        prefilled: action.payload ?? defaultSudokuState.board,
      };
    case ACTIONS.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload ?? defaultSudokuState.difficulty,
      };
    case ACTIONS.SELECT_CELL:
      return {
        ...state,
        selectedCell: action.payload ?? defaultSudokuState.selectedCell,
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
    default:
      return state;
  }
};

const pencilReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USE_PENCIL:
      return {
        ...state,
        usePencil: action.payload ?? defaultPencilState.usePencil,
      };
    case ACTIONS.SET_UNDO_MARKINGS:
      return {
        ...state,
        undoAllMarkings: action.payload ?? defaultPencilState.undoAllMarkings,
      };
    default:
      return state;
  }
};

const SudokuContext = createContext();
const PencilContext = createContext();

export const SudokuProvider = ({ children }) => {
  const [sudokuState, sudokuDispatch] = useReducer(
    sudokuReducer,
    defaultSudokuState
  );
  const [pencilState, pencilDispatch] = useReducer(
    pencilReducer,
    defaultPencilState
  );

  const startNewGame = async (difficulty) => {
    if (!difficulty) {
      const data = await getRandomGame();
      if (data) {
        sudokuDispatch({
          type: "SET_PUZZLE",
          payload: turn2DArray(data.puzzle),
        });
        sudokuDispatch({
          type: "SET_SOLUTION",
          payload: turn2DArray(data.solution),
        });
        sudokuDispatch({
          type: "SET_PREFILLED",
          payload: turn2DArray(data.puzzle),
        });
        sudokuDispatch({ type: "SET_DIFFICULTY", payload: data.difficulty });
        sudokuDispatch({ type: "SET_LOADING", payload: false });
        pencilDispatch({ type: "SET_USE_PENCIL", payload: false });
      }
    } else {
      const data = await getGameDifficulty(difficulty);
      if (data) {
        sudokuDispatch({
          type: "SET_PUZZLE",
          payload: turn2DArray(data.puzzle),
        });
        sudokuDispatch({
          type: "SET_SOLUTION",
          payload: turn2DArray(data.solution),
        });
        sudokuDispatch({
          type: "SET_PREFILLED",
          payload: turn2DArray(data.puzzle),
        });
        sudokuDispatch({ type: "SET_DIFFICULTY", payload: data.difficulty });
        sudokuDispatch({ type: "SET_LOADING", payload: false });
        pencilDispatch({ type: "SET_USE_PENCIL", payload: false });
      }
    }
  };

  return (
    <SudokuContext.Provider
      value={{
        sudokuState,
        sudokuDispatch,
        startNewGame,
      }}
    >
      <PencilContext.Provider
        value={{
          pencilState,
          pencilDispatch,
        }}
      >
        {children}
      </PencilContext.Provider>
    </SudokuContext.Provider>
  );
};

// Custom hook for easy access
export const useSudoku = () => {
  return useContext(SudokuContext);
};

export const usePencil = () => {
  return useContext(PencilContext);
};
