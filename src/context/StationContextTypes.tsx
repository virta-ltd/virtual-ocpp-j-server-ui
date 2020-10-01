import { Station } from '../model/Station';

export type StationContextType = {
  state: StationContextState;
  selectStation: (id: number) => void;
  getStations: () => void;
};

export enum Actions {
  SELECT_STATION = 'select_station',
  GET_STATIONS = 'get_stations',
  REQUEST_ERROR = 'request_error',
}

export type StationReducerAction =
  | {
      type: Actions.SELECT_STATION;
      payload: { station: Station };
    }
  | {
      type: Actions.GET_STATIONS;
      payload: { stations: Station[] };
    }
  | {
      type: Actions.REQUEST_ERROR;
      payload: { error: string };
    };

export type StationContextState = {
  stations: Station[];
  selectedStation: Station | null;
  error: string;
};
