// Expected result for the buttons:
export interface GameElements {
    id: number,
    type: string,
    value: string,
    valueType: string
}
export const GameElements = (
    id: number,
    type: string,
    value: string,
    valueType: string

): GameElements => ({
    id,
    type,
    value,
    valueType
});