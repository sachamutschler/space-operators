import React from "react";
import {Container, CodeStyle} from "./style";
interface Props {
    code: string | undefined;
}
const Code: React.FC<Props> = ({code}) => {
    return (
        <Container>
            <CodeStyle>Code : {code}</CodeStyle>
        </Container>
    );
}

export default Code;