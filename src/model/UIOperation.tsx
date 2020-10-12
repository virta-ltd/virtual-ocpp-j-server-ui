import { ChargePointOperations } from './ChargePointOperations';

export type UIOperation = {
  name: ChargePointOperations;
  requiredInput: boolean;
  editable: boolean;
};
