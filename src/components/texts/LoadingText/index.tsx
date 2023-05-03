import React, { useState, useEffect } from "react";
import { Container, LoadingTextStyle } from "./style";

export interface Props { opacity: number | undefined }

const LoadingText: React.FC<Props> = () => {

    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // Makes blink the text:
        const interval = setInterval(() => {
            setOpacity((opacity) => (opacity === 1 ? 0 : 1));
        }, 500);
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <LoadingTextStyle opacity={opacity}> READY ?</LoadingTextStyle>
        </Container>
    );
}

export default LoadingText;