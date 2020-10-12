import React, { createContext, useReducer } from 'react';
import { Station } from '../model/Station';
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
  getStations: () => Promise.resolve([]),
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

const StationContextProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchRequestError = (message: string) => {
    dispatch({
      type: Actions.REQUEST_ERROR,
      payload: {
        error: message,
      },
    });
  };

  const selectStation = async (id: number) => {
    console.log('fetching station info');

    try {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/stations/${id}`
      );

      if (!data.ok) {
        return dispatchRequestError(
          `Error fetching station (id: ${id}) info (${data.statusText})`
        );
      }

      const station = await data.json();
      dispatch({
        type: Actions.SELECT_STATION,
        payload: { station },
      });
    } catch (error) {
      dispatchRequestError(
        `Error fetching station (id: ${id}) info  (${error.message})`
      );
    }
  };

  const getStations = async (): Promise<Station[]> => {
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/stations`);

      if (!data.ok) {
        dispatchRequestError(
          `Error fetching all stations (${data.statusText})`
        );
        return [];
      }

      const stations = await data.json();

      dispatch({
        type: Actions.GET_STATIONS,
        payload: { stations },
      });

      return stations;
    } catch (error) {
      dispatchRequestError(`Error fetching all stations (${error.message})`);
      return [];
    }
  };

  return (
    <StationContext.Provider value={{ state, selectStation, getStations }}>
      {children}
    </StationContext.Provider>
  );
};

export { StationContextProvider, StationContext };
