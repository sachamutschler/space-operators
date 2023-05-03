import React from "react";
import {TitleStyle, TitleContainer} from "./style";
interface Props {
    title: string,
}
const PrimaryTitle: React.FC<Props> = ({title}) => {
    return (
        <TitleContainer>
            <TitleStyle>{ title }</TitleStyle>
        </TitleContainer>
    );
}
export default PrimaryTitle;