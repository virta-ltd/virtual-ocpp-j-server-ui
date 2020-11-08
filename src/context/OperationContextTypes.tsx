import { ChargePointOperations } from '../model/ChargePointOperations';

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
      payload: { error: string; responsePayload: any };
    };
