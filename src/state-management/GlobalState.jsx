import React, { useReducer, createContext, useContext } from "react";
import {
  checkLocationExistence,
  isSameLocation,
  turn2DArray,
} from "../utils/Common";
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
const defaultGameVersion = "manual";
const defaultWinState = false;
const defaultPencilBoxes = new Map();

const defaultSudokuState = {
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
};

const defaultPencilState = {
  usePencil: defaultUsePencil,
  undoAllMarkings: false,
  pencilBoxes: defaultPencilBoxes,
};

const defaultGameVersionState = {
  version: defaultGameVersion,
  hasWon: defaultWinState,
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
  SET_PENCIL_BOXES: "SET_PENCIL_BOXES",
  CLEAR_PENCIL_BOXES: "CLEAR_PENCIL_BOXES",
  SET_UNDO_MARKINGS: "SET_UNDO_MARKINGS",
  SET_GAME_VERSION: "SET_GAME_VERSION",
  SET_HAS_WON: "SET_HAS_WON",
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
    case ACTIONS.CLEAR_PENCIL_BOXES:
      return {
        ...state,
        pencilBoxes: new Map(),
      };
    case ACTIONS.SET_PENCIL_BOXES:
      const { location, etching } = action.payload;

      if (checkLocationExistence(location) && etching) {
        //temp hold for pencil boxes
        const updatedPencilBoxes = new Map(state.pencilBoxes);
        const locationKey = JSON.stringify(location);

        if (state.pencilBoxes.has(locationKey)) {
          //immutable run
          let existingArray = [...updatedPencilBoxes.get(locationKey)];
          const etchingArray = [...existingArray];
          const etchingIndex = etchingArray.indexOf(etching);

          if (etchingIndex > -1) {
            etchingArray.splice(etchingIndex, 1);
          } else {
            etchingArray.push(etching);
          }
          updatedPencilBoxes.set(locationKey, etchingArray);
        } else {
          updatedPencilBoxes.set(locationKey, [etching]);
        }

        return {
          ...state,
          pencilBoxes: updatedPencilBoxes,
        };
      }

      return {
        ...state,
        pencilBoxes: action.payload,
      };
  }
};

const gameVersionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_GAME_VERSION:
      return {
        ...state,
        version: action.payload ?? defaultGameVersion.version,
      };
    case ACTIONS.SET_HAS_WON:
      return {
        ...state,
        hasWon: action.payload ?? defaultGameVersion.hasWon,
      };
    default:
      return state;
  }
};

const SudokuContext = createContext();
const PencilContext = createContext();
const gameVersionContext = createContext();

export const SudokuProvider = ({ children }) => {
  const [sudokuState, sudokuDispatch] = useReducer(
    sudokuReducer,
    defaultSudokuState
  );
  const [pencilState, pencilDispatch] = useReducer(
    pencilReducer,
    defaultPencilState
  );

  const [gameVersionState, gameVersionDispatch] = useReducer(
    gameVersionReducer,
    defaultGameVersionState
  );

  const setDefault = () => {
    sudokuDispatch({
      type: "SET_PUZZLE",
      payload: defaultSudokuState.board,
    });
    sudokuDispatch({
      type: "SET_SOLUTION",
      payload: defaultSudokuState.solution,
    });
    sudokuDispatch({
      type: "SET_PREFILLED",
      payload: defaultSudokuState.prefilled,
    });
    sudokuDispatch({
      type: "SET_DIFFICULTY",
      payload: defaultSudokuState.difficulty,
    });
    sudokuDispatch({ type: "SET_LOADING", payload: false });
    pencilDispatch({ type: "SET_USE_PENCIL", payload: false });
  };

  const startNewGame = async (difficulty) => {
    pencilDispatch({
      type: "SET_UNDO_MARKINGS",
      payload: true,
    });

    pencilDispatch({
      type: "CLEAR_PENCIL_BOXES",
    });

    if (!difficulty) {
      const data = await getRandomGame();
      if (data) {
        sudokuDispatch({
          type: "SET_PUZZLE",
          payload: data.puzzle,
        });
        sudokuDispatch({
          type: "SET_SOLUTION",
          payload: data.solution,
        });
        sudokuDispatch({
          type: "SET_PREFILLED",
          payload: data.puzzle,
        });
        sudokuDispatch({ type: "SET_DIFFICULTY", payload: data.difficulty });
        sudokuDispatch({ type: "SET_LOADING", payload: false });
        pencilDispatch({ type: "SET_USE_PENCIL", payload: false });
        gameVersionDispatch({ type: "SET_GAME_VERSION", payload: "manual" });
        gameVersionDispatch({ type: "SET_HAS_WON", payload: false });
      } else {
        setDefault();
      }
    } else {
      const data = await getGameDifficulty(difficulty);
      if (data) {
        sudokuDispatch({
          type: "SET_PUZZLE",
          payload: data.puzzle,
        });
        sudokuDispatch({
          type: "SET_SOLUTION",
          payload: data.solution,
        });
        sudokuDispatch({
          type: "SET_PREFILLED",
          payload: data.puzzle,
        });
        sudokuDispatch({ type: "SET_DIFFICULTY", payload: data.difficulty });
        sudokuDispatch({ type: "SET_LOADING", payload: false });
        pencilDispatch({ type: "SET_USE_PENCIL", payload: false });
      } else {
        setDefault();
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
        <gameVersionContext.Provider
          value={{
            gameVersionState,
            gameVersionDispatch,
          }}
        >
          {children}
        </gameVersionContext.Provider>
      </PencilContext.Provider>
    </SudokuContext.Provider>
  );
};

export const useSudoku = () => {
  return useContext(SudokuContext);
};

export const usePencil = () => {
  return useContext(PencilContext);
};

export const useGameVersion = () => {
  return useContext(gameVersionContext);
};
