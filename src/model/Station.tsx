export interface Station {
  id: number;
  identity: string;
  centralSystemUrl: string;
  meterValue: number;
  chargeInProgress: boolean;
  currentTransactionId: number;
  currentChargingPower: number;
}
