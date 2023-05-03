import React from "react";
import {InputTextStyle} from "./style";
interface Props {
    placeholder: string,
    value: string,
    onChangeText: React.Dispatch<React.SetStateAction<string>>
}
const BasicInput: React.FC<Props> = ({ placeholder, value, onChangeText }) => {
    return (
        <InputTextStyle placeholder={placeholder} value={value} onChangeText={onChangeText}/>
    );
};

export default BasicInput;

