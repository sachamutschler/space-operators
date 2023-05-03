import React from "react";
import {Container, Round} from "./style";
interface Props {
    rounds: number | undefined;
}
const Rounds: React.FC<Props> = ({rounds}) => {
    return (
        <Container>
            <Round>Round : {rounds}</Round>
        </Container>
    );
}

export default Rounds;