import React from "react";
import { ImageBackground } from "react-native";
import PrimaryTitle from "../../components/titles/PrimaryTitle"
import BasicInput from "../../components/inputs/BasicInput";
import {GlobalContainer, InputContainer} from "./style";
import OrangeButton from "../../components/buttons/OrangeButton";
import ActionButton from "../../components/buttons/ActionButton";
import {useNavigate} from "react-router-native";
import {useDispatch, useSelector} from "react-redux";
import { useState } from 'react';
import {setGameId, setUserName} from "../../redux/CreateGames/gameSlice";
import SoundEffect from "../../components/audio/soundEffects";

const Join = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userNameStored = useSelector((state: any) => state.game.userName);
    const [nameToAdd, setNameToAdd] = useState(userNameStored);
    const [gameIdToAdd, setGameIdToAdd] = useState('');

    const joinGame = () => {
        SoundEffect(require('../../components/audio/soundEffects/soundBank/button.mp3'));
        if (nameToAdd !== userNameStored) {
        dispatch(setUserName(nameToAdd));
        }
        dispatch(setGameId(gameIdToAdd));
        navigate('/lobby');
    };
    return (
        <ImageBackground source={require('../../images/home.png')} resizeMode={'cover'} style={{width: '100%', height: '100%'}}>
            <PrimaryTitle title={'Space Operators'} />
            <GlobalContainer>
                <InputContainer>
                    <BasicInput 
                        placeholder={userNameStored}
                        value= {nameToAdd}
                        onChangeText= {setNameToAdd}
                    />
                    <BasicInput 
                        placeholder={'Game ID'}
                        value= {gameIdToAdd}
                        onChangeText= {setGameIdToAdd}
                        />
                </InputContainer>
                <ActionButton onPress={joinGame} text={'Rejoindre'}/>
                <OrangeButton text={'Retour'} path={'/'}/>
            </GlobalContainer>
        </ImageBackground>
    );
}

export default Join;