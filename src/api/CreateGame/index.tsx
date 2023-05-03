import React from "react";
import axios from 'axios';

interface GameResponse {
    id: string;
}

const CREATE_GAME_API_URL = 'https://space-operators.herokuapp.com/create-game';

const createGame = async (): Promise<string> => {
    try {
        const response = await axios.post<GameResponse>(
            CREATE_GAME_API_URL,
            {},
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.id;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default createGame;