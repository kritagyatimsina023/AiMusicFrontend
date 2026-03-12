"use client";
import { parameterReducers } from "../reducers/parameterReducers";
import { useContext, createContext, useReducer } from "react";
import type { ReactNode } from "react";

interface ParameterState {
  genre: string;
  instruments: string[];
  key: string;
  tempo: string;
}

interface ParameterContextType extends ParameterState {
  setGenre: (value: string) => void;
  setInstruments: (value: string[]) => void;
  setKey: (value: string) => void;
  setTempo: (value: string) => void;
  clearParameter: () => void;
}

const initialState: ParameterState = {
  genre: "",
  instruments: [],
  key: "",
  tempo: "",
};

const ParameterContext = createContext<ParameterContextType>({
  ...initialState,
  setGenre: () => {},
  setInstruments: () => {},
  setKey: () => {},
  setTempo: () => {},
  clearParameter: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const ParameterProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(parameterReducers, initialState);

  function setGenre(value: string) {
    dispatch({ type: "SET_GENRE", payload: value });
  }
  function setInstruments(value: string[]) {
    dispatch({ type: "SET_INSTRUMENTS", payload: value });
  }
  function setKey(value: string) {
    dispatch({ type: "SET_KEY", payload: value });
  }
  function setTempo(value: string) {
    dispatch({ type: "SET_TEMPO", payload: value });
  }
  function clearParameter() {
    dispatch({ type: "CLEAR_PARAMETER" });
  }

  const value: ParameterContextType = {
    ...state,
    setGenre,
    setInstruments,
    setKey,
    setTempo,
    clearParameter,
  };

  return (
    <ParameterContext.Provider value={value}>
      {children}
    </ParameterContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useParameter = () => {
  const context = useContext(ParameterContext);
  return context;
};
