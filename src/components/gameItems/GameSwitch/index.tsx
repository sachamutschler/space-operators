import React, {useEffect, useState} from 'react';
import {SwitchButton, SwitchContainer, SwitchText} from "./style";
import SoundEffect from '../../audio/soundEffects';

export interface SwitchProps {
    id: number;
    value: string;
    valueType: string;
    onToggle: (id: number, value: boolean) => void;
}

const GameSwitch : React.FC<SwitchProps> = ({id, value, valueType, onToggle }) => {
    const [switchValue, setSwitchValue] = useState(false);

    useEffect(() => {
        // Reset switchValue to false when GameElementsList changes
        setSwitchValue(false);
    }, [value]);
    const handleToggle = (value: boolean) => {
        SoundEffect(require('../../audio/soundEffects/soundBank/button.mp3'));
        setSwitchValue(value);
        onToggle(id, value);
    };

    return (
        <SwitchContainer>
            <SwitchButton
                value={switchValue}
                onValueChange={handleToggle}
                trackColor={{ false: '#cecece', true: '#cecece' }}
                ios_backgroundColor="#cecece"
                thumbColor={ (valueType === 'color') ? value : "#ffffff"}
            >
            </SwitchButton>
            {(valueType === 'color' ? '' : <SwitchText>{value}</SwitchText>)}
        </SwitchContainer>
    );
};

export default GameSwitch;