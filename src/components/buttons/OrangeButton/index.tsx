import {OrangeButtonContainer, OrangeButtonStyle} from './style';
import React from "react";
import { useNavigate } from 'react-router-native';
import SoundEffect from '../../audio/soundEffects';


interface Props {
    text: string,
    path: string | undefined,
}

const OrangeButton: React.FC<Props> = ({ path, text, }) => {

    const navigate = useNavigate();

    const handlePress = () => {
        if (path !== undefined) {
             SoundEffect(require('../../audio/soundEffects/soundBank/button.mp3'));
             navigate(path);
        }
    }
    return (
        <OrangeButtonContainer onPress={ handlePress }>
            <OrangeButtonStyle>
                { text }
            </OrangeButtonStyle>
        </OrangeButtonContainer>
    );
}

export default OrangeButton;