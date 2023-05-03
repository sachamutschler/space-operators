import React, {useEffect, useState} from "react";
import {ImageBackground} from "react-native";
import OrangeButton from "../../components/buttons/OrangeButton";
import {useNavigate} from "react-router-native";
import GameId from "../../components/texts/GameId";
import Username from "../../components/texts/Username";
import GreenButton from "../../components/buttons/GreenButton";
import StartButton from "../../components/buttons/StartButton";
import {OpacityContainerStyle, RawContainerStyle} from "./style";
import GlobalContainer from "../../components/Containers/GlobalContainer";
import store from "../../redux/CreateGames/store";
import {Provider, useSelector, useDispatch} from "react-redux";
import {Player} from "../../models/Player";
import { setWebSocket, setGamePlayers } from "../../redux/CreateGames/gameSlice";
import SoundEffect from "../../components/audio/soundEffects";

const Lobby = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // We import data from store:
    const gameId = useSelector((state: any) => state.game.gameId); 
    const userId = useSelector((state: any) => state.game.userId);
    const userNameStored = useSelector((state: any) => state.game.userName);
    const isCreator = useSelector((state: any) => state.game.isCreator);
    const ws = new WebSocket("wss://space-operators.herokuapp.com/");

    // We define the states:
    const [playersList, setPlayersList] = useState<Player[]>([]);
    const [playersAreReady, setPlayersAreReady] = useState(false);
    
    useEffect(() => {
        dispatch(setWebSocket(ws));
        ws.onopen = () => {
            ws.send(JSON.stringify({
                "type": "connect",
                "data": {
                    "gameId": gameId,
                    "playerId": userId,
                    "playerName": userNameStored
                }
            }));
        }
        console.log("Connected to the game '" + gameId + "' as '" + userNameStored + "' with user id '" + userId + "'");
    }, []);
    
    // We use useEffect for we want to send "connect" to the server once:
    useEffect(() => {
        dispatch(setWebSocket(ws));
        ws.onopen = () => {
            ws.send(JSON.stringify({
                "type": "connect",
                "data": {
                    "gameId": gameId,
                    "playerId": userId,
                    "playerName": userNameStored
                }
            }));
        }
        console.log("Connected to the game '" + gameId + "' as '" + userNameStored + "' with user id '" + userId + "'");
    }, []);

    useEffect(() => {
        // We store players list for later update (history)
        dispatch(setGamePlayers(playersList));
        setPlayersAreReady(true);
        // We set a global ready status by navigating through player array:
        playersList.map((player) => {
           // if the player is not ready set playerNotReady to false:
           if(!player.status)
                setPlayersAreReady(false);
        });
    }, [playersList]);
    
    // Reading data received from server
    ws.onmessage = (e) => {
        if (e.data === "ping") {
            // We ignore ping messages
            return;
        }
        const data = JSON.parse(e.data);
        if (data.type === "start") {  // if server sends "start", navigate to game screen
            console.log("Game " + gameId + " is starting, redirecting to game page");
            navigate('/game');
            return;
        }
        try {  // if server sends player list update list with setPlayersList method
            if ( playersList !== data.data.players) {
                const players = data.data.players;
                setPlayersList(players);
            }
        } catch (err) {
            // handle parsing errors
            console.error("Error parsing message:", err);
        }
    }

    // this functions allows us to start a game by sending start type and gameId to the server
    const HandleStartGame = () => {
        
        // if one player is not ready, do not allow the creator to start the game (other players cannot start the game)
        if(!playersAreReady || !isCreator) {
            console.log("All players must be ready so the game can start.");
            return;
        }

        // otherwise send to the server the instruction that we want the game to start
        SoundEffect(require('../../components/audio/soundEffects/soundBank/button.mp3'));
        ws.send(JSON.stringify({
            "type": "start",
            "data": {
                "gameId": gameId,
            }
        }));
    }

    return (
        <ImageBackground source={require('../../images/onboard_spaceship.png')}
                         resizeMode={'cover'}
                         style={{width: '100%', height: '100%'}}
        >
            <Provider store={store}>
                <GameId />
                <GlobalContainer>
                    <GreenButton text={'Pret'}/>
                    <OpacityContainerStyle>
                        {playersList.map((player, index) => (
                            <RawContainerStyle key={index}>
                                <Username username={ player.name } status={player.status}/>
                            </RawContainerStyle>
                        ))}
                    </OpacityContainerStyle>
                    <StartButton onPress={HandleStartGame} text={'Start'} isCreator = {isCreator} ready= {playersAreReady}/>
                    <OrangeButton text={'Retour'} path={'/'}/>
                </GlobalContainer>
            </Provider>
        </ImageBackground>
    );
}
export default Lobby;