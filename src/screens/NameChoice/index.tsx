import React from "react";
import { useState } from 'react';
import {ImageBackground } from "react-native";
import OrangeButton from "../../components/buttons/OrangeButton";
import ActionButton from "../../components/buttons/ActionButton";
import {useNavigate} from "react-router-native";
import BasicInput from "../../components/inputs/BasicInput"
import { InputContainer, UuidInfo, OpacityContainer } from "./style";
import GlobalContainer from "../../components/Containers/GlobalContainer";
import PrimaryTitle from "../../components/titles/PrimaryTitle";
import {useDispatch, useSelector} from "react-redux";
import { setUserName } from "../../redux/CreateGames/gameSlice";
import SoundEffect from "../../components/audio/soundEffects";

const NameChoice = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state: any) => state.game.userId);
    const userNameStored = useSelector((state: any) => state.game.userName);
    const [nameToAdd, setNameToAdd] = useState(userNameStored);

    const changeUserName = () => {
        if (nameToAdd !== userNameStored) {
        SoundEffect(require('../../components/audio/soundEffects/soundBank/button.mp3'));
        dispatch(setUserName(nameToAdd));
        }
        navigate('/');
    };

    return (
        <ImageBackground source={require('../../images/onboard_spaceship.png')}
                         resizeMode={'cover'}
                         style={{width: '100%', height: '100%'}}>
            <PrimaryTitle title={'Space Operators'} />
            <GlobalContainer>
                <InputContainer>
                    <BasicInput 
                        placeholder={userNameStored}
                        value= {nameToAdd}
                        onChangeText= {setNameToAdd}
                    />
                </InputContainer>
                <OpacityContainer><UuidInfo>Id: { userId }</UuidInfo></OpacityContainer>
                <ActionButton onPress={changeUserName} text={'Valider'}/>
                <OrangeButton text={'Retour'} path={'/'}/>
            </GlobalContainer>
        </ImageBackground>
    );
}
export default NameChoice;