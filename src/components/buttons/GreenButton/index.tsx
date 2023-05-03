import React, {useState} from "react";
import { ButtonContainer, ButtonText } from "./style";
import setUserState from "../../../api/Ready";
import {useSelector} from "react-redux";
import SoundEffect from "../../audio/soundEffects";

interface Props {
    text: string;
}
const GreenButton: React.FC<Props> = ({ text }) => {

    let userId = useSelector((state: any) => state.game.userId);
    const handlePress = (): void => {
        SoundEffect(require('../../audio/soundEffects/soundBank/ready.mp3'));
        const userState = setUserState(userId);
        setActive(true);
    };
    const [active, setActive] = useState<boolean>(false);
    return (
        <ButtonContainer active={active} onPress={ handlePress }>
            <ButtonText>{text}</ButtonText>
        </ButtonContainer>
    );
}

export default GreenButton;