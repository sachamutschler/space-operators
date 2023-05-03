// List of element to display to the operator,
// allows the realization of the instruction:
export interface Element {
  type: string,
  id: string,
  valueType: string,
  value: string
}
export const Element = (
  type: string,
  id: string,
  valueType: string,
  value: string

): Element => ({
  type,
  id,
  valueType,
  value
});