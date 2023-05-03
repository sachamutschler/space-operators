import React from "react";
import {ImageBackground} from "react-native";
import {Provider, useSelector, useDispatch} from "react-redux";
import store from "../../redux/CreateGames/store";
import Rounds from "../../components/texts/Rounds";
import OrangeButton from "../../components/buttons/OrangeButton";
import PrimaryTitle from "../../components/titles/PrimaryTitle";
import {SpaceShipImage} from "./style";
import SoundEffect from "../../components/audio/soundEffects";
import { stopGameMusic } from "../../components/audio/music/GameMusic";
import { setGameMusicOn } from "../../redux/CreateGames/gameSlice";

const GameOver = () => {

    const dispatch = useDispatch();

    const roundsPlayed = useSelector((state: any) => state.game.roundsPlayed);
    const gameMusic = useSelector((state: any) => state.game.isGameMusicOn);

    if (gameMusic === true) {
        stopGameMusic();
        dispatch(setGameMusicOn(false));
        console.log('game Music Off');
    }
    SoundEffect(require('../../components/audio/soundEffects/soundBank/defeat.mp3'));
    
    return (
        <ImageBackground source={require('../../images/onboard_spaceship.png')}
                         resizeMode={'cover'}
                         style={{width: '100%', height: '100%'}}
        >
            <Provider store={store}>
                <PrimaryTitle title={'Game Over'} />
                <Rounds rounds={roundsPlayed}/>
                <OrangeButton text={'Back to home'} path={'/'}/>
                <SpaceShipImage source={require('../../images/spaceshipbg-damaged4.png')}/>
            </Provider>
        </ImageBackground>
    );
}
export default GameOver;