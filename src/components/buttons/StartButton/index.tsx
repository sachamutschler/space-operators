import { StartButtonContainer, StartButtonStyle } from './style';
import React, { useState, useEffect }  from "react";

export interface Props {
    onPress: () => void,
    text: string,
    isCreator: boolean |any,
    ready: boolean,
}

const StartButton: React.FC<Props> = ({ onPress, text, isCreator, ready}) => {

    const [active, setActive] = useState<boolean>(true);
    
    useEffect(() => {
        if (isCreator && ready) {
          setActive(true);
        } else {
          setActive(false);
        }
      }, [ready, isCreator]);
      
    return (
        <StartButtonContainer onPress={ onPress } active={ active } >
            <StartButtonStyle>
                { text }
            </StartButtonStyle>
        </StartButtonContainer>
    );
};

export default StartButton;