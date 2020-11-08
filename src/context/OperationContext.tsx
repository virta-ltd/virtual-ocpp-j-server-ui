import React, { createContext, Reducer, useReducer, useRef } from 'react';
import { ChargePointOperations } from '../model/ChargePointOperations';
import {
  Actions,
  OperationContextState,
  OperationContextType,
  OperationReducerAction,
} from './OperationContextTypes';

const initialState: OperationContextState = {
  requestPayload: {},
  responsePayload: {},
  operation: ChargePointOperations.Unknown,
  error: '',
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
        responsePayload: { status: 'Error requesting operation' },
      },
    });
  };

  const setCurrentOperation = (operation: ChargePointOperations) => {
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

    const url = `${
      process.env.REACT_APP_SERVER_URL
    }/stations/${stationId}/operations/${operation.toLowerCase()}`;

    dispatch({
      type: Actions.SEND_OPERATION_REQUEST,
      payload: { responsePayload: { status: 'pending' } },
    });

    const payload = {
      ...requestPayload,
    };

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!data.ok) {
      console.log('Error sending operation request');
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
      return { ...state, operation: action.payload.operation, error: '' };
    case Actions.SET_REQUEST_PAYLOAD:
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
      return {
        ...state,
        error: action.payload.error,
        responsePayload: action.payload.responsePayload,
      };
    default:
      return state;
  }
};

export { OperationContextProvider, OperationContext };
