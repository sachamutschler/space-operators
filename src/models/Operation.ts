import { Result } from './Result';
import { Element } from './Element';

// Will be sent to each player at every new single turn:
export interface Operation {
  turn: number,
  role: string,
  id: string,
  duration: number,
  description: string,
  elements: Element[],
  result: Result
}
export const Operation = (
  turn: number,
  role: string,
  id: string,
  duration: number,
  description: string,
  elements: Element[],
  result: Result

): Operation => ({
  turn,
  role,
  id,
  duration,
  description,
  elements,
  result
});
  
  