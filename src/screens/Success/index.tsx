import React from "react";
import { ImageBackground } from "react-native";
import {Provider, useSelector, useDispatch} from "react-redux";
import store from "../../redux/CreateGames/store";
import PrimaryTitle from "../../components/titles/PrimaryTitle";
import Rounds from "../../components/texts/Rounds";
import OrangeButton from "../../components/buttons/OrangeButton";
import SoundEffect from "../../components/audio/soundEffects";
import { stopGameMusic } from "../../components/audio/music/GameMusic";
import { setGameMusicOn } from "../../redux/CreateGames/gameSlice";

const Success = () => {

    const dispatch = useDispatch();

    const gameMusic = useSelector((state: any) => state.game.isGameMusicOn);

    if (gameMusic) {
        stopGameMusic();
        dispatch(setGameMusicOn(false));
        console.log('game Music Off');
    }
    SoundEffect(require('../../components/audio/soundEffects/soundBank/victory.mp3'));

    return (
        <ImageBackground source={require("../../images/take_off.png")}
                         resizeMode={'cover'}
                         style={{width: '100%', height: '100%'}}>
            <Provider store={store}>
                <PrimaryTitle title={'Victoire !'} />
                <Rounds rounds={20}/>
                <OrangeButton text={"ACCUEIL"} path={'/'}/>
            </Provider>
        </ImageBackground>
    );
};

export default Success;