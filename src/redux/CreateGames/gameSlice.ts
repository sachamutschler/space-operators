import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../models/Player';

interface GameState {
    gameId: string;
    userId: string;
    userName: string;
    webSocket: WebSocket | null | undefined;
    roundsPlayed: number;
    gamePlayers: Player[];
    isCreator: boolean;
    isGameMusicOn: boolean;
}

const initialState: GameState = {
    gameId: '',
    userId: '',
    userName: 'Username',
    webSocket: null,
    roundsPlayed: 0,
    gamePlayers: [],
    isCreator: false,
    isGameMusicOn: false,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameId: (state, action: PayloadAction<string>) => {
            state.gameId = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },
        setWebSocket: (state, action: PayloadAction<WebSocket>) => {
            state.webSocket = action.payload;
        },
        setRoundsPlayed: (state, action: PayloadAction<number>) => {
            state.roundsPlayed= action.payload;
        },
        setGamePlayers: (state, action: PayloadAction<Player[]>) => {
            state.gamePlayers= action.payload;
        },
        setIsCreator: (state, action: PayloadAction<boolean>) => {
            state.isCreator = action.payload;
        },
        setGameMusicOn: (state, action: PayloadAction<boolean>) => {
            state.isGameMusicOn = action.payload;
        },
    }
});

export const { setGameId, setUserId , setUserName, setWebSocket, setRoundsPlayed, setGamePlayers, setIsCreator, setGameMusicOn } = gameSlice.actions;
export default gameSlice.reducer;
