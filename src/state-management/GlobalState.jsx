import React, { useReducer, createContext, useContext } from "react";

//if there isn't a board available, use this default board/state
const defaultBoard = Array(9).fill().map(() => Array(9).fill(0));

const defaultState = {
    board: defaultBoard,
    selectedCell: {
        outerBoxLocation: null,
        innerBoxLocation: null,
    }
}

const ACTIONS = {
    SETUP_BOARD: "SETUP_BOARD",
    UPDATE_CELL: "UPDATE_CELL",
    SELECT_CELL: "SELECT_CELL",
    RESET_BOARD: "RESET_BOARD",
};

const sudokuReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SETUP_BOARD:
            return {...state, board: action.payload }
        default:
            return state;
    }
}

const SudokuContext = createContext();

export const  SudokuProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sudokuReducer, defaultState);
  
    return (
      <SudokuContext.Provider value={{ state, dispatch }}>
        {children}
      </SudokuContext.Provider>
    );
  }
  
  // Custom hook for easy access
  export const useSudoku = () => {
    return useContext(SudokuContext);
  }
  