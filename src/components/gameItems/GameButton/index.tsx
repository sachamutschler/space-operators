import React, { useState } from 'react';
import {ButtonContainer, ButtonText} from "./style";
import SoundEffect from '../../audio/soundEffects';

export interface ButtonProps {
    id: number;
    value: string;
    onClick: (id: number) => void;
    valueType?: string;
}

const GameButton : React.FC<ButtonProps> = ({id, value, onClick, valueType}) => {

    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
        SoundEffect(require('../../audio/soundEffects/soundBank/button.mp3'));
        setClickCount(clickCount + 1);
        onClick(id);
        
    };

    return (
        <ButtonContainer onPress={handleClick} value={value} type={valueType}>
            <ButtonText>{(valueType === 'color') ? '' : value}</ButtonText>
        </ButtonContainer>
    );
};

export default GameButton;