import {ActionButtonContainer, ActionButtonStyle} from './style';
import React from "react";

interface Props {
    onPress: () => void,
    text: string,
}

const ActionButton: React.FC<Props> = ({onPress, text}) => {

    return (
        <ActionButtonContainer onPress={onPress}>
            <ActionButtonStyle>
                { text }
            </ActionButtonStyle>
        </ActionButtonContainer>
    );
};

export default ActionButton;