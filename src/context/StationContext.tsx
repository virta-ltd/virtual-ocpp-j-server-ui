import React, { createContext, useReducer } from 'react';
import {
  StationContextState,
  StationContextType,
  StationReducerAction,
  Actions,
} from './StationContextTypes';

const initialState: StationContextState = {
  stations: [],
  selectedStation: null,
  error: '',
};

const StationContext = createContext<StationContextType>({
  state: initialState,
  selectStation: () => {},
  getStations: () => {},
});

const reducer = (state: StationContextState, action: StationReducerAction) => {
  switch (action.type) {
    case Actions.SELECT_STATION:
      return { ...state, selectedStation: action.payload.station, error: '' };
    case Actions.GET_STATIONS:
      return { ...state, stations: action.payload.stations, error: '' };
    case Actions.REQUEST_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

const StationProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectStation = async (id: number) => {
    console.log('fetching station info');

    try {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/stations/${id}s`
      );
      const station = await data.json();
      dispatch({
        type: Actions.SELECT_STATION,
        payload: { station },
      });
    } catch (error) {
      dispatch({
        type: Actions.REQUEST_ERROR,
        payload: {
          error: `Error fetching station (id: ${id}) info  (${error.message})`,
        },
      });
    }
  };

  const getStations = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/stations`);
      const stations = await data.json();
      dispatch({
        type: Actions.GET_STATIONS,
        payload: { stations },
      });
    } catch (error) {
      dispatch({
        type: Actions.REQUEST_ERROR,
        payload: { error: `Error fetching all stations (${error.message})` },
      });
    }
  };

  return (
    <StationContext.Provider value={{ state, selectStation, getStations }}>
      {children}
    </StationContext.Provider>
  );
};

export { StationProvider, StationContext };
