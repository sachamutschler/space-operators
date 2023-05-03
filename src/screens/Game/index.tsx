import React, { useState, useEffect } from "react";
import {ImageBackground} from "react-native";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "../../redux/CreateGames/store";
import LifeBar from "../../components/gameItems/LifeBar";
import OperationText from "../../components/gameItems/OperationText";
import OperationTextContainer from "../../components/Containers/OperationTextContainer";
import Progress from "../../components/gameItems/ProgressBar";
import Rounds from "../../components/texts/Rounds";
import {GameContainerStyle, OperationContainerStyle} from "./style";
import { Operation } from "../../models/Operation";
import {useNavigate} from "react-router-native";
import { setRoundsPlayed, setGameMusicOn } from '../../redux/CreateGames/gameSlice';
import Code from "../../components/texts/Code";
import {GameElements} from "../../models/GameElements";
import GameButton from "../../components/gameItems/GameButton";
import GameSwitch from "../../components/gameItems/GameSwitch";
import ShipImage from "../../components/gameItems/ShipImage";
import LoadingText from "../../components/texts/LoadingText";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ShipContainer} from "../../components/gameItems/ShipImage/style";
import  { GameMusic } from "../../components/audio/music/GameMusic";
import SoundEffect from "../../components/audio/soundEffects";

const GameScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ws = useSelector((state: any) => state.game.webSocket);
    const gamePlayers = useSelector((state: any) => state.game.gamePlayers);
    const gameMusic = useSelector((state: any) => state.game.isGameMusicOn);
    const [operation, setOperation] = useState<Operation>();
    const [integrity, setIntegrity] = useState(100);
    const [GameElementsList, setGameElementsList] = useState<GameElements[]>([]);
    const [expectedIds, setExpectedIds] = useState<number[]>([]);
    const [activatedIds, setActivatedIds] = useState<number[]>([]);
    const [starting, setStarting] = useState(false);

    // We launch game music when we land on game page:
    useEffect(() => {
        if (gameMusic === false) {
            GameMusic();
            dispatch(setGameMusicOn(true));
            console.log('game Music On');
        }
        if (gameMusic === true) {
            //in 3min15s, set homeMusic to false
            setTimeout(() => {
                dispatch(setGameMusicOn(false));
                console.log('game Music Off');
            }, 200000);
        }
        return ;
    }, [gameMusic]);

    useEffect(() => {
        compareIds();
    }, [activatedIds]);

    // reading messages from server
    ws.onmessage = (e : any) => {
        // Ignore ping messages
        if (e.data === "ping")
        {
            return;
        }
        const data = JSON.parse(e.data);
        
        if (data.type === "operation")
        {
            setActivatedIds([]);
            setExpectedIds([]);
            // A loading message is displayed when set to false:
            if (!starting)
                setStarting(true);

            try {  // if server sends operation then update operation object:
                const operation = data.data;
                if (data.data.role === "operator") {
                    operation.description = "Ecoute ton instructeur !!";
                    setGameElementsList(data.data.elements);
                    setTimeout(() => {
                        setGameElementsList([]);
                        operation.description = "En attente de la prochaine opération...";
                    }, operation.duration * 1000);
                }
                if (data.data.role === "instructor") {
                    setGameElementsList([]);
                    setTimeout(() => {
                        setGameElementsList([]);
                        operation.description = "En attente de la prochaine opération...";
                    }, operation.duration * 1000);
                }
                setOperation(operation);
            } catch (err) {
                // handle parsing errors
                console.error("Error parsing message:", err);
            }

            try {
                if (data.data.result.buttons !== undefined) {
                    setExpectedIds(data.data.result.buttons.ids);
                }
                else {
                    setExpectedIds(data.data.result.switchs);
                }
            } catch (err) {
                console.error("Error parsing elements:", err);
            }
        }
        if (data.type === "integrity")
        {
            try {  // when server sends integrity then update ship integrity as well:
                setIntegrity(data.data.integrity);
                SoundEffect(require('../../components/audio/soundEffects/soundBank/integrity.mp3'));
                // launch emergency sound alerts:
                if (integrity === 40){
                    setTimeout(() => {
                        SoundEffect(require('../../components/audio/soundEffects/soundBank/30percent.mp3'));
                    }, 800);
                }
                if (integrity === 20){
                    setTimeout(() => {
                        SoundEffect(require('../../components/audio/soundEffects/soundBank/10percent.mp3'));
                    }, 800);
                }
            } catch (err) {
                // handle parsing errors
                console.error("Error parsing message:", err);
            }
        }

        if (data.type === "destroyed")
        {
            try {  // when game's over setDestroyed:
                const rounds = data.data.turns;
                dispatch(setRoundsPlayed(rounds));
                console.log("Liste des joueurs récupérée du store", gamePlayers);
                onSaveIntoHistory(rounds, gamePlayers);
                // stop the music:
                navigate('/gameOver');
            } catch (err) {
                // handle parsing errors
                console.error("Error parsing message in destroyed part:", err);
            }
        }

        if (data.type === "victory")
        {
            dispatch(setRoundsPlayed(20));
            onSaveIntoHistory(20, gamePlayers);
            navigate('/success');
        }
    };
    ws.onclose = (e : any) => {
        console.log('closed')
    }

    // called anyhow game ends, and save playersList + round reached
    const onSaveIntoHistory = async (rounds: number, players: string[]) => {
        try {
            const gameData = { rounds, players: JSON.stringify(players) };
            // choosing a date key , will allow to sort the games played later:
            const now = new Date();
            await AsyncStorage.setItem(now.toISOString(), JSON.stringify(gameData));
            console.log('Game data saved successfully!');
        } catch (error) {
            console.log('Error saving game data: ', error);
        }
    };

    const compareIds = () => {
        if (expectedIds.length !== 0 && activatedIds.length !== 0) {
            activatedIds.sort();
            expectedIds.sort();
            if (JSON.stringify(expectedIds) === JSON.stringify(activatedIds)) {
                setTimeout(() => {
                    SoundEffect(require('../../components/audio/soundEffects/soundBank/success.mp3'));
                }, 1000);
                console.log('Tableau correct');
                ws.send(JSON.stringify({
                    "type": "finish",
                    "data": {
                        "operator": operation?.id,
                        "success": true
                    }
                }));
            }
        }
    }

    const handleSwitchToggle = (id: number, value: boolean) => {
        if (value) {
            setActivatedIds([...activatedIds, id]);
        } else {
            setActivatedIds(activatedIds.filter((switchId) => switchId !== id));
        }
        compareIds();
    };

    const handleClick = (id: number) => {
        setActivatedIds([...activatedIds, id]);
        compareIds();
    }
    ws.onclose = (e: any) => {
        console.log('closed')
    }
    // As soon as we receive the 1st operation, we display all game elements:
    if (starting)
    {
        return (
            <ImageBackground source={require('../../images/onboard_spaceship.png')}
                             resizeMode={'cover'}
                             style={{width: '100%', height: '100%'}}
            >
                <Provider store={store}>
                    <LifeBar width={integrity} opacity = {undefined} color = {undefined}/>
                    <Code code={operation?.id}/>
                    <ShipContainer>
                        <ShipImage integrity={integrity}
                                   brightness={undefined}
                                   source={undefined}
                                   rotation={undefined}
                                   xPosition={undefined}
                                   yPosition={undefined}/>
                    </ShipContainer>
                    <GameContainerStyle>
                        <OperationTextContainer>
                            <OperationText operation={
                                (operation?.description === undefined || null )
                                    ? 'Attendez votre tour pour jouer' : operation?.description}
                            />
                        </OperationTextContainer>
                        <Progress durationInSeconds={operation?.duration}/>
                        <Rounds rounds={operation?.turn}/>
                        <OperationContainerStyle>
                            {GameElementsList.map((element) => (
                                element.type === "button" ? (
                                    <GameButton
                                        value={element.value}
                                        onClick={handleClick}
                                        id={element.id}
                                        valueType={element.valueType}
                                    />
                                ) : (
                                    <GameSwitch
                                        value={element.value}
                                        id={element.id}
                                        valueType={element.valueType}
                                        onToggle={handleSwitchToggle}
                                    />
                                )
                            ))}
                        </OperationContainerStyle>
                    </GameContainerStyle>
                </Provider>
            </ImageBackground>
        );

    }
    // A loading message is displayed before the 1st operation has been received:
    else {
        return (
            <ImageBackground source={require('../../images/onboard_spaceship.png')}
                             resizeMode={'cover'}
                             style={{width: '100%', height: '100%'}}
            >
                <Provider store={store}>
                    <LoadingText opacity={undefined}/>
                </Provider>
            </ImageBackground>
        );
    }
}
export default GameScreen;