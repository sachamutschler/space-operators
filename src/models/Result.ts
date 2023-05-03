import { GameElements } from './GameElements';

// Expected final operation result:
export interface Result {
  buttons: GameElements,
  switchs: number[],
  links: number[][]
}
export const Result = (
  buttons: GameElements,
  switchs: number[],
  links: number[][]

): Result => ({
  buttons,
  switchs,
  links
});