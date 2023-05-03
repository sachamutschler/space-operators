import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import  OrangeButton from "../../components/buttons/OrangeButton";
import PrimaryTitle from "../../components/titles/PrimaryTitle";
import { HistoryContainer, HistoryLine, NumberOfRounds, Players } from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Game } from "../../models/Game";
import { Player } from "../../models/Player";

const History = () => {
    const [games, setGames] = useState<Game[]>([]);
    
    //function that retrieves recorded games:
    const fetchGames = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const datas = await AsyncStorage.multiGet(keys);

            //we build a list of 'Game' class:
            let games: Game[] | undefined;
            games = datas
            .filter(([key]) => key.startsWith ("2023")) // we want games from year 2023
            .map(([key, value]) => {
                if (value !== null) {
                const gameData = JSON.parse(value);
                const date = new Date(key);
                const rounds = gameData.rounds;
                const players: Player[] = JSON.parse(gameData.players);
                if (date && rounds && players) {
                    return {
                    date,
                    rounds,
                    players,
                    };
                }
                }
            })
        
            .filter((game): game is Game => game !== undefined) // This is a type guard function
            .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date to have the most recent games first
            console.log(games);
            return games;
        } catch (error) {
            console.log("Error retrieving game data: ", error);
            throw error;
        }
    };
  
    useEffect(() => {
        // resolve the promise before updating the state
        const promise = fetchGames();
        promise.then((result) => setGames(result));
    }, []);

    return (
            <ImageBackground source={require('../../images/history.png')}
                            resizeMode={'cover'}
                            style={{width: '100%', height: '100%'}}
            >
                <PrimaryTitle title={'Historique'} />
                <HistoryContainer>
                    {games.map((game : any, index: any) => (
                        <HistoryLine key={index}>
                            <NumberOfRounds>{game.rounds} Rounds</NumberOfRounds>
                            {game.players.map((player: any, playerIndex: any) => (
                                <Players key={playerIndex}>{player.name}</Players>
                            ))}
                        </HistoryLine>
                    ))}
                </HistoryContainer>
                <OrangeButton text={'Retour'} path={'/'}/>
            </ImageBackground>
        );  
}
export default History;