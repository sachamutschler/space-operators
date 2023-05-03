import React from "react";
import axios from 'axios';

interface UserId {
    id: string;
}

const JOIN_API_URL = 'https://space-operators.herokuapp.com/ready/';

const setUserState = async (id: string): Promise<boolean> => {
    try {
        const response = await axios.post<UserId>(
            JOIN_API_URL + id,
            {},
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("Status set to ready for player with user id '" + id + "'");
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default setUserState;