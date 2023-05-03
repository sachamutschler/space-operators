import React from "react";
import {NameBlockStyle} from "./style";
import {TouchableOpacity} from "react-native";

interface Props {
    onPress: () => void,
    children: React.ReactNode;
}
const NameBlock: React.FC<Props> = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <NameBlockStyle>
                {children}
            </NameBlockStyle>
        </TouchableOpacity>
    );
};

export default NameBlock;