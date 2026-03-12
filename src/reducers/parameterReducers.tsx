type ParameterState = {
  genre: string;
  instruments: string[];
  key: string;
  tempo: string;
};
// interface cleartype {
//   genre: string;
//   instruments: string[];
//   key: string;
//   tempo: string;
// }
const initialState: ParameterState = {
  genre: "",
  instruments: [],
  key: "",
  tempo: "",
};
type ParameterAction =
  | { type: "SET_GENRE"; payload: string }
  | { type: "SET_INSTRUMENTS"; payload: string[] }
  | { type: "SET_TEMPO"; payload: string }
  | { type: "SET_KEY"; payload: string }
  | { type: "CLEAR_PARAMETER" };
export const parameterReducers = (
  state: ParameterState,
  action: ParameterAction
): ParameterState => {
  switch (action.type) {
    case "SET_GENRE":
      return { ...state, genre: action.payload };
    case "SET_INSTRUMENTS":
      return { ...state, instruments: action.payload };
    case "SET_TEMPO":
      return { ...state, tempo: action.payload };
    case "SET_KEY":
      return { ...state, key: action.payload };

    case "CLEAR_PARAMETER":
      return initialState;

    default:
      return state;
  }
};
