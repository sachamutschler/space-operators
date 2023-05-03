// Will be sent each time a player want to connect to a game.
// At server level: allows to identify which connection belongs to each player
export interface Connection {
  gameId: string,
  playerId: string,
  playerName: string
}
export const Connection = (
  gameId: string,
  playerId: string,
  playerName: string

): Connection => ({
  gameId,
  playerId,
  playerName
});