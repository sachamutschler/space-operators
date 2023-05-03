// Datas about players (with ready or not status) 
// to display in a list
export interface Player {
  name: string,
  status: boolean
}
export const Player = (
  name: string,
  status: boolean

): Player => ({
  name,
  status
});