import { Player } from './Player';

// Will be sent to each player when a new player is connecting or
// when one of the players changes his status (before the starting of the game)
export interface PlayersListUpdate {
  players: Player[]
}
const PlayersListUpdate = (
  players: Player[]

): PlayersListUpdate => ({
  players
});