import { Player } from "./Player";
// Used to save the history of games played on user's device
export interface Game {
  date: Date,
  rounds: number | any | undefined,
  players: Player[] | any
}
export const Game = (
    date: Date,
    rounds: number | any | undefined,
    players: Player[] | any

): Game => ({
  date,
  rounds,
  players
});