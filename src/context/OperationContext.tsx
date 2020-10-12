import React, { createContext, Reducer, useReducer, useRef } from 'react';
import { ChargePointOperations } from '../model/ChargePointOperations';

const initialState: OperationContextState = {
  requestPayload: {},
  responsePayload: {},
  operation: ChargePointOperations.Unknown,
  error: '',
};

export type OperationContextState = {
  requestPayload: any;
  responsePayload: any;
  operation: ChargePointOperations;
  error: string;
};

export enum Actions {
  SET_CURRENT_OPERATION = 'set_current_operation',
  SET_REQUEST_PAYLOAD = 'set_request_payload',
  SEND_OPERATION_REQUEST = 'send_operation_request',
  REQUEST_ERROR = 'request_error',
}

export type OperationContextType = {
  state: OperationContextState;
  setCurrentOperation: (operation: ChargePointOperations) => void;
  setRequestPayload: (payload: any) => void;
  sendOperationRequest: (stationId: number) => Promise<any>;
};

const OperationContext = createContext<OperationContextType>({
  state: initialState,
  setCurrentOperation: () => {},
  setRequestPayload: (payload: any) => {},
  sendOperationRequest: (stationId: number) => Promise.resolve(undefined),
});

const OperationContextProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const operationRef = useRef(state.operation);

  const dispatchRequestError = (message: string) => {
    dispatch({
      type: Actions.REQUEST_ERROR,
      payload: {
        error: message,
      },
    });
  };

  const setCurrentOperation = (operation: ChargePointOperations) => {
    console.log('setting operation');
    operationRef.current = operation;
    dispatch({
      type: Actions.SET_CURRENT_OPERATION,
      payload: {
        operation,
      },
    });
  };

  const setRequestPayload = (requestPayload: any) => {
    dispatch({
      type: Actions.SET_REQUEST_PAYLOAD,
      payload: {
        requestPayload,
      },
    });
  };

  const sendOperationRequest = async (stationId: number) => {
    const { requestPayload } = state;

    // using operation from state here will not work well
    // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    // https://stackoverflow.com/questions/55477345/unable-to-read-state-updated-by-usereducer-hook-in-context-provider
    // https://stackoverflow.com/questions/59145023/react-context-state-value-not-updated-in-consumer
    const operation = operationRef.current;
    console.log(operation);
    console.log('operation from ref', operationRef);
    const url = `${
      process.env.REACT_APP_SERVER_URL
    }/station/operations/${operation.toLowerCase()}`;
    console.log(requestPayload);

    dispatch({
      type: Actions.SEND_OPERATION_REQUEST,
      payload: { responsePayload: { status: 'pending' } },
    });

    const payload = {
      ...requestPayload,
      stationId: stationId,
    };

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!data.ok) {
      return dispatchRequestError(
        `Error sending request for operation ${operation}: (${data.statusText})`
      );
    }
    const response = await data.json();

    dispatch({
      type: Actions.SEND_OPERATION_REQUEST,
      payload: { responsePayload: response },
    });

    return response;
  };

  return (
    <OperationContext.Provider
      value={{
        state,
        setCurrentOperation,
        setRequestPayload,
        sendOperationRequest,
      }}
    >
      {children}
    </OperationContext.Provider>
  );
};

const reducer: Reducer<OperationContextState, OperationReducerAction> = (
  state: OperationContextState,
  action: OperationReducerAction
) => {
  switch (action.type) {
    case Actions.SET_CURRENT_OPERATION:
      console.log(action.payload.operation);
      return { ...state, operation: action.payload.operation, error: '' };
    case Actions.SET_REQUEST_PAYLOAD:
      console.log('here', action.payload.requestPayload);
      return {
        ...state,
        requestPayload: action.payload.requestPayload,
        error: '',
      };
    case Actions.SEND_OPERATION_REQUEST:
      return {
        ...state,
        responsePayload: action.payload.responsePayload,
        error: '',
      };
    case Actions.REQUEST_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export type OperationReducerAction =
  | {
      type: Actions.SET_CURRENT_OPERATION;
      payload: { operation: ChargePointOperations };
    }
  | {
      type: Actions.SEND_OPERATION_REQUEST;
      payload: { responsePayload: any };
    }
  | {
      type: Actions.SET_REQUEST_PAYLOAD;
      payload: { requestPayload: any };
    }
  | {
      type: Actions.REQUEST_ERROR;
      payload: { error: string };
    };

export { OperationContextProvider, OperationContext };
