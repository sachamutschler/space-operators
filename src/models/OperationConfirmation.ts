// Will be sent once the operation is realized, or once time is out:
export interface OperationConfirmation {
  success: boolean,
  operator: string
}
export const OperationConfirmation = (
  success: boolean,
  operator: string

): OperationConfirmation => ({
  success,
  operator
});